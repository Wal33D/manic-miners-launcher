import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { withIpcHandler } from './withIpcHandler';
import { fetchUrls } from '../../api/fetchUrls';

export const setupUrlHandler = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(
      IPC_CHANNELS.GET_URLS,
      withIpcHandler(IPC_CHANNELS.GET_URLS, async _event => {
        const urlResult = await fetchUrls();
        status = true; // Indicates successful setup of the IPC handler.
        return {
          status: true,
          message: 'URLs fetched successfully',
          urls: urlResult,
        };
      })
    );

    message = 'URL handler set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up URL handler: ${err.message}`;
    status = false;
  }

  return { status, message };
};
