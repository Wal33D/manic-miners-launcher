import { ipcMain } from 'electron';
import { Version } from '../../api/versionTypes';
import { IPC_CHANNELS } from './ipcChannels';
import { fetchVersions } from '../../api/fetchVersions';
import { fetchInstalledVersions } from '../../functions/fetchInstalledVersions';
import Store from 'electron-store';
const store = new Store() as any;

export const setupVersionHandlers = () => {
  // Legacy handler for backward compatibility
  ipcMain.on(IPC_CHANNELS.ALL_VERSION_INFO, async event => {
    try {
      const versions = await getVersionDetails();
      event.reply(IPC_CHANNELS.ALL_VERSION_INFO, versions);
    } catch (error) {
      console.error('Error fetching version data:', error.message);
      event.reply(IPC_CHANNELS.ALL_VERSION_INFO, { error: error.message });
    }
  });

  // New separated handlers
  ipcMain.on(IPC_CHANNELS.ARCHIVED_VERSIONS_INFO, async event => {
    try {
      const versions = await getArchivedVersionDetails();
      event.reply(IPC_CHANNELS.ARCHIVED_VERSIONS_INFO, versions);
    } catch (error) {
      console.error('Error fetching archived version data:', error.message);
      event.reply(IPC_CHANNELS.ARCHIVED_VERSIONS_INFO, { error: error.message });
    }
  });

  ipcMain.on(IPC_CHANNELS.LATEST_VERSION_INFO, async event => {
    try {
      const versions = await getLatestVersionDetails();
      event.reply(IPC_CHANNELS.LATEST_VERSION_INFO, versions);
    } catch (error) {
      console.error('Error fetching latest version data:', error.message);
      event.reply(IPC_CHANNELS.LATEST_VERSION_INFO, { error: error.message });
    }
  });

  ipcMain.on(IPC_CHANNELS.SET_SELECTED_ARCHIVED_VERSION, async (event, selectedVersion) => {
    setSelectedVersion(selectedVersion);
  });

  ipcMain.on(IPC_CHANNELS.GET_SELECTED_ARCHIVED_VERSION, async event => {
    const selectedVersion = getSelectedVersion();
    event.reply(IPC_CHANNELS.GET_SELECTED_ARCHIVED_VERSION, selectedVersion);
  });

  // Legacy handlers for backward compatibility
  ipcMain.on(IPC_CHANNELS.SET_SELECTED_VERSION, async (event, selectedVersion) => {
    setSelectedVersion(selectedVersion);
  });

  ipcMain.on(IPC_CHANNELS.GET_SELECTED_VERSION, async event => {
    const selectedVersion = getSelectedVersion();
    event.reply(IPC_CHANNELS.GET_SELECTED_VERSION, selectedVersion);
  });
};

// Legacy function for backward compatibility
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

// New function for archived versions only (Internet Archive)
const getArchivedVersionDetails = async () => {
  const versionData = await fetchVersions({ versionType: 'archived' });
  const installedVersionsResult = await fetchInstalledVersions();

  // Only enhance with archived versions, exclude itch.io downloads
  const enhancedVersions = versionData.versions.map(version => {
    const installedVersion = installedVersionsResult.installedVersions?.find(v => v.identifier === version.identifier);
    return {
      ...version,
      directory: installedVersion ? installedVersion.directory : undefined,
    };
  });

  // DO NOT add locally-only versions (like itch.io downloads) to archived versions
  const archivedVersions = enhancedVersions;

  let defaultVersion = store.get('current-selected-archived-version');
  if (!defaultVersion || !archivedVersions.find(v => v.identifier === defaultVersion.identifier)) {
    defaultVersion = archivedVersions[0];
    store.set('current-selected-archived-version', defaultVersion);
  }

  return {
    versions: archivedVersions,
    defaultVersion,
  };
};

// New function for latest version only (itch.io)
const getLatestVersionDetails = async () => {
  const installedVersionsResult = await fetchInstalledVersions();

  // Only get itch.io installed versions (those with identifier 'latest' or ManicMiners-Baraklava-V)
  const latestVersions = installedVersionsResult.installedVersions?.filter(v => 
    v.identifier === 'latest' || v.identifier.includes('ManicMiners-Baraklava-V')
  ) || [];

  return {
    versions: latestVersions,
  };
};

// Legacy functions for backward compatibility
const setSelectedVersion = (selectedVersion: Version) => {
  store.set('current-selected-version', selectedVersion);
};

const getSelectedVersion = () => {
  const selectedVersion = store.get('current-selected-version');
  return selectedVersion;
};

// New functions for archived versions
const setSelectedArchivedVersion = (selectedVersion: Version) => {
  store.set('current-selected-archived-version', selectedVersion);
};

const getSelectedArchivedVersion = () => {
  const selectedVersion = store.get('current-selected-archived-version');
  return selectedVersion;
};
