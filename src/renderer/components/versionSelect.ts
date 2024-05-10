import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcConfig';

export const initializeVersionSelect = (): void => {
  document.addEventListener('DOMContentLoaded', () => {
    //@ts-ignore
    window.electronAPI.send('request-versions');

    //@ts-ignore
    window.electronAPI.receive('reply-versions', versions => {
      const versionSelect = document.getElementById('versionSelect');
      versions.forEach((version: { identifier: string; displayName: any }) => {
        const option = document.createElement('option');
        option.value = version.identifier;
        option.textContent = version.displayName || version.identifier;
        versionSelect.appendChild(option);
      });
    });

    const versionSelect: any = document.getElementById('versionSelect');
    const playButton = document.getElementById('playButton');

    versionSelect.addEventListener('change', () => {
      const selectedVersion = versionSelect.value;
      //@ts-ignore
      window.electronAPI.send('check-version-installed', selectedVersion);

      //@ts-ignore
      window.electronAPI.receive('version-installed-status', isInstalled => {
        playButton.textContent = isInstalled ? 'Play Game' : 'Install';
      });
    });
  });
};
