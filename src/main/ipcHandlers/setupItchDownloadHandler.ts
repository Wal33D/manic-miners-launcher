import { ipcMain } from 'electron';
import { downloadLatestVersion } from '../../functions/downloadLatestVersion';
import { getDirectories } from '../../functions/fetchDirectories';
import { withIpcHandler } from './withIpcHandler';
import { IPC_CHANNELS } from './ipcChannels';
import path from 'path';
import fs from 'fs/promises';
import StreamZip from 'node-stream-zip';

export const setupItchDownloadHandler = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    ipcMain.on(
      'download-latest-version',
      withIpcHandler('download-latest-version', async (event, { version, forceDownload = false }) => {
        const { directories } = await getDirectories();
        const installDir = directories.launcherInstallPath;
        const identifier = 'latest'; // Use 'latest' as the directory name
        const installPath = path.join(installDir, identifier);

        // Check for existing installations with old naming scheme and migrate them
        const oldIdentifier = `ManicMiners-Baraklava-V${version}`;
        const oldInstallPath = path.join(installDir, oldIdentifier);

        try {
          const oldExists = await fs
            .access(oldInstallPath)
            .then(() => true)
            .catch(() => false);
          if (oldExists) {
            console.log(`Migrating existing installation from ${oldIdentifier} to latest`);
            // Remove new directory if it exists
            try {
              await fs.rm(installPath, { recursive: true });
            } catch {
              // Ignore errors when removing directory
            }
            // Move old directory to new location
            await fs.rename(oldInstallPath, installPath);
            console.log('Migration completed successfully');
          }
        } catch (error) {
          console.log('Migration failed or not needed:', error.message);
        }

        // Check if already installed by looking for executable files
        const checkInstallation = async () => {
          try {
            await fs.access(installPath);
            const contents = await fs.readdir(installPath, { recursive: true });
            const hasExe = contents.some(file => file.endsWith('.exe'));
            return hasExe;
          } catch {
            return false;
          }
        };

        const exists = await checkInstallation();

        if (exists && !forceDownload) {
          event.sender.send('download-latest-progress', {
            status: 'Version already installed',
            progress: 100,
          });
          // Emit versions-updated to refresh GUI
          event.sender.send('versions-updated');
          return { downloaded: true, message: 'Version already installed' };
        }

        if (exists && forceDownload) {
          event.sender.send('download-latest-progress', {
            status: 'Removing existing installation...',
            progress: 5,
          });
          // Remove existing installation for forced re-download
          try {
            await fs.rm(installPath, { recursive: true });
          } catch (error) {
            console.log('Could not remove existing directory:', error.message);
          }
        }

        event.sender.send('download-latest-progress', {
          status: 'Getting latest version from itch.io...',
          progress: 5,
        });

        try {
          // Create install directory
          await fs.mkdir(installPath, { recursive: true });

          // Download from itch.io using new simple implementation
          const downloadResult = await downloadLatestVersion({
            targetDirectory: installPath,
            onProgress: progressData => {
              event.sender.send('download-latest-progress', progressData);
            },
          });

          if (!downloadResult.success) {
            throw new Error(`Download failed: ${downloadResult.message}`);
          }

          if (!downloadResult.filePath) {
            throw new Error('Download completed but file path not available');
          }

          const zipFilePath = downloadResult.filePath;
          console.log('Downloaded file at:', zipFilePath);

          event.sender.send('download-latest-progress', {
            status: 'Extracting game files...',
            progress: 96,
          });

          // Extract the ZIP file
          const zip = new StreamZip.async({ file: zipFilePath });
          await zip.extract(null, installPath);
          await zip.close();

          event.sender.send('download-latest-progress', {
            status: 'Cleaning up and finalizing...',
            progress: 98,
          });

          // Clean up ZIP file after extraction
          try {
            await fs.unlink(zipFilePath);
          } catch (error) {
            console.log('Could not remove ZIP file:', error.message);
          }

          // Check if extraction created a subdirectory and flatten if needed
          const contents = await fs.readdir(installPath);
          if (contents.length === 1) {
            const subDir = path.join(installPath, contents[0]);
            const stat = await fs.stat(subDir);
            if (stat.isDirectory()) {
              console.log('Flattening single subdirectory:', subDir);
              const subContents = await fs.readdir(subDir);
              for (const item of subContents) {
                await fs.rename(path.join(subDir, item), path.join(installPath, item));
              }
              await fs.rm(subDir, { recursive: true });
            }
          }

          event.sender.send('download-latest-progress', {
            status: 'Installation completed successfully',
            progress: 100,
          });

          // Notify that versions have been updated
          event.sender.send('versions-updated');

          return { downloaded: true, message: 'Latest version downloaded and installed successfully from itch.io' };
        } catch (downloadError) {
          console.error('Itch.io download error:', downloadError);

          // Clean up failed download directory
          try {
            await fs.rm(installPath, { recursive: true });
          } catch {
            // Ignore cleanup errors
          }

          event.sender.send('download-latest-progress', {
            status: `Download failed: ${downloadError.message}`,
            progress: 0,
          });

          throw downloadError;
        }
      })
    );

    // Add delete latest version handler
    ipcMain.on(
      IPC_CHANNELS.DELETE_LATEST_VERSION,
      withIpcHandler('delete-latest-version', async (event, { version }) => {
        const { directories } = await getDirectories();
        const installDir = directories.launcherInstallPath;
        const identifier = 'latest'; // Use 'latest' as the directory name
        const installPath = path.join(installDir, identifier);

        // Also check for old naming scheme
        const oldIdentifier = `ManicMiners-Baraklava-V${version}`;
        const oldInstallPath = path.join(installDir, oldIdentifier);

        try {
          // Try to remove the latest directory first
          try {
            await fs.access(installPath);
            await fs.rm(installPath, { recursive: true, force: true });
            console.log('Removed latest version directory:', installPath);
          } catch (error) {
            console.log('Latest directory not found or already removed');
          }

          // Also try to remove the old naming scheme directory
          try {
            await fs.access(oldInstallPath);
            await fs.rm(oldInstallPath, { recursive: true, force: true });
            console.log('Removed old version directory:', oldInstallPath);
          } catch (error) {
            console.log('Old directory not found or already removed');
          }

          // Notify that versions have been updated
          event.sender.send(IPC_CHANNELS.VERSIONS_UPDATED);

          return { success: true, message: 'Latest version uninstalled successfully' };
        } catch (error) {
          console.error('Error deleting latest version:', error);
          throw new Error(`Failed to uninstall: ${error.message}`);
        }
      })
    );

    status = true;
    message = 'Itch.io download handler setup successfully';
  } catch (error) {
    console.error('Error setting up itch.io download handler:', error);
    message = `Error setting up itch.io download handler: ${error}`;
  }

  return { status, message };
};
