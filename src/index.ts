import { BrowserWindow, app } from 'electron';
import { createWindow } from './createWindow';
import { fetchVersions } from './fetchVersions';

async function test(): Promise<void> {
  const response = await fetchVersions();
  console.log(response);
  startApp();
}
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
test();
