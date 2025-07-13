import { downloadVersion } from './downloadVersion';
import { unpackVersion } from './unpackVersion';
import { deleteVersion } from './deleteVersion';
import { getDirectories } from './fetchDirectories';

export const reinstallVersion = async ({
  versionIdentifier,
  updateStatus,
}: {
  versionIdentifier: string;
  updateStatus?: (status: import('../types/ipcMessages').ProgressStatus) => void;
}): Promise<{ reinstalled: boolean; message: string }> => {
  try {
    await deleteVersion({ versionIdentifier });

    const { directories } = await getDirectories();

    const downloadResult = await downloadVersion({
      versionIdentifier,
      downloadPath: directories.launcherCachePath,
      updateStatus,
    });
    if (!downloadResult.downloaded) {
      return { reinstalled: false, message: downloadResult.message };
    }

    const unpackResult = await unpackVersion({
      versionIdentifier,
      installationDirectory: directories.launcherInstallPath,
      updateStatus,
      overwriteExisting: true,
    });

    if (!unpackResult.unpacked) {
      return { reinstalled: false, message: unpackResult.message };
    }

    return { reinstalled: true, message: unpackResult.message };
  } catch (error: unknown) {
    const err = error as Error;
    return { reinstalled: false, message: `Reinstall failed: ${err.message}` };
  }
};
