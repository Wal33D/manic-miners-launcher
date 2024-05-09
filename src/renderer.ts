import './index.css';
import './partials/mainMenuModal.css';
import { Modal } from 'bootstrap';
import { progressBarElement } from './partials/progressBarElement';
import { installPanelHtml } from './partials/installPanelHtml';
import { installerMenuModalElement } from './partials/installerMenuModalElement';
import { topNavbarElement } from './partials/topNavbarElement';
import { loadVersionSelect } from './renderer/versionSelect';
import { setDisabledAppearance } from './domHelpers/setDisabledAppearance';

loadVersionSelect();

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
   * The container element for the install pane.
   */
  const container = document.getElementById('install-pane-container');
  if (container) {
    container.innerHTML = installPanelHtml;
    document.getElementById('installButton').addEventListener('click', function () {
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

document.addEventListener('DOMContentLoaded', () => {
  const actionButton = document.getElementById('actionButton');
  const versionSelect = document.getElementById('versionSelect') as any;

  versionSelect.addEventListener('change', () => {
    updateActionButton(versionSelect.value);
  });

  actionButton.addEventListener('click', () => {
    const action = actionButton.getAttribute('data-action');
    handleAction(action, versionSelect.value);
  });

  function updateActionButton(versionIdentifier: any) {
    // Mock function to check status
    checkVersionStatus(versionIdentifier).then(status => {
      switch (status) {
        case 'download':
          actionButton.textContent = 'Download';
          actionButton.className = 'btn btn-primary w-100 not-draggable';
          actionButton.setAttribute('data-action', 'download');
          break;
        case 'install':
          actionButton.textContent = 'Install';
          actionButton.className = 'btn btn-warning w-100 not-draggable';
          actionButton.setAttribute('data-action', 'install');
          break;
        case 'play':
          actionButton.textContent = 'Play Game';
          actionButton.className = 'btn btn-success w-100 not-draggable';
          actionButton.setAttribute('data-action', 'play');
          break;
        default:
          actionButton.textContent = 'Check Status';
          actionButton.className = 'btn btn-dark w-100 not-draggable';
          actionButton.setAttribute('data-action', 'check');
      }
    });
  }

  function handleAction(action: string, versionIdentifier: any) {
    // Logic to handle different actions based on the button's data-action attribute
    switch (action) {
      case 'download':
        console.log('Downloading...');
        break;
      case 'install':
        console.log('Installing...');
        break;
      case 'play':
        console.log('Launching game...');
        break;
    }
  }

  function checkVersionStatus(versionIdentifier: string) {
    // Mock API call or logic to determine the status
    return new Promise(resolve => {
      // Simulate an API response
      setTimeout(() => {
        // Example logic that might come from checking local files or a database
        if (versionIdentifier === 'v1.0') resolve('play');
        else if (versionIdentifier === 'v1.1') resolve('install');
        else resolve('download');
      }, 1000);
    });
  }

  updateActionButton(versionSelect.value); // Initial update on load
});
