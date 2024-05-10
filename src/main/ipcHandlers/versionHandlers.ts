import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcConfig';
import { fetchVersions } from '../../api/versions/fetchVersions';
import { checkInstalledVersions } from '../../api/checkInstalledVersions';
import Store from 'electron-store';

const store = new Store() as any;

export const setupVersionHandlers = () => {
  ipcMain.on(IPC_CHANNELS.VERSION_INFO, async event => {
    try {
      const versionData = await fetchVersions({ versionType: 'all' });
      const installedVersionsResult = await checkInstalledVersions();
      const installedVersions = installedVersionsResult.installedVersions;

      let storedPreferredVersion = store.get('current-selected-version');
      let defaultVersion = versionData.versions.find(v => v.identifier === storedPreferredVersion?.identifier);

      if (!defaultVersion && installedVersions?.length > 0) {
        defaultVersion = installedVersions[0];
        store.set('current-selected-version', defaultVersion);
      }

      if (!defaultVersion && versionData.versions.length > 0) {
        defaultVersion = versionData.versions[0];
        store.set('current-selected-version', defaultVersion);
      }

      event.reply(IPC_CHANNELS.VERSION_INFO, {
        versions: versionData.versions,
        defaultVersion,
      });
    } catch (error) {
      console.error('Error fetching versions:', error);
      event.reply(IPC_CHANNELS.VERSION_INFO, { error: error.message });
    }
  });

  ipcMain.on(IPC_CHANNELS.SET_SELECTED_VERSION, (event, selectedVersion) => {
    store.set('current-selected-version', selectedVersion);
  });

  ipcMain.on(IPC_CHANNELS.GET_SELECTED_VERSION, event => {
    const selectedVersion = store.get('current-selected-version');
    event.reply(IPC_CHANNELS.GET_SELECTED_VERSION, selectedVersion);
  });
};
