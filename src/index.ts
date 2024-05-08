import { BrowserWindow, app } from 'electron';
import { createWindow } from './createWindow';
import { ipcMain } from 'electron';

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
// IPC listener for renderer requests
// Main process
ipcMain.on('port', (e, msg) => {
  const [port] = e.ports;
  console.log(msg);
});
startApp();
