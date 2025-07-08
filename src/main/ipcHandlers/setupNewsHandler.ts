import { ipcMain } from 'electron';
import { fetchNews } from '../../api/fetchNews';
import { IPC_CHANNELS } from './ipcChannels';
import { debugLog } from '../../logger';

export const setupNewsHandler = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.GET_NEWS, async event => {
      try {
        const result = await fetchNews();
        debugLog(`Sending news data: ${JSON.stringify(result)}`);
        event.reply(IPC_CHANNELS.GET_NEWS, { status: true, news: result.news });
      } catch (error: unknown) {
        const err = error as Error;
        console.error(`Error fetching news: ${err.message}`);
        event.reply(IPC_CHANNELS.GET_NEWS, { status: false, message: err.message });
      }
    });

    message = 'News handler set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up news handler: ${err.message}`;
    status = false;
  }

  return { status, message };
};
