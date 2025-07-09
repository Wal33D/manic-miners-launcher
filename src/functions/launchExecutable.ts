import { spawn } from 'child_process';
import { logToFile, debugLog } from '../logger';

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
    logToFile({ message: `Launching executable at: ${executablePath}` });
    const startTime = Date.now();

    const useCompat: boolean = process.platform !== 'win32';
    const compatCmd: string = process.env.COMPAT_LAUNCHER || 'wine';
    const compatParts: string[] = compatCmd.split(/\s+/);
    const spawnCmd: string = useCompat ? compatParts[0] : executablePath;
    const spawnArgs: string[] = useCompat
      ? [...compatParts.slice(1), executablePath]
      : [];

    const childProcess = spawn(spawnCmd, spawnArgs, {
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    // Listen to stdout
    childProcess.stdout.on('data', (data: Buffer) => {
      const stdoutMessage = `stdout: ${data}`;
      debugLog(stdoutMessage);
      logToFile({ message: stdoutMessage });
    });

    // Listen to stderr
    childProcess.stderr.on('data', (data: Buffer) => {
      const stderrMessage = `stderr: ${data}`;
      console.error(stderrMessage);
      logToFile({ message: stderrMessage });
    });

    childProcess.on('error', (err: Error) => {
      const errorMessage = `Failed to start process: ${err.message}`;
      console.error(errorMessage);
      logToFile({ message: errorMessage });
      reject({ status: false, message: `Error launching executable: ${err.message}` });
    });

    childProcess.on('exit', (code: number | null) => {
      const endTime = Date.now();
      const runTime = (endTime - startTime) / 1000 / 60;
      const veryShortRun = runTime < 5;
      const exitMessage =
        code === 0 ? 'Executable launched and exited normally.' : `Executable launched but exited with error code: ${code}`;
      const exitLogMessage = `Process exited at: ${new Date(endTime).toISOString()} (runtime: ${runTime.toFixed(2)} minutes)`;
      debugLog(exitLogMessage);
      logToFile({ message: exitLogMessage });

      if (veryShortRun) {
        const warningMessage = `Warning: The process had a very short run time (${runTime.toFixed(2)} minutes), which might indicate an issue.`;
        debugLog(warningMessage);
        logToFile({ message: warningMessage });
      }

      resolve({ status: code === 0, message: exitMessage, exitCode: code, veryShortRun });
    });

    childProcess.unref();
  });
};
