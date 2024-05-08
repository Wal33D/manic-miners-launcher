// createWindow.ts
import { BrowserWindow } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 700,
    frame: false, // This will remove the frame
    transparent: true,
    autoHideMenuBar: true, // This will hide the menu bar
    roundedCorners: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};
