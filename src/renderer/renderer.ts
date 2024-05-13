// renderer.ts
import './index.css';
import '../ui/styles/mainMenuModal.css';
import { setupTopNav } from './components/setupTopNav';
import { setupPlayButton } from './components/setupPlayButton';
//import { topNavbarElement } from '../ui/partials/topNavbarElement';
//import { installPanelHtml } from '../ui/partials/installPanelHtml';
//import { progressBarElement } from '../ui/partials/progressBarElement';
import { setupInstallButton } from './components/setupInstallButton';
import { setupDirectoryDialog } from './components/setupDirectoryDialog';
import { initializeVersionSelect } from './components/initializeVersionSelect';
import { installerMenuModalElement } from '../ui/partials/installerMenuModalElement';
import { initializeUrls } from './components/initializeUrls';

initializeVersionSelect();

document.addEventListener('DOMContentLoaded', () => {
  const topNav = document.getElementById('top-navbar-container');
  if (topNav) {
    setupTopNav(topNav);
  }

  const footer = document.getElementById('bottom-navbar-container');
  if (footer) {
    //   footer.innerHTML = progressBarElement;
  }

  const installerMenuModal = document.getElementById('installer-menu-modal-container');
  if (installerMenuModal) {
    installerMenuModal.innerHTML = installerMenuModalElement;
  }

  const installPaneContainer = document.getElementById('install-pane-container');
  if (installPaneContainer) {
    const playButton = document.getElementById('playButton') as HTMLButtonElement;
    const versionSelect: any = document.getElementById('versionSelect') as HTMLSelectElement;
    const installButton = document.getElementById('installButton') as HTMLButtonElement;
    const installPathInput = document.getElementById('installPath') as HTMLInputElement;

    if (installPathInput && playButton && versionSelect && installButton) {
      setupPlayButton(playButton, versionSelect, installPathInput);
      setupInstallButton(installButton, installPathInput, versionSelect);
      setupDirectoryDialog(installPathInput);
    }
    initializeUrls();
  }
});
