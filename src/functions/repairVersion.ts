import fs from 'fs/promises';
import path from 'path';
import StreamZip from 'node-stream-zip';
import { fetchVersions } from '../api/fetchVersions';
import { getDirectories } from './fetchDirectories';
import { downloadVersion } from './downloadVersion';

export const repairVersion = async ({
  versionIdentifier,
  updateStatus,
}: {
  versionIdentifier: string;
  updateStatus?: (status: import('../types/ipcMessages').ProgressStatus) => void;
}): Promise<{ repaired: boolean; message: string }> => {
  try {
    const { directories } = await getDirectories();

    const downloadResult = await downloadVersion({
      versionIdentifier,
      downloadPath: directories.launcherCachePath,
      updateStatus: status => updateStatus?.(status),
    });
    if (!downloadResult.downloaded) {
      return { repaired: false, message: downloadResult.message };
    }

    const { versions } = await fetchVersions({ versionType: 'archived' });
    const info = versions.find(v => v.identifier === versionIdentifier);
    if (!info) {
      throw new Error(`Version info not found for ${versionIdentifier}`);
    }

    const zipPath = path.join(directories.launcherCachePath, info.filename);
    const installDir = path.join(directories.launcherInstallPath, versionIdentifier);

    const zip = new StreamZip.async({ file: zipPath });
    const entries = (await zip.entries()) as Record<string, StreamZip.ZipEntry>;
    const totalEntries = Object.keys(entries).length || 1;
    let processed = 0;

    for (const entry of Object.values(entries)) {
      const target = path.join(installDir, entry.name);
      if (entry.isDirectory) {
        await fs.mkdir(target, { recursive: true });
      } else {
        let needsRepair = false;
        try {
          const stat = await fs.stat(target);
          if (stat.size !== entry.size) needsRepair = true;
        } catch {
          needsRepair = true;
        }
        if (needsRepair) {
          await fs.mkdir(path.dirname(target), { recursive: true });
          await zip.extract(entry.name, target);
        }
      }
      processed++;
      updateStatus?.({ status: 'Repairing files...', progress: (processed / totalEntries) * 100 });
    }

    await zip.close();
    return { repaired: true, message: 'Repair completed' };
  } catch (error: unknown) {
    const err = error as Error;
    return { repaired: false, message: `Repair failed: ${err.message}` };
  }
};
