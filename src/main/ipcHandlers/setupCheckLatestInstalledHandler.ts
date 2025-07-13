import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { isVersionInstalled } from '../../functions/isVersionInstalled';
import { withIpcHandler } from './withIpcHandler';

export const setupCheckLatestInstalledHandler = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';
  try {
    ipcMain.on(
      IPC_CHANNELS.CHECK_LATEST_INSTALLED,
      withIpcHandler(IPC_CHANNELS.CHECK_LATEST_INSTALLED, async () => {
        const installed = await isVersionInstalled('latest');
        return { installed };
      })
    );
    status = true;
    message = 'Check latest installed handler set up successfully.';
  } catch (err: any) {
    status = false;
    message = `Failed to set up check latest installed handler: ${err.message}`;
  }
  return { status, message };
};
