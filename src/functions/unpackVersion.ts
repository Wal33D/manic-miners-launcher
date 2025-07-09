import fs from 'fs';
import path from 'path';
import StreamZip from 'node-stream-zip';
import { fetchVersions } from '../api/fetchVersions';
import { createDirectory } from '../fileUtils/createDirectory';
import { validateUnpackPath, extractZipEntries, flattenSingleSubdirectory } from './unpackHelpers';

export const unpackVersion = async ({
  versionIdentifier,
  installationDirectory = './installations',
  updateStatus,
  overwriteExisting = false,
}: {
  versionIdentifier?: string;
  installationDirectory?: string;
  updateStatus?: (status: import('../types/ipcMessages').ProgressStatus) => void;
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
    await extractZipEntries({
      zip,
      targetPath: specificInstallPath,
      updateStatus: status => {
        if (updateStatus) {
          updateStatus({
            status: status.status,
            progress: 60 + (status.progress ?? 0) * 0.95,
          });
        }
      },
    });
    await zip.close();

    await flattenSingleSubdirectory(specificInstallPath);

    const message = `Successfully unpacked ${versionToUnpack.title} into ${specificInstallPath}`;
    if (updateStatus) updateStatus({ status: 'Unpacking completed successfully.', progress: 100 });
    return { unpacked: true, installPath: specificInstallPath, message };
  } catch (error: unknown) {
    await zip.close().catch((): void => undefined);
    const err = error as Error;
    const message = `Error unpacking the zip file: ${err.message}`;
    if (updateStatus) updateStatus({ status: message, progress: 100 });
    throw new Error(message);
  }
};
