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

  const enhancedVersions = versionData.versions.map(version => {
    const installedVersion = installedVersionsResult.installedVersions.find(v => v.identifier === version.identifier);
    return {
      ...version,
      directory: installedVersion ? installedVersion.directory : undefined,
    };
  });

  let defaultVersion = store.get('current-selected-version');
  if (!defaultVersion || !enhancedVersions.find(v => v.identifier === defaultVersion.identifier)) {
    defaultVersion = enhancedVersions[0];
    store.set('current-selected-version', defaultVersion);
  }

  return {
    versions: enhancedVersions,
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

// In your main process file, add this within the setupVersionHandlers or similar setup function
const { dialog } = require('electron');

ipcMain.on('open-directory-dialog', event => {
  dialog
    .showOpenDialog({
      properties: ['openDirectory'],
    })
    .then(result => {
      if (!result.canceled && result.filePaths.length > 0) {
        event.reply('directory-selected', result.filePaths[0]);
      }
    })
    .catch(err => {
      console.error('Failed to open directory dialog:', err);
    });
});
