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
    // Request version info from the main process
    //@ts-ignore
    window.electronAPI.send('REQUEST_VERSIONS');

    //@ts-ignore
    window.electronAPI.receive('REPLY_VERSIONS', versions => {
      const versionSelect = document.getElementById('versionSelect');
      versions.forEach((version: { identifier: string; displayName: any }) => {
        const option = document.createElement('option');
        option.value = version.identifier;
        option.textContent = version.displayName || version.identifier;
        versionSelect.appendChild(option);
      });
    });
  });
}
