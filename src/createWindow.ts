// createWindow.ts
import { BrowserWindow } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 700,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: false, // This will hide the menu bar
    frame: true, // This will remove the frame
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};
