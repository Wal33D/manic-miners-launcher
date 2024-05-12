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

function setInstallPathAndToggleButton(version: { directory?: string }, installPathInput: HTMLInputElement) {
  // Handle the case where directory is explicitly undefined or falsy
  if (!version || !version.directory) {
    fetchDefaultDirectory((defaultPath: string) => {
      installPathInput.value = defaultPath; // Set the path once it's fetched
      toggleButtonVisibility(true); // Assuming toggleButtonVisibility handles UI state based on path availability
    });
  } else {
    const trimmedPath = trimFilePath(version.directory);
    if (!trimmedPath) {
      // If trimming the path fails or returns a falsy value, use the default directory
      fetchDefaultDirectory((defaultPath: string) => {
        installPathInput.value = defaultPath;
        toggleButtonVisibility(true);
      });
    } else {
      // Set the trimmed path and adjust the UI if the path is valid
      installPathInput.value = trimmedPath;
      toggleButtonVisibility(false); // Assumes toggle off means "no actions needed"
    }
  }
}
