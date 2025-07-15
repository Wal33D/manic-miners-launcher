import { ipcMain, shell } from 'electron';
import { logger } from '../../utils/logger';

export const setupExternalUrlHandler = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    logger.ipcLog('Setting up external URL handler', {
      hasShell: !!shell,
      openExternalType: typeof shell.openExternal,
    });

    ipcMain.on('OPEN_EXTERNAL_URL', async (event, url: string) => {
      logger.ipcLog('OPEN_EXTERNAL_URL IPC received', { url });
      try {
        if (shell && typeof shell.openExternal === 'function') {
          logger.ipcLog('Opening external URL via main process', { url });
          await shell.openExternal(url);
          logger.ipcLog('External URL opened successfully', { url });
        } else {
          logger.error('EXTERNAL_URL', 'shell.openExternal not available in main process');
        }
      } catch (error) {
        logger.error('EXTERNAL_URL', 'Error opening external URL', { url, error: error.message }, error);
      }
    });

    status = true;
    message = 'External URL handler setup successfully';
  } catch (error) {
    logger.error('IPC', 'Error setting up external URL handler', { error: error.message }, error);
    message = `Error setting up external URL handler: ${error}`;
  }

  return { status, message };
};
