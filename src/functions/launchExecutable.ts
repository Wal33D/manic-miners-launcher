import { spawn } from 'child_process';
import { logger } from '../utils/logger';

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
    const startTime = Date.now();

    if (process.platform !== 'win32') {
      const message = 'Game launch is supported only on Windows.';
      logger.error('LAUNCH', message, { platform: process.platform, executablePath });
      return resolve({ status: false, message });
    }

    logger.info('LAUNCH', 'Starting game executable', {
      executablePath,
      platform: process.platform,
      startTime: new Date(startTime).toISOString(),
    });

    const spawnCmd = executablePath;
    const spawnArgs: string[] = [];

    const child = spawn(spawnCmd, spawnArgs, {
      detached: true,
      stdio: 'ignore',
    });

    child.on('error', err => {
      const errorMessage = `Failed to start process: ${err.message}`;
      logger.error('LAUNCH', errorMessage, { executablePath, error: err.message }, err);
      reject({ status: false, message: `Error launching executable: ${err.message}` });
    });

    child.on('exit', code => {
      const endTime = Date.now();
      const runTime = (endTime - startTime) / 1000 / 60;
      const veryShortRun = runTime < 5;
      const exitMessage =
        code === 0 ? 'Executable launched and exited normally.' : `Executable launched but exited with error code: ${code}`;

      logger.info('LAUNCH', 'Process exit detected', {
        executablePath,
        exitCode: code,
        endTime: new Date(endTime).toISOString(),
        runtimeMinutes: runTime.toFixed(2),
        veryShortRun,
      });

      if (veryShortRun) {
        logger.warn('LAUNCH', 'Process had very short runtime', {
          executablePath,
          runtimeMinutes: runTime.toFixed(2),
          message: 'This might indicate an issue with the game',
        });
      }

      resolve({ status: code === 0, message: exitMessage, exitCode: code, veryShortRun });
    });

    child.unref();
  });
};
