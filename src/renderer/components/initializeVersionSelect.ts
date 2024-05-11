import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { fetchDefaultDirectory, trimFilePath } from './domUtils';

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
    const playButton = document.getElementById('playButton') as HTMLButtonElement; // Assuming you have a button with this ID
    const installButton = document.getElementById('installButton') as HTMLButtonElement; // Assuming you have a button with this ID

    if (!versionSelect || !installPathInput || !playButton || !installButton) {
      console.error('One or more required elements were not found.');
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
      installPathInput.value = trimFilePath(defaultVersion.directory || '');
      toggleButtonVisibility(defaultVersion.directory, playButton, installButton);
      //@ts-ignore
      window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, defaultVersion);
    } else {
      console.error('No default version provided.');
    }

    versionSelect.addEventListener('change', () => {
      const selectedIdentifier = versionSelect.value;
      const selectedVersion = versions.find(v => v.identifier === selectedIdentifier);
      if (selectedVersion) {
        if (!selectedVersion.directory) {
          fetchDefaultDirectory(); // This should eventually set the path and update button visibility
        } else {
          installPathInput.value = trimFilePath(selectedVersion.directory);
          toggleButtonVisibility(selectedVersion.directory, playButton, installButton);
        }
        //@ts-ignore
        window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, selectedVersion);
      }
    });
  });
};

function toggleButtonVisibility(directory: string | null, playButton: HTMLButtonElement, installButton: HTMLButtonElement) {
  if (directory) {
    playButton.style.display = 'block';
    installButton.style.display = 'none';
  } else {
    playButton.style.display = 'none';
    installButton.style.display = 'block';
  }
}
