// playButtonHandler.ts
import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { disableElements, enableElements } from './uiHelpers';
import { debugLog } from '../../logger';

export function setupPlayButton(playButton: HTMLButtonElement, versionSelect: HTMLSelectElement, installPathInput: HTMLInputElement) {
  window.electronAPI.removeAllListeners(IPC_CHANNELS.LAUNCH_GAME);
  playButton.addEventListener('click', () => {
    const versionIdentifier = versionSelect.value;
    if (!versionIdentifier) {
      console.error('No version selected.');
      return;
    }

    // Disable play button, version select dropdown, and install path input while the game is launching
    disableElements(playButton, versionSelect, installPathInput);

    // Send the version identifier to the main process to launch the game
    window.electronAPI.send(IPC_CHANNELS.LAUNCH_GAME, versionIdentifier);
  });

  // Listen for game launch replies from the main process
  window.electronAPI.receive(IPC_CHANNELS.LAUNCH_GAME, (data: any) => {
    debugLog(`Game launch status: ${JSON.stringify(data)}`);

    // Re-enable play button, version select dropdown, and install path input after receiving the launch status
    enableElements(playButton, versionSelect, installPathInput);

    if (data.success) {
      debugLog('Game launched successfully');
    } else {
      console.error('Failed to launch game:', data.message);
    }
  });
}
