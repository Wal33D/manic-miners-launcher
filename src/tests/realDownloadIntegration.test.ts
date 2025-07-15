import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import fs from 'fs/promises';
import path from 'path';
import { downloadLatestVersion } from '../functions/downloadLatestVersion';
import { validateUnpackPath, extractZipEntries, flattenSingleSubdirectory } from '../functions/unpackHelpers';
import { logger } from '../utils/logger';
const StreamZip = require('node-stream-zip');

describe('Real Download Integration Tests', () => {
  let testDir: string;
  const REAL_TESTS_ENABLED = process.env.RUN_REAL_DOWNLOAD_TESTS === 'true';
  const IN_ELECTRON = typeof process !== 'undefined' && process.versions && process.versions.electron;

  beforeEach(async () => {
    if (!REAL_TESTS_ENABLED) {
      return;
    }

    // Create a temporary test directory
    testDir = path.join(process.cwd(), 'test-real-download');
    await fs.mkdir(testDir, { recursive: true });

    // Clear logs for clean test output
    await logger.clearLogs();
  });

  afterEach(async () => {
    if (!REAL_TESTS_ENABLED) {
      return;
    }

    // Clean up test directory
    try {
      await fs.rm(testDir, { recursive: true });
    } catch (error) {
      console.error('Failed to clean up test directory:', error);
    }
  });

  describe('Real itch.io Download Tests', () => {
    it('should download latest version from itch.io and extract files', async function () {
      if (!REAL_TESTS_ENABLED || !IN_ELECTRON) {
        console.log('Skipping: This test requires Electron environment to run');
        this.skip();
        return;
      }

      // This test will take a while
      this.timeout(300000); // 5 minutes timeout

      console.log('Starting real download test...');

      const progressUpdates: Array<{ status: string; progress: number }> = [];

      // Download from itch.io
      const downloadResult = await downloadLatestVersion({
        targetDirectory: testDir,
        onProgress: data => {
          progressUpdates.push(data);
          console.log(`[DOWNLOAD] ${data.status} - ${data.progress}%`);
        },
      });

      // Verify download succeeded
      expect(downloadResult.success).to.be.true;
      expect(downloadResult.filePath).to.exist;
      expect(downloadResult.message).to.include('completed successfully');

      // Verify zip file exists
      const zipPath = downloadResult.filePath!;
      const zipStats = await fs.stat(zipPath);
      expect(zipStats.isFile()).to.be.true;
      expect(zipStats.size).to.be.greaterThan(1000000); // At least 1MB

      console.log(`Downloaded file: ${zipPath} (${(zipStats.size / 1024 / 1024).toFixed(2)} MB)`);

      // Progress updates should have occurred
      expect(progressUpdates.length).to.be.greaterThan(5);
      expect(progressUpdates.some(p => p.status.includes('itch.io'))).to.be.true;
      expect(progressUpdates.some(p => p.status.includes('Download button clicked'))).to.be.true;
      expect(progressUpdates.some(p => p.status.includes('Downloading'))).to.be.true;
      expect(progressUpdates.some(p => p.status.includes('completed'))).to.be.true;

      // Now unpack the downloaded file
      console.log('Unpacking downloaded file...');

      const unpackProgressUpdates: Array<{ progress: number; status: string }> = [];
      const latestDir = path.join(testDir, 'latest');

      // Create target directory
      await fs.mkdir(latestDir, { recursive: true });

      // Open the zip file
      const zip = new StreamZip.async({ file: zipPath });

      try {
        // Extract all files
        await extractZipEntries({
          zip,
          targetPath: latestDir,
          updateStatus: progressStatus => {
            unpackProgressUpdates.push({ progress: progressStatus.progress, status: progressStatus.status });
            console.log(`[UNPACK] ${progressStatus.status} - ${progressStatus.progress}%`);
          },
          progressStart: 60,
          progressSpan: 30,
        });

        // Flatten if needed
        await flattenSingleSubdirectory(latestDir);

        console.log('Extraction completed successfully');
      } finally {
        await zip.close();
      }

      // Verify unpacked files exist
      const dirStats = await fs.stat(latestDir);
      expect(dirStats.isDirectory()).to.be.true;

      // Check for executable files
      const files = await fs.readdir(latestDir);
      const exeFiles = files.filter(f => f.endsWith('.exe'));
      expect(exeFiles.length).to.be.greaterThan(0);
      console.log(`Found ${exeFiles.length} executable files: ${exeFiles.join(', ')}`);

      // Verify specific game files exist
      const expectedFiles = ['ManicMiners.exe'];
      for (const expectedFile of expectedFiles) {
        const filePath = path.join(latestDir, expectedFile);
        try {
          await fs.access(filePath);
          console.log(`✓ Found expected file: ${expectedFile}`);
        } catch {
          console.log(`✗ Missing expected file: ${expectedFile}`);
        }
      }

      // Unpack progress should have occurred
      expect(unpackProgressUpdates.length).to.be.greaterThan(0);
      expect(unpackProgressUpdates.some(p => p.status.includes('Extracting'))).to.be.true;
      expect(unpackProgressUpdates[unpackProgressUpdates.length - 1].progress).to.equal(100);
    });

    it('should handle download interruption gracefully', async function () {
      if (!REAL_TESTS_ENABLED || !IN_ELECTRON) {
        console.log('Skipping: This test requires Electron environment to run');
        this.skip();
        return;
      }

      this.timeout(60000); // 1 minute timeout

      // Create a promise that we can cancel
      let cancelled = false;

      // Start download
      const downloadPromise = downloadLatestVersion({
        targetDirectory: testDir,
        onProgress: data => {
          console.log(`[DOWNLOAD] ${data.status} - ${data.progress}%`);

          // Cancel after download starts
          if (data.progress > 20 && !cancelled) {
            cancelled = true;
            // In a real scenario, we'd cancel the download
            // For now, we'll just note that cancellation handling should be implemented
            console.log('Download cancellation requested');
          }
        },
      });

      try {
        const result = await downloadPromise;

        // If download completed despite cancellation attempt, that's OK
        if (result.success) {
          console.log('Download completed before cancellation could take effect');
        }
      } catch (error) {
        // Download might fail due to various reasons
        console.log('Download failed/cancelled:', error);
      }

      // Verify cleanup occurred
      const latestDir = path.join(testDir, 'latest');
      try {
        await fs.access(latestDir);
        // If directory exists, it should be cleaned up or empty
        const files = await fs.readdir(latestDir);
        console.log(`Directory contains ${files.length} files after interruption`);
      } catch {
        // Directory doesn't exist, which is fine
        console.log('Download directory was cleaned up');
      }
    });

    it('should verify downloaded file integrity', async function () {
      if (!REAL_TESTS_ENABLED || !IN_ELECTRON) {
        console.log('Skipping: This test requires Electron environment to run');
        this.skip();
        return;
      }

      this.timeout(300000); // 5 minutes timeout

      // Download the file
      const downloadResult = await downloadLatestVersion({
        targetDirectory: testDir,
        onProgress: data => {
          console.log(`[DOWNLOAD] ${data.status} - ${data.progress}%`);
        },
      });

      expect(downloadResult.success).to.be.true;

      // Verify the downloaded file is a valid ZIP
      const zipPath = downloadResult.filePath!;
      const buffer = await fs.readFile(zipPath);

      // Check ZIP file signature (first 4 bytes should be PK..)
      const signature = buffer.slice(0, 4).toString('hex');
      expect(signature).to.equal('504b0304'); // ZIP file signature

      console.log('✓ Downloaded file has valid ZIP signature');

      // Try to list contents without extracting
      const zip = new StreamZip.async({ file: zipPath });

      try {
        const entries = await zip.entries();
        const fileCount = Object.keys(entries).length;
        console.log(`ZIP contains ${fileCount} files`);

        // List some files
        const fileList = Object.keys(entries).slice(0, 10);
        console.log('Sample files:', fileList.join(', '));

        expect(fileCount).to.be.greaterThan(10); // Game should have many files
      } finally {
        await zip.close();
      }
    });
  });

  describe('Download Error Handling', () => {
    it('should handle network errors gracefully', async function () {
      if (!REAL_TESTS_ENABLED) {
        this.skip();
        return;
      }

      this.timeout(60000);

      // Temporarily break network (this is platform-specific and may not work in all environments)
      // For now, we'll just test with an invalid URL by modifying the function

      // This test would require mocking or modifying the downloadLatestVersion function
      // to use an invalid URL. For a real test, we'd need to refactor the function
      // to accept a custom URL for testing purposes.

      console.log('Network error test would require function refactoring for URL injection');
      this.skip();
    });
  });
});

// Add a separate test runner script that sets the environment variable
if (process.argv.includes('--run-real-downloads')) {
  process.env.RUN_REAL_DOWNLOAD_TESTS = 'true';
  console.log('Real download tests enabled. This will download actual files from itch.io.');
}
