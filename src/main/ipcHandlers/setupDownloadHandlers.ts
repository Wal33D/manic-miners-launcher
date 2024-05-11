import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { downloadVersion } from '../../functions/downloadVersion';

export const setupDownloadHandlers = () => {
  ipcMain.on(IPC_CHANNELS.DOWNLOAD_VERSION, async (event, { version, downloadPath }) => {
    console.log(`Downloading version: ${version} to ${downloadPath}`);
    try {
      const result = await downloadVersion({
        version,
        downloadPath,
        updateStatus: (status: any) => {
          // Emit status updates back to the renderer
          event.reply(IPC_CHANNELS.DOWNLOAD_STATUS, status);
        },
      });
      event.reply(IPC_CHANNELS.DOWNLOAD_VERSION, {
        downloaded: result.downloaded,
        message: result.downloaded ? 'Download completed successfully.' : 'Download failed.',
      });
    } catch (error) {
      console.error(`Error downloading version: ${error.message}`);
      event.reply(IPC_CHANNELS.DOWNLOAD_VERSION, {
        downloaded: false,
        message: `Error downloading version: ${error.message}`,
      });
    }
  });
};

// Be sure to add this handler to the main initialization part of your Electron app
