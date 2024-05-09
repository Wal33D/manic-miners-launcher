const os = require('os');
const path = require('path');
const fs = require('fs');

// Ensure the directory exists, create if it does not
function ensureDirectoryExists(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

// Function to gather and ensure existence of various system directories
export function getDirectories() {
  const homeDirectory = os.homedir();
  const launcherInstallPath = `${process.env['LOCALAPPDATA']}\\ManicMinersLauncher`;
  const launcherCachePath = `${process.env['LOCALAPPDATA']}\\ManicMinersLauncher\\cache`;

  // Ensuring launcher directories are created
  ensureDirectoryExists(launcherInstallPath);
  ensureDirectoryExists(launcherCachePath);

  // Paths in user's Documents directory
  const levelsPath = path.join(
    homeDirectory,
    'Documents',
    'ManicMiners',
    'Levels'
  );
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
