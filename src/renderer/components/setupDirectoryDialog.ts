import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';

export function setupDirectoryDialog(installPathInput: HTMLInputElement) {
  installPathInput.addEventListener('click', () => {
    // Trigger the directory dialog on click
    window.electronAPI.send(IPC_CHANNELS.OPEN_DIRECTORY_DIALOG);
  });

  // Handler to receive the selected directory path and update the input field
  window.electronAPI.removeAllListeners(IPC_CHANNELS.DIRECTORY_SELECTED);
  window.electronAPI.receive(IPC_CHANNELS.DIRECTORY_SELECTED, (path: any) => {
    installPathInput.value = path as string;
  });
}
