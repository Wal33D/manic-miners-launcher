import { ipcMain } from 'electron';
import { deleteVersion } from '../../functions/deleteVersion';
import { verifyVersion } from '../../functions/verifyVersion';
import { reinstallVersion } from '../../functions/reinstallVersion';
import { IPC_CHANNELS } from './ipcChannels';
import { withIpcHandler } from './withIpcHandler';

export const setupMaintenanceHandlers = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';
  try {
    ipcMain.on(
      IPC_CHANNELS.DELETE_VERSION,
      withIpcHandler(IPC_CHANNELS.DELETE_VERSION, async (_event, versionIdentifier: string) => {
        return await deleteVersion({ versionIdentifier });
      })
    );

    ipcMain.on(
      IPC_CHANNELS.VERIFY_VERSION,
      withIpcHandler(IPC_CHANNELS.VERIFY_VERSION, async (_event, versionIdentifier: string) => {
        return await verifyVersion({ versionIdentifier });
      })
    );

    ipcMain.on(
      IPC_CHANNELS.REINSTALL_VERSION,
      withIpcHandler(IPC_CHANNELS.REINSTALL_VERSION, async (event, { version, downloadPath }) => {
        const result = await reinstallVersion({
          versionIdentifier: version,
          downloadPath,
          updateStatus: (statusObj: import('../../types/ipcMessages').ProgressStatus) => {
            event.sender.send(IPC_CHANNELS.DOWNLOAD_PROGRESS, statusObj);
          },
        });
        return result;
      })
    );

    status = true;
    message = 'Maintenance handlers set up successfully.';
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up maintenance handlers: ${err.message}`;
    status = false;
  }
  return { status, message };
};
