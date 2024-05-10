import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcConfig';

export const initializeVersionSelect = (): void => {
  //@ts-ignore
  window.electronAPI?.send(IPC_CHANNELS.VERSION_INFO);

  //@ts-ignore
  window.electronAPI?.receive(IPC_CHANNELS.VERSION_INFO, data => {
    const { versions, defaultVersion } = data;
    const versionSelect: any = document.getElementById('versionSelect');
    const playButton = document.getElementById('playButton');

    if (versionSelect && playButton) {
      // Clear existing options
      while (versionSelect.options.length > 1) {
        versionSelect.remove(1);
      }

      // Populate versions
      versions.forEach((version: { identifier: string; displayName: any }) => {
        const option = document.createElement('option');
        option.value = version.identifier;
        option.textContent = version.displayName || version.identifier;
        versionSelect.appendChild(option);
      });

      // Update the button text based on the selected version's installation status
      const updateButtonStatus = () => {
        const selectedVersion = versions.find((v: { identifier: any }) => v.identifier === versionSelect.value);
        if (selectedVersion) {
          // Check if the version is installed
          //@ts-ignore
          window.electronAPI.send(IPC_CHANNELS.CHECK_VERSION_INSTALLED, selectedVersion.identifier);

          //@ts-ignore
          window.electronAPI.receive(IPC_CHANNELS.CHECK_VERSION_INSTALLED_REPLY, isInstalled => {
            playButton.textContent = isInstalled ? 'Play Game' : 'Install';
          });
        }
      };

      // Handle version selection changes
      versionSelect.addEventListener('change', updateButtonStatus);

      // Set the default version
      if (defaultVersion) {
        versionSelect.value = defaultVersion.identifier;
        updateButtonStatus();
      }
    }
  });
};
