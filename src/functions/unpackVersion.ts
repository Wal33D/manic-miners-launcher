import fs from 'fs';
import path from 'path';
import StreamZip from 'node-stream-zip';
import { fetchVersions } from '../api/fetchVersions';
import { createDirectory } from '../fileUtils/createDirectory';

/**
 * Unpacks a specified or the latest version of Manic Miners from a zip file into the installation directory.
 * It handles the creation of necessary directories during extraction and updates progress.
 * @param {string} [versionIdentifier] - Optional version identifier to unpack a specific version. If not provided, the latest version is used.
 * @param {Function} [updateStatus] - Optional function to update progress or send status messages.
 * @param {boolean} [overwriteExisting=false] - Indicates whether to unpack again if the directory already exists.
 * @returns An object indicating the success status and the full installation path with a message describing the outcome.
 */

export const unpackVersion = async ({
  versionIdentifier,
  installationDirectory = './installations',
  updateStatus,
  overwriteExisting = false,
}: {
  versionIdentifier?: string;
  installationDirectory?: string;
  updateStatus?: any;
  overwriteExisting?: boolean;
}): Promise<{
  unpacked: boolean;
  installPath: string;
  message: string;
}> => {
  let unpacked = false;
  let message = '';
  let installPath = '';

  try {
    if (updateStatus) updateStatus({ status: 'Starting the unpacking process...', progress: 10 });
    const { versions } = await fetchVersions({ versionType: 'all' });

    // Use identifier to find the specific version or fallback to the latest version
    const versionToUnpack = versions.find(v => v.identifier === versionIdentifier) || versions[0];
    if (!versionToUnpack) {
      throw new Error(`Failed to find the specified version: ${versionIdentifier}`);
    }

    const specificInstallPath = path.join(installationDirectory, versionToUnpack.identifier);
    if (fs.existsSync(specificInstallPath) && !overwriteExisting) {
      throw new Error(`Installation directory at ${specificInstallPath} already exists. Use overwriteExisting to unpack again.`);
    }

    if (!fs.existsSync(specificInstallPath)) {
      await createDirectory({ directory: specificInstallPath });
    }

    const zipFilePath = path.join(installationDirectory, versionToUnpack.filename);
    const zip = new StreamZip.async({ file: zipFilePath });

    const entries = await zip.entries();
    const totalFiles = Object.keys(entries).length;
    let extractedFiles = 0;

    if (updateStatus) updateStatus({ status: 'Extracting files...', progress: 30 });
    for (const entry of Object.values(entries)) {
      const fullPath = path.join(specificInstallPath, entry.name);
      if (entry.isDirectory) {
        await fs.promises.mkdir(fullPath, { recursive: true });
      } else {
        const dirPath = path.dirname(fullPath);
        if (!fs.existsSync(dirPath)) {
          await fs.promises.mkdir(dirPath, { recursive: true });
        }
        await zip.extract(entry.name, fullPath);
      }
      extractedFiles++;
      const progress = 30 + (extractedFiles / totalFiles) * 55; // Map extraction progress from 30% to 90%
      if (updateStatus) updateStatus({ progress });
    }
    await zip.close();

    if (updateStatus) updateStatus({ status: 'Unpacking completed successfully.', progress: 95 });
    unpacked = true;
    installPath = specificInstallPath;
    message = `Successfully unpacked ${versionToUnpack.title} into ${installPath}`;
    if (updateStatus) updateStatus({ status: message, progress: 100 });
  } catch (error: any) {
    message = `Error unpacking the zip file: ${error.message}`;
    if (updateStatus) updateStatus({ status: message, progress: 100 });
    unpacked = false;
  }

  return { unpacked, installPath, message };
};
