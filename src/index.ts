// main.ts
import { BrowserWindow, app, ipcMain } from 'electron';
import { createWindow } from './createWindow';
import { fetchVersions } from './api/versions/fetchVersions';
import { checkInstalledVersions } from './api/checkInstalledVersions';
import { handleGameLaunch } from './api/handleGameLaunch';

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

ipcMain.on('request-version-information', async (event, arg) => {
  console.log(arg); // Log the incoming message, which might indicate which action to perform

  // Check the action to perform based on 'arg'
  switch (arg) {
    case 'fetchVersions':
      try {
        const { existingInstalls } = await checkInstalledVersions();

        // Fetch version data, default to 'all' if not specified in the arg
        const versionData = await fetchVersions({ versionType: 'all' });
        event.reply('version-information-reply', { versions: versionData.versions, currentlyInstalledVersions: existingInstalls });
      } catch (error) {
        console.error('Error fetching versions:', error);
        event.reply('version-information-reply', { error: error.message }); // Send error message back to renderer for handling
      }
      break;
    default:
      event.reply('version-information-reply', { error: 'Received an unknown command' });
  }
});

ipcMain.on('launch-game', async (event, versionIdentifier) => {
  console.log(`Launching game with version: ${versionIdentifier}`);
  try {
    // The handleGameLaunch function is expected to return true if successful, false otherwise
    const success = await handleGameLaunch({ versionIdentifier });

    if (success) {
      console.log('Game launched successfully');
      // Send a success message back to the renderer
      event.reply('game-launch-reply', { success: true, message: 'Game launched successfully.' });
    } else {
      console.log('Game failed to launch');
      // Send a failure message back to the renderer
      event.reply('game-launch-reply', { success: false, message: 'Failed to launch game.' });
    }
  } catch (error) {
    console.error(`Error launching game: ${error.message}`);
    // Send an error message back to the renderer
    event.reply('game-launch-reply', { success: false, message: `Error launching game: ${error.message}` });
  }
});

startApp();
