import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcConfig';
import { fetchVersions } from '../../api/versions/fetchVersions';
import { isVersionInstalled } from '../../api/isVersionInstalled';

import { checkInstalledVersions } from '../../api/checkInstalledVersions';
import Store from 'electron-store';

const store = new Store() as any;

export const setupVersionHandlers = () => {
  ipcMain.on(IPC_CHANNELS.CHECK_VERSION_INSTALLED, async (event, versionIdentifier) => {
    const isInstalled = await isVersionInstalled(versionIdentifier);
    event.reply(IPC_CHANNELS.CHECK_VERSION_INSTALLED, isInstalled);
  });
  ipcMain.on(IPC_CHANNELS.VERSION_INFO, async event => {
    console.log('Handling VERSION_INFO request...');
    try {
      console.log('Fetching versions...');
      const versionData = await fetchVersions({ versionType: 'all' });
      console.log('Versions fetched:', versionData.versions.length, 'versions found.');

      console.log('Checking installed versions...');
      const installedVersions = (await checkInstalledVersions()).installedVersions;
      console.log('Installed versions:', installedVersions.length, 'versions installed.');

      console.log('Getting stored preferred version ID from store...');
      const storedPreferredVersionId = store.get('current-selected-version-id');
      let defaultVersion = versionData.versions.find(v => v.identifier === storedPreferredVersionId);

      if (!defaultVersion && installedVersions?.length > 0) {
        console.log('No stored preferred version found. Setting first installed version as default...');
        defaultVersion = installedVersions[0];
        store.set('current-selected-version-id', defaultVersion.identifier);
        console.log('Stored new default version ID:', defaultVersion.identifier);
      }

      if (!defaultVersion && versionData.versions.length > 0) {
        console.log('No valid versions found in store. Setting first available version as default...');
        defaultVersion = versionData.versions[0];
        store.set('current-selected-version-id', defaultVersion.identifier);
        console.log('Stored new default version ID:', defaultVersion.identifier);
      }

      console.log('Replying with version information...');
      event.reply(IPC_CHANNELS.VERSION_INFO, {
        versions: versionData.versions,
        defaultVersion,
      });
    } catch (error) {
      console.error('Error fetching versions:', error);
      event.reply(IPC_CHANNELS.VERSION_INFO, { error: error.message });
    }
  });

  ipcMain.on(IPC_CHANNELS.SET_SELECTED_VERSION, (event, selectedVersionId) => {
    console.log('Setting selected version ID:', selectedVersionId);
    store.set('current-selected-version-id', selectedVersionId);
  });

  ipcMain.on(IPC_CHANNELS.GET_SELECTED_VERSION, event => {
    console.log('Getting selected version ID from store...');
    const selectedVersionId = store.get('current-selected-version-id');
    console.log('Selected version ID:', selectedVersionId);
    event.reply(IPC_CHANNELS.GET_SELECTED_VERSION, selectedVersionId);
  });
};
