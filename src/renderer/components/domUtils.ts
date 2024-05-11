export function trimFilePath(fullPath: string) {
  if (!fullPath) {
    throw new Error('Invalid file path provided. Path is empty.');
  }
  const lastSlashIndex = fullPath.lastIndexOf('\\');
  if (lastSlashIndex === -1) {
    throw new Error('Invalid file path provided. No backslash found in path.');
  }
  return fullPath.substring(0, lastSlashIndex);
}

export function fetchDefaultDirectory() {
  // Sending the IPC message to request directories
  //@ts-ignore
  window.electronAPI.send('GET_DIRECTORIES');

  // Handling the response
  //@ts-ignore
  window.electronAPI.receive('DIRECTORIES_RESPONSE', directories => {
    const installPathInput = document.getElementById('installPath') as HTMLInputElement;
    installPathInput.value = directories.launcherInstallPath;
  });
}
