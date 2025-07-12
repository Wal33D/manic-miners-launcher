import fs from 'fs/promises';
import path from 'path';
import { getDirectories } from './fetchDirectories';

export const deleteVersion = async ({ versionIdentifier }: { versionIdentifier: string }): Promise<{ deleted: boolean; message: string }> => {
  try {
    const { directories } = await getDirectories();
    const dirPath = path.join(directories.launcherInstallPath, versionIdentifier);
    await fs.rm(dirPath, { recursive: true, force: true });
    return { deleted: true, message: `Deleted ${dirPath}` };
  } catch (error: unknown) {
    const err = error as Error;
    return { deleted: false, message: `Failed to delete version: ${err.message}` };
  }
};
