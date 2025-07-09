// installHandler.ts
import { updateStatus } from './updateStatus';
import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { disableElements, enableElements } from './uiHelpers';
import { debugLog } from '../../logger';
import { getCurrentSettings } from './initializeSettings';

export function setupInstallButton(installButton: HTMLButtonElement, installPathInput: HTMLInputElement, versionSelect: HTMLSelectElement) {
  window.electronAPI.removeAllListeners(IPC_CHANNELS.DOWNLOAD_PROGRESS);
  window.electronAPI.removeAllListeners(IPC_CHANNELS.DOWNLOAD_VERSION);
  window.electronAPI.removeAllListeners(IPC_CHANNELS.VERSIONS_UPDATED);
  installButton.addEventListener('click', () => {
    const versionIdentifier = versionSelect.value;
    const downloadPath = installPathInput.value;

    if (!versionIdentifier || !downloadPath) {
      console.error('No version selected or download path specified.');
      return;
    }

    // Disable UI elements during the download process
    disableElements(installButton, versionSelect, installPathInput);

    // Send the download request to the main process
    window.electronAPI.send(IPC_CHANNELS.DOWNLOAD_VERSION, {
      version: versionIdentifier,
      downloadPath: downloadPath,
    });
  });

  window.electronAPI.receive(IPC_CHANNELS.DOWNLOAD_PROGRESS, ({ progress, status }: import('../../types/ipcMessages').ProgressStatus) => {
    updateStatus(progress ?? 0, status);
  });

  window.electronAPI.receive(IPC_CHANNELS.DOWNLOAD_VERSION, (result: import('../../types/ipcMessages').DownloadResult) => {
    debugLog(result.message);
    if (result.downloaded) {
      const settings = getCurrentSettings();
      if (settings.playSoundOnInstall) {
        window.electronAPI.send(IPC_CHANNELS.PLAY_SOUND);
      }
      if (settings.autoLaunchAfterInstall) {
        window.electronAPI.send(IPC_CHANNELS.LAUNCH_GAME, versionSelect.value);
      }
      window.electronAPI.send(IPC_CHANNELS.ALL_VERSION_INFO); // Request updated version list
    } else {
      alert('Failed to download the version: ' + result.message);
    }

    // Re-enable UI elements once the download is complete or fails
    enableElements(installButton, versionSelect, installPathInput);
  });

  window.electronAPI.receive(IPC_CHANNELS.VERSIONS_UPDATED, () => {
    // Re-fetch version info to update the UI
    window.electronAPI.send(IPC_CHANNELS.ALL_VERSION_INFO);
  });
}
