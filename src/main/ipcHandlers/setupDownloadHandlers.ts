import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { downloadVersion } from '../../functions/downloadVersion';
import { unpackVersion } from '../../functions/unpackVersion';
import Store from 'electron-store';

const store = new Store() as any;

export const setupDownloadHandlers = () => {
  ipcMain.on(IPC_CHANNELS.DOWNLOAD_VERSION, async (event, { version, downloadPath }) => {
    console.log(`Downloading version: ${version} to ${downloadPath}`);

    try {
      const downloadResult = await downloadVersion({
        versionIdentifier: version,
        downloadPath,
        updateStatus: (status: any) => {
          event.sender.send(IPC_CHANNELS.DOWNLOAD_PROGRESS, status);
        },
      });

      if (downloadResult.downloaded) {
        const unpackResult = await unpackVersion({
          versionIdentifier: version,
          installationDirectory: downloadPath,
          updateStatus: (status: any) => {
            event.sender.send(IPC_CHANNELS.DOWNLOAD_PROGRESS, status);
          },
        });

        if (unpackResult.unpacked) {
          // Set the newly downloaded and unpacked version as the selected version
          const updatedVersions = await getVersionDetails(); // Make sure this fetches the latest data including directory paths
          const newSelectedVersion = updatedVersions.versions.find((v: { identifier: any }) => v.identifier === version);
          if (newSelectedVersion) {
            store.set('current-selected-version', newSelectedVersion);
            event.sender.send(IPC_CHANNELS.VERSIONS_UPDATED); // Notify the renderer to refresh the UI
          }

          event.reply(IPC_CHANNELS.DOWNLOAD_VERSION, {
            downloaded: true,
            unpacked: true,
            message: unpackResult.message,
          });
        } else {
          throw new Error(`Unpacking failed: ${unpackResult.message}`);
        }
      } else {
        throw new Error(`Download failed: ${downloadResult.message}`);
      }
    } catch (error) {
      console.error(`Error processing version: ${error.message}`);
      event.reply(IPC_CHANNELS.DOWNLOAD_VERSION, {
        downloaded: false,
        message: `Error processing version: ${error.message}`,
      });
    }
  });
};
