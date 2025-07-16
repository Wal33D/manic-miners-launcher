import { ipcMain, BrowserWindow } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { withIpcHandler } from './withIpcHandler';

export const setupWindowControlHandlers = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    ipcMain.on(
      IPC_CHANNELS.WINDOW_MINIMIZE,
      withIpcHandler('window-minimize-reply', async event => {
        const window = BrowserWindow.fromWebContents(event.sender);
        if (window) {
          window.minimize();
        }
        return { success: true };
      })
    );

    ipcMain.on(
      IPC_CHANNELS.WINDOW_EXIT,
      withIpcHandler('window-exit-reply', async event => {
        const window = BrowserWindow.fromWebContents(event.sender);
        if (window) {
          window.close();
        }
        return { success: true };
      })
    );

    message = 'Window control handlers set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up window control handlers: ${err.message}`;
    status = false;
  }

  return { status, message };
};
