import path from 'path';
import os from 'os'; // Import the os module

import { verifyFile } from '../fileUtils/verifyFile';
import { IFileDetails } from '../fileUtils/fileUtilsTypes';
import { downloadFile } from './downloadFile';
import { fetchVersions } from '../api/fetchVersions';

/**
 * Handles the logic to fetch file details and triggers the download process.
 * @param {string} [version] - The optional version identifier.
 * @param {string} downloadPath - The directory path where the file should be downloaded.
 * @param {UpdateStatus} updateStatus - Function to update progress or send status messages.
 * @returns {Promise<{ downloaded: boolean; message: string }>}
 */

export const downloadVersion = async ({
  version,
  downloadPath = path.join(os.tmpdir()), // Use OS temp directory with a subfolder for organization
  updateStatus,
}: {
  version?: string;
  downloadPath?: string;
  updateStatus: any;
}): Promise<{ downloaded: boolean; message: string }> => {
  let finalMessage = '';
  let finalStatus = true;
  updateStatus({ status: 'Starting download process...', progress: 2 });
  console.log(version);
  console.log(version);

  console.log(version);

  try {
    updateStatus({ status: 'Fetching version index...', progress: 7 });
    const { status, versions, message } = await fetchVersions();

    if (!status) {
      throw new Error(`Failed to retrieve results: ${message}`);
    }
    updateStatus({ progress: 12 });

    let versionToProcess;
    if (version) {
      versionToProcess = versions.find((v: { version: string | string[] }) => v.version.includes(version));
      if (!versionToProcess) {
        throw new Error(`Version ${version} not found.`);
      }
    } else {
      versionToProcess = versions[0];
    }
    updateStatus({ progress: 15 });

    const filename = versionToProcess.filename;
    const filePath = path.join(downloadPath, filename);
    const downloadUrl = versionToProcess.downloadUrl;
    // Check if the file exists and if it matches the expected size
    updateStatus({ progress: 24, status: 'Verifying existing file...' });
    const fileDetails = (await verifyFile({ filePath, expectedSize: versionToProcess.sizeInBytes })) as IFileDetails;
    console.log(fileDetails);
    updateStatus({ status: `Verification complete: ${fileDetails.sizeMatches ? 'Success' : 'Failed'}`, progress: 32 });

    if (fileDetails.exists && fileDetails.sizeMatches) {
      updateStatus({ status: `Path: ${fileDetails.pathFull}`, progress: 35 });
      const successMessage = `File verified successfully. No action needed.`;
      updateStatus({ status: successMessage, progress: 35 });
      finalStatus = true; // Indicates successful verification
    } else {
      if (fileDetails.exists && !fileDetails.sizeMatches) {
        updateStatus({
          status: `File size mismatch, expected size ${versionToProcess.sizeInBytes} bytes`,
        });
        updateStatus({
          status: `Attempting to re-download the archive.`,
        });
      } else {
        updateStatus({ status: 'Archive does not exist, initiating download.' });
      }
      updateStatus({ progress: 37, status: 'Downloading version archive...' });
      const downloadResult = await downloadFile({
        downloadUrl,
        filePath,
        expectedSize: versionToProcess.sizeInBytes,
        updateStatus,
        initialProgress: 37,
      });
      console.log(downloadResult);
      finalMessage = downloadResult.message;
      finalStatus = downloadResult.status;
    }
  } catch (error: any) {
    finalMessage = `Error: ${error.message}`;
    finalStatus = false;
  } finally {
    updateStatus({ progress: 100, status: finalMessage });
    return { downloaded: finalStatus, message: finalMessage };
  }
};
