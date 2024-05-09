import { BrowserWindow, app, ipcMain } from 'electron';
import { createWindow } from './createWindow';
import { fetchVersions } from './api/versions/fetchVersions';
import { checkInstalledVersions } from './api/checkInstalledVersions';
import { handleGameLaunch } from './api/handleGameLaunch';
import Store from 'electron-store';
import { IPC_CHANNELS } from './ipcConfig';

const store: any = new Store();

if (require('electron-squirrel-startup')) {
  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
  app.quit();
}

const startApp = (): void => {
  app.on('ready', createWindow);

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

ipcMain.on('request-version-information', async event => {
  try {
    // Fetch all available versions
    const versionData = await fetchVersions({ versionType: 'all' });

    // Fetch installed versions to find a default if necessary
    const installedVersionsResult = await checkInstalledVersions();
    const installedVersions = installedVersionsResult.installedVersions;

    // Retrieve the preferred version from the store, if available
    let storedPreferredVersion = store.get('current-selected-version');

    // Check if the stored preferred version is still valid
    let defaultVersion = versionData.versions.find(v => v.identifier === storedPreferredVersion?.identifier);

    // If there's no valid stored preferred version and there are installed versions, use the first installed version
    if (!defaultVersion && installedVersions && installedVersions.length > 0) {
      defaultVersion = installedVersions[0];
      // Update the store to reflect this newly selected default version
      store.set('current-selected-version', defaultVersion);
    }

    // Ensure there's always a default version selected
    if (!defaultVersion && versionData.versions.length > 0) {
      defaultVersion = versionData.versions[0]; // Fallback to the first available version
      store.set('current-selected-version', defaultVersion);
    }

    event.reply(IPC_CHANNELS.VERSION_INFO_REPLY, {
      versions: versionData.versions,
      defaultVersion,
    });
  } catch (error) {
    console.error('Error fetching versions:', error);
    event.reply(IPC_CHANNELS.VERSION_INFO_REPLY, { error: error.message });
  }
});

ipcMain.on(IPC_CHANNELS.SET_SELECTED_VERSION, (event, selectedVersion) => {
  store.set('current-selected-version', selectedVersion);
});

ipcMain.on(IPC_CHANNELS.GET_SELECTED_VERSION, event => {
  const selectedVersion = store.get('current-selected-version');
  event.reply(IPC_CHANNELS.GET_SELECTED_VERSION, selectedVersion);
});

ipcMain.on('launch-game', async (event, versionIdentifier) => {
  console.log(`Launching game with version: ${versionIdentifier}`);
  console.log(versionIdentifier);

  try {
    const success = await handleGameLaunch({ versionIdentifier });
    event.reply('game-launch-reply', { success, message: success ? 'Game launched successfully.' : 'Failed to launch game.' });
  } catch (error) {
    console.error(`Error launching game: ${error.message}`);
    event.reply('game-launch-reply', { success: false, message: `Error launching game: ${error.message}` });
  }
});

startApp();
