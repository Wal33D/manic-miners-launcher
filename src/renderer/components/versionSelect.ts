import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcConfig';

export const initializeVersionSelect = (): void => {
  //@ts-ignore
  window.electronAPI?.send(IPC_CHANNELS.VERSION_INFO);
  //@ts-ignore
  window.electronAPI?.receive(IPC_CHANNELS.VERSION_INFO, data => {
    const { versions, defaultVersion } = data;
    console.log(data);
    const versionSelect = document.getElementById('versionSelect') as any;
    if (versionSelect) {
      // Clear existing options except the first one
      while (versionSelect.options.length > 1) {
        versionSelect.remove(1);
      }

      // Fill the select box with versions
      if (Array.isArray(versions) && versions.length > 0) {
        versions.forEach(version => {
          const option = document.createElement('option');
          option.value = version.identifier;
          option.textContent = version.displayName;
          versionSelect.appendChild(option);
        });

        // Set the default selected version
        if (defaultVersion) {
          versionSelect.value = defaultVersion.identifier; // Set the select box to show the default version
          // Send the whole default version object to store it in the Electron store
          //@ts-ignore
          window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, defaultVersion);
        } else {
          console.error('No default version provided.');
        }

        // Listener to save the selected version when it changes
        versionSelect.addEventListener('change', () => {
          const selectedOption = versionSelect.options[versionSelect.selectedIndex];
          const selectedVersion = {
            identifier: selectedOption.value,
            displayName: selectedOption.textContent,
          };
          console.log(`Version selected: ${selectedVersion.identifier}, ${selectedVersion.displayName}`);
          //@ts-ignore
          window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, selectedVersion);
        });
      } else {
        console.error('No versions data received or data is not an array.');
      }
    } else {
      console.error('The versionSelect element was not found.');
    }
  });
};
