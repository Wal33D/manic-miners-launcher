import { launchExecutable } from './launchExecutable';
import { checkInstalledVersionsWithExe } from './checkInstalledVersions';
import { logToFile } from '../logger';

/**
 * Function to handle the launching of a specific game version or the first available version if no identifier is provided.
 * @param versionIdentifier Optional identifier for a specific version to launch.
 * @returns Promise<boolean> indicating whether the game was successfully launched.
 */

export const handleGameLaunch = async ({ versionIdentifier }: { versionIdentifier?: string }): Promise<boolean> => {
  try {
    logToFile('Checking installed game versions.');
    const installedVersions = await checkInstalledVersionsWithExe();
    if (!installedVersions.status || !installedVersions.existingInstalls || installedVersions.existingInstalls.length === 0) {
      logToFile('No installations found or failed to fetch installations.');
      return false;
    }

    const versionToLaunch =
      installedVersions.existingInstalls.find(v => v.identifier === versionIdentifier) || installedVersions.existingInstalls[0];
    if (!versionToLaunch.executable) {
      logToFile(`No executable files found for the selected version: ${versionToLaunch.identifier}`);
      return false;
    }

    const executablePath = versionToLaunch.executables[0];
    const launchResults = await launchExecutable({ executablePath });
    logToFile(launchResults.message);

    if (launchResults.status) {
      logToFile('The executable ran successfully.');
      return true;
    } else {
      logToFile(`The executable failed with exit code: ${launchResults.exitCode}`);
      return false;
    }
  } catch (error) {
    logToFile(`Failed to launch game: ${error.message}`);
    return false;
  }
};
