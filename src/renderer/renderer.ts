import './index.css';
import '../ui/styles/mainMenuModal.css';
import { Modal } from 'bootstrap';
import { progressBarElement } from '../ui/partials/progressBarElement';
import { installPanelHtml } from '../ui/partials/installPanelHtml';
import { installerMenuModalElement } from '../ui/partials/installerMenuModalElement';
import { topNavbarElement } from '../ui/partials/topNavbarElement';
import { initializeVersionSelect } from './components/versionSelect';
import { setDisabledAppearance } from './components/setDisabledAppearance';
import { IPC_CHANNELS } from '../main/ipcHandlers/ipcConfig';

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

  /**
   * The footer element of the page.
   *
   * @type {HTMLElement}
   */
  const footer = document.getElementById('bottom-navbar-container');
  if (footer) {
    footer.innerHTML = progressBarElement;
  }

  /**
   * The container element for the installer menu modal.
   */
  const installerMenuModal = document.getElementById('installer-menu-modal-container');
  if (installerMenuModal) {
    installerMenuModal.innerHTML = installerMenuModalElement;
  }
});

/**
 * The container element for the install pane.
 */

const container = document.getElementById('install-pane-container');
if (container) {
  container.innerHTML = installPanelHtml;

  document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const versionSelect = document.getElementById('versionSelect');

    // Function to set the disabled appearance

    playButton.addEventListener('click', () => {
      //@ts-ignore
      const versionIdentifier = versionSelect.value;
      if (!versionIdentifier) {
        console.error('No version selected.');
        return;
      }

      // Disable the Play button and the version selection to prevent multiple launches and changes during operation
      setDisabledAppearance(playButton, true);
      setDisabledAppearance(versionSelect, true);

      // Send the version identifier to the main process
      //@ts-ignore
      window.electronAPI.send(IPC_CHANNELS.LAUNCH_GAME, versionIdentifier);
    });

    // Listen for game launch replies from the main process
    //@ts-ignore
    window.electronAPI.receive(IPC_CHANNELS.LAUNCH_GAME, data => {
      console.log('Game launch status:', data);

      // Re-enable the Play button and the version selection regardless of the result
      setDisabledAppearance(playButton, false);
      setDisabledAppearance(versionSelect, false);

      // Optionally, handle different responses based on the data received
      if (data.success) {
        console.log('Game launched successfully');
      } else {
        console.error('Failed to launch game:', data.message);
      }
    });
  });
}
