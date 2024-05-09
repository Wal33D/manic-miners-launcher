// main.ts
import { BrowserWindow, app, ipcMain } from 'electron';
import { createWindow } from './createWindow';
import { fetchVersions } from './api/versions/fetchVersions';
import { checkInstalledVersionsWithExe } from './api/checkInstalledVersions';
if (require('electron-squirrel-startup')) {
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

ipcMain.on('request-mainprocess-action', async (event, arg) => {
  console.log(arg);
  if (arg === 'fetchVersions') {
    try {
      const versionData = await fetchVersions({ versionType: 'all' });
      event.reply('reply-fetchVersions', versionData); // Specific channel for version data
    } catch (error) {
      console.error('Error fetching versions:', error);
      event.reply('reply-fetchVersions', { error: error.message });
    }
  } else if (arg === 'fetchInstalledVersions') {
    try {
      const { existingInstalls } = await checkInstalledVersionsWithExe();
      event.reply('reply-fetchInstalledVersions', { existingInstalls });
    } catch (error) {
      console.error('Error fetching installed versions:', error);
      event.reply('reply-fetchInstalledVersions', { error: error.message });
    }
  } else {
    event.reply('reply-error', { error: 'Received an unknown command' });
  }
});

startApp();
