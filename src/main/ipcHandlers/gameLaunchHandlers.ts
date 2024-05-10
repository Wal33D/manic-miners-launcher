import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcConfig';
import { handleGameLaunch } from '../../api/handleGameLaunch';

export const setupGameLaunchHandlers = () => {
  ipcMain.on(IPC_CHANNELS.LAUNCH_GAME, async (event, versionIdentifier) => {
    console.log(`Launching game with version: ${versionIdentifier}`);
    try {
      const success = await handleGameLaunch({ versionIdentifier });
      event.reply(IPC_CHANNELS.LAUNCH_GAME, {
        success,
        message: success ? 'Game launched successfully.' : 'Failed to launch game.',
      });
    } catch (error) {
      console.error(`Error launching game: ${error.message}`);
      event.reply(IPC_CHANNELS.LAUNCH_GAME, {
        success: false,
        message: `Error launching game: ${error.message}`,
      });
    }
  });
};
