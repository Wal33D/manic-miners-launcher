// main.ts
import { BrowserWindow, app, ipcMain } from 'electron';
import { createWindow } from './createWindow';
import { fetchVersions } from './versions/fetchVersions';
import { main } from './checkInstalledVersions';
main();
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

ipcMain.on('request-mainprocess-action', async (event, arg) => {
  console.log(arg); // Log the incoming message, which might indicate which action to perform

  // Check the action to perform based on 'arg'
  switch (arg) {
    case 'fetchVersions':
      try {
        // Fetch version data, default to 'all' if not specified in the arg
        const versionData = await fetchVersions({ versionType: 'all' });
        event.reply('action-reply', versionData.versions); // Ensure to send only the versions array if that's what the renderer expects
      } catch (error) {
        console.error('Error fetching versions:', error);
        event.reply('action-reply', { error: error.message }); // Send error message back to renderer for handling
      }
      break;
    default:
      event.reply('action-reply', { error: 'Received an unknown command' });
  }
});

startApp();
