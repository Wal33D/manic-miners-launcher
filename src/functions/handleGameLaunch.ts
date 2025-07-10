import { launchExecutable } from './launchExecutable';
import { fetchInstalledVersions } from './fetchInstalledVersions';
import { checkCompatLauncher } from './checkCompatLauncher';
import { logToFile } from './logToFile';

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

    // Ensure Wine is available on non-Windows
    if (!checkCompatLauncher()) {
      const message = 'Wine is required to launch the game on non-Windows systems.';
      logToFile({ message });
      return { status: false, message };
    }

    const installed = await fetchInstalledVersions();
    if (!installed.status || !installed.installedVersions?.length) {
      const message = 'No installations found or failed to fetch installations.';
      logToFile({ message });
      return { status: false, message };
    }

    // Pick requested version or fallback
    const versionToLaunch =
      installed.installedVersions.find(v => v.identifier === versionIdentifier) ||
      installed.installedVersions[0];

    logToFile({
      message: `Attempting to launch version: '${versionToLaunch.identifier}' (Requested: '${versionIdentifier || 'default'}')`,
    });

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
  } catch (err) {
    const message = `Failed to launch game: ${(err as Error).message}`;
    logToFile({ message });
    return { status: false, message };
  }
};
