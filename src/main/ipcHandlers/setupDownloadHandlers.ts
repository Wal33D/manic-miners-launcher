import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { unpackVersion } from '../../functions/unpackVersion';
import { downloadVersion } from '../../functions/downloadVersion';
import { fetchInstalledVersions } from '../../functions/fetchInstalledVersions';
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
          // After unpacking, fetch the updated list of installed versions
          const installedVersions = await fetchInstalledVersions();
          const newSelectedVersion = installedVersions.installedVersions.find((v: { identifier: any }) => v.identifier === version);

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
