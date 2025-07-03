import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { unpackVersion } from '../../functions/unpackVersion';
import { downloadVersion } from '../../functions/downloadVersion';
import { DownloadGameResponse, downloadGame } from 'itchio-downloader';
import { debugLog } from '../../logger';
import { fetchInstalledVersions } from '../../functions/fetchInstalledVersions';
import Store from 'electron-store';

const store = new Store() as any;

export const setupDownloadHandlers = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.DOWNLOAD_VERSION, async (event, { version, downloadPath }) => {
      debugLog(`Downloading version: ${version} to ${downloadPath}`);
      //latest version only do this for a download instead -->
      const { filePath, metaData, metadataPath, message, status } = (await downloadGame({
        itchGameUrl: 'https://baraklava.itch.io/manic-miners',
        downloadDirectory: downloadPath,
      })) as DownloadGameResponse;
      //<-- latest version only do this for a download instead

      debugLog(`${filePath} ${metaData} ${metadataPath} ${message} ${status}`);
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
            const installedVersions = await fetchInstalledVersions();
            const newSelectedVersion = installedVersions.installedVersions.find((v: { identifier: any }) => v.identifier === version);

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
      } catch (error: unknown) {
        const err = error as Error;
        console.error(`Error processing version: ${err.message}`);
        event.reply(IPC_CHANNELS.DOWNLOAD_VERSION, {
          downloaded: false,
          message: `Error processing version: ${err.message}`,
        });
      }
    });

    message = 'Download handlers set up successfully.';
    status = true; // Indicates the handler was set up successfully.
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up download handlers: ${err.message}`;
    status = false;
  }

  return { status, message };
};
