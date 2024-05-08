import { BrowserWindow, app } from 'electron';
import { createWindow } from './createWindow';

if (require('electron-squirrel-startup')) {
  app.quit();
}
import { fetchVersions } from './fetchVersions';

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

startApp();
