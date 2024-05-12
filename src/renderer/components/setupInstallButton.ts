// installHandler.ts
import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { setDisabledAppearance } from './domUtils'; // Assuming this is the correct import path

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
  window.electronAPI.receive(IPC_CHANNELS.DOWNLOAD_PROGRESS, status => {
    console.log('Download Progress:', status.progress, '%', status.status);
    // Optionally update a progress bar or status messages on your UI
  });

  //@ts-ignore
  window.electronAPI.receive(IPC_CHANNELS.DOWNLOAD_VERSION, result => {
    console.log(result.message);
    if (result.downloaded) {
      alert('Download completed successfully.');
    } else {
      alert('Failed to download the version: ' + result.message);
    }

    // Re-enable UI elements once the download is complete or fails
    setDisabledAppearance(installButton, false);
    setDisabledAppearance(versionSelect, false);
    setDisabledAppearance(installPathInput, false);
  });
}
