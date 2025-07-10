import path from 'path';
import { downloadFile } from './downloadFile';

export async function downloadLevel({
  downloadUrl,
  levelIdentifier,
  levelsPath,
  updateStatus,
}: {
  downloadUrl: string;
  levelIdentifier: string;
  levelsPath: string;
  updateStatus?: (status: import('../types/ipcMessages').ProgressStatus) => void;
}): Promise<{ status: boolean; message: string }> {
  updateStatus?.({ status: 'Starting level download...', progress: 2 });

  const match = levelIdentifier.match(/^ManicMiners-level-(?:\d{4}-)?(.+)$/);
  const datName = match ? match[1] : levelIdentifier;
  const datUrl = `${downloadUrl}/${datName}.dat`;
  const datPath = path.join(levelsPath, `${datName}.dat`);

  const downloadResult = await downloadFile({
    downloadUrl: datUrl,
    filePath: datPath,
    updateStatus,
    initialProgress: 5,
  });

  if (!downloadResult.status) {
    return { status: false, message: downloadResult.message };
  }

  updateStatus?.({ status: 'Level downloaded.', progress: 100 });
  return { status: true, message: 'Level downloaded successfully.' };
}
