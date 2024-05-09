import fs from 'fs';
import { join } from 'path';
import { getDirectories } from './api/getDirectories';

const { launcherLogsPath } = getDirectories();
const logFilePath = join(launcherLogsPath, 'runtime-log.txt');

export const logToFile = (message: string) => {
  const timeStampedMessage = `${new Date().toISOString()}: ${message}\n`;
  fs.appendFileSync(logFilePath, timeStampedMessage, 'utf-8');
};
