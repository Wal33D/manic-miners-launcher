import fs from 'fs/promises'; // Use fs promises module for async file operations
import { join } from 'path';
import { getDirectories } from './functions/fetchDirectories';

/**
 * Logs a message to a file with a timestamp. Uses a specified file or a default log file if no path is provided.
 * @param options An object containing the message and optional file path.
 */
export const logToFile = async ({ message, filePath }: { message: string; filePath?: string }) => {
  try {
    const { status, message: dirMessage, directories } = await getDirectories();
    if (!status) {
      throw new Error(dirMessage);
    }
    const launcherLogsPath = directories.launcherLogsPath;
    const finalPath = filePath || join(launcherLogsPath, 'default-log.txt');
    const timeStampedMessage = `${new Date().toISOString()}: ${message}\n`;
    await fs.appendFile(finalPath, timeStampedMessage, 'utf-8');
  } catch (error: any) {
    console.error(`Failed to write to log file: ${error.message}`);
  }
};

/**
 * Logs a message specifically to the runtime log file.
 * @param message The message to log.
 */
export const logToRuntimeLog = async ({ message }: { message: string }) => {
  try {
    const { status, message: dirMessage, directories } = await getDirectories();
    if (!status) {
      throw new Error(dirMessage);
    }
    const launcherLogsPath = directories.launcherLogsPath;
    await logToFile({ message, filePath: join(launcherLogsPath, 'runtime-log.txt') });
  } catch (error: any) {
    console.error(`Failed to log runtime message: ${error.message}`);
  }
};
