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
      } catch (error: any) {
        message = `Failed to open directory dialog: ${error.message}`;
        event.reply('directory-selection-error', message);
      }
    });

    status = true; // If we reach here, it means ipcMain handler was set up without error.
    message = 'Directory dialog handler setup successfully.';
  } catch (error: any) {
    status = false;
    message = `Failed to set up directory dialog handler: ${error.message}`;
  }

  return { status, message };
};
