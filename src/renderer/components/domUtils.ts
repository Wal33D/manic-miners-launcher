import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';

export const trimFilePath = ({ fullPath }: { fullPath: string }): { found: boolean; path: string | null; message: string } => {
  let message = '';
  let path = null;
  let found = false;

  if (!fullPath || fullPath.lastIndexOf('\\') === -1) {
    message = 'No backslash found in path or path is empty.';
    return { found, path, message };
  }

  const lastSlashIndex = fullPath.lastIndexOf('\\');
  path = fullPath.substring(0, lastSlashIndex);
  found = true;
  message = 'Path trimmed successfully.';

  return { found, path, message };
};

export function fetchDefaultDirectory(callback: (path: string) => void) {
  //@ts-ignore
  window.electronAPI.send(IPC_CHANNELS.GET_DIRECTORIES);

  //@ts-ignore
  window.electronAPI.receive(IPC_CHANNELS.GET_DIRECTORIES, response => {
    if (response.status && response.directories) {
      const installPathInput = document.getElementById('installPath') as HTMLInputElement;
      // Assuming 'response.directories' contains the actual directory data
      installPathInput.value = response.directories.launcherInstallPath;
      callback(response.directories.launcherInstallPath); // Call the callback with the path
      console.log('Directory received and set: ', response.directories.launcherInstallPath);
    } else {
      console.error('Failed to fetch directories:', response.message);
      // Optionally set a default or handle error case
    }
  });
}

export const toggleButtonVisibility = ({ hidePlayButton }: { hidePlayButton: boolean }): { status: boolean; message: string } => {
  const playButton = document.getElementById('playButton') as HTMLButtonElement;
  const installButton = document.getElementById('installButton') as HTMLButtonElement;
  let message = '';
  let status = false;

  if (!playButton || !installButton) {
    message = 'Buttons not found on the page.';
    return { status, message };
  }

  if (hidePlayButton) {
    playButton.style.display = 'none';
    installButton.style.display = 'block';
    message = 'Play button hidden, install button shown.';
  } else {
    playButton.style.display = 'block';
    installButton.style.display = 'none';
    message = 'Play button shown, install button hidden.';
  }

  status = true;
  return { status, message };
};

export const setDisabledAppearance = ({
  element,
  disabled,
}: {
  element: HTMLElement | any;
  disabled: boolean;
}): { status: boolean; message: string } => {
  let message = '';

  if (!element) {
    message = 'Element not found.';
    return { status: false, message };
  }

  element.disabled = disabled;
  if (disabled) {
    element.style.opacity = '0.6';
    element.style.cursor = 'not-allowed';
    element.classList.add('disabled');
    message = 'Element disabled and styled accordingly.';
  } else {
    element.style.opacity = '';
    element.style.cursor = '';
    element.classList.remove('disabled');
    message = 'Element enabled and styled accordingly.';
  }

  return { status: true, message };
};
