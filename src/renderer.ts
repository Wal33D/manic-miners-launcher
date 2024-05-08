import './index.css';
import './partials/mainMenuModal.css';
import { Modal } from 'bootstrap';
import { progressBarElement } from './partials/progressBarElement';
import { installPanelHtml } from './partials/installPanelElement';
import { installerMenuModalElement } from './partials/installerMenuModalElement';
import { topNavbarElement } from './partials/topNavbarElement';

document.addEventListener('DOMContentLoaded', async () => {
  /**
   * The top navigation bar element.
   *
   * @type {HTMLElement}
   */

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
   * The container element for the install pane.
   */
  const container = document.getElementById('install-pane-container');
  if (container) {
    container.innerHTML = installPanelHtml;
    document
      .getElementById('installButton')
      .addEventListener('click', function () {
        console.log('Install button clicked!');
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
    document
      .getElementById('installButton')
      .addEventListener('click', function () {
        console.log('Install button clicked!');
      });
  }

  /**
   * The container element for the installer menu modal.
   */
  const installerMenuModal = document.getElementById(
    'installer-menu-modal-container'
  );
  if (installerMenuModal) {
    installerMenuModal.innerHTML = installerMenuModalElement;
    document
      .getElementById('installButton')
      .addEventListener('click', function () {
        console.log('Install button clicked!');
      });
  }
  const { ipcRenderer } = require('electron');

  setTimeout(() => {
    // Request versions data from main process
    ipcRenderer.send('getVersionsData');

    // Listen for the versions data
    ipcRenderer.on('versionsDataResponse', (event, data) => {
      console.log('Received versions data:', data);
      // Here, you can do something with the data, like populate UI elements
    });
  }, 5000);
});
