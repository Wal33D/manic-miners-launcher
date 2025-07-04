import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { downloadLevel } from '../../functions/downloadLevel';
import { fetchLevels } from '../../api/fetchLevels';
import { getDirectories } from '../../functions/fetchDirectories';
import { debugLog } from '../../logger';

export const setupLevelDownloadHandlers = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.DOWNLOAD_LEVEL, async (event, levelIdentifier: string) => {
      try {
        const { levels } = await fetchLevels();
        const level = levels.find(l => l.identifier === levelIdentifier);
        if (!level) throw new Error(`Level ${levelIdentifier} not found`);

        const dirs = await getDirectories();
        if (!dirs.status || !dirs.directories) throw new Error(dirs.message);
        const levelsPath = dirs.directories.levelsPath;

        const result = await downloadLevel({
          downloadUrl: level.downloadUrl,
          levelIdentifier: level.identifier,
          levelsPath,
          updateStatus: (statusObj: any) => {
            event.sender.send(IPC_CHANNELS.LEVEL_DOWNLOAD_PROGRESS, statusObj);
          },
        });
        event.reply(IPC_CHANNELS.DOWNLOAD_LEVEL, result);
        status = true;
      } catch (error: unknown) {
        const err = error as Error;
        debugLog(`Error downloading level: ${err.message}`);
        event.reply(IPC_CHANNELS.DOWNLOAD_LEVEL, { status: false, message: err.message });
      }
    });

    message = 'Level download handlers set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up level download handlers: ${err.message}`;
    status = false;
  }

  return { status, message };
};
