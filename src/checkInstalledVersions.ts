import fs from 'fs/promises';
import path from 'path';

import { Versions } from './versions/versionTypes';
import { fetchVersions } from './versions/fetchVersions';
import { getDirectories } from './getDirectories';

/**
 * Checks installed versions in the launcher install directory and identifies any EXE files within those directories.
 * @returns Object containing status and message along with an array of objects with directory names and EXE files found within those directories, if successful.
 */

export const checkInstalledVersionsWithExe = async (): Promise<{
  status: boolean;
  message: string;
  results?: Array<{ directory: string; executables: string[] }>;
}> => {
  let status = false;
  let message = '';
  let results = [] as any;

  try {
    const { launcherInstallPath } = getDirectories();
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
        const exeFiles = filesInDir.filter(file => file.endsWith('.exe'));

        return {
          directory: dir,
          executables: exeFiles,
        };
      })
    );
    console.log(results);
    status = true;
    message = 'Installed versions and executables checked successfully.';
  } catch (error) {
    message = `Failed to read installation directory: ${error}`;
  }

  return { status, message, results };
};
