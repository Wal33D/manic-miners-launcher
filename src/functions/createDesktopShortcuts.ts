import * as os from 'os';
import * as path from 'path';
import { createShortcut } from '../fileUtils/createShortcut';
import { ensureDirectory } from '../fileUtils/fileOps';
import { findLatestVersionPath } from '../fileUtils/findLatestVersionPath';
import { logger } from '../utils/logger';

export const createDesktopShortcuts = async ({
  installPath,
  createExeShortcut = true,
  createDirShortcut = true,
}: {
  installPath?: string;
  createExeShortcut?: boolean;
  createDirShortcut?: boolean;
}): Promise<{ status: boolean; filePaths: string[] }> => {
  let status = true;
  const filePaths: string[] = [];

  try {
    if (!installPath) {
      const baseInstallDir = path.join(os.homedir(), 'Desktop', 'map-generator-master', 'installations');
      installPath = await findLatestVersionPath(baseInstallDir);
    }

    // Get platform-specific paths
    const desktopPath = path.join(os.homedir(), 'Desktop');
    let startMenuPath: string;
    let extrasFolderPath: string;

    if (process.platform === 'win32') {
      startMenuPath = path.join(os.homedir(), 'AppData', 'Roaming', 'Microsoft', 'Windows', 'Start Menu', 'Programs');
      extrasFolderPath = path.join(startMenuPath, 'Manic Miners Extras');
    } else if (process.platform === 'darwin') {
      startMenuPath = path.join(os.homedir(), 'Applications');
      extrasFolderPath = path.join(startMenuPath, 'Manic Miners Extras');
    } else {
      // Linux
      startMenuPath = path.join(os.homedir(), '.local', 'share', 'applications');
      extrasFolderPath = startMenuPath; // Desktop entries go directly in applications folder
    }

    await ensureDirectory({ directory: extrasFolderPath });

    // Shortcut creation for executable and directories
    if (createExeShortcut) {
      try {
        const executableName = path.basename(installPath, path.extname(installPath));
        const result = await createShortcut({
          startPath: desktopPath,
          name: executableName,
          type: 'file',
          options: {
            target: installPath,
            desc: 'Manic Miners Game',
            workingDir: path.dirname(installPath),
          },
        });
        if (result.created) {
          filePaths.push(result.message);
        } else {
          logger.warn('SHORTCUTS', 'Failed to create desktop executable shortcut', { message: result.message });
          status = false;
        }
      } catch (error: unknown) {
        const err = error as Error;
        logger.error('SHORTCUTS', 'Error creating desktop executable shortcut', { error: err.message });
        status = false;
      }
    }

    if (createDirShortcut) {
      try {
        const dirName = 'Manic Miners Install Directory';
        const result = await createShortcut({
          startPath: desktopPath,
          name: dirName,
          type: 'directory',
          options: {
            target: path.dirname(installPath),
            icon: installPath,
            workingDir: path.dirname(installPath),
            desc: 'Manic Miners installation directory',
          },
        });
        if (result.created) {
          filePaths.push(result.message);
        } else {
          logger.warn('SHORTCUTS', 'Failed to create desktop directory shortcut', { message: result.message });
          status = false;
        }
      } catch (error: unknown) {
        const err = error as Error;
        logger.error('SHORTCUTS', 'Error creating desktop directory shortcut', { error: err.message });
        status = false;
      }
    }

    // Start Menu/Applications shortcuts
    if (createExeShortcut) {
      try {
        const executableName = path.basename(installPath, path.extname(installPath));
        const startMenuExeResult = await createShortcut({
          startPath: startMenuPath,
          name: executableName,
          type: 'file',
          options: {
            target: installPath,
            desc: 'Manic Miners Game',
            icon: installPath,
            workingDir: path.dirname(installPath),
          },
        });
        if (startMenuExeResult.created) {
          filePaths.push(startMenuExeResult.message);
        } else {
          logger.warn('SHORTCUTS', 'Failed to create start menu executable shortcut', { message: startMenuExeResult.message });
        }
      } catch (error: unknown) {
        const err = error as Error;
        logger.error('SHORTCUTS', 'Error creating start menu executable shortcut', { error: err.message });
      }
    }

    if (createDirShortcut && process.platform === 'win32') {
      // Only create directory shortcuts in start menu on Windows
      try {
        const startMenuDirName = 'Manic Miners Install Directory';
        const startMenuDirResult = await createShortcut({
          startPath: startMenuPath,
          name: startMenuDirName,
          type: 'directory',
          options: {
            target: path.dirname(installPath),
            icon: installPath,
            workingDir: path.dirname(installPath),
            desc: 'Manic Miners installation directory',
          },
        });
        if (startMenuDirResult.created) {
          filePaths.push(startMenuDirResult.message);
        } else {
          logger.warn('SHORTCUTS', 'Failed to create start menu directory shortcut', { message: startMenuDirResult.message });
        }
      } catch (error: unknown) {
        const err = error as Error;
        logger.error('SHORTCUTS', 'Error creating start menu directory shortcut', { error: err.message });
      }
    }

    // Note: Web resource shortcuts removed - only creating executable shortcuts now
  } catch (error: unknown) {
    const err = error as Error;
    filePaths.push(`Error creating shortcuts: ${err.message}`);
    status = false;
  }

  return { status, filePaths };
};
