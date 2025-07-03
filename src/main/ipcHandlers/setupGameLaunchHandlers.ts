import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { handleGameLaunch } from '../../functions/handleGameLaunch';
import { debugLog } from '../../logger';

export const setupGameLaunchHandlers = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.LAUNCH_GAME, async (event, versionIdentifier) => {
      debugLog(`Launching game with version: ${versionIdentifier}`);
      try {
        const success = await handleGameLaunch({ versionIdentifier });
        event.reply(IPC_CHANNELS.LAUNCH_GAME, {
          success,
          message: success ? 'Game launched successfully.' : 'Failed to launch game.',
        });
        status = true; // This indicates the event handler was setup successfully.
      } catch (error: any) {
        console.error(`Error launching game: ${error.message}`);
        event.reply(IPC_CHANNELS.LAUNCH_GAME, {
          success: false,
          message: `Error launching game: ${error.message}`,
        });
      }
    });

    message = 'Game launch handlers set up successfully.';
    status = true; // Indicates the handler was set up successfully.
  } catch (error: any) {
    message = `Failed to set up game launch handlers: ${error.message}`;
    status = false;
  }

  return { status, message };
};
