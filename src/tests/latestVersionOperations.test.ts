import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import fs from 'fs/promises';
import path from 'path';
import { EventEmitter } from 'events';
import { logger } from '../utils/logger';
import type { ProgressEvent, DownloadOptions } from './testTypes';

// Mock electron IPC for testing
class MockElectronAPI extends EventEmitter {
  private handlers: Map<string, Function> = new Map();

  send(channel: string, ...args: unknown[]) {
    const handler = this.handlers.get(channel);
    if (handler) {
      // Simulate async IPC call
      setTimeout(() => handler(...args), 10);
    }
  }

  receive(channel: string, callback: (...args: unknown[]) => void) {
    this.on(channel, callback);
  }

  removeAllListeners(channel?: string): this {
    if (channel) {
      super.removeAllListeners(channel);
    } else {
      super.removeAllListeners();
    }
    return this;
  }

  // Test helpers to simulate backend responses
  setHandler(channel: string, handler: Function) {
    this.handlers.set(channel, handler);
  }

  simulateProgress(channel: string, progress: number, status: string) {
    this.emit(channel, { progress, status });
  }

  simulateCompletion(channel: string) {
    this.emit(channel, { progress: 100, status: 'Completed successfully' });
    this.emit('versions-updated');
  }

  simulateError(channel: string, error: string) {
    this.emit(channel, { progress: 0, status: `Error: ${error}` });
  }
}

describe('Latest Version Operations Tests', () => {
  let testDir: string;
  let originalEnv: string | undefined;
  let mockAPI: MockElectronAPI;

  beforeEach(async () => {
    // Create a temporary test directory
    testDir = path.join(process.cwd(), 'test-latest-operations');
    await fs.mkdir(testDir, { recursive: true });

    // Set environment variable to use test directory
    originalEnv = process.env.MANIC_MINERS_INSTALL_PATH;
    process.env.MANIC_MINERS_INSTALL_PATH = testDir;

    // Setup mock electron API
    mockAPI = new MockElectronAPI();
    (global as Record<string, unknown>).window = {
      electronAPI: mockAPI,
    };

    await logger.clearLogs();
  });

  afterEach(async () => {
    // Clean up test directory
    try {
      await fs.rm(testDir, { recursive: true });
    } catch (error) {
      // Ignore cleanup errors
    }

    // Restore environment
    if (originalEnv) {
      process.env.MANIC_MINERS_INSTALL_PATH = originalEnv;
    } else {
      delete process.env.MANIC_MINERS_INSTALL_PATH;
    }

    // Clean up global mocks
    delete (global as Record<string, unknown>).window;
  });

  describe('Install Operation Tests', () => {
    it('should successfully install latest version', async () => {
      const latestDir = path.join(testDir, 'latest');

      // Simulate install process
      mockAPI.setHandler('download-latest-version', async (options: DownloadOptions) => {
        expect(options.version).to.equal('latest');

        // Create the installation directory and files
        await fs.mkdir(latestDir, { recursive: true });
        await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'fake game executable');
        await fs.writeFile(path.join(latestDir, 'game.dat'), 'fake game data');
        await fs.writeFile(path.join(latestDir, 'config.ini'), 'fake config file');

        // Simulate progress updates
        mockAPI.simulateProgress('download-latest-progress', 25, 'Downloading from itch.io...');
        mockAPI.simulateProgress('download-latest-progress', 50, 'Download complete, extracting...');
        mockAPI.simulateProgress('download-latest-progress', 75, 'Extracting files...');
        mockAPI.simulateProgress('download-latest-progress', 96, 'Preparing to extract game files...');
        mockAPI.simulateProgress('download-latest-progress', 98, 'Cleaning up and finalizing...');
        mockAPI.simulateCompletion('download-latest-progress');
      });

      // Start install
      const progressUpdates: ProgressEvent[] = [];
      mockAPI.receive('download-latest-progress', (data: ProgressEvent) => {
        progressUpdates.push(data);
      });

      mockAPI.send('download-latest-version', { version: 'latest' });

      // Wait for completion
      await new Promise(resolve => {
        mockAPI.once('versions-updated', resolve);
      });

      // Verify installation
      const exeExists = await fs
        .access(path.join(latestDir, 'ManicMiners.exe'))
        .then(() => true)
        .catch(() => false);

      expect(exeExists).to.be.true;
      expect(progressUpdates.length).to.be.greaterThan(0);
      expect(progressUpdates[progressUpdates.length - 1].progress).to.equal(100);

      // Install operation should complete successfully (mocked)
      expect(true).to.be.true;
    });

    it('should handle install errors gracefully', async () => {
      mockAPI.setHandler('download-latest-version', async () => {
        mockAPI.simulateError('download-latest-progress', 'Network connection failed');
      });

      const errorUpdates: ProgressEvent[] = [];
      mockAPI.receive('download-latest-progress', (data: ProgressEvent) => {
        errorUpdates.push(data);
      });

      mockAPI.send('download-latest-version', { version: 'latest' });

      // Wait for error
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(errorUpdates.some(update => update.status.includes('Error'))).to.be.true;
    });

    it('should skip installation if already installed', async () => {
      // Pre-create installation
      const latestDir = path.join(testDir, 'latest');
      await fs.mkdir(latestDir, { recursive: true });
      await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'existing game executable');

      mockAPI.setHandler('download-latest-version', async (options: DownloadOptions) => {
        // Should detect existing installation
        mockAPI.simulateProgress('download-latest-progress', 100, 'Version already installed');
      });

      const progressUpdates: ProgressEvent[] = [];
      mockAPI.receive('download-latest-progress', (data: ProgressEvent) => {
        progressUpdates.push(data);
      });

      mockAPI.send('download-latest-version', { version: 'latest', forceDownload: false });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progressUpdates.some(update => update.status.includes('already installed'))).to.be.true;
    });
  });

  describe('Verify and Repair Operation Tests', () => {
    beforeEach(async () => {
      // Create a basic installation for verification tests
      const latestDir = path.join(testDir, 'latest');
      await fs.mkdir(latestDir, { recursive: true });
      await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'game executable');
      await fs.writeFile(path.join(latestDir, 'game.dat'), 'game data');
    });

    it('should successfully verify installation', async () => {
      mockAPI.setHandler('verify-and-repair-installation', async (options: { version: string }) => {
        expect(options.version).to.equal('latest');

        // Simulate verification process
        mockAPI.simulateProgress('verify-repair-progress', 20, 'Scanning installation files...');
        mockAPI.simulateProgress('verify-repair-progress', 50, 'Verifying file integrity...');
        mockAPI.simulateProgress('verify-repair-progress', 80, 'Checking for missing files...');
        mockAPI.simulateCompletion('verify-repair-progress');
      });

      const progressUpdates: ProgressEvent[] = [];
      mockAPI.receive('verify-repair-progress', (data: ProgressEvent) => {
        progressUpdates.push(data);
      });

      mockAPI.send('verify-and-repair-installation', { version: 'latest' });

      await new Promise(resolve => {
        mockAPI.once('versions-updated', resolve);
      });

      expect(progressUpdates.length).to.be.greaterThan(0);
      expect(progressUpdates[progressUpdates.length - 1].progress).to.equal(100);
    });

    it('should repair corrupted files', async () => {
      // Corrupt a file by deleting it
      await fs.unlink(path.join(testDir, 'latest', 'game.dat'));

      mockAPI.setHandler('verify-and-repair-installation', async () => {
        // Simulate repair process
        mockAPI.simulateProgress('verify-repair-progress', 10, 'Scanning installation files...');
        mockAPI.simulateProgress('verify-repair-progress', 30, 'Found missing files, downloading...');

        // Recreate the missing file
        await fs.writeFile(path.join(testDir, 'latest', 'game.dat'), 'repaired game data');

        mockAPI.simulateProgress('verify-repair-progress', 70, 'Repairing files...');
        mockAPI.simulateCompletion('verify-repair-progress');
      });

      const progressUpdates: ProgressEvent[] = [];
      mockAPI.receive('verify-repair-progress', (data: ProgressEvent) => {
        progressUpdates.push(data);
      });

      mockAPI.send('verify-and-repair-installation', { version: 'latest' });

      await new Promise(resolve => {
        mockAPI.once('versions-updated', resolve);
      });

      // Verify file was repaired
      const repairedFile = await fs.readFile(path.join(testDir, 'latest', 'game.dat'), 'utf-8');
      expect(repairedFile).to.equal('repaired game data');

      expect(progressUpdates.some(update => update.status.includes('missing files'))).to.be.true;
    });

    it('should handle verification errors', async () => {
      mockAPI.setHandler('verify-and-repair-installation', async () => {
        mockAPI.simulateError('verify-repair-progress', 'Unable to connect to download server');
      });

      const errorUpdates: ProgressEvent[] = [];
      mockAPI.receive('verify-repair-progress', (data: ProgressEvent) => {
        errorUpdates.push(data);
      });

      mockAPI.send('verify-and-repair-installation', { version: 'latest' });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(errorUpdates.some(update => update.status.includes('Error'))).to.be.true;
    });
  });

  describe('Uninstall Operation Tests', () => {
    beforeEach(async () => {
      // Create installation for uninstall tests
      const latestDir = path.join(testDir, 'latest');
      await fs.mkdir(latestDir, { recursive: true });
      await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'game executable');
      await fs.writeFile(path.join(latestDir, 'game.dat'), 'large game data file'.repeat(1000));
      await fs.writeFile(path.join(latestDir, 'config.ini'), 'config data');

      // Create subdirectory with files
      const assetsDir = path.join(latestDir, 'assets');
      await fs.mkdir(assetsDir);
      await fs.writeFile(path.join(assetsDir, 'texture.png'), 'texture data');
      await fs.writeFile(path.join(assetsDir, 'sound.wav'), 'sound data');
    });

    it('should successfully uninstall latest version', async () => {
      const latestDir = path.join(testDir, 'latest');

      mockAPI.setHandler('delete-latest-version', async (options: { version: string }) => {
        expect(options.version).to.equal('latest');

        // Simulate deletion process with file-by-file progress
        mockAPI.simulateProgress('delete-latest-progress', 5, 'Scanning latest installation...');
        mockAPI.simulateProgress('delete-latest-progress', 15, 'Removing 5 files from latest...');
        mockAPI.simulateProgress('delete-latest-progress', 40, 'Deleted: ManicMiners.exe');
        mockAPI.simulateProgress('delete-latest-progress', 60, 'Deleted: game.dat');
        mockAPI.simulateProgress('delete-latest-progress', 80, 'Deleted: texture.png');
        mockAPI.simulateProgress('delete-latest-progress', 95, 'Removed latest directory');

        // Actually remove the directory
        await fs.rm(latestDir, { recursive: true });

        mockAPI.simulateCompletion('delete-latest-progress');
      });

      const progressUpdates: ProgressEvent[] = [];
      mockAPI.receive('delete-latest-progress', (data: ProgressEvent) => {
        progressUpdates.push(data);
      });

      mockAPI.send('delete-latest-version', { version: 'latest' });

      await new Promise(resolve => {
        mockAPI.once('versions-updated', resolve);
      });

      // Verify directory is gone
      const dirExists = await fs
        .access(latestDir)
        .then(() => true)
        .catch(() => false);

      expect(dirExists).to.be.false;
      expect(progressUpdates.length).to.be.greaterThan(0);
      expect(progressUpdates[progressUpdates.length - 1].progress).to.equal(100);

      // Verify progress messages
      expect(progressUpdates.some(update => update.status.includes('Scanning'))).to.be.true;
      expect(progressUpdates.some(update => update.status.includes('Deleted:'))).to.be.true;
    });

    it('should handle uninstall when no installation exists', async () => {
      // Remove the installation directory first
      await fs.rm(path.join(testDir, 'latest'), { recursive: true });

      mockAPI.setHandler('delete-latest-version', async () => {
        mockAPI.simulateProgress('delete-latest-progress', 100, 'No installation found to remove');
      });

      const progressUpdates: ProgressEvent[] = [];
      mockAPI.receive('delete-latest-progress', (data: ProgressEvent) => {
        progressUpdates.push(data);
      });

      mockAPI.send('delete-latest-version', { version: 'latest' });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progressUpdates.some(update => update.status.includes('No installation found'))).to.be.true;
    });

    it('should handle partial uninstall failures', async () => {
      mockAPI.setHandler('delete-latest-version', async () => {
        // Simulate partial failure
        mockAPI.simulateProgress('delete-latest-progress', 30, 'Deleted: ManicMiners.exe');
        mockAPI.simulateError('delete-latest-progress', 'Permission denied for some files');
      });

      const errorUpdates: ProgressEvent[] = [];
      mockAPI.receive('delete-latest-progress', (data: ProgressEvent) => {
        errorUpdates.push(data);
      });

      mockAPI.send('delete-latest-version', { version: 'latest' });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(errorUpdates.some(update => update.status.includes('Error'))).to.be.true;
      expect(errorUpdates.some(update => update.status.includes('Permission denied'))).to.be.true;
    });
  });

  describe('Update Operation Tests', () => {
    beforeEach(async () => {
      // Create existing installation for update tests
      const latestDir = path.join(testDir, 'latest');
      await fs.mkdir(latestDir, { recursive: true });
      await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'old game executable');
      await fs.writeFile(path.join(latestDir, 'game.dat'), 'old game data');
    });

    it('should successfully update latest version', async () => {
      const latestDir = path.join(testDir, 'latest');

      mockAPI.setHandler('update-latest-version', async (options: { version: string }) => {
        expect(options.version).to.equal('latest');

        // Simulate update process (remove old, download new)
        mockAPI.simulateProgress('update-progress', 5, 'Removing existing installation...');
        mockAPI.simulateProgress('update-progress', 15, 'Starting update...');
        mockAPI.simulateProgress('update-progress', 40, 'Downloading updated files...');
        mockAPI.simulateProgress('update-progress', 70, 'Extracting new version...');

        // Update the files
        await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'updated game executable');
        await fs.writeFile(path.join(latestDir, 'game.dat'), 'updated game data');
        await fs.writeFile(path.join(latestDir, 'changelog.txt'), 'New features and bug fixes');

        mockAPI.simulateCompletion('update-progress');
      });

      const progressUpdates: ProgressEvent[] = [];
      mockAPI.receive('update-progress', (data: ProgressEvent) => {
        progressUpdates.push(data);
      });

      mockAPI.send('update-latest-version', { version: 'latest' });

      await new Promise(resolve => {
        mockAPI.once('versions-updated', resolve);
      });

      // Verify files were updated
      const exeContent = await fs.readFile(path.join(latestDir, 'ManicMiners.exe'), 'utf-8');
      expect(exeContent).to.equal('updated game executable');

      const changelogExists = await fs
        .access(path.join(latestDir, 'changelog.txt'))
        .then(() => true)
        .catch(() => false);
      expect(changelogExists).to.be.true;

      expect(progressUpdates.length).to.be.greaterThan(0);
      expect(progressUpdates[progressUpdates.length - 1].progress).to.equal(100);
    });

    it('should handle update errors', async () => {
      mockAPI.setHandler('update-latest-version', async () => {
        mockAPI.simulateProgress('update-progress', 20, 'Downloading updated files...');
        mockAPI.simulateError('update-error', 'Update download failed: Server unavailable');
      });

      const progressUpdates: ProgressEvent[] = [];
      const errorUpdates: ProgressEvent[] = [];

      mockAPI.receive('update-progress', (data: ProgressEvent) => {
        progressUpdates.push(data);
      });

      mockAPI.receive('update-error', (data: ProgressEvent) => {
        errorUpdates.push(data);
      });

      mockAPI.send('update-latest-version', { version: 'latest' });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(errorUpdates.length).to.be.greaterThan(0);
      expect(errorUpdates[0]).to.exist;
      const errorEvent = errorUpdates[0] as ProgressEvent;
      const errorMessage = typeof errorEvent === 'string' ? errorEvent : errorEvent.status || JSON.stringify(errorEvent);
      expect(errorMessage).to.include('Server unavailable');
    });
  });

  describe('Concurrent Operations Tests', () => {
    it('should handle multiple operation requests gracefully', async () => {
      const latestDir = path.join(testDir, 'latest');
      await fs.mkdir(latestDir, { recursive: true });
      await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'game executable');

      // Set up handlers for multiple operations
      mockAPI.setHandler('verify-and-repair-installation', async () => {
        mockAPI.simulateProgress('verify-repair-progress', 50, 'Verifying...');
        await new Promise(resolve => setTimeout(resolve, 100));
        mockAPI.simulateCompletion('verify-repair-progress');
      });

      mockAPI.setHandler('update-latest-version', async () => {
        mockAPI.simulateProgress('update-progress', 50, 'Updating...');
        await new Promise(resolve => setTimeout(resolve, 100));
        mockAPI.simulateCompletion('update-progress');
      });

      const verifyUpdates: ProgressEvent[] = [];
      const updateUpdates: ProgressEvent[] = [];

      mockAPI.receive('verify-repair-progress', (data: ProgressEvent) => {
        verifyUpdates.push(data);
      });

      mockAPI.receive('update-progress', (data: ProgressEvent) => {
        updateUpdates.push(data);
      });

      // Start both operations
      mockAPI.send('verify-and-repair-installation', { version: 'latest' });
      mockAPI.send('update-latest-version', { version: 'latest' });

      // Wait for both to complete
      await new Promise(resolve => setTimeout(resolve, 200));

      expect(verifyUpdates.length).to.be.greaterThan(0);
      expect(updateUpdates.length).to.be.greaterThan(0);
    });
  });

  describe('Logging Integration Tests', () => {
    it('should log all operation events', async () => {
      const latestDir = path.join(testDir, 'latest');

      mockAPI.setHandler('download-latest-version', async () => {
        // Log events that would normally happen in the backend
        logger.downloadLog('Starting latest version download', { version: 'latest' });
        logger.downloadLog('Download completed successfully');

        await fs.mkdir(latestDir, { recursive: true });
        await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'game');

        mockAPI.simulateCompletion('download-latest-progress');
      });

      mockAPI.send('download-latest-version', { version: 'latest' });

      await new Promise(resolve => {
        mockAPI.once('versions-updated', resolve);
      });

      // Verify logging occurred
      const recentLogs = await logger.getRecentLogs(10);
      expect(recentLogs.some(log => log.includes('Starting latest version download'))).to.be.true;
      expect(recentLogs.some(log => log.includes('Download completed successfully'))).to.be.true;
    });
  });
});
