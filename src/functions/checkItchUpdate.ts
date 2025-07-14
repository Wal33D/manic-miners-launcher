import fs from 'fs/promises';
import path from 'path';
import StreamZip from 'node-stream-zip';
import { downloadGame } from 'itchio-downloader';
import { downloadFile } from './downloadFile';
import { fetchVersions } from '../api/fetchVersions';
import { getDirectories } from './fetchDirectories';
import { extractZipEntries, flattenSingleSubdirectory } from './unpackHelpers';
import Store from 'electron-store';
import { logger } from '../utils/logger';

const ITCH_URL = 'https://baraklava.itch.io/manic-miners';
const VERSION_REGEX = /Last updated:\s*\d{4}-\d{2}-\d{2} \(([^)]+)\)/i;

export async function checkItchUpdate(updateStatus?: (s: { status: string; progress: number }) => void): Promise<void> {
  try {
    const page = await fetch(ITCH_URL).then(r => r.text());
    const match = page.match(VERSION_REGEX);
    if (!match) return;

    const version = match[1].replace(/[^0-9.]/g, '');
    const identifier = `ManicMiners-Baraklava-V${version}`;

    const store = new Store() as any;
    const lastVersion = store.get('last-known-version') as string;
    if (lastVersion === version) return;

    const { directories } = await getDirectories();
    const installDir = directories.launcherInstallPath;
    const cacheDir = directories.launcherCachePath;
    const installPath = path.join(installDir, identifier);

    const exists = await fs
      .access(installPath)
      .then(() => true)
      .catch(() => false);
    if (exists) {
      (store as any).set('last-known-version', version);
      return;
    }

    if (updateStatus) updateStatus({ status: 'Downloading latest version...', progress: 5 });

    const versions = await fetchVersions({ versionType: 'archived' });
    const info = versions.versions.find(v => v.identifier === identifier);
    if (!info) throw new Error('Version info not found');

    const filePath = path.join(cacheDir, info.filename);
    const result = await downloadFile({
      downloadUrl: info.downloadUrl,
      filePath,
      expectedSize: info.sizeInBytes,
      expectedMd5: info.md5Hash,
      updateStatus: updateStatus ? s => updateStatus({ status: s.status || '', progress: s.progress }) : undefined,
      initialProgress: 5,
    });

    if (!result.status) throw new Error(result.message);

    await fs.mkdir(installPath, { recursive: true });
    const zip = new StreamZip.async({ file: filePath });
    await extractZipEntries({
      zip,
      targetPath: installPath,
      updateStatus: s => {
        if (updateStatus) updateStatus({ status: s.status, progress: 40 + (s.progress ?? 0) * 0.6 });
      },
    });
    await zip.close();
    await flattenSingleSubdirectory(installPath);

    (store as any).set('last-known-version', version);
    if (updateStatus) updateStatus({ status: 'Update installed', progress: 100 });
  } catch (err) {
    logger.error('UPDATE', 'Failed to check Itch.io update', { error: err.message }, err);
  }
}
