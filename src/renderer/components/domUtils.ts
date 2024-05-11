export function trimFilePath(fullPath: string) {
  if (!fullPath) {
    fetchDefaultDirectory(); // Call fetchDefaultDirectory if fullPath is falsy
    return; // Exit function early
  }
  const lastSlashIndex = fullPath.lastIndexOf('\\');
  if (lastSlashIndex === -1) {
    fetchDefaultDirectory(); // Call fetchDefaultDirectory if no backslash is found
    return; // Exit function early
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
