import { BrowserWindow, app } from 'electron';
import path from 'path';
import { createWindow } from './createWindow';
import { setupVersionHandlers } from './ipcHandlers/setupVersionHandlers';
import { setupGameLaunchHandlers } from './ipcHandlers/setupGameLaunchHandlers';
import { setupDownloadHandlers } from './ipcHandlers/setupDownloadHandlers';
import { setupDirectoryHandler } from './ipcHandlers/getDirectoriesIPC';
import { setupInputPathDialog } from './ipcHandlers/setupInputPathDialog';
import { setupUrlHandler } from './ipcHandlers/setupUrlHandler';
import { setupLevelHandler } from './ipcHandlers/setupLevelHandler';
import { setupPlaySoundHandler } from './ipcHandlers/setupPlaySoundHandler';
import { setupLevelDownloadHandlers } from './ipcHandlers/setupLevelDownloadHandlers';
import { setupSettingsHandlers } from './ipcHandlers/setupSettingsHandlers';

const userDataPath = path.join(app.getPath('home'), '.manic-miners-launcher');
app.setPath('userData', userDataPath);

const startApp = (): void => {
  app.on('ready', () => {
    setupDirectoryHandler();
    createWindow();
    setupVersionHandlers();
    setupGameLaunchHandlers();
    setupDownloadHandlers();
    setupLevelDownloadHandlers();
    setupInputPathDialog();
    setupUrlHandler();
    setupLevelHandler();
    setupPlaySoundHandler();
    setupSettingsHandlers();
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

if (process.platform !== 'win32') {
  console.warn('This launcher is primarily designed for Windows. Some features like shortcut creation and auto-update will be disabled.');
} else if (require('electron-squirrel-startup')) {
  app.quit();
}

startApp();
