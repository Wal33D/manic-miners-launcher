import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { LauncherSettings } from '../../types/launcherSettings';
import { typedStore } from '../../utils/typedStore';
import { withIpcHandler } from './withIpcHandler';
import { validateIpcData } from '../../utils/ipcValidation';

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
    ipcMain.on(
      IPC_CHANNELS.GET_SETTINGS,
      withIpcHandler(IPC_CHANNELS.GET_SETTINGS, async () => {
        return typedStore.get('settings') || defaultSettings;
      })
    );

    ipcMain.on(
      IPC_CHANNELS.SET_SETTINGS,
      withIpcHandler(IPC_CHANNELS.SET_SETTINGS, async (_event, settings: LauncherSettings) => {
        const validation = validateIpcData('set-settings', settings);
        if (!validation.isValid) {
          throw new Error(`Invalid settings data: ${validation.error}`);
        }

        typedStore.set('settings', validation.data as LauncherSettings);
        return { status: true, message: 'Settings saved successfully' };
      })
    );

    message = 'Settings handlers set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up settings handlers: ${err.message}`;
    status = false;
  }

  return { status, message };
};
