import { spawn } from 'child_process';
import { getDirectories } from './getDirectories';
import fs from 'fs';
import { join } from 'path';

const { launcherLogsPath } = getDirectories();
const logFilePath = join(launcherLogsPath, 'runtime-log.txt');

/**
 * Appends messages to the runtime log file.
 * @param message The message to log.
 */
const logToFile = (message: string) => {
  const timeStampedMessage = `${new Date().toISOString()}: ${message}\n`;
  fs.appendFileSync(logFilePath, timeStampedMessage, 'utf-8');
};

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
    logToFile(`Launching executable at: ${executablePath}`);
    const startTime = Date.now();

    const process = spawn(executablePath, [], {
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    // Listen to stdout
    process.stdout.on('data', data => {
      const stdoutMessage = `stdout: ${data}`;
      console.log(stdoutMessage);
      logToFile(stdoutMessage);
    });

    // Listen to stderr
    process.stderr.on('data', data => {
      const stderrMessage = `stderr: ${data}`;
      console.error(stderrMessage);
      logToFile(stderrMessage);
    });

    process.on('error', err => {
      const errorMessage = `Failed to start process: ${err.message}`;
      console.error(errorMessage);
      logToFile(errorMessage);
      reject({ status: false, message: `Error launching executable: ${err.message}` });
    });

    process.on('exit', code => {
      const endTime = Date.now();
      const runTime = (endTime - startTime) / 1000 / 60; // Convert to minutes
      const veryShortRun = runTime < 5;
      const exitMessage =
        code === 0 ? 'Executable launched and exited normally.' : `Executable launched but exited with error code: ${code}`;
      const exitLogMessage = `Process exited at: ${new Date(endTime).toISOString()} (runtime: ${runTime.toFixed(2)} minutes)`;
      console.log(exitLogMessage);
      logToFile(exitLogMessage);

      if (veryShortRun) {
        const warningMessage = `Warning: The process had a very short run time (${runTime.toFixed(2)} minutes), which might indicate an issue.`;
        console.warn(warningMessage);
        logToFile(warningMessage);
      }

      resolve({ status: code === 0, message: exitMessage, exitCode: code, veryShortRun });
    });

    process.unref();
  });
};
