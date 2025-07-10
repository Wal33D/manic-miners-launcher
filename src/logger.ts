let getDirectories:
  | (() => Promise<{
      status: boolean;
      message: string;
      directories?: {
        launcherLogsPath: string;
      };
    }>)
  | null = null;

let fs: typeof import('fs').promises | null = null;
let join: ((...paths: string[]) => string) | null = null;

const loadNodeModules = () => {
  if (!fs || !join) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const req = require as NodeRequire;
    if (!fs) fs = req('fs').promises;
    if (!join) ({ join } = req('path'));
  }
};

const isRenderer = typeof process !== 'undefined' && (process as any).type === 'renderer';

const loadGetDirectories = () => {
  if (!getDirectories && !isRenderer) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    getDirectories = require('./functions/fetchDirectories').getDirectories;
  }
};

// Flag to control verbose logging
export const isVerbose = typeof process !== 'undefined' && process.env ? process.env.VERBOSE === 'true' : false;

let configuredLogDir: string | null = null;

export const setLogDirectory = (dir: string) => {
  configuredLogDir = dir;
};

const ensureLogDir = async (): Promise<string> => {
  if (configuredLogDir) return configuredLogDir;
  loadGetDirectories();
  if (!getDirectories) {
    throw new Error('getDirectories is not available in renderer context');
  }
  const { status, message, directories } = await getDirectories();
  if (!status || !directories) {
    throw new Error(message);
  }
  configuredLogDir = directories.launcherLogsPath;
  return configuredLogDir;
};

/**
 * Logs a message to a file with a timestamp. Uses a specified file or a default log file if no path is provided.
 * @param options An object containing the message and optional file path.
 */
export const logToFile = async ({ message, filePath }: { message: string; filePath?: string }) => {
  if (isRenderer) {
    console.log(message);
    return;
  }
  try {
    loadNodeModules();
    const dir = await ensureLogDir();
    const finalPath = filePath || join!(dir, 'default-log.txt');
    const timeStampedMessage = `${new Date().toISOString()}: ${message}\n`;
    await fs!.appendFile(finalPath, timeStampedMessage, 'utf-8');
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
  if (isRenderer) {
    console.log(message);
    return;
  }
  try {
    loadNodeModules();
    const dir = await ensureLogDir();
    await logToFile({ message, filePath: join!(dir, 'runtime-log.txt') });
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
    await logToRuntimeLog({ message: `[DEBUG] ${message}` });
  }
};

export const info = async (message: string) => {
  await logToRuntimeLog({ message: `[INFO] ${message}` });
};

export const debug = debugLog;

export const error = async (message: string) => {
  await logToRuntimeLog({ message: `[ERROR] ${message}` });
};
