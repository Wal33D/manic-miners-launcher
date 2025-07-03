import fs from 'fs/promises';
import path from 'path';
import { getDirectories } from './fetchDirectories';
import { debugLog } from '../logger';

/**
 * Checks if a specific version is installed by looking for its directory and executable.
 * @param versionIdentifier The identifier of the version to check.
 * @returns True if the version is installed, false otherwise.
 */
export const isVersionInstalled = async (versionIdentifier: string): Promise<boolean> => {
  try {
    const { launcherInstallPath } = (await getDirectories()).directories;
    const versionDirPath = path.join(launcherInstallPath, versionIdentifier);

    // Check if the version directory exists
    try {
      await fs.access(versionDirPath);
    } catch (error) {
      debugLog(`Version directory not found for ${versionIdentifier}: ${error}`);
      return false; // Directory does not exist
    }

    // Check for any executable files in the directory
    const filesInDir = await fs.readdir(versionDirPath);
    const hasExecutable = filesInDir.some(file => file.endsWith('.exe'));

    if (hasExecutable) {
      debugLog(`Executable found in ${versionDirPath}.`);
      return true; // Installation is considered present if there's at least one executable
    } else {
      debugLog(`No executable found in ${versionDirPath}.`);
      return false; // Installation is considered absent without executables
    }
  } catch (error) {
    console.error(`Error checking installation status for ${versionIdentifier}:`, error);
    return false; // Return false on error, indicating the version is not installed
  }
};
