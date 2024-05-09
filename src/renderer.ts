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

document.addEventListener('DOMContentLoaded', () => {
  const actionButton = document.getElementById('actionButton') as any;
  const versionSelect = document.getElementById('versionSelect') as any;

  function updateActionButton(versionIdentifier: any) {
    // Example function to determine the button status based on the version
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
      setDisabledAppearance(actionButton, false);
    });
  }

  versionSelect.addEventListener('change', () => {
    setDisabledAppearance(actionButton, true);
    updateActionButton(versionSelect.value);
  });

  actionButton.addEventListener('click', () => {
    const action = actionButton.getAttribute('data-action');
    handleAction(action, versionSelect.value);
  });

  function handleAction(action: string, versionIdentifier: any) {
    setDisabledAppearance(actionButton, true);
    setDisabledAppearance(versionSelect, true);
    //@ts-ignore
    window.electronAPI.send(action + '-game', versionIdentifier);

    //@ts-ignore
    window.electronAPI.receive(action + '-game-reply', data => {
      console.log(`${action} game status:`, data);
      setDisabledAppearance(actionButton, false);
      setDisabledAppearance(versionSelect, false);

      if (data.success) {
        console.log(`${action.charAt(0).toUpperCase() + action.slice(1)} game successfully`);
      } else {
        console.error(`Failed to ${action} game:`, data.message);
      }
    });
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

  // Initial check
  updateActionButton(versionSelect.value);
});
