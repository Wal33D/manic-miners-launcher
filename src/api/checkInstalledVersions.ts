import fs from 'fs/promises';
import path from 'path';
import { fetchVersions } from './versions/fetchVersions';
import { getDirectories, Directories } from './getDirectories';
import { Versions } from './versions/versionTypes';
/**
 * Checks installed versions in the launcher install directory and identifies any EXE files within those directories.
 * Also calculates the total size of each directory.
 * @returns Object containing status and message along with an array of objects with directory full paths, EXE files full paths, and directory sizes found within those directories, if successful.
 */

export const checkInstalledVersions = async (): Promise<{
  status: boolean;
  message: string;
  defaultCurrentVersion: any;
  existingInstalls?: Array<{
    identifier: string;
    directory: string;
    executable: boolean;
    executables: string[];
    installationSize: number;
  }>;
}> => {
  let status = false;
  let message = '';
  let results = [] as any;

  try {
    const { launcherInstallPath } = getDirectories() as Directories;
    const versionsData = (await fetchVersions({ versionType: 'all' })) as Versions;
    const versionIdentifiers = versionsData.versions.map(v => v.identifier);

    const filesAndDirs = await fs.readdir(launcherInstallPath);
    const dirStats = await Promise.all(filesAndDirs.map(name => fs.stat(path.join(launcherInstallPath, name))));
    const dirs = filesAndDirs.filter((_, index) => dirStats[index].isDirectory());

    // Filter directories that match any of the known version identifiers
    const matchedDirs = dirs.filter(dir => versionIdentifiers.includes(dir));

    // Check each directory for EXE files and gather them
    results = await Promise.all(
      matchedDirs.map(async dir => {
        const fullDirPath = path.join(launcherInstallPath, dir);
        const filesInDir = await fs.readdir(fullDirPath);
        const exeFiles = filesInDir.filter(file => file.endsWith('.exe')).map(file => path.join(fullDirPath, file));

        // Calculate the total size of the directory
        const fileStats = await Promise.all(filesInDir.map(file => fs.stat(path.join(fullDirPath, file))));
        const totalSize = fileStats.reduce((acc, stat) => acc + stat.size, 0);

        return {
          identifier: dir, // Assuming `dir` is directly used as identifier; adjust if needed
          directory: fullDirPath,
          executables: exeFiles,
          installationSize: totalSize,
        };
      })
    );

    // Sort results by identifier after all data has been gathered
    results.sort((b: { identifier: string }, a: { identifier: any }) => a.identifier.localeCompare(b.identifier));
    status = true;
    message = 'Installed versions, executables, and directory sizes checked successfully, with full paths provided.';
  } catch (error) {
    message = `Failed to read installation directory: ${error}`;
  }
  console.log(results.length > 0 ? results[0] : null);
  console.log(results.length > 0 ? results[0] : null);
  console.log(results.length > 0 ? results[0] : null);

  console.log(results.length > 0 ? results[0] : null);
  return {
    status,
    message,
    defaultCurrentVersion: results.length > 0 ? results[0] : null,
    existingInstalls: results,
  };
};
