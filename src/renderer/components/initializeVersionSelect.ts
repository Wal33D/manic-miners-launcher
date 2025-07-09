import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { fetchDefaultDirectory, toggleButtonVisibility, trimFilePath } from './domUtils';

export const initializeVersionSelect = (): void => {
  window.electronAPI?.removeAllListeners(IPC_CHANNELS.VERSIONS_UPDATED);
  window.electronAPI?.removeAllListeners(IPC_CHANNELS.ALL_VERSION_INFO);
  // Request the version information initially and upon notifications of updates
  fetchVersionData();

  // Listener to refresh version information when updated
  window.electronAPI?.receive(IPC_CHANNELS.VERSIONS_UPDATED, () => {
    fetchVersionData(); // Fetch the latest versions after update notifications
  });

  // Function to fetch version data
  function fetchVersionData() {
    window.electronAPI?.send(IPC_CHANNELS.ALL_VERSION_INFO);
  }

  // Handler for receiving version information
  window.electronAPI?.receive(IPC_CHANNELS.ALL_VERSION_INFO, (data: import('../../types/ipcMessages').VersionsResponse) => {
    updateVersionSelectUI(data);
  });

  function updateVersionSelectUI(data: import('../../types/ipcMessages').VersionsResponse) {
    const { versions, defaultVersion } = data;
    if (!Array.isArray(versions)) {
      console.error('Invalid versions data received:', versions);
      return;
    }
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
    versions.forEach((version: import('../../api/versionTypes').Version & { directory?: string }) => {
      const option = document.createElement('option');
      option.value = version.identifier;
      option.textContent = version.displayName;
      versionSelect.appendChild(option);
    });

    // Set the default version if available
    if (defaultVersion) {
      versionSelect.value = defaultVersion.identifier;
      setInstallPathAndToggleButton(defaultVersion, installPathInput);
      window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, defaultVersion);
    } else {
      console.error('No default version provided.');
    }

    // Add change listener to version select
    versionSelect.addEventListener('change', () => {
      const selectedIdentifier = versionSelect.value;
      const selectedVersion = versions.find(
        (v: import('../../api/versionTypes').Version & { directory?: string }) => v.identifier === selectedIdentifier
      );
      setInstallPathAndToggleButton(selectedVersion, installPathInput);
      window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, selectedVersion);
    });
  }
};

function setInstallPathAndToggleButton(version: { directory?: string } | undefined, installPathInput: HTMLInputElement) {
  if (version && !version.directory) {
    fetchDefaultDirectory((defaultPath: string) => {
      installPathInput.value = defaultPath; // Set the path once it's fetched
      toggleButtonVisibility(true);
    });
  } else if (version.directory) {
    const trimmedPath = trimFilePath(version.directory);
    if (trimmedPath === null) {
      // If trimming fails (invalid path), fetch the default directory and update accordingly
      fetchDefaultDirectory((defaultPath: string) => {
        installPathInput.value = defaultPath;
        toggleButtonVisibility(true);
      });
    } else {
      // If a valid directory path is trimmed, use it and adjust the UI
      installPathInput.value = trimmedPath;
      toggleButtonVisibility(false);
    }
  } else {
    // If no version is actively selected, fetch default directory as a fallback
    fetchDefaultDirectory((defaultPath: string) => {
      installPathInput.value = defaultPath;
      toggleButtonVisibility(true);
    });
  }
}
