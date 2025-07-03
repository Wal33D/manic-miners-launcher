let fs: typeof import('fs/promises') | null = null;
let join: ((...paths: string[]) => string) | null = null;

if (typeof process !== 'undefined' && (process as any).type !== 'renderer') {
  // Directly require Node modules when running outside the renderer
  fs = require('fs').promises;
  ({ join } = require('path'));
}

// Flag to control verbose logging
export const isVerbose = process.env.VERBOSE === 'true';

/**
 * Logs a message to a file with a timestamp. Uses a specified file or a default log file if no path is provided.
 * @param options An object containing the message and optional file path.
 */
export const logToFile = async ({ message, filePath }: { message: string; filePath?: string }) => {
  if (!fs || !join) {
    console.log(message);
    return;
  }
  try {
    const { getDirectories } = await import('./functions/fetchDirectories');
    const { status, message: dirMessage, directories } = await getDirectories();
    if (!status) {
      throw new Error(dirMessage);
    }
    const launcherLogsPath = directories.launcherLogsPath;
    const finalPath = filePath || join(launcherLogsPath, 'default-log.txt');
    const timeStampedMessage = `${new Date().toISOString()}: ${message}\n`;
    await fs.appendFile(finalPath, timeStampedMessage, 'utf-8');
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to write to log file: ${err.message}`);
  }
};

/**
 * Logs a message specifically to the runtime log file.
 * @param message The message to log.
 */
export const logToRuntimeLog = async ({ message }: { message: string }) => {
  if (!fs || !join) {
    console.log(message);
    return;
  }
  try {
    const { getDirectories } = await import('./functions/fetchDirectories');
    const { status, message: dirMessage, directories } = await getDirectories();
    if (!status) {
      throw new Error(dirMessage);
    }
    const launcherLogsPath = directories.launcherLogsPath;
    await logToFile({ message, filePath: join(launcherLogsPath, 'runtime-log.txt') });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to log runtime message: ${err.message}`);
  }
};

/**
 * Logs a message to the runtime log only when verbose logging is enabled.
 * @param message The debug message to log.
 */
export const debugLog = async (message: string) => {
  if (isVerbose) {
    await logToRuntimeLog({ message });
  }
};
