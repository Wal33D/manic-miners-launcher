import { ipcMain, dialog } from 'electron';

export const setupInputPathDialog = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on('open-directory-dialog', async event => {
      try {
        const result = await dialog.showOpenDialog({
          properties: ['openDirectory'],
        });

        if (!result.canceled && result.filePaths.length > 0) {
          event.reply('directory-selected', result.filePaths[0]);
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
