import { BrowserWindow, app } from 'electron';
import path from 'path';
import { createWindow } from './createWindow';
import { setupVersionHandlers } from './ipcHandlers/setupVersionHandlers';
import { setupGameLaunchHandlers } from './ipcHandlers/setupGameLaunchHandlers';
import { setupDownloadHandlers } from './ipcHandlers/setupDownloadHandlers';
import { setupDirectoryHandler } from './ipcHandlers/getDirectoriesIPC';
import { setupInputPathDialog } from './ipcHandlers/setupInputPathDialog';
import { setupUrlHandler } from './ipcHandlers/setupUrlHandler';
import { setupPlaySoundHandler } from './ipcHandlers/setupPlaySoundHandler';
import { setupSettingsHandlers } from './ipcHandlers/setupSettingsHandlers';

// Disable hardware acceleration to avoid GPU-related errors in some environments
app.disableHardwareAcceleration();
// Prevent Chrome DevTools from attempting to use unsupported Autofill features
app.commandLine.appendSwitch('disable-features', 'Autofill');

const userDataPath = path.join(app.getPath('home'), '.manic-miners-launcher');
app.setPath('userData', userDataPath);

const startApp = (): void => {
  app.on('ready', () => {
    setupDirectoryHandler();
    createWindow();
    setupVersionHandlers();
    setupGameLaunchHandlers();
    setupDownloadHandlers();
    setupInputPathDialog();
    setupUrlHandler();
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
} else if (require('electron-squirrel-startup')) {
  app.quit();
}

startApp();
