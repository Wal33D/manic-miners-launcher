import { BrowserWindow } from 'electron';
import path from 'path';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1180,
    height: 900,
    minWidth: 1180, // Minimum width of the window
    minHeight: 900, // Minimum height of the window
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true, // This will hide the menu bar
    frame: false, // This will remove the frame
  });

  // Load the root path without a hash in both dev and production.
  // In development MAIN_WINDOW_WEBPACK_ENTRY is a URL; in production
  // we load the packaged HTML file directly.
  if (MAIN_WINDOW_WEBPACK_ENTRY.startsWith('http')) {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  } else {
    const indexPath = path.join(__dirname, '../renderer/index.html');
    mainWindow.loadFile(indexPath);
  }


  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.once('did-finish-load', () => {
      mainWindow.webContents.openDevTools();
    });
  }
};
