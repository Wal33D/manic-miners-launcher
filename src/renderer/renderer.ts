import './index.css';
import '../ui/styles/mainMenuModal.css';
import { Modal } from 'bootstrap';
import { IPC_CHANNELS } from '../main/ipcHandlers/ipcChannels';
import { topNavbarElement } from '../ui/partials/topNavbarElement';
import { installPanelHtml } from '../ui/partials/installPanelHtml';
import { progressBarElement } from '../ui/partials/progressBarElement';
import { setDisabledAppearance } from './components/setDisabledAppearance';
import { installerMenuModalElement } from '../ui/partials/installerMenuModalElement';
import { initializeVersionSelect } from './components/initializeVersionSelect';

initializeVersionSelect();

document.addEventListener('DOMContentLoaded', () => {
  const topNav = document.getElementById('top-navbar-container');
  if (topNav) {
    topNav.innerHTML = topNavbarElement;

    topNav.addEventListener('click', function () {
      const mainMenuModal = document.getElementById('topNavBtn');
      if (mainMenuModal) {
        const bsModal = new Modal(mainMenuModal, {
          keyboard: true,
        });
        bsModal.toggle();
      }
    });
  }

  const footer = document.getElementById('bottom-navbar-container');
  if (footer) {
    footer.innerHTML = progressBarElement;
  }

  const installerMenuModal = document.getElementById('installer-menu-modal-container');
  if (installerMenuModal) {
    installerMenuModal.innerHTML = installerMenuModalElement;
  }

  const container = document.getElementById('install-pane-container');
  if (container) {
    container.innerHTML = installPanelHtml;

    const installPathInput = document.getElementById('installPath') as HTMLInputElement;
    if (installPathInput) {
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

    const playButton = document.getElementById('playButton');
    const versionSelect: any = document.getElementById('versionSelect');
    if (playButton && versionSelect) {
      playButton.addEventListener('click', () => {
        //@ts-ignore
        const versionIdentifier = versionSelect.value;
        if (!versionIdentifier) {
          console.error('No version selected.');
          return;
        }

        setDisabledAppearance(playButton, true);
        setDisabledAppearance(versionSelect, true);

        //@ts-ignore
        window.electronAPI.send(IPC_CHANNELS.LAUNCH_GAME, versionIdentifier);
      });

      //@ts-ignore
      window.electronAPI.receive(IPC_CHANNELS.LAUNCH_GAME, data => {
        console.log('Game launch status:', data);
        setDisabledAppearance(playButton, false);
        setDisabledAppearance(versionSelect, false);

        if (data.success) {
          console.log('Game launched successfully');
        } else {
          console.error('Failed to launch game:', data.message);
        }
      });
    }
    const installButton = document.getElementById('installButton');

    if (installButton && installPathInput && versionSelect) {
      installButton.addEventListener('click', () => {
        const versionIdentifier = versionSelect.value;
        const downloadPath = installPathInput.value; // Ensure this path is the desired download location

        if (!versionIdentifier || !downloadPath) {
          console.error('No version selected or download path specified.');
          return;
        }

        // Send the download request to the main process
        //@ts-ignore
        window.electronAPI.send(IPC_CHANNELS.DOWNLOAD_VERSION, {
          version: versionIdentifier,
          downloadPath: downloadPath,
        });
      });

      //@ts-ignore
      window.electronAPI.receive(IPC_CHANNELS.DOWNLOAD_PROGRESS, status => {
        console.log('Download Progress:', status.progress, '%', status.status);
        // Update a progress bar or show status messages on your UI
      });

      //@ts-ignore
      window.electronAPI.receive(IPC_CHANNELS.DOWNLOAD_VERSION, result => {
        console.log(result.message);
        if (result.downloaded) {
          alert('Download completed successfully.');
        } else {
          alert('Failed to download the version: ' + result.message);
        }
      });
    }
  }
});
