import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { downloadVersion } from '../../functions/downloadVersion';
import { unpackVersion } from '../../functions/unpackVersion';

export const setupDownloadHandlers = () => {
  ipcMain.on(IPC_CHANNELS.DOWNLOAD_VERSION, async (event, { version, downloadPath }) => {
    console.log(`Downloading version: ${version} to ${downloadPath}`);

    try {
      const downloadResult = await downloadVersion({
        versionIdentifier: version,
        downloadPath,
        updateStatus: (status: any) => {
          // Emitting intermediate status updates back to the renderer
          event.sender.send(IPC_CHANNELS.DOWNLOAD_PROGRESS, status);
        },
      });

      if (downloadResult.downloaded) {
        // Trigger unpacking after successful download
        const unpackResult = await unpackVersion({
          versionIdentifier: version,
          installationDirectory: downloadPath, // Assuming the downloadPath is where we want to unpack
          updateStatus: (status: any) => {
            event.sender.send(IPC_CHANNELS.DOWNLOAD_PROGRESS, status);
          },
        });

        if (unpackResult.unpacked) {
          event.reply(IPC_CHANNELS.DOWNLOAD_VERSION, {
            downloaded: true,
            unpacked: true,
            message: unpackResult.message,
          });
          // Notify renderer that versions information may have been updated after successful unpacking
          event.sender.send(IPC_CHANNELS.VERSIONS_UPDATED);
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
