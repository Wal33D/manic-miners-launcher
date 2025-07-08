import fs from 'fs';
import path from 'path';
import StreamZip from 'node-stream-zip';
import { downloadFile } from './downloadFile';
import { extractZipEntries } from './unpackHelpers';

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
    await extractZipEntries({
      zip,
      targetPath: levelsPath,
      updateStatus: status => {
        updateStatus?.({
          status: status.status,
          progress: 60 + (status.progress ?? 0) * 0.4,
        });
      },
    });
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
