import { downloadGame } from 'itchio-downloader';
import type { ProgressStatus } from '../types/ipcMessages';

export async function downloadLatestItch({
  downloadPath,
  updateStatus,
}: {
  downloadPath: string;
  updateStatus: (status: ProgressStatus) => void;
}): Promise<{ downloaded: boolean; filePath?: string; message: string }> {
  try {
    const result = (await downloadGame({
      itchGameUrl: 'https://baraklava.itch.io/manic-miners',
      desiredFileName: 'ManicMiners-Latest',
      downloadDirectory: downloadPath,
      onProgress: ({ bytesReceived, totalBytes, fileName }) => {
        const progress = totalBytes ? (bytesReceived / totalBytes) * 100 : undefined;
        updateStatus({ progress, fileName, totalSize: totalBytes });
      },
    })) as { status: boolean; message: string; filePath?: string };

    return { downloaded: result.status, filePath: result.filePath, message: result.message };
  } catch (err) {
    const error = err as Error;
    return { downloaded: false, message: error.message };
  }
}
