import { deleteVersion } from './deleteVersion';
import { downloadVersion } from './downloadVersion';
import { unpackVersion } from './unpackVersion';

export const reinstallVersion = async ({
  versionIdentifier,
  downloadPath,
  updateStatus,
}: {
  versionIdentifier: string;
  downloadPath: string;
  updateStatus: (status: import('../types/ipcMessages').ProgressStatus) => void;
}): Promise<{ reinstalled: boolean; message: string }> => {
  const deleteResult = await deleteVersion({ versionIdentifier });
  if (!deleteResult.deleted) {
    return { reinstalled: false, message: deleteResult.message };
  }

  const downloadResult = await downloadVersion({
    versionIdentifier,
    downloadPath,
    updateStatus,
  });

  if (!downloadResult.downloaded) {
    return { reinstalled: false, message: downloadResult.message };
  }

  const unpackResult = await unpackVersion({
    versionIdentifier,
    installationDirectory: downloadPath,
    updateStatus,
    overwriteExisting: true,
  });

  if (!unpackResult.unpacked) {
    return { reinstalled: false, message: unpackResult.message };
  }

  return { reinstalled: true, message: unpackResult.message };
};
