import { ipcMain } from 'electron';
import { Version } from '../../api/versionTypes';
import { IPC_CHANNELS } from './ipcChannels';
import { fetchVersions } from '../../api/fetchVersions';
import { fetchInstalledVersions } from '../../functions/fetchInstalledVersions';
import Store from 'electron-store';
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
  const versionData = await fetchVersions({ versionType: 'archived' });
  const installedVersionsResult = await fetchInstalledVersions();

  const enhancedVersions = versionData.versions.map(version => {
    const installedVersion = installedVersionsResult.installedVersions?.find(v => v.identifier === version.identifier);
    return {
      ...version,
      directory: installedVersion ? installedVersion.directory : undefined,
    };
  });

  // Add locally-only installed versions (like itch.io downloads) that aren't in server database
  const serverIdentifiers = new Set(versionData.versions.map(v => v.identifier));
  const localOnlyVersions = installedVersionsResult.installedVersions?.filter(v => !serverIdentifiers.has(v.identifier)) || [];
  // Combine enhanced server versions with local-only versions
  const allVersions = [...enhancedVersions, ...localOnlyVersions];

  let defaultVersion = store.get('current-selected-version');
  if (!defaultVersion || !allVersions.find(v => v.identifier === defaultVersion.identifier)) {
    defaultVersion = allVersions[0];
    store.set('current-selected-version', defaultVersion);
  }

  return {
    versions: allVersions,
    defaultVersion,
  };
};

const setSelectedVersion = (selectedVersion: Version) => {
  store.set('current-selected-version', selectedVersion);
};

const getSelectedVersion = () => {
  const selectedVersion = store.get('current-selected-version');
  return selectedVersion;
};
