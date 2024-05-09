import { BrowserWindow, app, ipcMain } from 'electron';
import Store from 'electron-store';
import { createWindow } from './createWindow';
import { IPC_CHANNELS } from './ipcConfig';
import { fetchVersions } from './api/versions/fetchVersions';
import { handleGameLaunch } from './api/handleGameLaunch';
import { checkInstalledVersions } from './api/checkInstalledVersions';
import { Version } from './api/versions/versionTypes';

const store = new Store() as any;

if (require('electron-squirrel-startup')) app.quit();

const registerIpcHandlers = (): void => {
  const handleVersionRequest = async (event: {
    reply: (arg0: string, arg1: { versions?: Version[]; selectBoxDefaultVersion?: any; error?: any }) => void;
  }) => {
    try {
      const { defaultCurrentVersion } = await checkInstalledVersions();
      const { versions } = await fetchVersions({ versionType: 'all' });
      const selectedVersion = store.get('current-selected-version') || defaultCurrentVersion;
      event.reply(IPC_CHANNELS.VERSION_INFO_REPLY, { versions, selectBoxDefaultVersion: selectedVersion });
    } catch (error) {
      console.error('Error fetching versions:', error);
      event.reply(IPC_CHANNELS.VERSION_INFO_REPLY, { error: error.message });
    }
  };

  const setAndReplyVersion = (
    event: { reply: (arg0: string, arg1: { success: boolean; message: string }) => void },
    versionIdentifier: any
  ) => {
    store.set('current-selected-version', versionIdentifier);
    event.reply(IPC_CHANNELS.SET_SELECTED_VERSION_REPLY, { success: true, message: 'Version set successfully.' });
  };

  ipcMain.on(IPC_CHANNELS.VERSION_INFO_REQUEST, handleVersionRequest);
  ipcMain.on(IPC_CHANNELS.SET_SELECTED_VERSION, setAndReplyVersion);
  ipcMain.on(IPC_CHANNELS.GET_SELECTED_VERSION, event =>
    event.reply(IPC_CHANNELS.GET_SELECTED_VERSION_REPLY, store.get('current-selected-version'))
  );
  ipcMain.on(IPC_CHANNELS.LAUNCH_GAME, async (event, versionIdentifier) => {
    console.log(`Launching game with version: ${versionIdentifier}`);
    try {
      const success = await handleGameLaunch({ versionIdentifier });
      event.reply(IPC_CHANNELS.LAUNCH_GAME_REPLY, { success, message: success ? 'Game launched successfully.' : 'Failed to launch game.' });
    } catch (error) {
      console.error(`Error launching game: ${error.message}`);
      event.reply(IPC_CHANNELS.LAUNCH_GAME_REPLY, { success: false, message: `Error launching game: ${error.message}` });
    }
  });
};

const onAppReady = () => {
  createWindow();
  registerIpcHandlers();
};

app.on('ready', onAppReady);
app.on('window-all-closed', () => app.quit());
app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow());
