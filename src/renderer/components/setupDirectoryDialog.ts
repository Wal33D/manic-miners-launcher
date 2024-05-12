export function setupDirectoryDialog(installPathInput: HTMLInputElement) {
  installPathInput.addEventListener('click', () => {
    // Trigger the directory dialog on click
    //@ts-ignore
    window.electronAPI.send('open-directory-dialog');
  });

  // Handler to receive the selected directory path and update the input field
  //@ts-ignore
  window.electronAPI.receive('directory-selected', path => {
    installPathInput.value = path;
  });
}
