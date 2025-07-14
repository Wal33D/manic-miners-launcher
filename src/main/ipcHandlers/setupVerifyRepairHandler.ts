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
        
        // Try new 'latest' directory first, then fall back to old naming scheme
        const latestPath = path.join(installDir, 'latest');
        const oldPath = path.join(installDir, `ManicMiners-Baraklava-V${version}`);
        
        let installPath = '';
        let exists = false;

        // Check for 'latest' directory first (new naming scheme)
        try {
          await fs.access(latestPath);
          installPath = latestPath;
          exists = true;
          console.log('Found installation in latest directory:', latestPath);
        } catch {
          // Fall back to old naming scheme
          try {
            await fs.access(oldPath);
            installPath = oldPath;
            exists = true;
            console.log('Found installation in legacy directory:', oldPath);
          } catch {
            exists = false;
          }
        }

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
