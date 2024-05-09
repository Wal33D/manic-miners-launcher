// main.ts
import { BrowserWindow, app, ipcMain } from 'electron';
import { createWindow } from './createWindow';
import { fetchVersions } from './versions/fetchVersions';

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
  console.log(arg); // Log the incoming message, which might indicate which action to perform

  // Assuming arg might dictate which function to run, if it's 'fetchVersions' we execute it
  if (arg === 'fetchVersions') {
    const versionData = await fetchVersions({ versionType: 'all' });
    event.reply('action-reply', versionData); // Send the fetched versions data back to renderer
  } else {
    event.reply('action-reply', 'Received an unknown command');
  }
});

startApp();
