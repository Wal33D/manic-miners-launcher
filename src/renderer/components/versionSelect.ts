import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcConfig';

export const initializeVersionSelect = (): void => {
  // Request the version information
  //@ts-ignore
  window.electronAPI?.send(IPC_CHANNELS.VERSION_INFO);

  // Handler for receiving version information
  //@ts-ignore
  window.electronAPI?.receive(IPC_CHANNELS.VERSION_INFO, data => {
    const { versions, defaultVersion } = data;
    console.log('Received versions data:', data);

    const versionSelect = document.getElementById('versionSelect') as HTMLSelectElement;
    if (!versionSelect) {
      console.error('The versionSelect element was not found.');
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
      option.value = version.identifier;
      option.textContent = version.displayName;
      versionSelect.appendChild(option);
    });

    // Set the default version if available
    if (defaultVersion) {
      versionSelect.value = defaultVersion.identifier; // Set the select box to show the default version
      // Send only the identifier of the default version
      //@ts-ignore
      window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, defaultVersion.identifier);
    } else {
      console.error('No default version provided.');
    }

    // Listener to save the selected version identifier when it changes
    versionSelect.addEventListener('change', () => {
      const selectedIdentifier = versionSelect.value;
      console.log(`Version selected: ${selectedIdentifier}`);
      //@ts-ignore
      window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, selectedIdentifier);
    });
  });
};
