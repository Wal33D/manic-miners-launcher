import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { getDirectories } from '../../functions/fetchDirectories';
import { debugLog } from '../../logger';

export const setupDirectoryHandler = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.GET_DIRECTORIES, async event => {
      try {
        const dirResult = await getDirectories();
        if (!dirResult.status) {
          throw new Error(dirResult.message);
        }
        debugLog(`Sending directory data: ${JSON.stringify(dirResult.directories)}`);

        event.reply(IPC_CHANNELS.GET_DIRECTORIES, {
          status: true,
          message: 'Directories fetched successfully',
          directories: dirResult.directories,
        });
        status = true; // Indicates successful setup of the IPC handler.
      } catch (error: unknown) {
        const err = error as Error;
        console.error(`Error fetching directories: ${err.message}`);
        event.reply(IPC_CHANNELS.GET_DIRECTORIES, {
          status: false,
          message: `Error fetching directories: ${err.message}`,
        });
      }
    });

    message = 'Directory handler set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up directory handler: ${err.message}`;
    status = false;
  }

  return { status, message };
};
