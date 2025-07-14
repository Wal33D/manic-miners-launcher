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
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false,
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

  // Suppress DevTools autofill-related and GPU console errors
  mainWindow.webContents.on('console-message', (event, level, message) => {
    // Filter out autofill-related DevTools protocol errors
    if (message.includes('Autofill.enable') || 
        message.includes('Autofill.setAddresses') || 
        message.includes("wasn't found") ||
        // Filter out GPU SharedImageManager errors during navigation
        message.includes('SharedImageManager::ProduceMemory') ||
        message.includes('non-existent mailbox') ||
        message.includes('gpu/command_buffer/service')) {
      event.preventDefault();
    }
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.once('did-finish-load', () => {
      mainWindow.webContents.openDevTools();
    });
  }
};
