import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Finds the latest version of the Manic Miners installation based on
 * directory names with version numbers.
 *
 * @param baseDir The directory containing versioned installations.
 * @returns The full path to the executable of the latest version found.
 */
export const findLatestVersionPath = async (baseDir: string): Promise<string> => {
  const directories = await fs.readdir(baseDir, { withFileTypes: true });
  const versionedDirectories = directories
    .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('ManicMinersV'))
    .map(dirent => dirent.name)
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }));
  const latestVersionDirectory = versionedDirectories[0];
  if (!latestVersionDirectory) throw new Error('No valid installation directory found.');

  return path.join(baseDir, latestVersionDirectory, 'ManicMiners.exe');
};
