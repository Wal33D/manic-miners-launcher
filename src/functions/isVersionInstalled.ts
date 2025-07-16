import * as fs from 'fs/promises';
import * as path from 'path';
import { getDirectories } from './fetchDirectories';
import { logger } from '../utils/logger';

/**
 * Checks if a specific version is installed by looking for its directory and executable.
 * @param versionIdentifier The identifier of the version to check.
 * @returns True if the version is installed, false otherwise.
 */
export const isVersionInstalled = async (versionIdentifier: string): Promise<boolean> => {
  try {
    const directoriesResult = await getDirectories();
    if (!directoriesResult.status || !directoriesResult.directories) {
      throw new Error(`Failed to get directories: ${directoriesResult.message}`);
    }
    const { launcherInstallPath } = directoriesResult.directories;
    const versionDirPath = path.join(launcherInstallPath, versionIdentifier);

    // Check if the version directory exists
    try {
      await fs.access(versionDirPath);
    } catch (error) {
      return false; // Directory does not exist
    }

    // Check for any executable files in the directory
    const filesInDir = await fs.readdir(versionDirPath);
    const hasExecutable = filesInDir.some(file => file.endsWith('.exe'));

    if (hasExecutable) {
      return true; // Installation is considered present if there's at least one executable
    } else {
      return false; // Installation is considered absent without executables
    }
  } catch (error: unknown) {
    const err = error as Error;
    logger.error('INSTALL', 'Error checking installation status', { versionIdentifier, error: err.message }, err);
    return false; // Return false on error, indicating the version is not installed
  }
};
