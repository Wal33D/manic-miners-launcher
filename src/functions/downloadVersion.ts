import path from 'path';
import { verifyFile } from '../fileUtils/verifyFile';
import { downloadFile } from './downloadFile';
import { fetchVersions } from '../api/fetchVersions';

export const downloadVersion = async ({
  versionIdentifier,
  downloadPath,
  updateStatus,
}: {
  versionIdentifier?: string;
  downloadPath: string;
  updateStatus: any;
}): Promise<{ downloaded: boolean; message: string }> => {
  updateStatus({ status: 'Starting download process...', progress: 2 });

  try {
    updateStatus({ status: 'Fetching version index...', progress: 7 });
    const versionData = await fetchVersions({});
    const versions = versionData.versions; // Ensure this is an array

    updateStatus({ progress: 5 });
    console.log('Available versions:', versions); // Debug: Log available versions

    if (!Array.isArray(versions)) {
      throw new Error('Fetched versions data is not an array');
    }

    const versionToProcess = versions.find(v => v.identifier === versionIdentifier);
    if (!versionToProcess) {
      throw new Error(`Version ${versionIdentifier} not found.`);
    }

    updateStatus({ progress: 7 });

    const filename = versionToProcess.filename;
    const filePath = path.join(downloadPath, filename);
    const downloadUrl = versionToProcess.downloadUrl;

    updateStatus({ progress: 10, status: 'Verifying existing file...' });
    const fileDetails = await verifyFile({ filePath, expectedSize: versionToProcess.sizeInBytes });

    updateStatus({ status: `Verification complete: ${fileDetails.sizeMatches ? 'Success' : 'Failed'}`, progress: 15 });

    if (fileDetails.exists && fileDetails.sizeMatches) {
      updateStatus({ status: `File verified successfully. No action needed.`, progress: 17 });
      return { downloaded: true, message: 'File verified successfully. No action needed.' };
    } else {
      updateStatus({ status: fileDetails.exists ? 'File size mismatch, re-downloading.' : 'Archive does not exist, initiating download.' });
      const downloadResult = await downloadFile({
        downloadUrl,
        filePath,
        expectedSize: versionToProcess.sizeInBytes,
        updateStatus,
        initialProgress: 20,
      });
      return { downloaded: downloadResult.status, message: downloadResult.message };
    }
  } catch (error) {
    updateStatus({ status: `Error: ${error.message}`, progress: 60 });
    return { downloaded: false, message: `Error downloading version: ${error.message}` };
  }
};
