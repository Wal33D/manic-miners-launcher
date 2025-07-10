import { spawn } from 'child_process';

/**
 * Launches an executable file and monitors if it opened successfully or if it crashed.
 * @param executablePath The file system path to the executable to be launched.
 * @returns A promise that resolves to an object containing the status of the operation, a message, and the exit code.
 */

export const launchExecutable = ({
  executablePath,
  compatLauncher,
}: {
  executablePath: string;
  compatLauncher?: string;
}): Promise<{ status: boolean; message: string; exitCode?: number; veryShortRun?: boolean }> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const useCompat = process.platform !== 'win32';
    const compatCmd = compatLauncher || process.env.COMPAT_LAUNCHER || 'wine';
    const spawnCmd = useCompat ? compatCmd : executablePath;
    const spawnArgs = useCompat ? [executablePath] : [];

    const child = spawn(spawnCmd, spawnArgs, {
      detached: true,
      stdio: 'ignore',
    });

    child.on('error', err => {
      const errorMessage = `Failed to start process: ${err.message}`;
      console.error(errorMessage);
      reject({ status: false, message: `Error launching executable: ${err.message}` });
    });

    child.on('exit', code => {
      const endTime = Date.now();
      const runTime = (endTime - startTime) / 1000 / 60;
      const veryShortRun = runTime < 5;
      const exitMessage =
        code === 0 ? 'Executable launched and exited normally.' : `Executable launched but exited with error code: ${code}`;
      const exitLogMessage = `Process exited at: ${new Date(endTime).toISOString()} (runtime: ${runTime.toFixed(2)} minutes)`;
      console.log(exitLogMessage);

      if (veryShortRun) {
        const warningMessage = `Warning: The process had a very short run time (${runTime.toFixed(2)} minutes), which might indicate an issue.`;
        console.warn(warningMessage);
      }

      resolve({ status: code === 0, message: exitMessage, exitCode: code, veryShortRun });
    });

    child.unref();
  });
};
