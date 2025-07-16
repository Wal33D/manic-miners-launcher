import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { LauncherSettings } from '../../types/launcherSettings';
import { typedStore } from '../../utils/typedStore';

const defaultSettings: LauncherSettings = {
  // UI Settings
  playSoundOnInstall: true,
  autoLaunchAfterInstall: false,
  darkMode: true,

  // Game Launch Settings
  launchMode: 'steam',
  skipLauncher: false,
  modsEnabled: false,

  // Path Settings
  installPath: '',
  steamPath: '',
  winePrefix: '',

  // Steam Settings
  runThroughSteam: false,

  // Update Settings
  alwaysUpdate: false,

  // Graphics Settings
  dgVoodooEnabled: false,
};

export const setupSettingsHandlers = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    ipcMain.on(IPC_CHANNELS.GET_SETTINGS, event => {
      const settings = typedStore.get('settings') || defaultSettings;
      event.reply(IPC_CHANNELS.GET_SETTINGS, settings);
    });

    ipcMain.on(IPC_CHANNELS.SET_SETTINGS, (_event, settings: LauncherSettings) => {
      typedStore.set('settings', settings);
    });

    message = 'Settings handlers set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up settings handlers: ${err.message}`;
    status = false;
  }

  return { status, message };
};
