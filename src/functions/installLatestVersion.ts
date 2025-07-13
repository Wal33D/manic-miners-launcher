import fs from 'fs/promises';
import path from 'path';
import StreamZip from 'node-stream-zip';
import { fetchLatestItchCatalog } from '../api/fetchLatestItchCatalog';
import { getDirectories } from './fetchDirectories';
import { extractZipEntries, flattenSingleSubdirectory } from './unpackHelpers';

export async function installLatestVersion({
  updateStatus,
}: {
  updateStatus?: (status: import('../types/ipcMessages').ProgressStatus) => void;
} = {}): Promise<{ installed: boolean; message: string }> {
  try {
    updateStatus?.({ status: 'Fetching latest metadata...', progress: 0 });
    const result = await fetchLatestItchCatalog();
    if (!result.status || !result.catalog) {
      return { installed: false, message: result.message };
    }

    const { directories } = await getDirectories();
    const installDir = path.join(directories.launcherInstallPath, 'latest');

    await fs.rm(installDir, { recursive: true, force: true });
    await fs.mkdir(installDir, { recursive: true });

    const zip = new StreamZip.async({ file: result.catalog.localFilePath });
    await extractZipEntries({
      zip,
      targetPath: installDir,
      updateStatus: s => {
        updateStatus?.({ status: s.status, progress: 10 + (s.progress ?? 0) * 0.9 });
      },
    });
    await zip.close();
    await flattenSingleSubdirectory(installDir);

    updateStatus?.({ status: 'Installation complete', progress: 100 });
    return { installed: true, message: 'Latest version installed.' };
  } catch (err: any) {
    return { installed: false, message: `Failed to install latest version: ${err.message}` };
  }
}
