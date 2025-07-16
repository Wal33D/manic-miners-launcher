import { ipcMain, shell } from 'electron';
import { logger } from '../../utils/logger';
import { withIpcHandler } from './withIpcHandler';

export const setupExternalUrlHandler = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    logger.ipcLog('Setting up external URL handler', {
      hasShell: !!shell,
      openExternalType: typeof shell.openExternal,
    });

    ipcMain.on(
      'OPEN_EXTERNAL_URL',
      withIpcHandler('open-external-url-reply', async (_event, url: string) => {
        logger.ipcLog('OPEN_EXTERNAL_URL IPC received', { url });
        if (shell && typeof shell.openExternal === 'function') {
          logger.ipcLog('Opening external URL via main process', { url });
          await shell.openExternal(url);
          logger.ipcLog('External URL opened successfully', { url });
          return { success: true };
        } else {
          logger.error('EXTERNAL_URL', 'shell.openExternal not available in main process');
          throw new Error('shell.openExternal not available in main process');
        }
      })
    );

    status = true;
    message = 'External URL handler setup successfully';
  } catch (error: unknown) {
    const err = error as Error;
    logger.error('IPC', 'Error setting up external URL handler', { error: err.message }, err);
    message = `Error setting up external URL handler: ${err}`;
  }

  return { status, message };
};
