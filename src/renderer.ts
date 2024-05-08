import './index.css';
import { progressBarElement } from './partials/progressBarElement';
import { installPanelHtml } from './partials/installPanelElement';
import { installerMenuModalElement } from './partials/installerMenuModalElement';

document.addEventListener('DOMContentLoaded', () => {
  const footer = document.getElementById('bottom-navbar-container');
  if (footer) {
    footer.innerHTML = progressBarElement;
    document
      .getElementById('installButton')
      .addEventListener('click', function () {
        console.log('Install button clicked!');
      });
  }
  installPanelHtml;
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
