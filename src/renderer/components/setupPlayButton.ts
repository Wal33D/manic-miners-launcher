// playButtonHandler.ts
import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { setDisabledAppearance } from './domUtils';

export function setupPlayButton(playButton: HTMLButtonElement, versionSelect: HTMLSelectElement) {
  playButton.addEventListener('click', () => {
    const versionIdentifier = versionSelect.value;
    if (!versionIdentifier) {
      console.error('No version selected.');
      return;
    }

    setDisabledAppearance(playButton, true);
    setDisabledAppearance(versionSelect, true);

    // Send the version identifier to the main process to launch the game
    //@ts-ignore
    window.electronAPI.send(IPC_CHANNELS.LAUNCH_GAME, versionIdentifier);
  });

  // Listen for game launch replies from the main process
  //@ts-ignore
  window.electronAPI.receive(IPC_CHANNELS.LAUNCH_GAME, data => {
    console.log('Game launch status:', data);
    setDisabledAppearance(playButton, false);
    setDisabledAppearance(versionSelect, false);

    if (data.success) {
      console.log('Game launched successfully');
    } else {
      console.error('Failed to launch game:', data.message);
    }
  });
}
