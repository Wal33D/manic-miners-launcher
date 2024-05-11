import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { fetchVersions } from '../../api/fetchVersions';
import { fetchInstalledVersions } from '../../functions/fetchInstalledVersions';
import Store from 'electron-store';

const store = new Store() as any;

export const setupVersionHandlers = () => {
  ipcMain.on(IPC_CHANNELS.VERSION_INFO, async event => {
    try {
      const versionData = await fetchVersions({ versionType: 'all' });
      const installedVersionsResult = await fetchInstalledVersions();
      let defaultVersion = null;

      // Retrieve the stored version object from the store
      const storedVersion = store.get('current-selected-version');

      if (installedVersionsResult.status && installedVersionsResult.installedVersions) {
        defaultVersion = installedVersionsResult.installedVersions.find(v => v.identifier === storedVersion?.identifier) || storedVersion;
      }

      // Set the first version as the default if no valid stored version exists
      if (!defaultVersion && versionData.versions.length > 0) {
        defaultVersion = versionData.versions[0];
        store.set('current-selected-version', defaultVersion);
      }

      // Log the directory path if it exists
      if (defaultVersion?.directory) {
        console.log(`Directory path for selected version: ${defaultVersion.directory}`);
      }

      event.reply(IPC_CHANNELS.VERSION_INFO, {
        versions: versionData.versions,
        defaultVersion,
      });
    } catch (error) {
      console.error('Error fetching version data:', error.message);
      event.reply(IPC_CHANNELS.VERSION_INFO, { error: error.message });
    }
  });

  ipcMain.on(IPC_CHANNELS.SET_SELECTED_VERSION, async (event, selectedVersion) => {
    store.set('current-selected-version', selectedVersion);
    console.log(`Selected version updated: ${selectedVersion.identifier}`);
    if (selectedVersion && selectedVersion.directory) {
      console.log(`Directory path for newly selected version: ${selectedVersion.directory}`);
    }
  });

  ipcMain.on(IPC_CHANNELS.GET_SELECTED_VERSION, async event => {
    const selectedVersion = store.get('current-selected-version');
    console.log(`Currently selected version: ${selectedVersion.identifier}`);
    if (selectedVersion && selectedVersion.directory) {
      console.log(`Directory path for the selected version: ${selectedVersion.directory}`);
    }

    event.reply(IPC_CHANNELS.GET_SELECTED_VERSION, selectedVersion);
  });
};
