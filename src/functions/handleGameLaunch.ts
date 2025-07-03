import { logToFile } from '../logger';
import { launchExecutable } from './launchExecutable';
import { fetchInstalledVersions } from './fetchInstalledVersions';

/**
 * Function to handle the launching of a specific game version or the first available version if no identifier is provided.
 * @param versionIdentifier Optional identifier for a specific version to launch.
 * @returns Promise<boolean> indicating whether the game was successfully launched.
 */
export const handleGameLaunch = async ({ versionIdentifier }: { versionIdentifier?: string }): Promise<boolean> => {
  try {
    logToFile({ message: `Received request to launch game version: '${versionIdentifier || 'No specific version requested'}'` });
    const installedVersions = await fetchInstalledVersions();

    if (!installedVersions.status || !installedVersions.installedVersions || installedVersions.installedVersions.length === 0) {
      logToFile({ message: 'No installations found or failed to fetch installations.' });
      return false;
    }

    // Determine which version to launch
    const versionToLaunch: any =
      installedVersions.installedVersions.find(v => v.identifier === versionIdentifier) || installedVersions.installedVersions[0];

    logToFile({
      message: `Attempting to launch version: '${versionToLaunch.identifier}' (Requested: '${versionIdentifier || 'default'}')`,
    });

    // Check if the version has an executable to launch
    if (!versionToLaunch.executablePath) {
      logToFile({ message: `No executable files found for the selected version: ${versionToLaunch.identifier}` });
      return false;
    }

    const launchResults = await launchExecutable({ executablePath: versionToLaunch.executablePath });
    logToFile({ message: launchResults.message });

    if (launchResults.status) {
      logToFile({ message: `The executable for version '${versionToLaunch.identifier}' ran successfully.` });
      return true;
    } else {
      logToFile({ message: `The executable for version '${versionToLaunch.identifier}' failed with exit code: ${launchResults.exitCode}` });
      return false;
    }
  } catch (error) {
    logToFile({ message: `Failed to launch game: ${error.message}` });
    return false;
  }
};
