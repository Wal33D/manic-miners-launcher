import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { fetchLevels } from '../../api/fetchLevels';

export const setupLevelHandler = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.GET_LEVELS, async event => {
      try {
        const levelsResult = await fetchLevels();
        console.log('Sending level data:', levelsResult);

        event.reply(IPC_CHANNELS.GET_LEVELS, {
          status: true,
          message: 'Levels fetched successfully',
          levels: levelsResult.levels,
          count: levelsResult.count,
        });
        status = true; // Indicates successful setup of the IPC handler.
      } catch (error: any) {
        console.error(`Error fetching levels: ${error.message}`);
        event.reply(IPC_CHANNELS.GET_LEVELS, {
          status: false,
          message: `Error fetching levels: ${error.message}`,
        });
      }
    });

    message = 'Level handler set up successfully.';
    status = true;
  } catch (error: any) {
    message = `Failed to set up level handler: ${error.message}`;
    status = false;
  }

  return { status, message };
};
