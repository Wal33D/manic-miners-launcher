import fs from 'fs/promises';
import path from 'path';
import { verifyFile } from '../fileUtils/fileOps';
import { fetchVersions } from '../api/fetchVersions';
import { validateUnpackPath } from './unpackHelpers';
import { downloadGame } from 'itchio-downloader';

export const downloadVersion = async ({
  versionIdentifier,
  downloadPath,
  updateStatus,
}: {
  versionIdentifier?: string;
  downloadPath: string;
  updateStatus: (status: import('../types/ipcMessages').ProgressStatus) => void;
}): Promise<{ downloaded: boolean; message: string }> => {
  updateStatus({ status: 'Starting download process...', progress: 2 });

  try {
    updateStatus({ status: 'Fetching version index...', progress: 7 });
    const versionData = await fetchVersions({});
    const versions = versionData.versions; // Ensure this is an array

    updateStatus({ progress: 5 });

    if (!Array.isArray(versions)) {
      throw new Error('Fetched versions data is not an array');
    }

    const versionToProcess = versions.find(v => v.identifier === versionIdentifier);
    if (!versionToProcess) {
      throw new Error(`Version ${versionIdentifier} not found.`);
    }

    updateStatus({ progress: 7 });

    const filename = versionToProcess.filename;
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext);
    const filePath = validateUnpackPath({ basePath: downloadPath, entryName: filename });

    // Remove any stale downloads to avoid "-1" suffixes added by the browser
    const potentialOldFiles = [
      filePath,
      `${filePath}.crdownload`,
      path.join(downloadPath, baseName),
      path.join(downloadPath, `${baseName}${ext}`),
    ];
    for (const oldFile of potentialOldFiles) {
      try {
        await fs.unlink(oldFile);
      } catch {
        // Ignore if the file doesn't exist
      }
    }

    updateStatus({ progress: 10, status: 'Verifying existing file...' });
    const fileDetails = await verifyFile({ filePath, expectedSize: versionToProcess.sizeInBytes });

    updateStatus({ status: `Verification complete: ${fileDetails.sizeMatches ? 'Success' : 'Failed'}`, progress: 15 });

    if (fileDetails.exists && fileDetails.sizeMatches) {
      updateStatus({ status: `File verified successfully. No action needed.`, progress: 17 });
      return { downloaded: true, message: 'File verified successfully. No action needed.' };
    } else {
      updateStatus({ status: fileDetails.exists ? 'File size mismatch, re-downloading.' : 'Downloading using itch.io...' });
      if (fileDetails.exists) {
        try {
          await fs.unlink(filePath);
        } catch {
          // Ignore failure to remove existing file
        }
      }
      const result = (await downloadGame({
        itchGameUrl: 'https://baraklava.itch.io/manic-miners',
        desiredFileName: baseName,
        downloadDirectory: downloadPath,
        onProgress: ({ bytesReceived, totalBytes }) => {
          if (totalBytes) {
            const progress = Math.floor((bytesReceived / totalBytes) * 80) + 20;
            updateStatus({ progress: progress > 100 ? 100 : progress });
          }
        },
      })) as { status: boolean; message: string };

      if (!result.status) {
        return { downloaded: false, message: result.message };
      }

      // Ensure the downloaded file has the expected name
      try {
        await fs.access(filePath);
      } catch {
        const files = await fs.readdir(downloadPath);
        const found = files.find(f => f.startsWith(baseName) && f.endsWith(ext));
        if (found) {
          await fs.rename(path.join(downloadPath, found), filePath);
        }
      }

      return { downloaded: true, message: result.message };
    }
  } catch (error) {
    updateStatus({ status: `Error: ${error.message}`, progress: 60 });
    return { downloaded: false, message: `Error downloading version: ${error.message}` };
  }
};
