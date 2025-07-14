import { BrowserWindow, app } from 'electron';
import path from 'path';
import { createWindow } from './createWindow';
import { setupVersionHandlers } from './ipcHandlers/setupVersionHandlers';
import { setupGameLaunchHandlers } from './ipcHandlers/setupGameLaunchHandlers';
import { setupDownloadHandlers } from './ipcHandlers/setupDownloadHandlers';
import { setupMaintenanceHandlers } from './ipcHandlers/setupMaintenanceHandlers';
import { setupDirectoryHandler } from './ipcHandlers/getDirectoriesIPC';
import { setupInputPathDialog } from './ipcHandlers/setupInputPathDialog';
import { setupUrlHandler } from './ipcHandlers/setupUrlHandler';
import { setupPlaySoundHandler } from './ipcHandlers/setupPlaySoundHandler';
import { setupSettingsHandlers } from './ipcHandlers/setupSettingsHandlers';
import { setupWindowControlHandlers } from './ipcHandlers/setupWindowControlHandlers';
import { setupExternalUrlHandler } from './ipcHandlers/setupExternalUrlHandler';
import { setupItchDownloadHandler } from './ipcHandlers/setupItchDownloadHandler';
import { setupVerifyRepairHandler } from './ipcHandlers/setupVerifyRepairHandler';
import { setupShortcutHandler } from './ipcHandlers/setupShortcutHandler';
import { checkItchUpdate } from '../functions/checkItchUpdate';

// Disable hardware acceleration to avoid GPU-related errors in some environments
app.disableHardwareAcceleration();
// Prevent Chrome DevTools from attempting to use unsupported Autofill features
app.commandLine.appendSwitch('disable-features', 'Autofill');

const userDataPath = path.join(app.getPath('home'), '.manic-miners-launcher');
app.setPath('userData', userDataPath);

const startApp = (): void => {
  app.on('ready', async () => {
    setupDirectoryHandler();
    await checkItchUpdate();
    createWindow();
    setupVersionHandlers();
    setupGameLaunchHandlers();
    setupDownloadHandlers();
    setupMaintenanceHandlers();
    setupInputPathDialog();
    setupUrlHandler();
    setupPlaySoundHandler();
    setupSettingsHandlers();
    setupWindowControlHandlers();
    setupExternalUrlHandler();
    setupItchDownloadHandler();
    setupVerifyRepairHandler();
    setupShortcutHandler();
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

if (process.platform === 'win32' && require('electron-squirrel-startup')) {
  app.quit();
}

startApp();
