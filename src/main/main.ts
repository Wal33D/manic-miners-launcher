import { BrowserWindow, app } from 'electron';
import { createWindow } from './createWindow';
import { setupGameLaunchHandlers } from './ipcHandlers/gameLaunchHandlers';
import { ipcMain } from 'electron';
import { fetchVersions } from '../api/versions/fetchVersions';
import { isVersionInstalled } from '../api/isVersionInstalled';

const startApp = (): void => {
  app.on('ready', () => {
    createWindow();
    ipcMain.on('request-versions', async event => {
      const versions = await fetchVersions({ versionType: 'all' }); // Ensure this returns an array
      if (Array.isArray(versions)) {
        event.reply('reply-versions', versions);
      } else {
        console.error('fetchVersions did not return an array:', versions);
        event.reply('reply-versions', []); // Send an empty array if not an array
      }
    });

    setupGameLaunchHandlers();
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

if (require('electron-squirrel-startup')) {
  app.quit();
}

startApp();
