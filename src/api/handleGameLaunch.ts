import { launchExecutable } from './launchExecutable';
import { checkInstalledVersionsWithExe } from './checkInstalledVersions';

/**
 * Function to handle the launching of a specific game version or the first available version if no identifier is provided.
 * @param versionIdentifier Optional identifier for a specific version to launch.
 * @returns Promise<boolean> indicating whether the game was successfully launched.
 */
export const handleGameLaunch = async ({ versionIdentifier }: { versionIdentifier?: string }): Promise<boolean> => {
  try {
    const installedVersions = await checkInstalledVersionsWithExe();
    if (!installedVersions.status || !installedVersions.existingInstalls || installedVersions.existingInstalls.length === 0) {
      console.error('No installations found or failed to fetch installations.');
      return false;
    }

    const versionToLaunch =
      installedVersions.existingInstalls.find(v => v.identifier === versionIdentifier) || installedVersions.existingInstalls[0];
    if (!versionToLaunch.executable) {
      console.error(`No executable files found for the selected version: ${versionToLaunch.identifier}`);
      return false;
    }

    const executablePath = versionToLaunch.executables[0];
    const launchResults = await launchExecutable({ executablePath });
    console.log(launchResults.message); // Log the message from the executable launch

    if (launchResults.status) {
      console.log('The executable ran successfully.');
      return true; // The game was launched successfully
    } else {
      console.error(`The executable failed with exit code: ${launchResults.exitCode}`);
      return false; // The game launch failed
    }
  } catch (error) {
    console.error(`Failed to launch game: ${error.message}`);
    return false; // An error occurred during the launch process
  }
};
