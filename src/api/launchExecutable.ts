import { spawn } from 'child_process';
import { getDirectories } from './getDirectories';
import * as fs from 'fs';

export const launchExecutable = ({
  executablePath,
}: {
  executablePath: string;
}): Promise<{ status: boolean; message: string; exitCode?: number; veryShortRun?: boolean }> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const { launcherLogsPath } = getDirectories();

    const process = spawn(executablePath, [], {
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    process.stdout.on('data', data => {
      logData('stdout', data.toString());
    });

    process.stderr.on('data', data => {
      logData('stderr', data.toString());
    });

    process.on('error', err => {
      logData('error', `Failed to start process: ${err.message}`);
      reject({ status: false, message: `Error launching executable: ${err.message}` });
    });

    process.on('exit', code => {
      const endTime = Date.now();
      const runTime = (endTime - startTime) / 1000 / 60; // Convert to minutes
      const veryShortRun = runTime < 5;
      const message = code === 0 ? 'Executable launched and exited normally.' : `Executable launched but exited with error code: ${code}`;

      logData('exit', {
        exitCode: code,
        runTime: runTime.toFixed(2),
        veryShortRun,
        endTime: new Date(endTime).toISOString(),
      });

      resolve({ status: code === 0, message, exitCode: code, veryShortRun });
    });

    process.unref();

    function logData(type: string, data: any) {
      const logFilePath = path.join(launcherLogsPath, `${executablePath.replace(/[^a-z0-9]/gi, '_')}_log.json`);
      fs.appendFileSync(logFilePath, JSON.stringify({ type, timestamp: new Date().toISOString(), data }, null, 2) + ',\n');
    }
  });
};
