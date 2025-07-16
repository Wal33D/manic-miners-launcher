import { ipcMain } from 'electron';
import { downloadLatestVersion } from '../../functions/downloadLatestVersion';
import { getDirectories } from '../../functions/fetchDirectories';
import { withIpcHandler } from './withIpcHandler';
import { IPC_CHANNELS } from './ipcChannels';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as StreamZip from 'node-stream-zip';
import { logger } from '../../utils/logger';

export const setupItchDownloadHandler = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    ipcMain.on(
      IPC_CHANNELS.DOWNLOAD_LATEST_VERSION,
      withIpcHandler(IPC_CHANNELS.DOWNLOAD_LATEST_VERSION, async (event, { version, forceDownload = false }) => {
        logger.downloadLog('Starting latest version download', { version, forceDownload });

        const directoriesResult = await getDirectories();
        if (!directoriesResult.status || !directoriesResult.directories) {
          throw new Error(`Failed to get directories: ${directoriesResult.message}`);
        }
        const { directories } = directoriesResult;
        const installDir = directories.launcherInstallPath;
        const identifier = 'latest'; // Use 'latest' as the directory name
        const installPath = path.join(installDir, identifier);

        logger.downloadLog('Download paths determined', {
          installDir,
          identifier,
          installPath,
        });

        // Check for existing installations with old naming scheme and migrate them
        const oldIdentifier = `ManicMiners-Baraklava-V${version}`;
        const oldInstallPath = path.join(installDir, oldIdentifier);

        try {
          const oldExists = await fs
            .access(oldInstallPath)
            .then(() => true)
            .catch(() => false);
          if (oldExists) {
            logger.info('INSTALL', `Migrating existing installation from ${oldIdentifier} to latest`);
            // Remove new directory if it exists
            try {
              await fs.rm(installPath, { recursive: true });
            } catch {
              // Ignore errors when removing directory
            }
            // Move old directory to new location
            await fs.rename(oldInstallPath, installPath);
            logger.info('INSTALL', 'Migration completed successfully');
          }
        } catch (error: unknown) {
          const err = error as Error;
          logger.warn('INSTALL', 'Migration failed or not needed', { error: err.message });
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

        logger.downloadLog('Installation check complete', {
          exists,
          forceDownload,
          installPath,
        });

        if (exists && !forceDownload) {
          logger.downloadLog('Version already installed, skipping download');
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
          } catch (error: unknown) {
            const err = error as Error;
            logger.warn('INSTALL', 'Could not remove existing directory', { error: err.message });
          }
        }

        event.sender.send('download-latest-progress', {
          status: 'Getting latest version from itch.io...',
          progress: 5,
        });

        try {
          // Create install directory
          await fs.mkdir(installPath, { recursive: true });
          logger.downloadLog('Created install directory', { installPath });

          // Download from itch.io using new simple implementation
          const downloadResult = await downloadLatestVersion({
            targetDirectory: installPath,
            onProgress: progressData => {
              logger.downloadLog('Download progress', progressData);
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
          logger.downloadLog('Download completed', {
            zipFilePath,
            success: downloadResult.success,
            message: downloadResult.message,
          });

          event.sender.send('download-latest-progress', {
            status: 'Preparing to extract game files...',
            progress: 72,
          });

          // Extract the ZIP file (simplified approach)
          const zip = new StreamZip.async({ file: zipFilePath });

          logger.downloadLog('Starting extraction', {
            zipFilePath,
            installPath,
          });

          event.sender.send('download-latest-progress', {
            status: 'Extracting game files...',
            progress: 75,
          });

          // Get total number of entries for progress estimation
          const entries = await zip.entries();
          const totalEntries = Object.keys(entries).length;
          logger.downloadLog(`Starting extraction of ${totalEntries} files`);

          // Update progress periodically during extraction
          event.sender.send('download-latest-progress', {
            status: `Extracting ${totalEntries} files...`,
            progress: 80,
          });

          // Extract all files at once (much faster)
          await zip.extract(null, installPath);

          event.sender.send('download-latest-progress', {
            status: 'Extraction complete, closing archive...',
            progress: 95,
          });

          await zip.close();

          logger.downloadLog('Extraction completed successfully', { installPath });

          event.sender.send('download-latest-progress', {
            status: 'Cleaning up download files...',
            progress: 96,
          });

          // Clean up ZIP file after extraction to save disk space
          try {
            await fs.unlink(zipFilePath);
            logger.downloadLog('Removed ZIP file to save disk space', { zipFilePath });
            event.sender.send('download-latest-progress', {
              status: 'Finalizing installation...',
              progress: 98,
            });
          } catch (error: unknown) {
            const err = error as Error;
            logger.warn('INSTALL', 'Could not remove ZIP file', { error: err.message });
          }

          // Check if extraction created a subdirectory and flatten if needed
          const contents = await fs.readdir(installPath);
          logger.downloadLog('Post-extraction directory contents', {
            installPath,
            contents,
          });

          if (contents.length === 1) {
            const subDir = path.join(installPath, contents[0]);
            const stat = await fs.stat(subDir);
            if (stat.isDirectory()) {
              logger.downloadLog('Flattening single subdirectory', { subDir });
              const subContents = await fs.readdir(subDir);
              for (const item of subContents) {
                await fs.rename(path.join(subDir, item), path.join(installPath, item));
              }
              await fs.rm(subDir, { recursive: true });
              logger.downloadLog('Directory flattening completed');
            }
          }

          event.sender.send('download-latest-progress', {
            status: 'Installation completed successfully',
            progress: 100,
          });

          // Notify that versions have been updated
          event.sender.send('versions-updated');

          logger.downloadLog('Download and installation completed successfully', {
            installPath,
            identifier: 'latest',
          });

          return { downloaded: true, message: 'Latest version downloaded and installed successfully from itch.io' };
        } catch (downloadError: unknown) {
          const err = downloadError as Error;
          logger.error(
            'DOWNLOAD',
            'Itch.io download error',
            {
              installPath,
              error: err.message,
            },
            err
          );

          // Clean up failed download directory
          try {
            await fs.rm(installPath, { recursive: true });
            logger.downloadLog('Cleaned up failed download directory', { installPath });
          } catch (cleanupError: unknown) {
            const cleanupErr = cleanupError as Error;
            logger.error(
              'DOWNLOAD',
              'Failed to clean up download directory',
              {
                installPath,
                error: cleanupErr.message,
              },
              cleanupErr
            );
          }

          event.sender.send('download-latest-progress', {
            status: `Download failed: ${err.message}`,
            progress: 0,
          });

          throw err;
        }
      })
    );

    // Add delete latest version handler
    ipcMain.on(
      IPC_CHANNELS.DELETE_LATEST_VERSION,
      withIpcHandler('delete-latest-version', async (event, { version }) => {
        const directoriesResult = await getDirectories();
        if (!directoriesResult.status || !directoriesResult.directories) {
          throw new Error(`Failed to get directories: ${directoriesResult.message}`);
        }
        const { directories } = directoriesResult;
        const installDir = directories.launcherInstallPath;
        const identifier = 'latest'; // Use 'latest' as the directory name
        const installPath = path.join(installDir, identifier);

        // Also check for old naming scheme
        const oldIdentifier = `ManicMiners-Baraklava-V${version}`;
        const oldInstallPath = path.join(installDir, oldIdentifier);

        const deleteDirectoryWithProgress = async (dirPath: string, dirName: string) => {
          try {
            await fs.access(dirPath);
            logger.info('UNINSTALL', `Starting deletion of ${dirName} directory`, { dirPath });

            event.sender.send('delete-latest-progress', {
              status: `Scanning ${dirName} installation...`,
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
                  files.push(fullPath); // Add directory after its contents
                } else {
                  files.push(fullPath);
                }
              }
              return files;
            };

            const allFiles = await getAllFiles(dirPath);
            const totalFiles = allFiles.length;

            logger.info('UNINSTALL', `Found ${totalFiles} items to delete in ${dirName}`);

            event.sender.send('delete-latest-progress', {
              status: `Removing ${totalFiles} files from ${dirName}...`,
              progress: 10,
            });

            // Delete files one by one with progress updates
            for (let i = 0; i < allFiles.length; i++) {
              const filePath = allFiles[i];
              const progress = Math.floor((i / totalFiles) * 80) + 10; // 10-90% range

              try {
                const stat = await fs.stat(filePath);
                if (stat.isDirectory()) {
                  await fs.rmdir(filePath);
                  event.sender.send('delete-latest-progress', {
                    status: `Removed directory: ${path.basename(filePath)}`,
                    progress,
                  });
                } else {
                  await fs.unlink(filePath);
                  event.sender.send('delete-latest-progress', {
                    status: `Deleted: ${path.basename(filePath)}`,
                    progress,
                  });
                }

                // Small delay to make progress visible
                await new Promise(resolve => setTimeout(resolve, 50));
              } catch (error: unknown) {
                const err = error as Error;
                logger.warn('UNINSTALL', `Could not delete ${filePath}`, { error: err.message });
              }
            }

            // Remove the main directory
            try {
              await fs.rmdir(dirPath);
              event.sender.send('delete-latest-progress', {
                status: `Removed ${dirName} directory`,
                progress: 95,
              });
              logger.info('UNINSTALL', `Removed ${dirName} directory`, { dirPath });
              return true;
            } catch (error: unknown) {
              const err = error as Error;
              logger.warn('UNINSTALL', `Could not remove ${dirName} directory`, { error: err.message });
              return false;
            }
          } catch (error: unknown) {
            const err = error as Error;
            logger.info('UNINSTALL', `${dirName} directory not found or already removed`, { error: err.message });
            return false;
          }
        };

        try {
          let deletedAny = false;

          // Try to remove the latest directory first
          const latestDeleted = await deleteDirectoryWithProgress(installPath, 'latest');
          if (latestDeleted) deletedAny = true;

          // Also try to remove the old naming scheme directory
          const oldDeleted = await deleteDirectoryWithProgress(oldInstallPath, 'legacy');
          if (oldDeleted) deletedAny = true;

          if (deletedAny) {
            event.sender.send('delete-latest-progress', {
              status: 'Uninstall completed successfully',
              progress: 100,
            });

            // Notify that versions have been updated
            event.sender.send(IPC_CHANNELS.VERSIONS_UPDATED);

            return { success: true, message: 'Latest version uninstalled successfully' };
          } else {
            event.sender.send('delete-latest-progress', {
              status: 'No installation found to remove',
              progress: 100,
            });
            return { success: false, message: 'No installation found to remove' };
          }
        } catch (error: unknown) {
          const err = error as Error;
          logger.error('UNINSTALL', 'Error deleting latest version', { error: err.message }, err);
          event.sender.send('delete-latest-progress', {
            status: `Error during uninstall: ${err.message}`,
            progress: 0,
          });
          throw new Error(`Failed to uninstall: ${err.message}`);
        }
      })
    );

    // Add update latest version handler
    ipcMain.on(
      IPC_CHANNELS.UPDATE_LATEST_VERSION,
      withIpcHandler('update-latest-version', async (event, { version: _version }) => {
        try {
          event.sender.send(IPC_CHANNELS.UPDATE_PROGRESS, {
            status: 'Starting update...',
            progress: 0,
          });

          // For latest version updates, we remove existing installation and re-download
          const directoriesResult = await getDirectories();
          if (!directoriesResult.status || !directoriesResult.directories) {
            throw new Error(`Failed to get directories: ${directoriesResult.message}`);
          }
          const { directories } = directoriesResult;
          const installDir = directories.launcherInstallPath;
          const identifier = 'latest';
          const installPath = path.join(installDir, identifier);

          // Remove existing installation if it exists
          try {
            await fs.rm(installPath, { recursive: true });
            event.sender.send(IPC_CHANNELS.UPDATE_PROGRESS, {
              status: 'Removing existing installation...',
              progress: 5,
            });
          } catch (error) {
            // Directory doesn't exist, that's fine
          }

          // Create install directory
          await fs.mkdir(installPath, { recursive: true });

          // Map download progress to update progress
          const progressHandler = (progressData: any) => {
            event.sender.send(IPC_CHANNELS.UPDATE_PROGRESS, {
              status: progressData.status,
              progress: progressData.progress,
            });
          };

          // Download from itch.io using the same implementation
          const downloadResult = await downloadLatestVersion({
            targetDirectory: installPath,
            onProgress: progressHandler,
          });

          if (!downloadResult.success) {
            throw new Error(`Download failed: ${downloadResult.message}`);
          }

          event.sender.send(IPC_CHANNELS.UPDATE_PROGRESS, {
            status: 'Update completed successfully',
            progress: 100,
          });

          // Notify that versions have been updated
          event.sender.send('versions-updated');

          return { success: true, message: 'Latest version updated successfully' };
        } catch (error: unknown) {
          const err = error as Error;
          logger.error('INSTALL', 'Error updating latest version', { error: err.message }, err);
          event.sender.send(IPC_CHANNELS.UPDATE_ERROR, {
            message: `Update download failed: ${err.message}`,
          });
          throw new Error(`Update failed: ${err.message}`);
        }
      })
    );

    status = true;
    message = 'Itch.io download handler setup successfully';
  } catch (error: unknown) {
    const err = error as Error;
    logger.error('IPC', 'Error setting up itch.io download handler', { error: err.message }, err);
    message = `Error setting up itch.io download handler: ${err.message}`;
  }

  return { status, message };
};
