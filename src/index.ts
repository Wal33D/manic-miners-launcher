// Imports from external libraries
import { BrowserWindow, app, ipcMain } from 'electron';

// Imports from internal modules and components
import Store from 'electron-store';
import { createWindow } from './createWindow';
import { IPC_CHANNELS } from './ipcConfig';
import { fetchVersions } from './api/versions/fetchVersions';
import { handleGameLaunch } from './api/handleGameLaunch';
import { checkInstalledVersions } from './api/checkInstalledVersions';

// Initialization of the store for persistent data storage
const store: any = new Store();

// Check if the application was launched by electron-squirrel-startup
if (require('electron-squirrel-startup')) {
  // This block handles creating/removing shortcuts on Windows when installing/uninstalling.
  app.quit();
}

// Main function to set up and start the application
const startApp = (): void => {
  app.on('ready', createWindow); // Event to create the main window when Electron is ready

  app.on('window-all-closed', () => {
    // Quit the application when all windows are closed (except on macOS)
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On macOS, recreate a window in the app when the dock icon is clicked and there are no other windows open
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
};

// IPC event handlers to manage application-level interactions
ipcMain.on(IPC_CHANNELS.VERSION_INFO_REQUEST, async event => {
  try {
    const versionData = await fetchVersions({ versionType: 'all' });
    const installedVersionsResult = await checkInstalledVersions();
    const installedVersions = installedVersionsResult.installedVersions;

    let storedPreferredVersion = store.get('current-selected-version');
    let defaultVersion = versionData.versions.find(v => v.identifier === storedPreferredVersion?.identifier);

    if (!defaultVersion && installedVersions?.length > 0) {
      defaultVersion = installedVersions[0];
      store.set('current-selected-version', defaultVersion);
    }

    if (!defaultVersion && versionData.versions.length > 0) {
      defaultVersion = versionData.versions[0]; // Fallback to the first available version
      store.set('current-selected-version', defaultVersion);
    }

    event.reply(IPC_CHANNELS.VERSION_INFO_REPLY, {
      versions: versionData.versions,
      defaultVersion,
    });
  } catch (error) {
    console.error('Error fetching versions:', error);
    event.reply(IPC_CHANNELS.VERSION_INFO_REPLY, { error: error.message });
  }
});

// Handlers to set and get the selected version
ipcMain.on(IPC_CHANNELS.SET_SELECTED_VERSION, (event, selectedVersion) => {
  store.set('current-selected-version', selectedVersion);
});

ipcMain.on(IPC_CHANNELS.GET_SELECTED_VERSION, event => {
  const selectedVersion = store.get('current-selected-version');
  event.reply(IPC_CHANNELS.GET_SELECTED_VERSION, selectedVersion);
});

// Handler to launch the game with a specific version
ipcMain.on(IPC_CHANNELS.LAUNCH_GAME, async (event, versionIdentifier) => {
  console.log(`Launching game with version: ${versionIdentifier}`);

  try {
    const success = await handleGameLaunch({ versionIdentifier });
    event.reply(IPC_CHANNELS.LAUNCH_GAME, { success, message: success ? 'Game launched successfully.' : 'Failed to launch game.' });
  } catch (error) {
    console.error(`Error launching game: ${error.message}`);
    event.reply(IPC_CHANNELS.LAUNCH_GAME, { success: false, message: `Error launching game: ${error.message}` });
  }
});

// Start the application
startApp();
