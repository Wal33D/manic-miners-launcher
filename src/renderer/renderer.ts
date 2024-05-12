import './index.css';
import '../ui/styles/mainMenuModal.css';
import { Modal } from 'bootstrap';
import { topNavbarElement } from '../ui/partials/topNavbarElement';
import { installPanelHtml } from '../ui/partials/installPanelHtml';
import { progressBarElement } from '../ui/partials/progressBarElement';
import { installerMenuModalElement } from '../ui/partials/installerMenuModalElement';
import { initializeVersionSelect } from './components/initializeVersionSelect';
import { setupInstallButton } from './components/setupInstallButton';
import { setupPlayButton } from './components/setupPlayButton';
import { setupDirectoryDialog } from './components/setupDirectoryDialog';

initializeVersionSelect();
import { setupNavbar } from './components/setupNavbar';

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
    const playButton = document.getElementById('playButton') as HTMLButtonElement;
    const versionSelect: any = document.getElementById('versionSelect');
    const installButton = document.getElementById('installButton') as HTMLButtonElement;

    if (installPathInput && playButton && versionSelect) {
      setupNavbar('top-navbar-container', () => modalManager.toggleModal('mainMenuModal'));
      setupPlayButton(playButton, versionSelect);
      setupInstallButton(installButton, installPathInput, versionSelect);
      setupDirectoryDialog(installPathInput);
    }
  }
});
