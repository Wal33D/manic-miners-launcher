import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { unpackVersion } from '../../functions/unpackVersion';
import { downloadVersion } from '../../functions/downloadVersion';
import { fetchInstalledVersions } from '../../functions/fetchInstalledVersions';
import { withIpcHandler } from './withIpcHandler';
import { typedStore } from '../../utils/typedStore';

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
        const newSelectedVersion = installedVersions.installedVersions.find(v => v.identifier === version);

        if (newSelectedVersion) {
          typedStore.set('current-selected-version', newSelectedVersion);
          event.sender.send(IPC_CHANNELS.VERSIONS_UPDATED);
        }

        return {
          downloaded: true,
          unpacked: true,
          message: unpackResult.message,
        };
      })
    );

    // Note: UPDATE_LATEST_VERSION handler is in setupItchDownloadHandler.ts
    // to avoid conflicts and use the correct itch.io download implementation

    message = 'Download handlers set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up download handlers: ${err.message}`;
    status = false;
  }

  return { status, message };
};
