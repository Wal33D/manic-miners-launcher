import * as fs from 'fs/promises';
import * as path from 'path';
import { getDirectories } from './fetchDirectories';
import { fetchVersions } from '../api/fetchVersions';
import { logger } from '../utils/logger';

export const deleteVersion = async ({
  versionIdentifier,
  updateStatus,
}: {
  versionIdentifier: string;
  updateStatus?: (statusObj: { status: string; progress: number }) => void;
}): Promise<{ deleted: boolean; message: string }> => {
  try {
    const directoriesResult = await getDirectories();
    if (!directoriesResult.status || !directoriesResult.directories) {
      throw new Error(`Failed to get directories: ${directoriesResult.message}`);
    }
    const { directories } = directoriesResult;
    const dirPath = path.join(directories.launcherInstallPath, versionIdentifier);

    // Check if directory exists
    try {
      await fs.access(dirPath);
    } catch {
      return { deleted: false, message: `Version ${versionIdentifier} not found` };
    }

    logger.info('DELETE', `Starting uninstall of ${versionIdentifier}`);

    // Send initial progress
    updateStatus?.({
      status: `Scanning ${versionIdentifier} installation...`,
      progress: 5,
      fileName: versionIdentifier,
    });

    // Get all files recursively
    const getAllFiles = async (dir: string): Promise<string[]> => {
      const files: string[] = [];
      const items = await fs.readdir(dir, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          const subFiles = await getAllFiles(fullPath);
          files.push(...subFiles);
          files.push(fullPath); // Add directory after its contents
        } else {
          files.push(fullPath);
        }
      }
      return files;
    };

    const allFiles = await getAllFiles(dirPath);
    const totalFiles = allFiles.length;

    logger.info('DELETE', `Found ${totalFiles} items to delete in ${versionIdentifier}`);

    updateStatus?.({
      status: `Removing ${totalFiles} files from ${versionIdentifier}...`,
      progress: 10,
      fileName: versionIdentifier,
    });

    // Delete files in batches of 10 with progress updates
    const BATCH_SIZE = 10;
    for (let i = 0; i < allFiles.length; i += BATCH_SIZE) {
      const batch = allFiles.slice(i, i + BATCH_SIZE);
      const progress = Math.floor((i / totalFiles) * 70) + 10; // 10-80% range

      // Process batch concurrently
      const batchPromises = batch.map(async filePath => {
        try {
          const stat = await fs.stat(filePath);
          if (stat.isDirectory()) {
            await fs.rmdir(filePath);
            return { path: filePath, type: 'directory', success: true };
          } else {
            await fs.unlink(filePath);
            return { path: filePath, type: 'file', success: true };
          }
        } catch (error: unknown) {
          logger.warn('DELETE', `Could not delete ${filePath}`, { error: error.message });
          return { path: filePath, type: 'error', success: false, error: error.message };
        }
      });

      const results = await Promise.all(batchPromises);

      // Report progress for the batch
      const successfulDeletions = results.filter(r => r.success);
      if (successfulDeletions.length > 0) {
        const lastFile = successfulDeletions[successfulDeletions.length - 1];
        const statusText =
          lastFile.type === 'directory' ? `Removed directory: ${path.basename(lastFile.path)}` : `Deleted: ${path.basename(lastFile.path)}`;

        updateStatus?.({
          status: `${statusText} (${i + successfulDeletions.length}/${totalFiles})`,
          progress,
          fileName: versionIdentifier,
        });
      }

      // Small delay to make progress visible
      await new Promise(resolve => setTimeout(resolve, 5));
    }

    // Remove the main directory
    try {
      await fs.rmdir(dirPath);
      updateStatus?.({
        status: `Removed ${versionIdentifier} directory`,
        progress: 85,
        fileName: versionIdentifier,
      });
      logger.info('DELETE', `Removed ${versionIdentifier} directory`, { dirPath });
    } catch (error: unknown) {
      logger.warn('DELETE', `Could not remove ${versionIdentifier} directory`, { error: error.message });
    }

    // Try to remove cached zip file
    let zipMessage = '';
    try {
      const { versions } = await fetchVersions({ versionType: 'archived' });
      const info = versions.find(v => v.identifier === versionIdentifier);
      if (info) {
        const zipPath = path.join(directories.launcherCachePath, info.filename);
        try {
          await fs.access(zipPath);
          updateStatus?.({
            status: `Removing cached file: ${info.filename}`,
            progress: 90,
            fileName: versionIdentifier,
          });
          await fs.rm(zipPath, { force: true });
          zipMessage = ` and cached file ${info.filename}`;
          logger.info('DELETE', `Removed cached file ${info.filename}`);
        } catch {
          // File might not exist
        }
      }
    } catch {
      // ignore if version info cannot be fetched
    }

    updateStatus?.({
      status: 'Uninstall completed successfully',
      progress: 100,
      fileName: versionIdentifier,
    });

    return { deleted: true, message: `Deleted ${dirPath}${zipMessage}` };
  } catch (error: unknown) {
    const err = error as Error;
    logger.error('DELETE', `Failed to delete version: ${err.message}`);
    return { deleted: false, message: `Failed to delete version: ${err.message}` };
  }
};
