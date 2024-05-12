import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

/**
 * Finds the latest version of the Manic Miners installation based on directory names with version numbers.
 * @returns The full path to the executable of the latest version found.
 */
export const findLatestVersionPath = async (): Promise<string> => {
  const baseInstallationPath = path.join(os.homedir(), 'Desktop', 'map-generator-master', 'installations');
  const directories = await fs.readdir(baseInstallationPath, { withFileTypes: true });
  const versionedDirectories = directories
    .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('ManicMinersV'))
    .map(dirent => dirent.name)
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }));
  const latestVersionDirectory = versionedDirectories[0];
  if (!latestVersionDirectory) throw new Error('No valid installation directory found.');

  return path.join(baseInstallationPath, latestVersionDirectory, 'ManicMiners.exe');
};
