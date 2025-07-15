import { spawn } from 'child_process';
import * as path from 'path';
import { logger } from '../utils/logger';
import { detectWhisky, findManicMinersBottles } from './whiskyDetection';
import { launchManicMinersFromBottle, getAllManicMinersInstallations } from './whiskyBottleManager';

export interface LaunchOptions {
  executablePath: string;
  preferWhisky?: boolean;
  bottleName?: string;
  platform?: 'native' | 'whisky';
}

export interface LaunchResult {
  status: boolean;
  message: string;
  exitCode?: number;
  veryShortRun?: boolean;
  launchMethod?: 'native' | 'whisky';
  bottleName?: string;
}

/**
 * Launches an executable file with cross-platform support including Whisky on macOS.
 * @param options Launch configuration options
 * @returns A promise that resolves to an object containing the status of the operation, a message, and the exit code.
 */
export const launchExecutable = async ({
  executablePath,
  preferWhisky = false,
  bottleName,
  platform,
}: LaunchOptions): Promise<LaunchResult> => {
  const startTime = Date.now();

  logger.info('LAUNCH', 'Starting executable launch', {
    executablePath,
    platform: process.platform,
    preferWhisky,
    bottleName,
    requestedPlatform: platform,
    startTime: new Date(startTime).toISOString(),
  });

  // Handle macOS with potential Whisky support
  if (process.platform === 'darwin') {
    try {
      return await launchOnMacOS({
        executablePath,
        preferWhisky,
        bottleName,
        platform,
        startTime,
      });
    } catch (error) {
      logger.error('LAUNCH', 'Error during macOS launch', { error: error.message }, error);
      return {
        status: false,
        message: `Error launching on macOS: ${error.message}`,
        launchMethod: 'native',
      };
    }
  }

  // Handle Windows and Linux with Promise wrapper
  return new Promise((resolve, reject) => {
    // Handle Windows (existing logic)
    if (process.platform === 'win32') {
      return launchOnWindows(executablePath, startTime, resolve, reject);
    }

    // Handle Linux/other platforms
    if (process.platform === 'linux') {
      return launchOnLinux(executablePath, startTime, resolve, reject);
    }

    // Unsupported platform
    const message = `Game launch is not supported on platform: ${process.platform}`;
    logger.error('LAUNCH', message, { platform: process.platform, executablePath });
    return resolve({
      status: false,
      message,
      launchMethod: 'native',
    });
  });
};

/**
 * Handles launching on macOS with Whisky support
 */
async function launchOnMacOS(options: {
  executablePath: string;
  preferWhisky?: boolean;
  bottleName?: string;
  platform?: 'native' | 'whisky';
  startTime: number;
}): Promise<LaunchResult> {
  const { executablePath, preferWhisky, bottleName, platform, startTime } = options;

  // If explicitly requesting Whisky or if preferWhisky is true
  if (platform === 'whisky' || preferWhisky) {
    logger.info('LAUNCH', 'Attempting Whisky launch on macOS');

    const whiskyStatus = await detectWhisky();
    if (!whiskyStatus.hasCliTool) {
      const message = 'Whisky CLI not available. Please install Whisky and the CLI tool.';
      logger.warn('LAUNCH', message);

      // Fall back to native if not explicitly requesting Whisky
      if (platform !== 'whisky') {
        return launchNativeOnMacOS(executablePath, startTime);
      }

      return { status: false, message, launchMethod: 'whisky' };
    }

    // If bottle name provided, use it directly
    if (bottleName) {
      const result = await launchManicMinersFromBottle(bottleName, executablePath);
      return {
        status: result.success,
        message: result.message,
        launchMethod: 'whisky',
        bottleName,
      };
    }

    // Find bottles with Manic Miners
    const installations = await getAllManicMinersInstallations();
    if (installations.length > 0) {
      // Use the first available installation
      const installation = installations[0];
      const result = await launchManicMinersFromBottle(installation.bottleName, installation.executablePath);
      return {
        status: result.success,
        message: result.message,
        launchMethod: 'whisky',
        bottleName: installation.bottleName,
      };
    }

    // No Manic Miners found in bottles
    const message = 'Manic Miners not found in any Whisky bottles. Please install it in a bottle first.';
    logger.warn('LAUNCH', message);

    // Fall back to native if not explicitly requesting Whisky
    if (platform !== 'whisky') {
      return launchNativeOnMacOS(executablePath, startTime);
    }

    return { status: false, message, launchMethod: 'whisky' };
  }

  // Try native macOS launch
  return launchNativeOnMacOS(executablePath, startTime);
}

/**
 * Handles native macOS app launching
 */
function launchNativeOnMacOS(executablePath: string, startTime: number): Promise<LaunchResult> {
  return new Promise(resolve => {
    logger.info('LAUNCH', 'Attempting native macOS launch', { executablePath });

    // Check if it's a .app bundle
    if (executablePath.endsWith('.app')) {
      // Use 'open' command for .app bundles
      const child = spawn('open', [executablePath], {
        detached: true,
        stdio: 'ignore',
      });

      child.on('error', err => {
        const errorMessage = `Failed to open .app bundle: ${err.message}`;
        logger.error('LAUNCH', errorMessage, { executablePath, error: err.message }, err);
        resolve({
          status: false,
          message: errorMessage,
          launchMethod: 'native',
        });
      });

      child.on('exit', code => {
        const endTime = Date.now();
        const runTime = (endTime - startTime) / 1000 / 60;
        const message = code === 0 ? 'Application launched successfully' : `Application launch failed with code: ${code}`;

        logger.info('LAUNCH', 'Native macOS app launch completed', {
          executablePath,
          exitCode: code,
          runtimeMinutes: runTime.toFixed(2),
        });

        resolve({
          status: code === 0,
          message,
          exitCode: code,
          launchMethod: 'native',
        });
      });

      child.unref();
    } else {
      // Try to execute directly (for Unix executables)
      const child = spawn(executablePath, [], {
        detached: true,
        stdio: 'ignore',
      });

      child.on('error', err => {
        const errorMessage = `Failed to execute file: ${err.message}`;
        logger.error('LAUNCH', errorMessage, { executablePath, error: err.message }, err);
        resolve({
          status: false,
          message: errorMessage,
          launchMethod: 'native',
        });
      });

      child.on('exit', code => {
        const endTime = Date.now();
        const runTime = (endTime - startTime) / 1000 / 60;
        const veryShortRun = runTime < 5;
        const message = code === 0 ? 'Executable launched and exited normally' : `Executable exited with code: ${code}`;

        logger.info('LAUNCH', 'Native macOS executable launch completed', {
          executablePath,
          exitCode: code,
          runtimeMinutes: runTime.toFixed(2),
          veryShortRun,
        });

        resolve({
          status: code === 0,
          message,
          exitCode: code,
          veryShortRun,
          launchMethod: 'native',
        });
      });

      child.unref();
    }
  });
}

/**
 * Handles launching on Windows (existing logic)
 */
function launchOnWindows(
  executablePath: string,
  startTime: number,
  resolve: (value: LaunchResult) => void,
  reject: (reason?: any) => void
): void {
  logger.info('LAUNCH', 'Starting Windows executable', {
    executablePath,
    platform: process.platform,
    startTime: new Date(startTime).toISOString(),
  });

  const child = spawn(executablePath, [], {
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
    const exitMessage = code === 0 ? 'Executable launched and exited normally.' : `Executable launched but exited with error code: ${code}`;

    logger.info('LAUNCH', 'Windows process exit detected', {
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

    resolve({
      status: code === 0,
      message: exitMessage,
      exitCode: code,
      veryShortRun,
      launchMethod: 'native',
    });
  });

  child.unref();
}

/**
 * Handles launching on Linux
 */
function launchOnLinux(
  executablePath: string,
  startTime: number,
  resolve: (value: LaunchResult) => void,
  reject: (reason?: any) => void
): void {
  logger.info('LAUNCH', 'Starting Linux executable', {
    executablePath,
    platform: process.platform,
    startTime: new Date(startTime).toISOString(),
  });

  const child = spawn(executablePath, [], {
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
    const exitMessage = code === 0 ? 'Executable launched and exited normally.' : `Executable launched but exited with error code: ${code}`;

    logger.info('LAUNCH', 'Linux process exit detected', {
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

    resolve({
      status: code === 0,
      message: exitMessage,
      exitCode: code,
      veryShortRun,
      launchMethod: 'native',
    });
  });

  child.unref();
}
