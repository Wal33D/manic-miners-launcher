import { ipcMain } from 'electron';
import { getDirectories } from '../../functions/fetchDirectories';
import { verifyAndRepairInstallation } from '../../functions/verifyAndRepairInstallation';
import { withIpcHandler } from './withIpcHandler';
import path from 'path';
import fs from 'fs/promises';

export const setupVerifyRepairHandler = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    ipcMain.on(
      'verify-and-repair-installation',
      withIpcHandler('verify-and-repair-installation', async (event, { version }) => {
        const { directories } = await getDirectories();
        const installDir = directories.launcherInstallPath;
        const cacheDir = directories.launcherCachePath;
        const identifier = `ManicMiners-Baraklava-V${version}`;
        const installPath = path.join(installDir, identifier);

        // Check if installation exists
        const exists = await fs
          .access(installPath)
          .then(() => true)
          .catch(() => false);

        if (!exists) {
          event.sender.send('verify-repair-progress', {
            status: 'Installation not found. Use Install Latest instead.',
            progress: 0,
          });
          return { success: false, message: 'Installation not found' };
        }

        // Ensure cache directory exists
        await fs.mkdir(cacheDir, { recursive: true });

        // Start verification and repair process
        const result = await verifyAndRepairInstallation({
          installPath,
          tempDir: cacheDir,
          version,
          onProgress: progressData => {
            event.sender.send('verify-repair-progress', progressData);
          },
        });

        if (result.success) {
          // Refresh the version information after successful repair
          event.sender.send('versions-updated');
        }

        return result;
      })
    );

    status = true;
    message = 'Verify and repair handler setup successfully';
  } catch (error) {
    console.error('Error setting up verify and repair handler:', error);
    message = `Error setting up verify and repair handler: ${error}`;
  }

  return { status, message };
};
