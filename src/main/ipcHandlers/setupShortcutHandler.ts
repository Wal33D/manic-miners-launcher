import { ipcMain } from 'electron';
import { createDesktopShortcuts } from '../../functions/createDesktopShortcuts';
import { getDirectories } from '../../functions/fetchDirectories';
import { withIpcHandler } from './withIpcHandler';
import { IPC_CHANNELS } from './ipcChannels';
import path from 'path';
import fs from 'fs/promises';

export const setupShortcutHandler = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    ipcMain.on(
      IPC_CHANNELS.CREATE_SHORTCUTS,
      withIpcHandler('create-shortcuts', async (event, { installPath, options = {} }) => {
        try {
          const { directories } = await getDirectories();
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
            const legacyPattern = path.join(launcherInstallPath, 'ManicMiners-Baraklava-V*');
            
            try {
              await fs.access(latestDir);
              // Look for exe files in the latest directory
              const files = await fs.readdir(latestDir);
              const exeFile = files.find(file => file.endsWith('.exe'));
              if (exeFile) {
                targetPath = path.join(latestDir, exeFile);
              }
            } catch {
              // Fallback to legacy naming scheme - check for directories that match the pattern
              try {
                const contents = await fs.readdir(launcherInstallPath);
                const legacyDir = contents.find(dir => dir.startsWith('ManicMiners-Baraklava-V'));
                if (legacyDir) {
                  const legacyPath = path.join(launcherInstallPath, legacyDir);
                  const files = await fs.readdir(legacyPath);
                  const exeFile = files.find(file => file.endsWith('.exe'));
                  if (exeFile) {
                    targetPath = path.join(legacyPath, exeFile);
                  }
                }
              } catch (err) {
                console.log('Could not find legacy installation:', err);
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
          console.error('Error creating shortcuts:', error);
          event.sender.send(IPC_CHANNELS.CREATE_SHORTCUTS_PROGRESS, {
            status: `Error: ${error.message}`,
            progress: 0,
          });
          throw error;
        }
      })
    );

    status = true;
    message = 'Shortcut handler setup successfully';
  } catch (error) {
    console.error('Error setting up shortcut handler:', error);
    message = `Error setting up shortcut handler: ${error}`;
  }

  return { status, message };
};