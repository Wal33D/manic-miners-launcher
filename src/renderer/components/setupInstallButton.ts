// installHandler.ts
import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';

export function setupInstallButton(installButton: HTMLButtonElement, installPathInput: HTMLInputElement, versionSelect: HTMLSelectElement) {
  installButton.addEventListener('click', () => {
    const versionIdentifier = versionSelect.value;
    const downloadPath = installPathInput.value;

    if (!versionIdentifier || !downloadPath) {
      console.error('No version selected or download path specified.');
      return;
    }

    // Disable the install button, version select, and install path input to prevent changes during the download
    installButton.disabled = true;
    versionSelect.disabled = true;
    installPathInput.disabled = true;

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

    // Re-enable the install button, version select, and install path input once the download is complete or fails
    installButton.disabled = false;
    versionSelect.disabled = false;
    installPathInput.disabled = false;
  });
}
