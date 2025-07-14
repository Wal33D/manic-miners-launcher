import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs/promises'; // Using fs promises for asynchronous operations

export interface Directories {
  launcherInstallPath: string;
  launcherCachePath: string;
  launcherLogsPath: string;
  levelsPath: string;
  levelsBackupPath: string;
  logsPath: string;
  configPath: string;
  configIniPath: string;
  saveGamesPath: string;
  LRRPath: string;
  profilesPath: string;
  minersPath: string;
  backupSavesPath: string;
}

// Async function to ensure the directory exists, create if it does not
async function ensureDirectoryExists(directoryPath: string): Promise<void> {
  try {
    const exists = await fs
      .access(directoryPath)
      .then(() => true)
      .catch(() => false);
    if (!exists) {
      await fs.mkdir(directoryPath, { recursive: true });
    }
  } catch (error) {
    throw new Error(`Error ensuring directory ${directoryPath}: ${error}`);
  }
}

// Function to gather and ensure existence of various system directories
export async function getDirectories(): Promise<{ status: boolean; message: string; directories?: Directories }> {
  try {
    const homeDirectory = os.homedir();
    const localAppData =
      process.env.LOCALAPPDATA ||
      (process.platform === 'win32' ? path.join(os.homedir(), 'AppData', 'Local') : path.join(os.homedir(), '.local', 'share'));

    const launcherBasePath = path.join(localAppData, 'ManicMinersLauncher');
    const launcherInstallPath = process.env.MANIC_MINERS_INSTALL_PATH || path.join(launcherBasePath, 'installations');
    const launcherCachePath = path.join(launcherBasePath, 'cache');
    const launcherLogsPath = path.join(launcherBasePath, 'logs');

    // Paths in user's Documents directory
    const levelsPath = path.join(homeDirectory, 'Documents', 'ManicMiners', 'Levels');
    const levelsBackupPath = path.join(levelsPath, 'Backup');

    // Paths where the game stores its files
    const savedBasePath = path.join(localAppData, 'ManicMiners', 'Saved');
    const logsPath = path.join(savedBasePath, 'Logs');
    const configPath = path.join(savedBasePath, 'Config');
    const configIniPath = process.platform === 'win32' ? path.join(configPath, 'WindowsNoEditor') : configPath;
    const saveGamesPath = path.join(savedBasePath, 'SaveGames');
    const LRRPath = path.join(saveGamesPath, 'LRR');
    const profilesPath = path.join(saveGamesPath, 'Profiles');
    const minersPath = path.join(saveGamesPath, 'Miners');
    const backupSavesPath = path.join(saveGamesPath, 'Backup');

    const directories: Directories = {
      launcherInstallPath,
      launcherCachePath,
      launcherLogsPath,
      levelsPath,
      levelsBackupPath,
      logsPath,
      configPath,
      configIniPath,
      saveGamesPath,
      LRRPath,
      profilesPath,
      minersPath,
      backupSavesPath,
    };

    for (const dir of Object.values(directories)) {
      await ensureDirectoryExists(dir);
    }

    return {
      status: true,
      message: 'Directories fetched and ensured successfully',
      directories,
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      status: false,
      message: `Failed to fetch and ensure directories: ${err.message}`,
    };
  }
}
