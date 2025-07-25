import { ipcMain } from 'electron';
import { Version } from '../../api/versionTypes';
import { IPC_CHANNELS } from './ipcChannels';
import { fetchVersions } from '../../api/fetchVersions';
import { fetchInstalledVersions } from '../../functions/fetchInstalledVersions';
import { typedStore } from '../../utils/typedStore';
import { withIpcHandler } from './withIpcHandler';
import { validateIpcData } from '../../utils/ipcValidation';

export const setupVersionHandlers = () => {
  // New separated handlers
  ipcMain.on(
    IPC_CHANNELS.ARCHIVED_VERSIONS_INFO,
    withIpcHandler(IPC_CHANNELS.ARCHIVED_VERSIONS_INFO, async () => {
      return await getArchivedVersionDetails();
    })
  );

  ipcMain.on(
    IPC_CHANNELS.LATEST_VERSION_INFO,
    withIpcHandler(IPC_CHANNELS.LATEST_VERSION_INFO, async () => {
      return await getLatestVersionDetails();
    })
  );

  ipcMain.on(
    IPC_CHANNELS.SET_SELECTED_ARCHIVED_VERSION,
    withIpcHandler(IPC_CHANNELS.SET_SELECTED_ARCHIVED_VERSION, async (_event, selectedVersion) => {
      const validation = validateIpcData('set-selected-archived-version', selectedVersion);
      if (!validation.isValid) {
        throw new Error(`Invalid version data: ${validation.error}`);
      }

      setSelectedVersion(validation.data as Version);
      return { success: true };
    })
  );

  ipcMain.on(
    IPC_CHANNELS.GET_SELECTED_ARCHIVED_VERSION,
    withIpcHandler(IPC_CHANNELS.GET_SELECTED_ARCHIVED_VERSION, async () => {
      return getSelectedVersion();
    })
  );
};

// Legacy function for backward compatibility
// const _getVersionDetails = async () => {
//   const versionData = await fetchVersions({ versionType: 'archived' });
//   const installedVersionsResult = await fetchInstalledVersions();

//   const enhancedVersions = versionData.versions.map(version => {
//     const installedVersion = installedVersionsResult.installedVersions?.find(v => v.identifier === version.identifier);
//     return {
//       ...version,
//       directory: installedVersion ? installedVersion.directory : undefined,
//     };
//   });

//   // Add locally-only installed versions (like itch.io downloads) that aren't in server database
//   const serverIdentifiers = new Set(versionData.versions.map(v => v.identifier));
//   const localOnlyVersions = installedVersionsResult.installedVersions?.filter(v => !serverIdentifiers.has(v.identifier)) || [];
//   // Combine enhanced server versions with local-only versions
//   const allVersions = [...enhancedVersions, ...localOnlyVersions];

//   let defaultVersion = typedStore.get('current-selected-version');
//   if (!defaultVersion || !allVersions.find(v => v.identifier === defaultVersion?.identifier)) {
//     defaultVersion = allVersions[0];
//     typedStore.set('current-selected-version', defaultVersion);
//   }

//   return {
//     versions: allVersions,
//     defaultVersion,
//   };
// };

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

  let defaultVersion = typedStore.get('last-selected-archived-version');
  if (!defaultVersion || !archivedVersions.find(v => v.identifier === defaultVersion?.identifier)) {
    defaultVersion = archivedVersions[0];
    typedStore.set('last-selected-archived-version', defaultVersion);
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
  const latestVersions =
    installedVersionsResult.installedVersions?.filter(v => v.identifier === 'latest' || v.identifier.includes('ManicMiners-Baraklava-V')) ||
    [];

  return {
    versions: latestVersions,
  };
};

// Legacy functions for backward compatibility
const setSelectedVersion = (selectedVersion: Version) => {
  typedStore.set('current-selected-version', selectedVersion);
};

const getSelectedVersion = () => {
  const selectedVersion = typedStore.get('current-selected-version');
  return selectedVersion;
};

// New functions for archived versions
// const _setSelectedArchivedVersion = (selectedVersion: Version) => {
//   typedStore.set('last-selected-archived-version', selectedVersion);
// };

// const _getSelectedArchivedVersion = () => {
//   const selectedVersion = typedStore.get('last-selected-archived-version');
//   return selectedVersion;
// };
