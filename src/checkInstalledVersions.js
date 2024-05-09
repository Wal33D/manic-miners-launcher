import fs from 'fs/promises';
import { getDirectories } from './getDirectories';

/**
 * Checks installed versions in the launcher install directory.
 * @param versionIdentifiers Array of version identifiers to check against installed directories.
 * @returns Array of identifiers that have a corresponding directory in the install path.
 */

export async function checkInstalledVersions(versionIdentifiers) {
  const { launcherInstallPath } = getDirectories();

  try {
    // Read all directory names in the installation path
    const filesAndDirs = await fs.readdir(launcherInstallPath);
    const dirStats = await Promise.all(filesAndDirs.map(name => fs.stat(`${launcherInstallPath}/${name}`)));
    const dirs = filesAndDirs.filter((_, index) => dirStats[index].isDirectory());

    // Filter directories that match any of the known version identifiers
    const installedVersions = dirs.filter(dir => versionIdentifiers.includes(dir));
    return installedVersions;
  } catch (error) {
    console.error('Failed to read installation directory:', error);
    throw error; // Optionally re-throw to handle this error further up in your application logic
  }
}

// Example usage:
export async function main() {
  const versionIdentifiers = [
    'ManicMiners-Baraklava-V1.0.4',
    'ManicMiners-Baraklava-V0.3.5',
    // Add more identifiers as needed
  ];
  const installed = await checkInstalledVersions(versionIdentifiers);
  console.log('Installed versions:', installed);
}

main(); // Run the example
