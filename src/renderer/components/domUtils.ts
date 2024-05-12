import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';

export function trimFilePath(fullPath: string): string | null {
  if (!fullPath || fullPath.lastIndexOf('\\') === -1) {
    return null;
  }
  const lastSlashIndex = fullPath.lastIndexOf('\\');
  return fullPath.substring(0, lastSlashIndex);
}

export function fetchDefaultDirectory() {
  //@ts-ignore
  window.electronAPI.send(IPC_CHANNELS.GET_DIRECTORIES);

  // Handling the response
  //@ts-ignore
  window.electronAPI.receive(IPC_CHANNELS.GET_DIRECTORIES, directories => {
    const installPathInput = document.getElementById('installPath') as HTMLInputElement;
    installPathInput.value = directories.launcherInstallPath;
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
  } else {
    element.style.opacity = '';
    element.style.cursor = '';
  }
}
