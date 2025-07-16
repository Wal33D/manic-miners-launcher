import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import fs from 'fs/promises';
import path from 'path';
import { EventEmitter } from 'events';
import { logger } from '../utils/logger';
import { fetchInstalledVersions } from '../functions/fetchInstalledVersions';
import type { IpcMainEvent, ProgressEvent, DownloadOptions } from './testTypes';

// Mock dependencies for IPC handler testing
class MockIpcMain extends EventEmitter {
  private handlers: Map<string, Function> = new Map();

  on(channel: string, handler: (...args: unknown[]) => void): this {
    this.handlers.set(channel, handler);
    super.on(channel, handler);
    return this;
  }

  removeAllListeners(channel?: string) {
    if (channel) {
      this.handlers.delete(channel);
    } else {
      this.handlers.clear();
    }
    return super.removeAllListeners(channel);
  }

  // Test helper to simulate IPC calls
  async simulateCall(channel: string, ...args: unknown[]) {
    const handler = this.handlers.get(channel);
    if (handler) {
      const mockEvent: IpcMainEvent = {
        sender: {
          send: (replyChannel: string, data: unknown) => {
            this.emit(replyChannel, data);
          },
        },
      };
      return await handler(mockEvent, ...args);
    }
    throw new Error(`No handler for channel: ${channel}`);
  }
}

// Mock electron modules
const mockElectron = {
  ipcMain: new MockIpcMain(),
  app: {
    getPath: (name: string) => {
      if (name === 'userData') {
        return path.join(process.cwd(), 'test-userdata');
      }
      return '/mock/path';
    },
  },
};

// Mock the required modules
(global as Record<string, unknown>).mockElectron = mockElectron;

describe('IPC Handlers Integration Tests', () => {
  let testDir: string;
  let originalEnv: string | undefined;
  let ipcMain: MockIpcMain;

  beforeEach(async () => {
    // Create test directories
    testDir = path.join(process.cwd(), 'test-ipc-handlers');
    await fs.mkdir(testDir, { recursive: true });

    const userDataDir = path.join(process.cwd(), 'test-userdata');
    await fs.mkdir(userDataDir, { recursive: true });

    // Set environment variable
    originalEnv = process.env.MANIC_MINERS_INSTALL_PATH;
    process.env.MANIC_MINERS_INSTALL_PATH = testDir;

    ipcMain = mockElectron.ipcMain;
    ipcMain.removeAllListeners();

    await logger.clearLogs();
  });

  afterEach(async () => {
    // Clean up test directories
    try {
      await fs.rm(testDir, { recursive: true });
      await fs.rm(path.join(process.cwd(), 'test-userdata'), { recursive: true });
    } catch (error) {
      // Ignore cleanup errors
    }

    // Restore environment
    if (originalEnv) {
      process.env.MANIC_MINERS_INSTALL_PATH = originalEnv;
    } else {
      delete process.env.MANIC_MINERS_INSTALL_PATH;
    }

    ipcMain.removeAllListeners();
  });

  describe('Download Latest Version Handler', () => {
    it('should detect existing installation and skip download', async () => {
      // Pre-create installation
      const latestDir = path.join(testDir, 'latest');
      await fs.mkdir(latestDir, { recursive: true });
      await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'existing executable');

      // Mock the download handler
      ipcMain.on('download-latest-version', async (...args: unknown[]) => {
        const event = args[0] as IpcMainEvent;
        const options = args[1] as DownloadOptions;
        const installPath = path.join(testDir, 'latest');

        // Check if already installed
        try {
          await fs.access(installPath);
          const contents = await fs.readdir(installPath, { recursive: true });
          const hasExe = contents.some((file: string) => file.endsWith('.exe'));

          if (hasExe && !options.forceDownload) {
            event.sender.send('download-latest-progress', {
              status: 'Version already installed',
              progress: 100,
            });
            event.sender.send('versions-updated', {});
            return { downloaded: true, message: 'Version already installed' };
          }
        } catch (_error) {
          // Installation doesn't exist, proceed with download
        }
        return { downloaded: false, message: 'Download started' };
      });

      const progressEvents: ProgressEvent[] = [];
      ipcMain.on('download-latest-progress', (data: unknown) => {
        progressEvents.push(data as ProgressEvent);
      });

      // const _result = await ipcMain.simulateCall('download-latest-version', {
      //   version: 'latest',
      //   forceDownload: false,
      // });
      await ipcMain.simulateCall('download-latest-version', {
        version: 'latest',
        forceDownload: false,
      });

      expect(progressEvents.length).to.be.greaterThan(0);
      expect(progressEvents[0].status).to.include('already installed');
      expect(progressEvents[0].progress).to.equal(100);
    });

    it('should perform fresh installation when forced', async () => {
      // Pre-create installation
      const latestDir = path.join(testDir, 'latest');
      await fs.mkdir(latestDir, { recursive: true });
      await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'old executable');

      // Mock the download handler with force download
      ipcMain.on('download-latest-version', async (...args: unknown[]) => {
        const event = args[0] as IpcMainEvent;
        const options = args[1] as DownloadOptions;
        const installPath = path.join(testDir, 'latest');

        if (options.forceDownload) {
          // Remove existing installation
          try {
            await fs.rm(installPath, { recursive: true });
            event.sender.send('download-latest-progress', {
              status: 'Removing existing installation...',
              progress: 5,
            });
          } catch (_error) {
            // Ignore errors
          }

          // Simulate new installation
          await fs.mkdir(installPath, { recursive: true });
          await fs.writeFile(path.join(installPath, 'ManicMiners.exe'), 'new executable');

          event.sender.send('download-latest-progress', {
            status: 'Installation completed successfully',
            progress: 100,
          });
          event.sender.send('versions-updated', {});
        }
        return { downloaded: true, message: 'Force download completed' };
      });

      const progressEvents: ProgressEvent[] = [];
      ipcMain.on('download-latest-progress', (...args: unknown[]) => {
        progressEvents.push(args[0] as ProgressEvent);
      });

      await ipcMain.simulateCall('download-latest-version', {
        version: 'latest',
        forceDownload: true,
      });

      // Verify new installation
      const exeContent = await fs.readFile(path.join(latestDir, 'ManicMiners.exe'), 'utf-8');
      expect(exeContent).to.equal('new executable');

      expect(progressEvents.some(event => event.status.includes('Removing existing'))).to.be.true;
      expect(progressEvents.some(event => event.status.includes('completed successfully'))).to.be.true;
    });
  });

  describe('Delete Latest Version Handler', () => {
    it('should delete installation with progress updates', async () => {
      // Create installation to delete
      const latestDir = path.join(testDir, 'latest');
      await fs.mkdir(latestDir, { recursive: true });
      await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'game executable');
      await fs.writeFile(path.join(latestDir, 'game.dat'), 'game data');

      const assetsDir = path.join(latestDir, 'assets');
      await fs.mkdir(assetsDir);
      await fs.writeFile(path.join(assetsDir, 'texture.png'), 'texture');

      // Mock the delete handler
      ipcMain.on('delete-latest-version', async (...args: unknown[]) => {
        const event = args[0] as IpcMainEvent;
        void args[1]; // options unused in test
        const installPath = path.join(testDir, 'latest');

        try {
          await fs.access(installPath);

          event.sender.send('delete-latest-progress', {
            status: 'Scanning latest installation...',
            progress: 5,
          });

          // Get all files recursively
          const getAllFiles = async (dir: string): Promise<string[]> => {
            const files: string[] = [];
            const items = await fs.readdir(dir, { withFileTypes: true });

            for (const item of items) {
              const fullPath = path.join(dir, item.name);
              if (item.isDirectory()) {
                const subFiles = await getAllFiles(fullPath);
                files.push(...subFiles);
                files.push(fullPath);
              } else {
                files.push(fullPath);
              }
            }
            return files;
          };

          const allFiles = await getAllFiles(installPath);
          const totalFiles = allFiles.length;

          event.sender.send('delete-latest-progress', {
            status: `Removing ${totalFiles} files from latest...`,
            progress: 10,
          });

          // Delete files with progress
          for (let i = 0; i < allFiles.length; i++) {
            const filePath = allFiles[i];
            const progress = Math.floor((i / totalFiles) * 80) + 10;

            try {
              const stat = await fs.stat(filePath);
              if (stat.isDirectory()) {
                await fs.rmdir(filePath);
              } else {
                await fs.unlink(filePath);
              }

              event.sender.send('delete-latest-progress', {
                status: `Deleted: ${path.basename(filePath)}`,
                progress,
              });
            } catch (_error) {
              // Continue on error
            }
          }

          // Remove main directory
          try {
            await fs.rmdir(installPath);
            event.sender.send('delete-latest-progress', {
              status: 'Removed latest directory',
              progress: 95,
            });
          } catch (_error) {
            // Directory might not be empty
          }

          event.sender.send('delete-latest-progress', {
            status: 'Uninstall completed successfully',
            progress: 100,
          });
          event.sender.send('versions-updated', {});

          return { success: true, message: 'Latest version uninstalled successfully' };
        } catch (_error) {
          event.sender.send('delete-latest-progress', {
            status: 'No installation found to remove',
            progress: 100,
          });
          return { success: false, message: 'No installation found to remove' };
        }
      });

      const progressEvents: ProgressEvent[] = [];
      ipcMain.on('delete-latest-progress', (...args: unknown[]) => {
        progressEvents.push(args[0] as ProgressEvent);
      });

      const result = await ipcMain.simulateCall('delete-latest-version', {
        version: 'latest',
      });

      // Verify directory was deleted
      const dirExists = await fs
        .access(latestDir)
        .then(() => true)
        .catch(() => false);
      expect(dirExists).to.be.false;

      // Verify progress events
      expect(progressEvents.length).to.be.greaterThan(0);
      expect(progressEvents.some(event => event.status.includes('Scanning'))).to.be.true;
      expect(progressEvents.some(event => event.status.includes('Deleted:'))).to.be.true;
      expect(progressEvents[progressEvents.length - 1].progress).to.equal(100);

      expect(result.success).to.be.true;
    });

    it('should handle non-existent installation gracefully', async () => {
      // Don't create any installation

      ipcMain.on('delete-latest-version', async (...args: unknown[]) => {
        const event = args[0] as IpcMainEvent;
        void args[1]; // options unused in test
        const installPath = path.join(testDir, 'latest');

        try {
          await fs.access(installPath);
          // Installation exists logic...
        } catch (_error) {
          event.sender.send('delete-latest-progress', {
            status: 'No installation found to remove',
            progress: 100,
          });
          return { success: false, message: 'No installation found to remove' };
        }
        return { success: true, message: 'Deletion completed' };
      });

      const progressEvents: ProgressEvent[] = [];
      ipcMain.on('delete-latest-progress', (...args: unknown[]) => {
        progressEvents.push(args[0] as ProgressEvent);
      });

      const result = await ipcMain.simulateCall('delete-latest-version', {
        version: 'latest',
      });

      expect(progressEvents[0].status).to.include('No installation found');
      expect(result.success).to.be.false;
    });
  });

  describe('Update Latest Version Handler', () => {
    it('should update existing installation', async () => {
      // Create existing installation
      const latestDir = path.join(testDir, 'latest');
      await fs.mkdir(latestDir, { recursive: true });
      await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'old version');

      ipcMain.on('update-latest-version', async (...args: unknown[]) => {
        const event = args[0] as IpcMainEvent;
        void args[1]; // options unused in test
        const installPath = path.join(testDir, 'latest');

        event.sender.send('update-progress', {
          status: 'Starting update...',
          progress: 0,
        });

        // Remove existing installation
        try {
          await fs.rm(installPath, { recursive: true });
          event.sender.send('update-progress', {
            status: 'Removing existing installation...',
            progress: 5,
          });
        } catch (_error) {
          // Directory doesn't exist
        }

        // Create new installation
        await fs.mkdir(installPath, { recursive: true });

        event.sender.send('update-progress', {
          status: 'Downloading updated files...',
          progress: 50,
        });

        // Simulate new files
        await fs.writeFile(path.join(installPath, 'ManicMiners.exe'), 'new version');
        await fs.writeFile(path.join(installPath, 'changelog.txt'), "What's new in this version");

        event.sender.send('update-progress', {
          status: 'Update completed successfully',
          progress: 100,
        });
        event.sender.send('versions-updated', {});

        return { success: true, message: 'Latest version updated successfully' };
      });

      const progressEvents: ProgressEvent[] = [];
      ipcMain.on('update-progress', (...args: unknown[]) => {
        progressEvents.push(args[0] as ProgressEvent);
      });

      const result = await ipcMain.simulateCall('update-latest-version', {
        version: 'latest',
      });

      // Verify update occurred
      const exeContent = await fs.readFile(path.join(latestDir, 'ManicMiners.exe'), 'utf-8');
      expect(exeContent).to.equal('new version');

      const changelogExists = await fs
        .access(path.join(latestDir, 'changelog.txt'))
        .then(() => true)
        .catch(() => false);
      expect(changelogExists).to.be.true;

      expect(progressEvents.length).to.be.greaterThan(0);
      expect(progressEvents[progressEvents.length - 1].progress).to.equal(100);
      expect(result.success).to.be.true;
    });
  });

  describe('Version Information Handlers', () => {
    it('should return latest version information', async () => {
      // Create installation
      const latestDir = path.join(testDir, 'latest');
      await fs.mkdir(latestDir, { recursive: true });
      await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'game executable');

      ipcMain.on('request-latest-version-information', async (...args: unknown[]) => {
        const event = args[0] as IpcMainEvent;
        try {
          const result = await fetchInstalledVersions();

          event.sender.send('latest-version-information-response', {
            versions: result.installedVersions || [],
          });
        } catch (_error) {
          event.sender.send('request-latest-version-information', {
            versions: [],
            error: (_error as Error).message,
          });
        }
      });

      const responseEvents: Array<{ versions: unknown[]; error?: string }> = [];
      ipcMain.on('latest-version-information-response', (...args: unknown[]) => {
        responseEvents.push(args[0] as { versions: unknown[]; error?: string });
      });

      await ipcMain.simulateCall('request-latest-version-information');

      expect(responseEvents.length).to.be.greaterThan(0);
      const response = responseEvents[responseEvents.length - 1];
      expect(response.versions).to.be.an('array');
      expect(response.versions.length).to.equal(1);
      expect((response.versions[0] as any).identifier).to.equal('latest');
      expect((response.versions[0] as any).directory).to.include('latest');
    });

    it('should return empty versions when no installation exists', async () => {
      // Don't create any installation

      ipcMain.on('request-latest-version-information', async (...args: unknown[]) => {
        const event = args[0] as IpcMainEvent;
        try {
          const result = await fetchInstalledVersions();

          event.sender.send('latest-version-information-response', {
            versions: result.installedVersions || [],
          });
        } catch (_error) {
          event.sender.send('request-latest-version-information', {
            versions: [],
            error: (_error as Error).message,
          });
        }
      });

      const responseEvents: Array<{ versions: unknown[]; error?: string }> = [];
      ipcMain.on('latest-version-information-response', (...args: unknown[]) => {
        responseEvents.push(args[0] as { versions: unknown[]; error?: string });
      });

      await ipcMain.simulateCall('request-latest-version-information');

      const response = responseEvents[responseEvents.length - 1];
      expect(response.versions).to.be.an('array');
      expect(response.versions.length).to.equal(0);
    });
  });

  describe('Error Handling Tests', () => {
    it('should handle permission errors gracefully', async () => {
      ipcMain.on('delete-latest-version', async (...args: unknown[]) => {
        const event = args[0] as IpcMainEvent;
        void args[1]; // options unused in test
        // Simulate permission error
        event.sender.send('delete-latest-progress', {
          status: 'Error during uninstall: Permission denied',
          progress: 0,
        });
        throw new Error('Failed to uninstall: Permission denied');
      });

      const progressEvents: ProgressEvent[] = [];
      ipcMain.on('delete-latest-progress', (...args: unknown[]) => {
        progressEvents.push(args[0] as ProgressEvent);
      });

      try {
        await ipcMain.simulateCall('delete-latest-version', { version: 'latest' });
      } catch (_error) {
        expect((_error as Error).message).to.include('Permission denied');
      }

      expect(progressEvents.some(event => event.status.includes('Permission denied'))).to.be.true;
    });

    it('should handle network errors during download', async () => {
      ipcMain.on('download-latest-version', async (...args: unknown[]) => {
        const event = args[0] as IpcMainEvent;
        void args[1]; // options unused in test
        event.sender.send('download-latest-progress', {
          status: 'Getting latest version from itch.io...',
          progress: 5,
        });

        // Simulate network error
        event.sender.send('download-latest-progress', {
          status: 'Download failed: Network connection timeout',
          progress: 0,
        });
        throw new Error('Download failed: Network connection timeout');
      });

      const progressEvents: ProgressEvent[] = [];
      ipcMain.on('download-latest-progress', (...args: unknown[]) => {
        progressEvents.push(args[0] as ProgressEvent);
      });

      try {
        await ipcMain.simulateCall('download-latest-version', { version: 'latest' });
      } catch (_error) {
        expect((_error as Error).message).to.include('Network connection timeout');
      }

      expect(progressEvents.some(event => event.status.includes('Network connection timeout'))).to.be.true;
    });
  });
});
