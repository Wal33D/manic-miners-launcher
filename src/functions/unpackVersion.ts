import fs from 'fs';
const { access, mkdir, stat, readdir, rename, rmdir } = fs.promises;
import path from 'path';
import StreamZip from 'node-stream-zip';
import { fetchVersions } from '../api/fetchVersions';
import { createDirectory } from '../fileUtils/createDirectory';

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
    if (updateStatus) updateStatus({ status: 'Starting the unpacking process...', progress: 60 });
    const { versions } = await fetchVersions({ versionType: 'all' });

    const versionToUnpack = versions.find(v => v.identifier === versionIdentifier) || versions[0];
    if (!versionToUnpack) {
      throw new Error(`Failed to find the specified version: ${versionIdentifier}`);
    }

    const specificInstallPath = path.join(installationDirectory, versionToUnpack.identifier);
    let dirExists = true;
    try {
      await access(specificInstallPath);
    } catch {
      dirExists = false;
    }

    if (dirExists && !overwriteExisting) {
      throw new Error(`Installation directory at ${specificInstallPath} already exists. Use overwriteExisting to unpack again.`);
    }

    if (!dirExists) {
      await createDirectory({ directory: specificInstallPath });
    }

    const zipFilePath = path.join(installationDirectory, versionToUnpack.filename);
    const zip = new StreamZip.async({ file: zipFilePath });

    const entries = await zip.entries();
    const totalFiles = Object.keys(entries).length;
    let extractedFiles = 0;

    for (const entry of Object.values(entries)) {
      const fullPath = path.join(specificInstallPath, entry.name);
        if (entry.isDirectory) {
          await mkdir(fullPath, { recursive: true });
      } else {
        const dirPath = path.dirname(fullPath);
        try {
          await access(dirPath);
        } catch {
          await mkdir(dirPath, { recursive: true });
        }
        await zip.extract(entry.name, fullPath);
      }
      extractedFiles++;
      if (updateStatus) updateStatus({ status: 'Extracting files...', progress: 60 + (extractedFiles / totalFiles) * 95 });
    }
    await zip.close();

    // Check for nested directory structure and flatten if necessary
    const dirEntries = await readdir(specificInstallPath);
    const subdirectories: string[] = [];
    for (const subDir of dirEntries) {
      const statInfo = await stat(path.join(specificInstallPath, subDir));
      if (statInfo.isDirectory()) {
        subdirectories.push(subDir);
      }
    }
    if (subdirectories.length === 1) {
      const nestedDir = path.join(specificInstallPath, subdirectories[0]);
      const nestedFiles = await readdir(nestedDir);
      for (const file of nestedFiles) {
        await rename(path.join(nestedDir, file), path.join(specificInstallPath, file));
      }
      await rmdir(nestedDir);
    }

    unpacked = true;
    installPath = specificInstallPath;
    message = `Successfully unpacked ${versionToUnpack.title} into ${installPath}`;
    if (updateStatus) updateStatus({ status: 'Unpacking completed successfully.', progress: 100 });
  } catch (error: any) {
    message = `Error unpacking the zip file: ${error.message}`;
    if (updateStatus) updateStatus({ status: message, progress: 100 });
    unpacked = false;
  }

  return { unpacked, installPath, message };
};
