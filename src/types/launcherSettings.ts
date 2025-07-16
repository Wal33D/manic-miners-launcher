export interface LauncherSettings {
  // UI Settings
  playSoundOnInstall: boolean;
  autoLaunchAfterInstall: boolean;
  darkMode: boolean;

  // Game Launch Settings
  launchMode: 'steam' | 'direct' | 'wine';
  skipLauncher: boolean;
  modsEnabled: boolean;

  // Path Settings
  installPath: string;
  steamPath: string;
  winePrefix: string;

  // Steam Settings
  runThroughSteam: boolean;

  // Update Settings
  alwaysUpdate: boolean;

  // Graphics Settings
  dgVoodooEnabled: boolean;
}
