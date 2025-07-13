import fs from 'fs/promises';
import path from 'path';
import { getDirectories } from './fetchDirectories';

export async function deleteLatestVersion(): Promise<{ deleted: boolean; message: string }> {
  try {
    const { directories } = await getDirectories();
    const latestDir = path.join(directories.launcherCachePath, 'latestVersion');
    await fs.rm(latestDir, { recursive: true, force: true });
    return { deleted: true, message: `Deleted ${latestDir}` };
  } catch (err: any) {
    return { deleted: false, message: `Failed to delete latest version: ${err.message}` };
  }
}
