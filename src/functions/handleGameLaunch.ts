import { launchExecutable } from './launchExecutable';
import { fetchInstalledVersions } from './fetchInstalledVersions';

/**
 * Function to handle the launching of a specific game version or the first available version if no identifier is provided.
 * @param versionIdentifier Optional identifier for a specific version to launch.
 * @returns Promise<boolean> indicating whether the game was successfully launched.
 */
export const handleGameLaunch = async ({ versionIdentifier }: { versionIdentifier?: string }): Promise<boolean> => {
  try {
    console.log(`Received request to launch game version: '${versionIdentifier || 'No specific version requested'}'`);
    const installedVersions = await fetchInstalledVersions();

    if (!installedVersions.status || !installedVersions.installedVersions || installedVersions.installedVersions.length === 0) {
      console.log('No installations found or failed to fetch installations.');
      return false;
    }

    // Determine which version to launch
    const versionToLaunch: any =
      installedVersions.installedVersions.find(v => v.identifier === versionIdentifier) || installedVersions.installedVersions[0];

    console.log(
      `Attempting to launch version: '${versionToLaunch.identifier}' (Requested: '${versionIdentifier || 'default'}')`
    );

    // Check if the version has an executable to launch
    if (!versionToLaunch.executablePath) {
      console.log(`No executable files found for the selected version: ${versionToLaunch.identifier}`);
      return false;
    }

    const launchResults = await launchExecutable({ executablePath: versionToLaunch.executablePath });
    console.log(launchResults.message);

    if (launchResults.status) {
      console.log(`The executable for version '${versionToLaunch.identifier}' ran successfully.`);
      return true;
    } else {
      console.log(`The executable for version '${versionToLaunch.identifier}' failed with exit code: ${launchResults.exitCode}`);
      return false;
    }
  } catch (error) {
    console.error(`Failed to launch game: ${error.message}`);
    return false;
  }
};
