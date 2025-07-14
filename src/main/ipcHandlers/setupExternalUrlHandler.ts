import { ipcMain, shell } from 'electron';

export const setupExternalUrlHandler = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    console.log('Setting up external URL handler...');
    console.log('shell object in main process:', !!shell);
    console.log('shell.openExternal in main process:', typeof shell.openExternal);

    ipcMain.on('OPEN_EXTERNAL_URL', async (event, url: string) => {
      console.log('OPEN_EXTERNAL_URL IPC received:', url);
      try {
        if (shell && typeof shell.openExternal === 'function') {
          console.log('Opening external URL via main process:', url);
          await shell.openExternal(url);
          console.log('External URL opened successfully');
        } else {
          console.error('shell.openExternal not available in main process');
        }
      } catch (error) {
        console.error('Error opening external URL:', error);
      }
    });

    status = true;
    message = 'External URL handler setup successfully';
  } catch (error) {
    console.error('Error setting up external URL handler:', error);
    message = `Error setting up external URL handler: ${error}`;
  }

  return { status, message };
};