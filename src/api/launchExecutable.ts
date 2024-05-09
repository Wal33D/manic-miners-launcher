import { spawn } from 'child_process';
import { getDirectories } from './getDirectories';
const { launcherCachePath } = getDirectories();

/**
 * Launches an executable file and monitors if it opened successfully or if it crashed.
 * @param executablePath The file system path to the executable to be launched.
 * @returns A promise that resolves to an object containing the status of the operation, a message, and the exit code.
 */

export const launchExecutable = ({
  executablePath,
}: {
  executablePath: string;
}): Promise<{ status: boolean; message: string; exitCode?: number; veryShortRun?: boolean }> => {
  return new Promise((resolve, reject) => {
    console.log(`Launching executable at: ${executablePath}`);
    const startTime = Date.now();

    let message = '';
    const process = spawn(executablePath, [], {
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe'], // Changed 'ignore' to 'pipe' to capture stdout and stderr.
    });

    // Listen to stdout and stderr
    process.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
    });

    process.stderr.on('data', data => {
      console.error(`stderr: ${data}`);
    });

    process.on('error', err => {
      console.error(`Failed to start process: ${err.message}`);
      reject({ status: false, message: `Error launching executable: ${err.message}` });
    });

    process.on('exit', code => {
      const endTime = Date.now();
      const runTime = (endTime - startTime) / 1000 / 60; // Convert to minutes
      const veryShortRun = runTime < 5;

      if (code === 0) {
        message = 'Executable launched and exited normally.';
        console.log(`Process exited at: ${new Date(endTime).toISOString()} (runtime: ${runTime.toFixed(2)} minutes)`);
      } else {
        message = `Executable launched but exited with error code: ${code}`;
        console.error(`Process exited at: ${new Date(endTime).toISOString()} (runtime: ${runTime.toFixed(2)} minutes)`);
      }

      resolve({ status: code === 0, message, exitCode: code, veryShortRun });
    });

    process.unref();
  });
};
