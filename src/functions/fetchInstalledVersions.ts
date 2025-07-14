import fs from 'fs/promises';
import path from 'path';
import { fetchVersions } from '../api/fetchVersions';
import { getDirectories } from './fetchDirectories';
import { Version, Versions } from '../api/versionTypes';

/**
 * Checks installed versions in the launcher install directory and identifies any EXE files within those directories.
 * Also calculates the total size of each directory.
 * @returns Object containing status and message along with the enhanced version objects if successful.
 */
export const fetchInstalledVersions = async (): Promise<{
  status: boolean;
  message: string;
  installedVersions?: Version[];
}> => {
  let message = '';
  let installedVersions: Version[] = [];
  try {
    const { directories, status: dirStatus, message: dirMessage } = await getDirectories();
    const launcherInstallPath = directories.launcherInstallPath;
    if (!dirStatus) {
      throw new Error(dirMessage);
    }

    const versionsData: Versions = await fetchVersions({ versionType: 'archived' });
    const filesAndDirs = await fs.readdir(launcherInstallPath);
    const dirStats = await Promise.all(filesAndDirs.map(name => fs.stat(path.join(launcherInstallPath, name))));
    const dirs = filesAndDirs.filter((_, index) => dirStats[index].isDirectory());

    // Create a map of directories to their respective Version data
    const versionMap = new Map(versionsData.versions.map(v => [v.identifier, { ...v }]));

    // Filter and update the version objects with file system data
    for (const dir of dirs) {
      const fullDirPath = path.join(launcherInstallPath, dir);
      const filesInDir = await fs.readdir(fullDirPath);
      const exeFiles = filesInDir.filter(file => file.endsWith('.exe')).map(file => path.join(fullDirPath, file));

      // Calculate the total size of the directory
      const fileStats = await Promise.all(filesInDir.map(file => fs.stat(path.join(fullDirPath, file))));
      const totalSize = fileStats.reduce((acc, stat) => acc + stat.size, 0);

      if (versionMap.has(dir)) {
        // Update existing version object from server database
        const versionInfo: any = versionMap.get(dir);
        versionInfo.directory = fullDirPath;
        versionInfo.executablePath = exeFiles[0] || '';
        versionInfo.installationSize = totalSize;
        versionMap.set(dir, versionInfo);
      } else if (dir === 'latest') {
        // Handle latest version directory (itch.io downloads)
        // Only include if it has executable files
        if (exeFiles.length > 0) {
          const latestVersionInfo: Version = {
            identifier: 'ManicMiners-Baraklava-V1.0.4', // Use the expected identifier for latest version
            version: '1.0.4',
            title: 'ManicMiners',
            displayName: 'ManicMiners v1.0.4',
            releaseDate: 'Unknown',
            size: `${Math.round(totalSize / 1024 / 1024)} MB`,
            sizeInBytes: totalSize,
            description: 'Latest version (downloaded from itch.io)',
            experimental: false,
            directory: fullDirPath,
            executablePath: exeFiles[0] || '',
            installationSize: totalSize,
          };

          versionMap.set('ManicMiners-Baraklava-V1.0.4', latestVersionInfo);
        }
      } else if (dir.startsWith('ManicMiners-')) {
        // Handle locally installed versions not in server database (e.g., itch.io downloads)
        // Pattern to match ManicMiners-[anything]-V[version] format
        const versionMatch = dir.match(/ManicMiners.*-V(.+)$/);
        const version = versionMatch ? versionMatch[1] : 'Unknown';

        // Only include if it has executable files
        if (exeFiles.length > 0) {
          const localVersionInfo: Version = {
            identifier: dir,
            version: version,
            title: 'ManicMiners',
            displayName: `ManicMiners v${version}`,
            releaseDate: 'Unknown',
            size: `${Math.round(totalSize / 1024 / 1024)} MB`,
            sizeInBytes: totalSize,
            description: 'Locally installed version (downloaded from itch.io)',
            experimental: false,
            directory: fullDirPath,
            executablePath: exeFiles[0] || '',
            installationSize: totalSize,
          };

          versionMap.set(dir, localVersionInfo);
        }
      } else {
        // Directory doesn't match any expected pattern
      }
    }

    // Only include versions that have a directory found
    installedVersions = Array.from(versionMap.values()).filter(v => v.directory);
    message = 'Installed versions fetched successfully.';
    return { status: true, message, installedVersions };
  } catch (error: unknown) {
    const err = error as Error;
    message = `Error fetching installed versions: ${err.message}`;
    return { status: false, message };
  }
};
