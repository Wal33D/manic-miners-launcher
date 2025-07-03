import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { unpackVersion } from '../../functions/unpackVersion';
import { downloadGame } from 'itchio-downloader';
import { debugLog } from '../../logger';

export const setupLatestDownloadHandler = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.DOWNLOAD_VERSION, async (event, { downloadPath, latest }) => {
      if (!latest) {
        // If latest is false, do not proceed with the download and unpacking
        event.reply(IPC_CHANNELS.DOWNLOAD_VERSION, {
          downloaded: false,
          message: 'Not the latest version request, skipping download.',
        });
        return;
      }

      debugLog(`Downloading the latest version to ${downloadPath}`);

      const downloadResponse = (await downloadGame({
        itchGameUrl: 'https://baraklava.itch.io/manic-miners',
        desiredFileDirectory: downloadPath,
      })) as any;

      const { filePath, metaData, metadataPath, message, status } = downloadResponse;

      debugLog(`${filePath} ${metaData} ${metadataPath} ${message} ${status}`);

      if (!status) {
        event.reply(IPC_CHANNELS.DOWNLOAD_VERSION, {
          downloaded: false,
          message: `Failed to download latest version: ${message}`,
        });
        return; // Exit if download failed
      }

      // Proceed to unpack the version if download was successful
      const unpackResult = await unpackVersion({
        versionIdentifier: 'latest', // Assuming identifier for latest version
        installationDirectory: downloadPath,
        updateStatus: (unpackStatus: any) => {
          event.sender.send(IPC_CHANNELS.DOWNLOAD_PROGRESS, unpackStatus);
        },
      });

      if (unpackResult.unpacked) {
        event.reply(IPC_CHANNELS.DOWNLOAD_VERSION, {
          downloaded: true,
          unpacked: true,
          message: 'Latest version downloaded and unpacked successfully.',
        });
      } else {
        event.reply(IPC_CHANNELS.DOWNLOAD_VERSION, {
          downloaded: true,
          unpacked: false,
          message: `Unpacking failed: ${unpackResult.message}`,
        });
      }
    });

    message = 'Latest download handler set up successfully.';
    status = true; // Indicates the handler was set up successfully.
  } catch (error: any) {
    console.error(`Failed to set up latest download handlers: ${error.message}`);
    message = `Failed to set up latest download handlers: ${error.message}`;
    status = false;
  }

  return { status, message };
};
