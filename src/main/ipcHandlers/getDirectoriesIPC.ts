import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { getDirectories } from '../../functions/fetchDirectories';
import { withIpcHandler } from './withIpcHandler';

export const setupDirectoryHandler = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(
      IPC_CHANNELS.GET_DIRECTORIES,
      withIpcHandler(IPC_CHANNELS.GET_DIRECTORIES, async _event => {
        const dirResult = await getDirectories();
        if (!dirResult.status) {
          throw new Error(dirResult.message);
        }
        return {
          status: true,
          message: 'Directories fetched successfully',
          directories: dirResult.directories,
        };
      })
    );

    message = 'Directory handler set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up directory handler: ${err.message}`;
    status = false;
  }

  return { status, message };
};
