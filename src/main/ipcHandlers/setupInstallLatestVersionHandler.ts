import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { installLatestVersion } from '../../functions/installLatestVersion';
import { withIpcHandler } from './withIpcHandler';

export const setupInstallLatestVersionHandler = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';
  try {
    ipcMain.on(
      IPC_CHANNELS.INSTALL_LATEST_VERSION,
      withIpcHandler(IPC_CHANNELS.INSTALL_LATEST_VERSION, async event => {
        return await installLatestVersion({
          updateStatus: s => {
            event.sender.send(IPC_CHANNELS.DOWNLOAD_PROGRESS, s);
          },
        });
      })
    );
    status = true;
    message = 'Install latest version handler set up successfully.';
  } catch (err: any) {
    status = false;
    message = `Failed to set up install latest version handler: ${err.message}`;
  }
  return { status, message };
};
