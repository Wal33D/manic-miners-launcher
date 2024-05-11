import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';

export const initializeVersionSelect = (): void => {
  // Request the version information
  //@ts-ignore
  window.electronAPI?.send(IPC_CHANNELS.ALL_VERSION_INFO);

  // Handler for receiving version information
  //@ts-ignore
  window.electronAPI?.receive(IPC_CHANNELS.ALL_VERSION_INFO, data => {
    const { versions, defaultVersion } = data;
    console.log('Received versions data:', data);

    const versionSelect = document.getElementById('versionSelect') as HTMLSelectElement;
    const installPathInput = document.getElementById('installPath') as HTMLInputElement;

    if (!versionSelect || !installPathInput) {
      console.error('The versionSelect or installPath element was not found.');
      return;
    }

    // Clear existing options except the first one
    while (versionSelect.options.length > 1) {
      versionSelect.remove(1);
    }

    // Validate that versions data is an array and not empty
    if (!Array.isArray(versions) || versions.length === 0) {
      console.error('No versions data received or data is not an array.');
      return;
    }

    // Populate the select box with versions
    versions.forEach(version => {
      const option = document.createElement('option');
      option.value = version.identifier; // Use identifier for option value
      option.textContent = version.displayName; // Assuming a displayName property exists
      versionSelect.appendChild(option);
    });

    // Set the default version if available
    if (defaultVersion) {
      versionSelect.value = defaultVersion.identifier; // Set the select box to show the default version
      installPathInput.value = trimFilePath(defaultVersion.directory || '');
      //@ts-ignore
      window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, defaultVersion);
    } else {
      console.error('No default version provided.');
    }

    // Listener to save the selected version object when it changes
    versionSelect.addEventListener('change', () => {
      const selectedIdentifier = versionSelect.value;
      const selectedVersion = versions.find(v => v.identifier === selectedIdentifier);
      console.log(`Version selected: ${selectedIdentifier}`, selectedVersion);
      if (selectedVersion) {
        if (!selectedVersion.directory) {
          // Request the default install directory if no directory is specified
          //@ts-ignore
          window.electronAPI.send('GET_DIRECTORIES');
          //@ts-ignore
          window.electronAPI.receive('DIRECTORIES_RESPONSE', directories => {
            installPathInput.value = trimFilePath(directories.launcherInstallPath);
          });
        } else {
          installPathInput.value = trimFilePath(selectedVersion.directory);
        }
        //@ts-ignore
        window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, selectedVersion);
      }
    });
  });
};

function trimFilePath(fullPath: string) {
  if (!fullPath) {
    return 'No directory specified';
  }
  const lastSlashIndex = fullPath.lastIndexOf('\\');
  if (lastSlashIndex === -1) {
    return 'No directory specified'; // Return a placeholder if no backslash is found
  }
  return fullPath.substring(0, lastSlashIndex + 1); // Include the slash to keep the final backslash
}
