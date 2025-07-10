import { logToFile } from '../logger';
import { launchExecutable } from './launchExecutable';
import { fetchInstalledVersions } from './fetchInstalledVersions';
import { checkCompatLauncher } from './checkCompatLauncher';

/**
 * Function to handle the launching of a specific game version or the first available version if no identifier is provided.
 * @param versionIdentifier Optional identifier for a specific version to launch.
 * @returns Result object with status and message.
 */
export const handleGameLaunch = async ({
  versionIdentifier,
}: {
  versionIdentifier?: string;
}): Promise<{ status: boolean; message: string }> => {
  try {
    logToFile({ message: `Received request to launch game version: '${versionIdentifier || 'No specific version requested'}'` });

    if (!checkCompatLauncher()) {
      const message = 'Wine is required to launch the game on non-Windows systems.';
      return { status: false, message };
    }

    const installedVersions = await fetchInstalledVersions();

    if (!installedVersions.status || !installedVersions.installedVersions || installedVersions.installedVersions.length === 0) {
      const message = 'No installations found or failed to fetch installations.';
      logToFile({ message });
      return { status: false, message };
    }

    // Determine which version to launch
    const versionToLaunch: any =
      installedVersions.installedVersions.find(v => v.identifier === versionIdentifier) || installedVersions.installedVersions[0];

    logToFile({
      message: `Attempting to launch version: '${versionToLaunch.identifier}' (Requested: '${versionIdentifier || 'default'}')`,
    });

    // Check if the version has an executable to launch
    if (!versionToLaunch.executablePath) {
      const message = `No executable files found for the selected version: ${versionToLaunch.identifier}`;
      logToFile({ message });
      return { status: false, message };
    }

    const launchResults = await launchExecutable({ executablePath: versionToLaunch.executablePath });
    logToFile({ message: launchResults.message });

    if (launchResults.status) {
      const message = `The executable for version '${versionToLaunch.identifier}' ran successfully.`;
      logToFile({ message });
      return { status: true, message };
    } else {
      const message = `The executable for version '${versionToLaunch.identifier}' failed with exit code: ${launchResults.exitCode}`;
      logToFile({ message });
      return { status: false, message };
    }
  } catch (error) {
    const err = error as Error;
    const message = `Failed to launch game: ${err.message}`;
    logToFile({ message });
    return { status: false, message };
  }
};
