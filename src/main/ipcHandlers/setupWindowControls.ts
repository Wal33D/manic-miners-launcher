import { ipcMain, BrowserWindow } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';

export const setupWindowControls = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    ipcMain.on(IPC_CHANNELS.MINIMIZE_WINDOW, () => {
      BrowserWindow.getFocusedWindow()?.minimize();
    });

    ipcMain.on(IPC_CHANNELS.MAXIMIZE_WINDOW, () => {
      const win = BrowserWindow.getFocusedWindow();
      if (win) {
        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
      }
    });

    ipcMain.on(IPC_CHANNELS.CLOSE_WINDOW, () => {
      BrowserWindow.getFocusedWindow()?.close();
    });

    status = true;
    message = 'Window control handlers set up successfully.';
  } catch (error: unknown) {
    const err = error as Error;
    status = false;
    message = `Failed to set up window controls: ${err.message}`;
  }

  return { status, message };
};
