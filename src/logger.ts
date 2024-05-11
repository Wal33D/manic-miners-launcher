import fs from 'fs';
import { join } from 'path';
import { getDirectories } from './functions/fetchDirectories';

// Retrieve the launcher logs path from the configuration.
const { launcherLogsPath } = getDirectories();

/**
 * Logs a message to a file with a timestamp. Uses a specified file or a default log file if no path is provided.
 * @param options An object containing the message and optional file path.
 */
export const logToFile = ({ message, filePath = join(launcherLogsPath, 'default-log.txt') }: { message: string; filePath?: string }) => {
  const timeStampedMessage = `${new Date().toISOString()}: ${message}\n`;
  try {
    fs.appendFileSync(filePath, timeStampedMessage, 'utf-8');
  } catch (error) {
    console.error(`Failed to write to log file: ${error}`);
  }
};

/**
 * Logs a message specifically to the runtime log file.
 * @param message The message to log.
 */
export const logToRuntimeLog = ({ message }: { message: string }) => {
  logToFile({ message, filePath: join(launcherLogsPath, 'runtime-log.txt') });
};
