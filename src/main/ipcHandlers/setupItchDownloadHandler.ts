import { ipcMain } from 'electron';
import { downloadLatestVersion } from '../../functions/downloadLatestVersion';
import { getDirectories } from '../../functions/fetchDirectories';
import { withIpcHandler } from './withIpcHandler';
import { IPC_CHANNELS } from './ipcChannels';
import path from 'path';
import fs from 'fs/promises';
import StreamZip from 'node-stream-zip';
import { logger } from '../../utils/logger';

export const setupItchDownloadHandler = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    ipcMain.on(
      'download-latest-version',
      withIpcHandler('download-latest-version', async (event, { version, forceDownload = false }) => {
        logger.downloadLog('Starting latest version download', { version, forceDownload });
        
        const { directories } = await getDirectories();
        const installDir = directories.launcherInstallPath;
        const identifier = 'latest'; // Use 'latest' as the directory name
        const installPath = path.join(installDir, identifier);
        
        logger.downloadLog('Download paths determined', { 
          installDir, 
          identifier, 
          installPath 
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
        
        logger.downloadLog('Installation check complete', { 
          exists, 
          forceDownload,
          installPath 
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
            message: downloadResult.message
          });

          event.sender.send('download-latest-progress', {
            status: 'Preparing to extract game files...',
            progress: 96,
          });

          // Extract the ZIP file (simplified approach)
          const zip = new StreamZip.async({ file: zipFilePath });
          
          logger.downloadLog('Starting extraction', { 
            zipFilePath,
            installPath 
          });
          
          event.sender.send('download-latest-progress', {
            status: 'Extracting game files...',
            progress: 96,
          });

          // Extract all files at once (much faster)
          await zip.extract(null, installPath);
          await zip.close();
          
          logger.downloadLog('Extraction completed successfully', { installPath });

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
          logger.downloadLog('Post-extraction directory contents', { 
            installPath,
            contents 
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
            identifier: 'latest'
          });

          return { downloaded: true, message: 'Latest version downloaded and installed successfully from itch.io' };
        } catch (downloadError) {
          logger.error('DOWNLOAD', 'Itch.io download error', { 
            installPath,
            error: downloadError.message
          }, downloadError);

          // Clean up failed download directory
          try {
            await fs.rm(installPath, { recursive: true });
            logger.downloadLog('Cleaned up failed download directory', { installPath });
          } catch (cleanupError) {
            logger.error('DOWNLOAD', 'Failed to clean up download directory', { 
              installPath,
              error: cleanupError.message
            }, cleanupError);
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

        const deleteDirectoryWithProgress = async (dirPath: string, dirName: string) => {
          try {
            await fs.access(dirPath);
            console.log(`Starting deletion of ${dirName} directory:`, dirPath);
            
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
            
            console.log(`Found ${totalFiles} items to delete in ${dirName}`);
            
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
              } catch (error) {
                console.log(`Could not delete ${filePath}:`, error.message);
              }
            }

            // Remove the main directory
            try {
              await fs.rmdir(dirPath);
              event.sender.send('delete-latest-progress', {
                status: `Removed ${dirName} directory`,
                progress: 95,
              });
              console.log(`Removed ${dirName} directory:`, dirPath);
              return true;
            } catch (error) {
              console.log(`Could not remove ${dirName} directory:`, error.message);
              return false;
            }
          } catch (error) {
            console.log(`${dirName} directory not found or already removed`);
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
        } catch (error) {
          console.error('Error deleting latest version:', error);
          event.sender.send('delete-latest-progress', {
            status: `Error during uninstall: ${error.message}`,
            progress: 0,
          });
          throw new Error(`Failed to uninstall: ${error.message}`);
        }
      })
    );

    // Add update latest version handler
    ipcMain.on(
      IPC_CHANNELS.UPDATE_LATEST_VERSION,
      withIpcHandler('update-latest-version', async (event, { version }) => {
        try {
          event.sender.send(IPC_CHANNELS.UPDATE_PROGRESS, {
            status: 'Starting update...',
            progress: 0,
          });

          // For latest version updates, we remove existing installation and re-download
          const { directories } = await getDirectories();
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
        } catch (error) {
          console.error('Error updating latest version:', error);
          event.sender.send(IPC_CHANNELS.UPDATE_ERROR, {
            message: `Update download failed: ${error.message}`,
          });
          throw new Error(`Update failed: ${error.message}`);
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
