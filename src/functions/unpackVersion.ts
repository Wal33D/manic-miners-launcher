import fs from 'fs';
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
  if (updateStatus) updateStatus({ status: 'Starting the unpacking process...', progress: 60 });
  const { versions } = await fetchVersions({ versionType: 'all' });

  const versionToUnpack = versions.find(v => v.identifier === versionIdentifier) || versions[0];
  if (!versionToUnpack) {
    throw new Error(`Failed to find the specified version: ${versionIdentifier}`);
  }

  const specificInstallPath = path.join(installationDirectory, versionToUnpack.identifier);
  let dirExists = false;
  try {
    await fs.promises.access(specificInstallPath);
    dirExists = true;
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

  try {
    const entries = await zip.entries();
    const totalFiles = Object.keys(entries).length;
    let extractedFiles = 0;

    for (const entry of Object.values(entries)) {
      const entryName = entry.name;
      const resolvedPath = path.resolve(specificInstallPath, entryName);

      if (entryName.includes('..') || path.isAbsolute(entryName) || !resolvedPath.startsWith(path.resolve(specificInstallPath))) {
        throw new Error(`Invalid entry path detected: ${entryName}`);
      }

      const fullPath = path.join(specificInstallPath, entryName);
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
      if (updateStatus) {
        updateStatus({ status: 'Extracting files...', progress: 60 + (extractedFiles / totalFiles) * 95 });
      }
    }
    await zip.close();

    // Check for nested directory structure and flatten if necessary
    const dirEntries = await fs.promises.readdir(specificInstallPath);
    const subdirectories: string[] = [];
    for (const subDir of dirEntries) {
      const stat = await fs.promises.stat(path.join(specificInstallPath, subDir));
      if (stat.isDirectory()) {
        subdirectories.push(subDir);
      }
    }
    if (subdirectories.length === 1) {
      const nestedDir = path.join(specificInstallPath, subdirectories[0]);
      const nestedFiles = await fs.promises.readdir(nestedDir);
      for (const file of nestedFiles) {
        await fs.promises.rename(path.join(nestedDir, file), path.join(specificInstallPath, file));
      }
      await fs.promises.rmdir(nestedDir);
    }

    const message = `Successfully unpacked ${versionToUnpack.title} into ${specificInstallPath}`;
    if (updateStatus) updateStatus({ status: 'Unpacking completed successfully.', progress: 100 });
    return { unpacked: true, installPath: specificInstallPath, message };
  } catch (error: any) {
    await zip.close().catch((): void => undefined);
    const message = `Error unpacking the zip file: ${error.message}`;
    if (updateStatus) updateStatus({ status: message, progress: 100 });
    throw new Error(message);
  }
};
