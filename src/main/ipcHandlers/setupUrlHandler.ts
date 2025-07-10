import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { fetchUrls } from '../../api/fetchUrls';

export const setupUrlHandler = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.GET_URLS, async event => {
      try {
        const urlResult = await fetchUrls();

        event.reply(IPC_CHANNELS.GET_URLS, {
          status: true,
          message: 'URLs fetched successfully',
          urls: urlResult,
        });
        status = true; // Indicates successful setup of the IPC handler.
      } catch (error: unknown) {
        const err = error as Error;
        console.error(`Error fetching URLs: ${err.message}`);
        event.reply(IPC_CHANNELS.GET_URLS, {
          status: false,
          message: `Error fetching URLs: ${err.message}`,
        });
      }
    });

    message = 'URL handler set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up URL handler: ${err.message}`;
    status = false;
  }

  return { status, message };
};
