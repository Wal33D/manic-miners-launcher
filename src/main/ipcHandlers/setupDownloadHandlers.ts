import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { unpackVersion } from '../../functions/unpackVersion';
import { downloadVersion } from '../../functions/downloadVersion';
import { fetchInstalledVersions } from '../../functions/fetchInstalledVersions';
import Store from 'electron-store';
import { withIpcHandler } from './withIpcHandler';

const store = new Store() as any;

export const setupDownloadHandlers = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(
      IPC_CHANNELS.DOWNLOAD_VERSION,
      withIpcHandler(IPC_CHANNELS.DOWNLOAD_VERSION, async (event, { version, downloadPath }) => {
        const downloadResult = await downloadVersion({
          versionIdentifier: version,
          downloadPath,
          updateStatus: (statusObj: import('../../types/ipcMessages').ProgressStatus) => {
            event.sender.send(IPC_CHANNELS.DOWNLOAD_PROGRESS, statusObj);
          },
        });

        if (!downloadResult.downloaded) {
          throw new Error(`Download failed: ${downloadResult.message}`);
        }

        const unpackResult = await unpackVersion({
          versionIdentifier: version,
          installationDirectory: downloadPath,
          updateStatus: (statusObj: import('../../types/ipcMessages').ProgressStatus) => {
            event.sender.send(IPC_CHANNELS.DOWNLOAD_PROGRESS, statusObj);
          },
        });

        if (!unpackResult.unpacked) {
          throw new Error(`Unpacking failed: ${unpackResult.message}`);
        }

        const installedVersions = await fetchInstalledVersions();
        const newSelectedVersion = installedVersions.installedVersions.find((v: { identifier: any }) => v.identifier === version);

        if (newSelectedVersion) {
          store.set('current-selected-version', newSelectedVersion);
          event.sender.send(IPC_CHANNELS.VERSIONS_UPDATED);
        }

        return {
          downloaded: true,
          unpacked: true,
          message: unpackResult.message,
        };
      })
    );

    // Handle update requests
    ipcMain.on(
      IPC_CHANNELS.UPDATE_LATEST_VERSION,
      withIpcHandler(IPC_CHANNELS.UPDATE_LATEST_VERSION, async (event, { version }) => {
        try {
          const currentDirectory = store.get('current-selected-directory') || '';
          
          // Send update progress
          event.sender.send(IPC_CHANNELS.UPDATE_PROGRESS, {
            progress: 0,
            status: 'Starting update...',
          });

          // Download the latest version
          const downloadResult = await downloadVersion({
            versionIdentifier: version,
            downloadPath: currentDirectory,
            updateStatus: (statusObj: import('../../types/ipcMessages').ProgressStatus) => {
              event.sender.send(IPC_CHANNELS.UPDATE_PROGRESS, {
                progress: statusObj.progress ? statusObj.progress * 0.7 : 0, // 70% for download
                status: statusObj.status,
              });
            },
          });

          if (!downloadResult.downloaded) {
            throw new Error(`Update download failed: ${downloadResult.message}`);
          }

          // Unpack the updated version
          const unpackResult = await unpackVersion({
            versionIdentifier: version,
            installationDirectory: currentDirectory,
            updateStatus: (statusObj: import('../../types/ipcMessages').ProgressStatus) => {
              event.sender.send(IPC_CHANNELS.UPDATE_PROGRESS, {
                progress: 70 + (statusObj.progress ? statusObj.progress * 0.3 : 0), // 30% for unpacking
                status: statusObj.status,
              });
            },
          });

          if (!unpackResult.unpacked) {
            throw new Error(`Update unpacking failed: ${unpackResult.message}`);
          }

          // Update completed successfully
          event.sender.send(IPC_CHANNELS.UPDATE_PROGRESS, {
            progress: 100,
            status: 'Update completed successfully',
          });

          // Refresh installed versions
          const installedVersions = await fetchInstalledVersions();
          const newSelectedVersion = installedVersions.installedVersions.find((v: { identifier: any }) => v.identifier === version);

          if (newSelectedVersion) {
            store.set('current-selected-version', newSelectedVersion);
            event.sender.send(IPC_CHANNELS.VERSIONS_UPDATED);
          }

          return {
            updated: true,
            message: 'Update completed successfully',
          };
        } catch (error: unknown) {
          const err = error as Error;
          event.sender.send(IPC_CHANNELS.UPDATE_ERROR, {
            message: err.message,
          });
          throw err;
        }
      })
    );

    message = 'Download handlers set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up download handlers: ${err.message}`;
    status = false;
  }

  return { status, message };
};
