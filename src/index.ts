import { BrowserWindow, app, ipcMain } from 'electron';
import { createWindow } from './createWindow';
import { fetchVersions } from './api/versions/fetchVersions';
import { checkInstalledVersions } from './api/checkInstalledVersions';
import { handleGameLaunch } from './api/handleGameLaunch';
import Store from 'electron-store';

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

ipcMain.on('request-version-information', async (event, arg) => {
  console.log(arg); // Log the incoming message, which might indicate which action to perform
  try {
    let defaultVersion = (await checkInstalledVersions()).installedVersions.shift();
    store.set('current-selected-version', defaultVersion.identifier);

    defaultVersion = store.get('current-selected-version');
    const versionData = await fetchVersions({ versionType: 'all' });
    event.reply('version-information-reply', { versions: versionData.versions, defaultVersion });
  } catch (error) {
    console.error('Error fetching versions:', error);
    event.reply('version-information-reply', { error: error.message });
  }
});

ipcMain.on('get-selected-version', event => {
  const selectedVersion = store.get('current-selected-version');
  event.reply('get-selected-version-reply', selectedVersion);
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
