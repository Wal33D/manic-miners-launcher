import { app, BrowserWindow, ipcMain } from 'electron';
import { createWindow } from './createWindow';
import { fetchVersions } from './fetchVersions';

if (require('electron-squirrel-startup')) {
  app.quit();
}

// Store versions data globally
global.versionsData: any = null;

const startApp = async (): Promise<void> => {
  app.on('ready', async () => {
    const response = await fetchVersions();
    versionsData = response; // Store the fetched data
    console.log(response); // Optional: log the fetched data
    createWindow(); // Now create the window
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

  // IPC listener for renderer requests
  ipcMain.on('getVersionsData', event => {
    event.reply('versionsDataResponse', versionsData);
  });
};

startApp();
