export function trimFilePath(fullPath: string): string | null {
  if (!fullPath || fullPath.lastIndexOf('\\') === -1) {
    return null;
  }
  const lastSlashIndex = fullPath.lastIndexOf('\\');
  return fullPath.substring(0, lastSlashIndex);
}

export function fetchDefaultDirectory() {
  //@ts-ignore
  window.electronAPI.send('GET_DIRECTORIES');

  // Handling the response
  //@ts-ignore
  window.electronAPI.receive('DIRECTORIES_RESPONSE', directories => {
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
