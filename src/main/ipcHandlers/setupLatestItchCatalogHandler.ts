import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { fetchLatestItchCatalog } from '../../api/fetchLatestItchCatalog';
import { withIpcHandler } from './withIpcHandler';

export const setupLatestItchCatalogHandler = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';
  try {
    ipcMain.on(
      IPC_CHANNELS.FETCH_LATEST_ITCH_CATALOG,
      withIpcHandler(IPC_CHANNELS.FETCH_LATEST_ITCH_CATALOG, async () => {
        return await fetchLatestItchCatalog();
      })
    );
    status = true;
    message = 'Latest Itch catalog handler set up successfully.';
  } catch (err: any) {
    status = false;
    message = `Failed to set up latest catalog handler: ${err.message}`;
  }
  return { status, message };
};
