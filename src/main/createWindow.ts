import { BrowserWindow } from 'electron';
import path from 'path';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1180,
    height: 1080,
    minWidth: 1180, // Minimum width of the window
    minHeight: 1080, // Minimum height of the window
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true, // This will hide the menu bar
    frame: false, // This will remove the frame
  });

  // Ensure the renderer starts on the Home page in both dev and prod.
  // When packaged, loadFile lets us explicitly set the hash portion so
  // React Router's HashRouter receives '/'. During development
  // MAIN_WINDOW_WEBPACK_ENTRY points to the dev server URL, so we
  // continue using loadURL with the '#/' hash appended.
  if (MAIN_WINDOW_WEBPACK_ENTRY.startsWith('http')) {
    mainWindow.loadURL(`${MAIN_WINDOW_WEBPACK_ENTRY}#/`);
  } else {
    const indexPath = path.join(__dirname, '../renderer/index.html');
    mainWindow.loadFile(indexPath, { hash: '/' });
  }

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.once('did-finish-load', () => {
      mainWindow.webContents.openDevTools();
    });
  }
};
