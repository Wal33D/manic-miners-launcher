import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';

export function setupWindowControls() {
  const minimize = document.getElementById('window-minimize');
  const maximize = document.getElementById('window-maximize');
  const close = document.getElementById('window-close');

  minimize?.addEventListener('click', () => {
    window.electronAPI.send(IPC_CHANNELS.MINIMIZE_WINDOW);
  });

  maximize?.addEventListener('click', () => {
    window.electronAPI.send(IPC_CHANNELS.MAXIMIZE_WINDOW);
  });

  close?.addEventListener('click', () => {
    window.electronAPI.send(IPC_CHANNELS.CLOSE_WINDOW);
  });
}
