import { IPC_CHANNELS } from '../ipcConfig';
export const initializeVersionSelect = (): void => {
  //@ts-ignore
  window.electronAPI?.send(IPC_CHANNELS.VERSION_INFO_REQUEST);
  //@ts-ignore
  window.electronAPI?.receive(IPC_CHANNELS.VERSION_INFO_REPLY, data => {
    console.log(data);
    const { versions, selectBoxDefaultVersion } = data;
    const versionSelect = document.getElementById('versionSelect') as any;
    if (versionSelect) {
      while (versionSelect.children.length > 1) {
        versionSelect.removeChild(versionSelect.lastChild);
      }

      if (Array.isArray(versions) && versions.length > 0) {
        versions.forEach(version => {
          const option = document.createElement('option');
          option.value = version.identifier;
          option.textContent = version.displayName;
          versionSelect.appendChild(option);
        });

        // Set the default selected version
        if (selectBoxDefaultVersion) {
          const firstInstalledVersion = selectBoxDefaultVersion;
          versionSelect.value = firstInstalledVersion;
          // Immediately save the default selected version
          //@ts-ignore
          window.electronAPI.send(IPC_CHANNELS.SET_SELECTED_VERSION, firstInstalledVersion);
        } else {
          console.error('No currently installed versions data received or data is not an array.');
        }

        // Add an event listener to save the selected version whenever it changes
        versionSelect.addEventListener('change', () => {
          const selectedVersion = versionSelect.value;
          console.log(`Version selected: ${selectedVersion}`);
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
