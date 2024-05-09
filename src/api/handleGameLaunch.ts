import { launchExecutable } from './launchExecutable';
import { checkInstalledVersionsWithExe } from './checkInstalledVersions';

/**
 * Function to handle the launching of a specific game version or the first available version if no identifier is provided.
 * @param versionIdentifier Optional identifier for a specific version to launch.
 */

export const handleGameLaunch = async ({ versionIdentifier }: { versionIdentifier?: string }) => {
  try {
    const installedVersions = await checkInstalledVersionsWithExe();

    if (!installedVersions.status || !installedVersions.existingInstalls || installedVersions.existingInstalls.length === 0) {
      console.error('No installations found or failed to fetch installations.');
      return;
    }

    // Find the specific version or fallback to the first available version
    const versionToLaunch =
      installedVersions.existingInstalls.find(v => v.identifier === versionIdentifier) || installedVersions.existingInstalls[0];
    if (!versionToLaunch.executable) {
      console.error(`No executable files found for the selected version: ${versionToLaunch.identifier}`);
      return;
    }

    // Assuming there's at least one executable, we take the first. Adjust if necessary to choose a specific one.
    const executablePath = versionToLaunch.executables[0];
    const launchResults = await launchExecutable({ executablePath });

    console.log(launchResults.message); // Log the message from the executable launch

    if (launchResults.status) {
      console.log('The executable ran successfully.');
      // Additional actions can be taken here, such as logging success or starting another task
    } else {
      console.error(`The executable failed with exit code: ${launchResults.exitCode}`);
      // Here, you might handle the error, retry launching, or log for further investigation
    }
  } catch (error) {
    console.error(`Failed to launch game: ${error.message}`);
    // Error handling logic here, such as alerting an administrator or attempting a recovery procedure
  }
};
