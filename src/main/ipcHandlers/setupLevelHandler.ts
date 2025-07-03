import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { fetchLevels } from '../../api/fetchLevels';
import { debugLog } from '../../logger';

export const setupLevelHandler = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.GET_LEVELS, async event => {
      try {
        const levelsResult = await fetchLevels();
        debugLog(`Sending level data: ${JSON.stringify(levelsResult)}`);

        event.reply(IPC_CHANNELS.GET_LEVELS, {
          status: true,
          message: 'Levels fetched successfully',
          levels: levelsResult.levels,
          count: levelsResult.count,
        });
        status = true; // Indicates successful setup of the IPC handler.
      } catch (error: unknown) {
        const err = error as Error;
        console.error(`Error fetching levels: ${err.message}`);
        event.reply(IPC_CHANNELS.GET_LEVELS, {
          status: false,
          message: `Error fetching levels: ${err.message}`,
        });
      }
    });

    message = 'Level handler set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up level handler: ${err.message}`;
    status = false;
  }

  return { status, message };
};
