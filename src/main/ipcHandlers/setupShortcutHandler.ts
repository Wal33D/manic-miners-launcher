import { ipcMain } from 'electron';
import { createDesktopShortcuts } from '../../functions/createDesktopShortcuts';
import { getDirectories } from '../../functions/fetchDirectories';
import { withIpcHandler } from './withIpcHandler';
import { IPC_CHANNELS } from './ipcChannels';
import path from 'path';
import fs from 'fs/promises';
import { logger } from '../../utils/logger';

export const setupShortcutHandler = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    ipcMain.on(
      IPC_CHANNELS.CREATE_SHORTCUTS,
      withIpcHandler('create-shortcuts', async (event, { installPath, options = {} }) => {
        try {
          const { directories } = await getDirectories();
          if (!directories) {
            throw new Error('Unable to get directories');
          }
          const launcherInstallPath = directories.launcherInstallPath;

          event.sender.send(IPC_CHANNELS.CREATE_SHORTCUTS_PROGRESS, {
            status: 'Starting shortcut creation...',
            progress: 0,
          });

          // If no specific install path provided, find the latest version
          let targetPath = installPath;
          if (!targetPath) {
            // Try to find the latest version in the install directory
            const latestDir = path.join(launcherInstallPath, 'latest');
            // const _legacyPattern = path.join(launcherInstallPath, 'ManicMiners-Baraklava-V*');

            try {
              await fs.access(latestDir);
              // Look for executable files in the latest directory
              const files = await fs.readdir(latestDir);
              logger.info('SHORTCUT', 'Files found in latest directory', { files, platform: process.platform });
              // const _executableExtensions =
              //   process.platform === 'win32' ? ['.exe'] : process.platform === 'darwin' ? ['.app', ''] : ['', '.AppImage'];

              const executableFile = files.find(file => {
                // Skip files that start with # or .
                if (file.startsWith('#') || file.startsWith('.')) {
                  return false;
                }

                // For Windows, only look for .exe files
                if (process.platform === 'win32') {
                  return file.endsWith('.exe');
                }

                // For macOS, look for .app bundles, .exe files (Windows games), or executables containing "manic"
                if (process.platform === 'darwin') {
                  return file.endsWith('.app') || file.endsWith('.exe') || (file.toLowerCase().includes('manic') && !path.extname(file));
                }

                // For Linux, look for files without extension that are likely executables
                // and specifically contain "manic" in the name (case insensitive)
                if (process.platform === 'linux') {
                  return !path.extname(file) && file.toLowerCase().includes('manic') && !file.includes('#') && !file.includes('.');
                }

                return false;
              });

              if (executableFile) {
                targetPath = path.join(latestDir, executableFile);
                logger.info('SHORTCUT', 'Found executable file', { executableFile, targetPath });
              } else {
                logger.warn('SHORTCUT', 'No suitable executable found in latest directory', { files, platform: process.platform });
              }
            } catch {
              // Fallback to legacy naming scheme - check for directories that match the pattern
              try {
                const contents = await fs.readdir(launcherInstallPath);
                const legacyDir = contents.find(dir => dir.startsWith('ManicMiners-Baraklava-V'));
                if (legacyDir) {
                  const legacyPath = path.join(launcherInstallPath, legacyDir);
                  const files = await fs.readdir(legacyPath);
                  // const _executableExtensions =
                  //   process.platform === 'win32' ? ['.exe'] : process.platform === 'darwin' ? ['.app', ''] : ['', '.AppImage'];

                  const executableFile = files.find(file => {
                    // Skip files that start with # or .
                    if (file.startsWith('#') || file.startsWith('.')) {
                      return false;
                    }

                    // For Windows, only look for .exe files
                    if (process.platform === 'win32') {
                      return file.endsWith('.exe');
                    }

                    // For macOS, look for .app bundles, .exe files (Windows games), or executables containing "manic"
                    if (process.platform === 'darwin') {
                      return (
                        file.endsWith('.app') || file.endsWith('.exe') || (file.toLowerCase().includes('manic') && !path.extname(file))
                      );
                    }

                    // For Linux, look for files without extension that are likely executables
                    // and specifically contain "manic" in the name (case insensitive)
                    if (process.platform === 'linux') {
                      return !path.extname(file) && file.toLowerCase().includes('manic') && !file.includes('#') && !file.includes('.');
                    }

                    return false;
                  });

                  if (executableFile) {
                    targetPath = path.join(legacyPath, executableFile);
                  }
                }
              } catch (err) {
                logger.warn('SHORTCUT', 'Could not find legacy installation', { error: err instanceof Error ? err.message : String(err) });
              }
            }
          }

          if (!targetPath) {
            throw new Error('No game installation found. Please install the game first.');
          }

          event.sender.send(IPC_CHANNELS.CREATE_SHORTCUTS_PROGRESS, {
            status: 'Creating desktop shortcuts...',
            progress: 25,
          });

          // Create shortcuts with the provided options
          const shortcutOptions = {
            createExeShortcut: options.createExeShortcut ?? true,
            createDirShortcut: options.createDirShortcut ?? true,
            ...options,
          };

          const result = await createDesktopShortcuts({
            installPath: targetPath,
            ...shortcutOptions,
          });

          if (result.status) {
            event.sender.send(IPC_CHANNELS.CREATE_SHORTCUTS_PROGRESS, {
              status: 'Shortcuts created successfully!',
              progress: 100,
              filePaths: result.filePaths,
            });

            return {
              success: true,
              message: 'Shortcuts created successfully',
              filePaths: result.filePaths,
            };
          } else {
            throw new Error('Failed to create shortcuts');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          logger.error('SHORTCUT', 'Error creating shortcuts', { error: errorMessage }, error instanceof Error ? error : undefined);
          event.sender.send(IPC_CHANNELS.CREATE_SHORTCUTS_ERROR, {
            message: errorMessage,
          });
          throw error;
        }
      })
    );

    status = true;
    message = 'Shortcut handler setup successfully';
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error('IPC', 'Error setting up shortcut handler', { error: errorMessage }, error instanceof Error ? error : undefined);
    message = `Error setting up shortcut handler: ${errorMessage}`;
  }

  return { status, message };
};
