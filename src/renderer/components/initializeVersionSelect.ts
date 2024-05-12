import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { fetchDefaultDirectory, toggleButtonVisibility, trimFilePath } from './domUtils';

export const initializeVersionSelect = (): void => {
  // Request the version information initially and upon notifications of updates
  fetchVersionData();

  // Listener to refresh version information when updated
  //@ts-ignore
  window.electronAPI?.receive(IPC_CHANNELS.VERSIONS_UPDATED, () => {
    fetchVersionData(); // Fetch the latest versions after update notifications
  });

  // Function to fetch version data
  function fetchVersionData() {
    //@ts-ignore
    window.electronAPI?.send(IPC_CHANNELS.ALL_VERSION_INFO);
  }

  // Handler for receiving version information
  //@ts-ignore
  window.electronAPI?.receive(IPC_CHANNELS.ALL_VERSION_INFO, data => {
    updateVersionSelectUI(data);
  });

  function updateVersionSelectUI(data: { versions: any; defaultVersion: any }) {
    const { versions, defaultVersion } = data;
    const versionSelect = document.getElementById('versionSelect') as HTMLSelectElement;
    const installPathInput = document.getElementById('installPath') as HTMLInputElement;

    if (!versionSelect || !installPathInput) {
      console.error('The versionSelect or installPath element was not found.');
      return;
    }

    // Clear existing options except for the placeholder
    while (versionSelect.options.length > 1) {
      versionSelect.remove(1);
    }

    // Populate the select box with versions
    versions.forEach((version: { identifier: string; displayName: string }) => {
      const option = document.createElement('option');
      option.value = version.identifier;
      option.textContent = version.displayName;
      versionSelect.appendChild(option);
    });

    // Set the default version if available
    if (defaultVersion) {
      versionSelect.value = defaultVersion.identifier;
      setInstallPathAndToggleButton(defaultVersion, installPathInput);
      //@ts-ignore
      window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, defaultVersion);
    } else {
      console.error('No default version provided.');
    }

    // Add change listener to version select
    versionSelect.addEventListener('change', () => {
      const selectedIdentifier = versionSelect.value;
      const selectedVersion = versions.find((v: { identifier: string }) => v.identifier === selectedIdentifier);
      setInstallPathAndToggleButton(selectedVersion, installPathInput);
      //@ts-ignore
      window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, selectedVersion);
    });
  }
};

function setInstallPathAndToggleButton(version: { directory: any }, installPathInput: HTMLInputElement) {
  console.log('setInstallPathAndToggleButton called with version:', version);

  if (version && !version.directory) {
    console.log('Version is defined but directory is not. Fetching default directory.');
    fetchDefaultDirectory((defaultPath: string) => {
      console.log('Default directory fetched:', defaultPath);
      installPathInput.value = defaultPath; // Set the path once it's fetched
      toggleButtonVisibility({ hidePlayButton: true });
      console.log('Install path set to default and buttons toggled accordingly.');
    });
  } else if (version.directory) {
    console.log('Version directory exists:', version.directory);
    const { path: trimmedPath } = trimFilePath(version.directory);
    console.log('Trimmed path result:', trimmedPath);
    if (trimmedPath === null) {
      // If trimming fails (invalid path), fetch the default directory and update accordingly
      console.log('Trimmed path was invalid, fetching default directory.');
      fetchDefaultDirectory((defaultPath: string) => {
        installPathInput.value = defaultPath;
        toggleButtonVisibility({ hidePlayButton: true });
        console.log('Fallback to default path due to invalid trimmed path, updated UI.');
      });
    } else {
      // If a valid directory path is trimmed, use it and adjust the UI
      installPathInput.value = trimmedPath;
      toggleButtonVisibility({ hidePlayButton: false });
      console.log('Valid trimmed path set and buttons toggled to show play.');
    }
  } else {
    // If no version is actively selected, fetch default directory as a fallback
    console.log('No version selected, fetching default directory as a fallback.');
    fetchDefaultDirectory((defaultPath: string) => {
      installPathInput.value = defaultPath;
      toggleButtonVisibility({ hidePlayButton: true });
      console.log('Fallback to default path since no version was selected, updated UI.');
    });
  }
}
