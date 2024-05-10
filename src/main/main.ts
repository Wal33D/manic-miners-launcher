import { BrowserWindow, app } from 'electron';
import { createWindow } from './createWindow';
import { setupVersionHandlers } from './ipcHandlers/versionHandlers';
import { setupGameLaunchHandlers } from './ipcHandlers/gameLaunchHandlers';

const startApp = (): void => {
  app.on('ready', () => {
    createWindow();
    setupVersionHandlers();
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
