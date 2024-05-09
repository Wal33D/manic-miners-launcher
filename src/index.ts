// main.ts
import { BrowserWindow, app, ipcMain } from 'electron';
import { createWindow } from './createWindow';
import { fetchVersions } from './api/versions/fetchVersions';
import { checkInstalledVersionsWithExe } from './api/checkInstalledVersions';
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
        const { existingInstalls } = await checkInstalledVersionsWithExe();

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

startApp();
