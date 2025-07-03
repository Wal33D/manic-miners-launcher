export function setupDirectoryDialog(installPathInput: HTMLInputElement) {
  installPathInput.addEventListener('click', () => {
    // Trigger the directory dialog on click
    window.electronAPI.send('open-directory-dialog');
  });

  // Handler to receive the selected directory path and update the input field
  window.electronAPI.removeAllListeners('directory-selected');
  window.electronAPI.receive('directory-selected', (path: any) => {
    installPathInput.value = path as string;
  });
}
