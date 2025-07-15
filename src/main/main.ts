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
import { setupLoggingHandler } from './ipcHandlers/setupLoggingHandler';
import { checkItchUpdate } from '../functions/checkItchUpdate';
import { logger } from '../utils/logger';

// Disable hardware acceleration to avoid GPU-related errors in some environments
app.disableHardwareAcceleration();

// Prevent Chrome DevTools from attempting to use unsupported features
app.commandLine.appendSwitch('disable-features', 'Autofill,AutofillServerCommunication,AutofillAssistant,VizDisplayCompositor');
app.commandLine.appendSwitch('disable-dev-tools-autofill-engine');
app.commandLine.appendSwitch('disable-background-networking');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');

// Additional DevTools-specific suppressions
app.commandLine.appendSwitch('disable-dev-shm-usage');
app.commandLine.appendSwitch('no-sandbox');

// Reduce GPU-related console noise
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-ipc-flooding-protection');

const userDataPath = path.join(app.getPath('home'), '.manic-miners-launcher');
app.setPath('userData', userDataPath);

// Log application startup
logger.info('APP', 'Manic Miners Launcher starting...');

const startApp = (): void => {
  app.on('ready', async () => {
    logger.info('APP', 'Setting up IPC handlers...');
    setupDirectoryHandler();
    setupLoggingHandler(); // Setup logging handler early
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
    logger.info('APP', 'All IPC handlers setup complete');
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
