import fs from 'fs';
import fetch from 'node-fetch';
import { Transform } from 'stream';

/**
 * Downloads a file from a given URL to a specified path, optionally updates progress starting from a given initial progress value.
 * Parameters are passed as an object to facilitate easy updates and readability.
 * @param {object} params - The parameters object containing all necessary data.
 * @param {string} params.downloadUrl - URL from which to download the file.
 * @param {string} params.filePath - The path where the file will be saved.
 * @param {number} params.expectedSize - Expected size of the downloaded file.
 * @param {Function} [params.updateStatus] - Optional function to update progress or send status messages.
 * @param {number} [params.initialProgress=0] - The initial progress value from which to start progress updates, defaults to 0.
 * @returns {Promise<{ status: boolean; message: string }>}
 */
export async function downloadFile({
  downloadUrl,
  filePath,
  expectedSize,
  updateStatus,
  initialProgress = 0,
}: {
  downloadUrl: string;
  filePath: string;
  expectedSize?: number;
  updateStatus?: (status: any) => void;
  initialProgress?: number;
}): Promise<{ status: boolean; message: string }> {
  try {
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      return { status: false, message: `HTTP error while downloading: status ${response.status}` };
    }

    const totalBytes = parseInt(response.headers.get('content-length') || '0');
    let downloadedBytes = 0;

    const progressStream = new Transform({
      transform(chunk, encoding, callback) {
        downloadedBytes += chunk.length;
        if (updateStatus) {
          // Check if updateStatus is provided before calling it
          const progressIncrement = (downloadedBytes / totalBytes) * (100 - initialProgress);
          const currentProgress = initialProgress + progressIncrement;
          updateStatus({ progress: Math.min(Math.floor(currentProgress), 100) }); // Ensure progress does not exceed 100
        }
        callback(null, chunk);
      },
    });

    const fileStream = fs.createWriteStream(filePath);
    await new Promise<void>((resolve, reject) => {
      response.body
        .pipe(progressStream)
        .pipe(fileStream)
        .on('error', reject)
        .on('finish', () => {
          resolve();
        });
    });

    const stats = fs.statSync(filePath);
    if (stats.size !== expectedSize) {
      fs.unlinkSync(filePath);
      return {
        status: false,
        message: `Downloaded file size does not match expected size. Expected: ${expectedSize} bytes, Got: ${stats.size} bytes`,
      };
    }

    return { status: true, message: 'File downloaded and verified successfully.' };
  } catch (error: any) {
    return { status: false, message: `Error during download: ${error.message}` };
  }
}
