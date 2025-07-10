import { spawnSync } from 'child_process';
import { logToFile } from '../logger';

/**
 * Checks if the compatibility launcher (Wine or custom) is available.
 * @returns true if the command can be executed, otherwise false.
 */
export const checkCompatLauncher = (): boolean => {
  if (process.platform === 'win32') return true;

  const compatCmd = process.env.COMPAT_LAUNCHER || 'wine';
  const result = spawnSync(compatCmd, ['--version'], { stdio: 'ignore' });
  if (result.error || result.status !== 0) {
    logToFile({
      message: `Compatibility launcher '${compatCmd}' not available: ${result.error?.message || 'exit code ' + result.status}`,
    });
    return false;
  }

  return true;
};
