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
export async function getDirectories(): Promise<{ status: boolean; message: string; data?: Directories }> {
  try {
    const homeDirectory = os.homedir();
    const launcherInstallPath = `${process.env['LOCALAPPDATA']}\\ManicMinersLauncher\\installations`;
    const launcherCachePath = `${process.env['LOCALAPPDATA']}\\ManicMinersLauncher\\cache`;
    const launcherLogsPath = `${process.env['LOCALAPPDATA']}\\ManicMinersLauncher\\logs`;

    // Ensuring launcher directories are created
    await ensureDirectoryExists(launcherInstallPath);
    await ensureDirectoryExists(launcherCachePath);
    await ensureDirectoryExists(launcherLogsPath);

    // Paths in user's Documents directory
    const levelsPath = path.join(homeDirectory, 'Documents', 'ManicMiners', 'Levels');
    const levelsBackupPath = path.join(levelsPath, 'Backup');

    // Ensure game document directories are created
    await ensureDirectoryExists(levelsPath);
    await ensureDirectoryExists(levelsBackupPath);

    // Paths where the game stores its files
    const logsPath = `${process.env['LOCALAPPDATA']}\\ManicMiners\\Saved\\Logs`;
    const configPath = `${process.env['LOCALAPPDATA']}\\ManicMiners\\Saved\\Config`;
    const configIniPath = `${process.env['LOCALAPPDATA']}\\ManicMiners\\Saved\\Config\\WindowsNoEditor`;
    const saveGamesPath = `${process.env['LOCALAPPDATA']}\\ManicMiners\\Saved\\SaveGames`;
    const LRRPath = `${saveGamesPath}\\LRR`;
    const profilesPath = `${saveGamesPath}\\Profiles`;
    const minersPath = `${saveGamesPath}\\Miners`;
    const backupSavesPath = `${saveGamesPath}\\Backup`;

    // Ensure game directories are created
    await ensureDirectoryExists(logsPath);
    await ensureDirectoryExists(configPath);
    await ensureDirectoryExists(configIniPath);
    await ensureDirectoryExists(saveGamesPath);
    await ensureDirectoryExists(LRRPath);
    await ensureDirectoryExists(profilesPath);
    await ensureDirectoryExists(minersPath);
    await ensureDirectoryExists(backupSavesPath);

    return {
      status: true,
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
  } catch (error: any) {
    return {
      status: false,
      message: `Failed to fetch and ensure directories: ${error.message}`,
    };
  }
}
