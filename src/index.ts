import Store from 'electron-store';
import { createWindow } from './createWindow';
import { IPC_CHANNELS } from './ipcConfig';
import { fetchVersions } from './api/versions/fetchVersions';
import { handleGameLaunch } from './api/handleGameLaunch';
import { checkInstalledVersions } from './api/checkInstalledVersions';
import { BrowserWindow, app, ipcMain } from 'electron';

const store = new Store() as any;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const registerIpcHandlers = (): void => {
  ipcMain.on(IPC_CHANNELS.VERSION_INFO_REQUEST, async (event, arg) => {
    console.log(arg);
    try {
      const { existingInstalls } = await checkInstalledVersions();
      const versionData = await fetchVersions({ versionType: 'all' });
      event.reply(IPC_CHANNELS.VERSION_INFO_REPLY, { versions: versionData.versions, currentlyInstalledVersions: existingInstalls });
    } catch (error) {
      console.error('Error fetching versions:', error);
      event.reply(IPC_CHANNELS.VERSION_INFO_REPLY, { error: error.message });
    }
  });

  ipcMain.on(IPC_CHANNELS.SET_SELECTED_VERSION, (event, versionIdentifier) => {
    console.log(`Setting selected version: ${versionIdentifier}`);
    store.set('current-selected-version', versionIdentifier);
    event.reply(IPC_CHANNELS.SET_SELECTED_VERSION_REPLY, { success: true, message: 'Version set successfully.' });
  });

  ipcMain.on(IPC_CHANNELS.GET_SELECTED_VERSION, event => {
    const selectedVersion = store.get('current-selected-version');
    event.reply(IPC_CHANNELS.GET_SELECTED_VERSION_REPLY, selectedVersion);
  });

  ipcMain.on(IPC_CHANNELS.LAUNCH_GAME, async (event, versionIdentifier) => {
    console.log(`Launching game with version: ${versionIdentifier}`);
    try {
      const success = await handleGameLaunch({ versionIdentifier });
      event.reply(IPC_CHANNELS.LAUNCH_GAME_REPLY, { success, message: success ? 'Game launched successfully.' : 'Failed to launch game.' });
    } catch (error) {
      console.error(`Error launching game: ${error.message}`);
      event.reply(IPC_CHANNELS.LAUNCH_GAME_REPLY, { success: false, message: `Error launching game: ${error.message}` });
    }
  });
};

const startApp = (): void => {
  app.on('ready', () => {
    createWindow();
    registerIpcHandlers(); // Initialize all IPC handlers after window is ready
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
};

startApp();
