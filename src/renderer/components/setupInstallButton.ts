// installHandler.ts
import { updateStatus } from './updateStatus';
import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { setDisabledAppearance } from './domUtils';
import { debugLog } from '../../logger';

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
    window.electronAPI.send(IPC_CHANNELS.DOWNLOAD_VERSION, {
      version: versionIdentifier,
      downloadPath: downloadPath,
    });
  });

  window.electronAPI.receive(IPC_CHANNELS.DOWNLOAD_PROGRESS, ({ progress, status }) => {
    updateStatus(progress, status);
  });

  window.electronAPI.receive(IPC_CHANNELS.DOWNLOAD_VERSION, result => {
    debugLog(result.message);
    if (result.downloaded) {
      window.electronAPI.send(IPC_CHANNELS.PLAY_SOUND); // Request the main process to play the success sound
      window.electronAPI.send(IPC_CHANNELS.ALL_VERSION_INFO); // Request updated version list
    } else {
      alert('Failed to download the version: ' + result.message);
    }

    // Re-enable UI elements once the download is complete or fails
    setDisabledAppearance(installButton, false);
    setDisabledAppearance(versionSelect, false);
    setDisabledAppearance(installPathInput, false);
  });

  window.electronAPI.receive(IPC_CHANNELS.VERSIONS_UPDATED, () => {
    // Re-fetch version info to update the UI
    window.electronAPI.send(IPC_CHANNELS.ALL_VERSION_INFO);
  });
}
