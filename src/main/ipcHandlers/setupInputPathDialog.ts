import { ipcMain, dialog } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';

export const setupInputPathDialog = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.OPEN_DIRECTORY_DIALOG, async event => {
      try {
        const result = await dialog.showOpenDialog({
          properties: ['openDirectory'],
        });

        if (!result.canceled && result.filePaths.length > 0) {
          event.reply(IPC_CHANNELS.DIRECTORY_SELECTED, result.filePaths[0]);
          message = 'Directory selected successfully.';
          status = true;
        } else {
          message = 'Directory selection was canceled or no directory was selected.';
        }
      } catch (error: unknown) {
        const err = error as Error;
        message = `Failed to open directory dialog: ${err.message}`;
        event.reply('directory-selection-error', message);
      }
    });

    status = true; // If we reach here, it means ipcMain handler was set up without error.
    message = 'Directory dialog handler setup successfully.';
  } catch (error: unknown) {
    const err = error as Error;
    status = false;
    message = `Failed to set up directory dialog handler: ${err.message}`;
  }

  return { status, message };
};
