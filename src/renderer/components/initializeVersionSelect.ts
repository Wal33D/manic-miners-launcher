import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { fetchDefaultDirectory, toggleButtonVisibility, trimFilePath } from './domUtils';

export const initializeVersionSelect = (): void => {
  // Request the version information
  //@ts-ignore
  window.electronAPI?.send(IPC_CHANNELS.ALL_VERSION_INFO);

  // Handler for receiving version information
  //@ts-ignore
  window.electronAPI?.receive(IPC_CHANNELS.ALL_VERSION_INFO, data => {
    const { versions, defaultVersion } = data;
    const versionSelect = document.getElementById('versionSelect') as HTMLSelectElement;
    const installPathInput = document.getElementById('installPath') as HTMLInputElement;

    if (!versionSelect || !installPathInput) {
      console.error('The versionSelect or installPath element was not found.');
      return;
    }

    while (versionSelect.options.length > 1) {
      versionSelect.remove(1);
    }

    if (!Array.isArray(versions) || versions.length === 0) {
      console.error('No versions data received or data is not an array.');
      return;
    }

    versions.forEach(version => {
      const option = document.createElement('option');
      option.value = version.identifier;
      option.textContent = version.displayName;
      versionSelect.appendChild(option);
    });

    if (defaultVersion) {
      versionSelect.value = defaultVersion.identifier;
      setInstallPathAndToggleButton(defaultVersion, installPathInput);
      //@ts-ignore
      window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, defaultVersion);
    } else {
      console.error('No default version provided.');
    }

    versionSelect.addEventListener('change', () => {
      const selectedIdentifier = versionSelect.value;
      const selectedVersion = versions.find(v => v.identifier === selectedIdentifier);
      setInstallPathAndToggleButton(selectedVersion, installPathInput);
      //@ts-ignore
      window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, selectedVersion);
    });
  });
};

function setInstallPathAndToggleButton(version: { directory: any }, installPathInput: HTMLInputElement) {
  if (version && !version.directory) {
    // If no directory is specified, fetch the default directory and display the install button
    fetchDefaultDirectory();
    toggleButtonVisibility(true);
  } else {
    const trimmedPath = trimFilePath(version.directory || '');
    if (trimmedPath === null) {
      // If trimming fails (invalid path), fetch the default directory and display the install button
      fetchDefaultDirectory();
      toggleButtonVisibility(true);
    } else {
      // If a valid directory path is trimmed, use it and display the play button
      installPathInput.value = trimmedPath;
      toggleButtonVisibility(false);
    }
  }
}
