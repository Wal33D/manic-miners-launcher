import fs from 'fs';
import { Transform, Readable } from 'stream';
import crypto from 'crypto';

/**
 * Downloads a file from a given URL to a specified path, optionally updates progress starting from a given initial progress value.
 * Parameters are passed as an object to facilitate easy updates and readability.
 * @param {object} params - The parameters object containing all necessary data.
 * @param {string} params.downloadUrl - URL from which to download the file.
 * @param {string} params.filePath - The path where the file will be saved.
 * @param {number} params.expectedSize - Expected size of the downloaded file.
 * @param {string} [params.expectedMd5] - Expected MD5 hash of the file.
 * @param {Function} [params.updateStatus] - Optional function to update progress or send status messages.
 * @param {number} [params.initialProgress=0] - The initial progress value from which to start progress updates, defaults to 0.
 * @returns {Promise<{ status: boolean; message: string }>}
 */
export async function downloadFile({
  downloadUrl,
  filePath,
  expectedSize,
  expectedMd5,
  updateStatus,
  initialProgress = 0,
}: {
  downloadUrl: string;
  filePath: string;
  expectedSize?: number;
  expectedMd5?: string;
  updateStatus?: (status: import('../types/ipcMessages').ProgressStatus) => void;
  initialProgress?: number;
}): Promise<{ status: boolean; message: string }> {
  try {
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      return { status: false, message: `HTTP error while downloading: status ${response.status}` };
    }

    const totalBytesHeader = response.headers.get('content-length');
    const totalBytes = totalBytesHeader ? parseInt(totalBytesHeader) : 0;
    let downloadedBytes = 0;

    const progressStream = new Transform({
      transform(chunk, encoding, callback) {
        downloadedBytes += chunk.length;
        if (updateStatus) {
          // Use expectedSize or bytes received when Content-Length is missing
          // Progress is capped at 100
          const denominator = totalBytes || expectedSize || downloadedBytes || 1;
          const progressIncrement = (downloadedBytes / denominator) * (100 - initialProgress);
          const currentProgress = initialProgress + progressIncrement;
          updateStatus({ progress: Math.min(Math.floor(currentProgress), 100) });
        }
        callback(null, chunk);
      },
    });

    const fileStream = fs.createWriteStream(filePath);
    const readable = Readable.fromWeb(response.body as any);
    await new Promise<void>((resolve, reject) => {
      readable
        .pipe(progressStream)
        .pipe(fileStream)
        .on('error', reject)
        .on('finish', () => {
          resolve();
        });
    });

    const stats = await fs.promises.stat(filePath);
    if (expectedSize !== undefined && stats.size !== expectedSize) {
      await fs.promises.unlink(filePath);
      return {
        status: false,
        message: `Downloaded file size does not match expected size. Expected: ${expectedSize} bytes, Got: ${stats.size} bytes`,
      };
    }

    if (expectedMd5) {
      const buffer = await fs.promises.readFile(filePath);
      const hash = crypto.createHash('md5').update(buffer).digest('hex');
      if (hash !== expectedMd5) {
        await fs.promises.unlink(filePath);
        return { status: false, message: 'MD5 checksum mismatch.' };
      }
    }

    return { status: true, message: 'File downloaded and verified successfully.' };
  } catch (error: unknown) {
    const err = error as Error;
    return { status: false, message: `Error during download: ${err.message}` };
  }
}
