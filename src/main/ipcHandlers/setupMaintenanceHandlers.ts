import { ipcMain } from 'electron';
import fs from 'fs/promises';
import path from 'path';
import { getDirectories } from '../../functions/fetchDirectories';
import { fetchVersions } from '../../api/fetchVersions';
import { logger } from '../../utils/logger';
import { repairVersion } from '../../functions/repairVersion';
import { IPC_CHANNELS } from './ipcChannels';
import { withIpcHandler } from './withIpcHandler';

export const setupMaintenanceHandlers = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';
  try {
    ipcMain.on(
      IPC_CHANNELS.DELETE_VERSION,
      withIpcHandler(IPC_CHANNELS.DELETE_VERSION, async (event, versionIdentifier: string) => {
        const directoriesResult = await getDirectories();
        if (!directoriesResult.status || !directoriesResult.directories) {
          throw new Error(`Failed to get directories: ${directoriesResult.message}`);
        }
        const { directories } = directoriesResult;
        const dirPath = path.join(directories.launcherInstallPath, versionIdentifier);

        // Check if directory exists
        try {
          await fs.access(dirPath);
        } catch {
          return { deleted: false, message: `Version ${versionIdentifier} not found` };
        }

        logger.info('DELETE', `Starting uninstall of ${versionIdentifier}`);

        // Send initial progress
        event.sender.send(IPC_CHANNELS.DELETE_PROGRESS, {
          status: `Scanning ${versionIdentifier} installation...`,
          progress: 5,
          fileName: versionIdentifier,
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

        logger.info('DELETE', `Found ${totalFiles} items to delete in ${versionIdentifier}`);

        event.sender.send(IPC_CHANNELS.DELETE_PROGRESS, {
          status: `Removing ${totalFiles} files from ${versionIdentifier}...`,
          progress: 10,
          fileName: versionIdentifier,
        });

        // Delete files one by one with progress updates
        for (let i = 0; i < allFiles.length; i++) {
          const filePath = allFiles[i];
          const progress = Math.floor((i / totalFiles) * 70) + 10; // 10-80% range

          try {
            const stat = await fs.stat(filePath);
            if (stat.isDirectory()) {
              await fs.rmdir(filePath);
              event.sender.send(IPC_CHANNELS.DELETE_PROGRESS, {
                status: `Removed directory: ${path.basename(filePath)}`,
                progress,
                fileName: versionIdentifier,
              });
            } else {
              await fs.unlink(filePath);
              event.sender.send(IPC_CHANNELS.DELETE_PROGRESS, {
                status: `Deleted: ${path.basename(filePath)}`,
                progress,
                fileName: versionIdentifier,
              });
            }

            // Small delay to make progress visible
            await new Promise(resolve => setTimeout(resolve, 30));
          } catch (error: any) {
            logger.warn('DELETE', `Could not delete ${filePath}`, { error: error.message });
          }
        }

        // Remove the main directory
        try {
          await fs.rmdir(dirPath);
          event.sender.send(IPC_CHANNELS.DELETE_PROGRESS, {
            status: `Removed ${versionIdentifier} directory`,
            progress: 85,
            fileName: versionIdentifier,
          });
          logger.info('DELETE', `Removed ${versionIdentifier} directory`, { dirPath });
        } catch (error: any) {
          logger.warn('DELETE', `Could not remove ${versionIdentifier} directory`, { error: error.message });
        }

        // Try to remove cached zip file
        let zipMessage = '';
        try {
          const { versions } = await fetchVersions({ versionType: 'archived' });
          const info = versions.find(v => v.identifier === versionIdentifier);
          if (info) {
            const zipPath = path.join(directories!.launcherCachePath, info.filename);
            try {
              await fs.access(zipPath);
              event.sender.send(IPC_CHANNELS.DELETE_PROGRESS, {
                status: `Removing cached file: ${info.filename}`,
                progress: 90,
                fileName: versionIdentifier,
              });
              await fs.rm(zipPath, { force: true });
              zipMessage = ` and cached file ${info.filename}`;
              logger.info('DELETE', `Removed cached file ${info.filename}`);
            } catch {
              // File might not exist
            }
          }
        } catch {
          // ignore if version info cannot be fetched
        }

        event.sender.send(IPC_CHANNELS.DELETE_PROGRESS, {
          status: 'Uninstall completed successfully',
          progress: 100,
          fileName: versionIdentifier,
        });

        return { deleted: true, message: `Deleted ${dirPath}${zipMessage}` };
      })
    );

    ipcMain.on(
      IPC_CHANNELS.VERIFY_VERSION,
      withIpcHandler(IPC_CHANNELS.VERIFY_VERSION, async (_event, versionIdentifier: string) => {
        const { verifyVersion } = await import('../../functions/verifyVersion');
        return await verifyVersion({ versionIdentifier });
      })
    );

    ipcMain.on(
      IPC_CHANNELS.REPAIR_VERSION,
      withIpcHandler(IPC_CHANNELS.REPAIR_VERSION, async (event, versionIdentifier: string) => {
        return await repairVersion({
          versionIdentifier,
          updateStatus: statusObj => {
            event.sender.send(IPC_CHANNELS.DOWNLOAD_PROGRESS, statusObj);
          },
        });
      })
    );

    status = true;
    message = 'Maintenance handlers set up successfully.';
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up maintenance handlers: ${err.message}`;
    status = false;
  }
  return { status, message };
};
