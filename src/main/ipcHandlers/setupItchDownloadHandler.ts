import { ipcMain } from 'electron';
import { downloadLatestVersion } from '../../functions/downloadLatestVersion';
import { getDirectories } from '../../functions/fetchDirectories';
import { withIpcHandler } from './withIpcHandler';
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
        const identifier = `ManicMiners-Baraklava-V${version}`;
        const installPath = path.join(installDir, identifier);

        // Check if already installed
        const exists = await fs
          .access(installPath)
          .then(() => true)
          .catch(() => false);

        if (exists && !forceDownload) {
          event.sender.send('download-latest-progress', {
            status: 'Version already installed',
            progress: 100,
          });
          return { downloaded: true, message: 'Version already installed' };
        }

        if (exists && forceDownload) {
          event.sender.send('download-latest-progress', {
            status: 'Removing existing installation...',
            progress: 5,
          });
          // Remove existing installation for forced re-download
          try {
            await fs.rmdir(installPath, { recursive: true });
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
            progress: 92,
          });

          // Extract the ZIP file
          const zip = new StreamZip.async({ file: zipFilePath });
          await zip.extract(null, installPath);
          await zip.close();

          event.sender.send('download-latest-progress', {
            status: 'Cleaning up and finalizing...',
            progress: 90,
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
              await fs.rmdir(subDir);
            }
          }

          event.sender.send('download-latest-progress', {
            status: 'Installation completed successfully',
            progress: 100,
          });

          return { downloaded: true, message: 'Latest version downloaded and installed successfully from itch.io' };
        } catch (downloadError) {
          console.error('Itch.io download error:', downloadError);

          // Clean up failed download directory
          try {
            await fs.rmdir(installPath, { recursive: true });
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

    status = true;
    message = 'Itch.io download handler setup successfully';
  } catch (error) {
    console.error('Error setting up itch.io download handler:', error);
    message = `Error setting up itch.io download handler: ${error}`;
  }

  return { status, message };
};
