import { BrowserWindow, app } from 'electron';
import { createWindow } from './createWindow';
import { setupVersionHandlers } from './ipcHandlers/setupVersionHandlers';
import { setupGameLaunchHandlers } from './ipcHandlers/setupGameLaunchHandlers';
import { setupDownloadHandlers } from './ipcHandlers/setupDownloadHandlers';
import { setupDirectoryHandler } from './ipcHandlers/getDirectoriesIPC';
import { setupInputPathDialog } from './ipcHandlers/setupInputPathDialog';
import { setupUrlHandler } from './ipcHandlers/setupUrlHandler';
import { setupLevelHandler } from './ipcHandlers/setupLevelHandler';

const startApp = (): void => {
  app.on('ready', () => {
    setupDirectoryHandler();
    createWindow();
    setupVersionHandlers();
    setupGameLaunchHandlers();
    setupDownloadHandlers();
    setupInputPathDialog();
    setupUrlHandler();
    setupLevelHandler();
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
