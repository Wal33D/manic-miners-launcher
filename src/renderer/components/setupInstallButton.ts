// installHandler.ts
import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { setDisabledAppearance } from './domUtils';
import { updateStatus } from './updateStatus';

const successSound = new Audio('assets//success.mp3');

export function setupInstallButton(installButton: HTMLButtonElement, installPathInput: HTMLInputElement, versionSelect: HTMLSelectElement) {
  installButton.addEventListener('click', () => {
    const versionIdentifier = versionSelect.value;
    const downloadPath = installPathInput.value;

    if (!versionIdentifier || !downloadPath) {
      console.error('No version selected or download path specified.');
      return;
    }

    // Disable UI elements during the download process
    setDisabledAppearance(installButton, true);
    setDisabledAppearance(versionSelect, true);
    setDisabledAppearance(installPathInput, true);

    // Send the download request to the main process
    //@ts-ignore
    window.electronAPI.send(IPC_CHANNELS.DOWNLOAD_VERSION, {
      version: versionIdentifier,
      downloadPath: downloadPath,
    });
  });

  //@ts-ignore
  window.electronAPI.receive(IPC_CHANNELS.DOWNLOAD_PROGRESS, ({ progress, status }) => {
    updateStatus(progress, status);
  });

  //@ts-ignore
  window.electronAPI.receive(IPC_CHANNELS.DOWNLOAD_VERSION, result => {
    console.log(result.message);
    if (result.downloaded) {
      successSound.play(); // Play success sound instead of alert
      //@ts-ignore
      window.electronAPI.send(IPC_CHANNELS.ALL_VERSION_INFO); // Request updated version list
    } else {
      alert('Failed to download the version: ' + result.message);
    }

    // Re-enable UI elements once the download is complete or fails
    setDisabledAppearance(installButton, false);
    setDisabledAppearance(versionSelect, false);
    setDisabledAppearance(installPathInput, false);
  });

  //@ts-ignore
  window.electronAPI.receive(IPC_CHANNELS.VERSIONS_UPDATED, () => {
    // Re-fetch version info to update the UI
    //@ts-ignore
    window.electronAPI.send(IPC_CHANNELS.ALL_VERSION_INFO);
  });
}
