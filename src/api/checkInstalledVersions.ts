import fs from 'fs/promises';
import path from 'path';
import { fetchVersions } from './versions/fetchVersions';
import { getDirectories } from './getDirectories';
import { Version, Versions } from './versions/versionTypes';

/**
 * Checks installed versions in the launcher install directory and identifies any EXE files within those directories.
 * Also calculates the total size of each directory.
 * @returns Object containing status and message along with the enhanced version objects if successful.
 */
export const checkInstalledVersions = async (): Promise<{
  status: boolean;
  message: string;
  installedVersions?: Version[];
}> => {
  let status = false;
  let message = '';
  let results: any;

  try {
    const { launcherInstallPath } = getDirectories();
    const versionsData: Versions = await fetchVersions({ versionType: 'all' });

    const filesAndDirs = await fs.readdir(launcherInstallPath);
    const dirStats = await Promise.all(filesAndDirs.map(name => fs.stat(path.join(launcherInstallPath, name))));
    const dirs = filesAndDirs.filter((_, index) => dirStats[index].isDirectory());

    // Create a map of directories to their respective Version data
    let versionMap = new Map(versionsData.versions.map(v => [v.identifier, { ...v }]));

    // Filter and update the version objects with file system data
    for (const dir of dirs) {
      if (versionMap.has(dir)) {
        const fullDirPath = path.join(launcherInstallPath, dir);
        const filesInDir = await fs.readdir(fullDirPath);
        const exeFiles = filesInDir.filter(file => file.endsWith('.exe')).map(file => path.join(fullDirPath, file));

        // Calculate the total size of the directory
        const fileStats = await Promise.all(filesInDir.map(file => fs.stat(path.join(fullDirPath, file))));
        const totalSize = fileStats.reduce((acc, stat) => acc + stat.size, 0);

        // Update version object
        let versionInfo: any = versionMap.get(dir);
        versionInfo.directory = fullDirPath;
        versionInfo.executablePath = exeFiles[0]; // Take the first .exe found
        versionInfo.installationSize = totalSize;

        versionMap.set(dir, versionInfo);
      }
    }

    // Only include versions that have a directory found
    //@ts-ignore
    results = Array.from(versionMap.values()).filter(v => v.directory);

    status = true;
    message = 'Installed versions data enhanced successfully.';
  } catch (error) {
    message = `Failed to read installation directory: ${error}`;
  }

  return { status, message, installedVersions: results };
};
