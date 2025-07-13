import fs from 'fs/promises';
import path from 'path';
import { getDirectories } from './fetchDirectories';
import { fetchVersions } from '../api/fetchVersions';

export const deleteVersion = async ({
  versionIdentifier,
}: {
  versionIdentifier: string;
}): Promise<{ deleted: boolean; message: string }> => {
  try {
    const { directories } = await getDirectories();
    const dirPath = path.join(directories.launcherInstallPath, versionIdentifier);
    await fs.rm(dirPath, { recursive: true, force: true });

    let zipMessage = '';
    try {
      const { versions } = await fetchVersions({ versionType: 'archived' });
      const info = versions.find(v => v.identifier === versionIdentifier);
      if (info) {
        const zipPath = path.join(directories.launcherCachePath, info.filename);
        await fs.rm(zipPath, { force: true });
        zipMessage = ` and ${zipPath}`;
      }
    } catch {
      // ignore if version info cannot be fetched or file cannot be removed
    }

    return { deleted: true, message: `Deleted ${dirPath}${zipMessage}` };
  } catch (error: unknown) {
    const err = error as Error;
    return { deleted: false, message: `Failed to delete version: ${err.message}` };
  }
};
