import fs from 'fs/promises';
import path from 'path';
import StreamZip from 'node-stream-zip';
import { downloadGame } from 'itchio-downloader';
import { getDirectories } from './fetchDirectories';
import { extractZipEntries, flattenSingleSubdirectory } from './unpackHelpers';
import Store from 'electron-store';

const ITCH_URL = 'https://baraklava.itch.io/manic-miners';
const VERSION_REGEX = /Last updated:\s*\d{4}-\d{2}-\d{2} \(([^)]+)\)/i;

export async function checkItchUpdate(updateStatus?: (s: { status: string; progress: number }) => void): Promise<void> {
  try {
    const page = await fetch(ITCH_URL).then(r => r.text());
    const match = page.match(VERSION_REGEX);
    if (!match) return;

    const version = match[1].replace(/[^0-9.]/g, '');
    const identifier = `ManicMiners-Baraklava-V${version}`;

    const store = new Store();
    const lastVersion = store.get('last-known-version');
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
      store.set('last-known-version', version);
      return;
    }

    if (updateStatus) updateStatus({ status: 'Downloading latest version...', progress: 5 });
    const result = (await downloadGame({
      itchGameUrl: ITCH_URL,
      desiredFileName: identifier,
      downloadDirectory: cacheDir,
      onProgress: info => {
        if (info.totalBytes && updateStatus) {
          const pct = Math.floor((info.bytesReceived / info.totalBytes) * 40);
          updateStatus({ status: 'Downloading latest version...', progress: pct });
        }
      },
    })) as { status: boolean; message: string; filePath?: string };

    if (!result.status || !result.filePath) throw new Error(result.message);

    await fs.mkdir(installPath, { recursive: true });
    const zip = new StreamZip.async({ file: result.filePath });
    await extractZipEntries({
      zip,
      targetPath: installPath,
      updateStatus: s => {
        if (updateStatus) updateStatus({ status: s.status, progress: 40 + (s.progress ?? 0) * 0.6 });
      },
    });
    await zip.close();
    await flattenSingleSubdirectory(installPath);

    store.set('last-known-version', version);
    if (updateStatus) updateStatus({ status: 'Update installed', progress: 100 });
  } catch (err) {
    console.error('Failed to check Itch.io update:', err);
  }
}
