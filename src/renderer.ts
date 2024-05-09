import './index.css';
import './partials/mainMenuModal.css';
import { Modal } from 'bootstrap';
import { progressBarElement } from './partials/progressBarElement';
import { installPanelHtml } from './partials/installPanelHtml';
import { installerMenuModalElement } from './partials/installerMenuModalElement';
import { topNavbarElement } from './partials/topNavbarElement';
import { initializeVersionSelect } from './renderer/versionSelect';
import { setDisabledAppearance } from './domHelpers/setDisabledAppearance';
import { IPC_CHANNELS } from './ipcConfig';

initializeVersionSelect();

document.addEventListener('DOMContentLoaded', () => {
  // Load the top navigation bar
  const topNav = document.getElementById('top-navbar-container');
  if (topNav) {
    topNav.innerHTML = topNavbarElement;

    topNav.addEventListener('click', function () {
      const mainMenuModal = document.getElementById('topNavBtn');
      console.log(mainMenuModal);
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

    const playButton: any = document.getElementById('playButton');
    const versionSelect: any = document.getElementById('versionSelect');

    playButton.addEventListener('click', () => {
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
    window.electronAPI.receive(IPC_CHANNELS.LAUNCH_GAME_REPLY, (data: { success: any; message: any }) => {
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
});
