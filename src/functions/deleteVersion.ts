import fs from 'fs/promises';
import path from 'path';
import { getDirectories } from './fetchDirectories';

export const deleteVersion = async ({
  versionIdentifier,
  updateStatus,
}: {
  versionIdentifier: string;
  updateStatus?: (status: import('../types/ipcMessages').ProgressStatus) => void;
}): Promise<{ deleted: boolean; message: string }> => {
  try {
    updateStatus?.({ status: 'Removing old files...', progress: 5 });
    const { directories } = await getDirectories();
    const dirPath = path.join(directories.launcherInstallPath, versionIdentifier);
    await fs.rm(dirPath, { recursive: true, force: true });
    updateStatus?.({ status: 'Files removed', progress: 10 });
    return { deleted: true, message: `Deleted ${dirPath}` };
  } catch (error: unknown) {
    const err = error as Error;
    updateStatus?.({ status: err.message, progress: 10 });
    return { deleted: false, message: `Failed to delete version: ${err.message}` };
  }
};
