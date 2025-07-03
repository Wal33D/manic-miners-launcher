import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { debugLog } from '../../logger';

export function trimFilePath(fullPath: string): string | null {
  if (!fullPath || fullPath.lastIndexOf('\\') === -1) {
    return null;
  }
  const lastSlashIndex = fullPath.lastIndexOf('\\');
  return fullPath.substring(0, lastSlashIndex);
}
export function fetchDefaultDirectory(callback: (path: string) => void) {
  window.electronAPI.send(IPC_CHANNELS.GET_DIRECTORIES);

  window.electronAPI.receive(IPC_CHANNELS.GET_DIRECTORIES, response => {
    if (response.status && response.directories) {
      const installPathInput = document.getElementById('installPath') as HTMLInputElement;
      // Assuming 'response.directories' contains the actual directory data
      installPathInput.value = response.directories.launcherInstallPath;
      callback(response.directories.launcherInstallPath); // Call the callback with the path
      debugLog(`Directory received and set: ${response.directories.launcherInstallPath}`);
    } else {
      console.error('Failed to fetch directories:', response.message);
      // Optionally set a default or handle error case
    }
  });
}

export function toggleButtonVisibility(hidePlayButton: boolean) {
  const playButton = document.getElementById('playButton') as HTMLButtonElement;
  const installButton = document.getElementById('installButton') as HTMLButtonElement;

  if (!playButton || !installButton) {
    console.error('Buttons not found on the page.');
    return;
  }

  if (hidePlayButton) {
    playButton.style.display = 'none';
    installButton.style.display = 'block';
  } else {
    playButton.style.display = 'block';
    installButton.style.display = 'none';
  }
}

export function setDisabledAppearance(element: HTMLElement | any, disabled: boolean) {
  element.disabled = disabled;
  if (disabled) {
    element.style.opacity = '0.6';
    element.style.cursor = 'not-allowed';
    element.classList.add('disabled'); // Adding a class for extra specificity if needed
  } else {
    element.style.opacity = '';
    element.style.cursor = ''; // Ensure cursor is reset
    element.classList.remove('disabled');
  }
}
