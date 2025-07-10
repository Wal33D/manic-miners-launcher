import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { handleGameLaunch } from '../../functions/handleGameLaunch';
import { withIpcHandler } from './withIpcHandler';

export const setupGameLaunchHandlers = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(
      IPC_CHANNELS.LAUNCH_GAME,
      withIpcHandler(IPC_CHANNELS.LAUNCH_GAME, async (event, versionIdentifier) => {
        const success = await handleGameLaunch({ versionIdentifier });
        return {
          success,
          message: success ? 'Game launched successfully.' : 'Failed to launch game.',
        };
      })
    );

    message = 'Game launch handlers set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up game launch handlers: ${err.message}`;
    status = false;
  }

  return { status, message };
};
