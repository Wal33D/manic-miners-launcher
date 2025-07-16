import { ipcMain, dialog } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { withIpcHandler } from './withIpcHandler';

export const setupInputPathDialog = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(
      IPC_CHANNELS.OPEN_DIRECTORY_DIALOG,
      withIpcHandler(IPC_CHANNELS.DIRECTORY_SELECTED, async _event => {
        const result = await dialog.showOpenDialog({
          properties: ['openDirectory'],
        });

        if (!result.canceled && result.filePaths.length > 0) {
          message = 'Directory selected successfully.';
          status = true;
          return result.filePaths[0];
        } else {
          message = 'Directory selection was canceled or no directory was selected.';
          throw new Error('Directory selection was canceled or no directory was selected.');
        }
      })
    );

    status = true; // If we reach here, it means ipcMain handler was set up without error.
    message = 'Directory dialog handler setup successfully.';
  } catch (error: unknown) {
    const err = error as Error;
    status = false;
    message = `Failed to set up directory dialog handler: ${err.message}`;
  }

  return { status, message };
};
