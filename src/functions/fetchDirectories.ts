import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

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

// Ensure the directory exists, create if it does not
function ensureDirectoryExists(directoryPath: string): void {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

// Function to gather and ensure existence of various system directories
export function getDirectories(): Directories {
  const homeDirectory = os.homedir();
  const launcherInstallPath = `${process.env['LOCALAPPDATA']}\\ManicMinersLauncher\\installations`;
  const launcherCachePath = `${process.env['LOCALAPPDATA']}\\ManicMinersLauncher\\cache`;
  const launcherLogsPath = `${process.env['LOCALAPPDATA']}\\ManicMinersLauncher\\logs`;

  // Ensuring launcher directories are created
  ensureDirectoryExists(launcherInstallPath);
  ensureDirectoryExists(launcherCachePath);
  ensureDirectoryExists(launcherLogsPath);

  // Paths in user's Documents directory
  const levelsPath = path.join(homeDirectory, 'Documents', 'ManicMiners', 'Levels');
  const levelsBackupPath = path.join(levelsPath, 'Backup');

  // Ensure game document directories are created
  ensureDirectoryExists(levelsPath);
  ensureDirectoryExists(levelsBackupPath);

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
  ensureDirectoryExists(logsPath);
  ensureDirectoryExists(configPath);
  ensureDirectoryExists(configIniPath);
  ensureDirectoryExists(saveGamesPath);
  ensureDirectoryExists(LRRPath);
  ensureDirectoryExists(profilesPath);
  ensureDirectoryExists(minersPath);
  ensureDirectoryExists(backupSavesPath);

  return {
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
}
