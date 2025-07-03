import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { fetchUrls } from '../../api/fetchUrls';
import { debugLog } from '../../logger';

export const setupUrlHandler = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.GET_URLS, async event => {
      try {
        const urlResult = await fetchUrls();
        debugLog(`Sending URL data: ${JSON.stringify(urlResult)}`);

        event.reply(IPC_CHANNELS.GET_URLS, {
          status: true,
          message: 'URLs fetched successfully',
          urls: urlResult,
        });
        status = true; // Indicates successful setup of the IPC handler.
      } catch (error: any) {
        console.error(`Error fetching URLs: ${error.message}`);
        event.reply(IPC_CHANNELS.GET_URLS, {
          status: false,
          message: `Error fetching URLs: ${error.message}`,
        });
      }
    });

    message = 'URL handler set up successfully.';
    status = true;
  } catch (error: any) {
    message = `Failed to set up URL handler: ${error.message}`;
    status = false;
  }

  return { status, message };
};
