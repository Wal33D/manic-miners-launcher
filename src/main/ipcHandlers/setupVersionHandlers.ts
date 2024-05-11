import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { fetchVersions } from '../../api/fetchVersions';
import { fetchInstalledVersions } from '../../functions/fetchInstalledVersions';
import Store from 'electron-store';
import { Version } from '../../api/versionTypes';

const store = new Store() as any;

export const setupVersionHandlers = () => {
  ipcMain.on(IPC_CHANNELS.ALL_VERSION_INFO, async event => {
    try {
      const versions = await getVersionDetails();
      event.reply(IPC_CHANNELS.ALL_VERSION_INFO, versions);
    } catch (error) {
      console.error('Error fetching version data:', error.message);
      event.reply(IPC_CHANNELS.ALL_VERSION_INFO, { error: error.message });
    }
  });

  ipcMain.on(IPC_CHANNELS.SET_SELECTED_VERSION, async (event, selectedVersion) => {
    setSelectedVersion(selectedVersion);
  });

  ipcMain.on(IPC_CHANNELS.GET_SELECTED_VERSION, async event => {
    const selectedVersion = getSelectedVersion();
    event.reply(IPC_CHANNELS.GET_SELECTED_VERSION, selectedVersion);
  });
};

const getVersionDetails = async () => {
  const versionData = await fetchVersions({ versionType: 'all' });
  const installedVersionsResult = await fetchInstalledVersions();
  let defaultVersion = null;
  const storedVersion = store.get('current-selected-version');

  if (installedVersionsResult.status && installedVersionsResult.installedVersions) {
    defaultVersion = installedVersionsResult.installedVersions.find(v => v.identifier === storedVersion?.identifier) || storedVersion;
  }

  if (!defaultVersion && versionData.versions.length > 0) {
    defaultVersion = versionData.versions[0];
    store.set('current-selected-version', defaultVersion);
  }

  if (defaultVersion?.directory) {
    console.log(`Directory path for selected version: ${defaultVersion.directory}`);
  }

  return {
    versions: versionData.versions,
    defaultVersion,
  };
};

const setSelectedVersion = (selectedVersion: Version) => {
  store.set('current-selected-version', selectedVersion);
  console.log(`Selected version updated: ${selectedVersion.identifier}`);
};

const getSelectedVersion = () => {
  const selectedVersion = store.get('current-selected-version');
  console.log(`Currently selected version: ${selectedVersion.identifier}`);
  return selectedVersion;
};
