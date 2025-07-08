import { ipcMain } from 'electron';
import Store from 'electron-store';
import { IPC_CHANNELS } from './ipcChannels';
import { LauncherSettings } from '../../types/launcherSettings';

const store = new Store() as any;

const defaultSettings: LauncherSettings = {
  playSoundOnInstall: true,
  autoLaunchAfterInstall: false,
  darkMode: true,
};

export const setupSettingsHandlers = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    ipcMain.on(IPC_CHANNELS.GET_SETTINGS, event => {
      const settings = (store.get('settings') as LauncherSettings) || defaultSettings;
      event.reply(IPC_CHANNELS.GET_SETTINGS, settings);
    });

    ipcMain.on(IPC_CHANNELS.SET_SETTINGS, (_event, settings: LauncherSettings) => {
      store.set('settings', settings);
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
