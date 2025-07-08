import fs from 'fs';
import path from 'path';
import StreamZip from 'node-stream-zip';
import { downloadFile } from './downloadFile';

export async function downloadLevel({
  downloadUrl,
  levelIdentifier,
  levelsPath,
  updateStatus,
}: {
  downloadUrl: string;
  levelIdentifier: string;
  levelsPath: string;
  updateStatus?: (status: any) => void;
}): Promise<{ status: boolean; message: string }> {
  updateStatus?.({ status: 'Starting level download...', progress: 2 });
  const zipPath = path.join(levelsPath, `${levelIdentifier}.zip`);

  const downloadResult = await downloadFile({
    downloadUrl,
    filePath: zipPath,
    updateStatus,
    initialProgress: 5,
  });

  if (!downloadResult.status) {
    return { status: false, message: downloadResult.message };
  }

  updateStatus?.({ status: 'Unpacking level...', progress: 60 });
  const zip = new StreamZip.async({ file: zipPath });
  try {
    const entries = await zip.entries();
    const totalFiles = Object.keys(entries).length || 1;
    let extractedFiles = 0;

    for (const entry of Object.values(entries)) {
      const entryName = entry.name;
      const resolvedPath = path.resolve(levelsPath, entryName);

      if (entryName.includes('..') || path.isAbsolute(entryName) || !resolvedPath.startsWith(path.resolve(levelsPath))) {
        throw new Error(`Invalid entry path detected: ${entryName}`);
      }

      const fullPath = path.join(levelsPath, entryName);
      if (entry.isDirectory) {
        await fs.promises.mkdir(fullPath, { recursive: true });
      } else {
        const dirPath = path.dirname(fullPath);
        try {
          await fs.promises.access(dirPath);
        } catch {
          await fs.promises.mkdir(dirPath, { recursive: true });
        }
        await zip.extract(entry.name, fullPath);
      }
      extractedFiles++;
      updateStatus?.({
        status: 'Unpacking level...',
        progress: 60 + (extractedFiles / totalFiles) * 40,
      });
    }
    await zip.close();
    await fs.promises.unlink(zipPath).catch((): void => undefined);
    updateStatus?.({ status: 'Level installed.', progress: 100 });
    return { status: true, message: 'Level downloaded and unpacked successfully.' };
  } catch (error: unknown) {
    await zip.close().catch((): void => undefined);
    const err = error as Error;
    return { status: false, message: `Error unpacking level: ${err.message}` };
  }
}
