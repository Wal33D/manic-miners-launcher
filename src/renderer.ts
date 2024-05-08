import './index.css';
import { progressBarElement } from './partials/progressBarElement';
import { installPanelHtml } from './partials/installPanelElement';
import { installerMenuModalElement } from './partials/installerMenuModalElement';

document.addEventListener('DOMContentLoaded', () => {
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
});
