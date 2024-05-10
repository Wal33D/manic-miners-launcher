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
    document.getElementById('installButton').addEventListener('click', function () {
      console.log('Install button clicked!');
    });
  }

  /**
   * The container element for the installer menu modal.
   */
  const installerMenuModal = document.getElementById('installer-menu-modal-container');
  if (installerMenuModal) {
    installerMenuModal.innerHTML = installerMenuModalElement;
    document.getElementById('installButton').addEventListener('click', function () {
      console.log('Install button clicked!');
    });
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
