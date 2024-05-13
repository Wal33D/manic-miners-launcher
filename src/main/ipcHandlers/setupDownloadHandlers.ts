import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { unpackVersion } from '../../functions/unpackVersion';
import { downloadVersion } from '../../functions/downloadVersion';
import { DownloadGameResponse, downloadGame } from 'itchio-downloader';
import { fetchInstalledVersions } from '../../functions/fetchInstalledVersions';
import Store from 'electron-store';

const store = new Store() as any;

export const setupDownloadHandlers = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.DOWNLOAD_VERSION, async (event, { version, downloadPath, latest }) => {
      if (latest) {
        console.log(`Downloading latest version to ${downloadPath}`);

        const { filePath, metaData, metadataPath, message, status } = (await downloadGame({
          itchGameUrl: 'https://baraklava.itch.io/manic-miners',
          desiredFileDirectory: downloadPath,
        })) as DownloadGameResponse;

        console.log(`Download response: ${filePath}, ${metaData}, ${metadataPath}, ${message}, ${status}`);

        event.reply(IPC_CHANNELS.DOWNLOAD_VERSION, {
          downloaded: status,
          message: message,
        });

        return; // Exit after handling the latest version download
      } else {
        console.log(`Downloading version: ${version} to ${downloadPath}`);

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
            const installedVersions = await fetchInstalledVersions();
            const newSelectedVersion = installedVersions.installedVersions.find(v => v.identifier === version);

            if (newSelectedVersion) {
              store.set('current-selected-version', newSelectedVersion);
              event.sender.send(IPC_CHANNELS.VERSIONS_UPDATED);
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
      }
    });

    message = 'Download handlers set up successfully.';
    status = true; // Indicates the handler was set up successfully.
  } catch (error: any) {
    console.error(`Failed to set up download handlers: ${error.message}`);
    //@ts-ignore
    event.reply(IPC_CHANNELS.DOWNLOAD_VERSION, {
      downloaded: false,
      message: `Error: ${error.message}`,
    });
    status = false;
  }

  return { status, message };
};
