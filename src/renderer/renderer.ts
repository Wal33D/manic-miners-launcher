// renderer.ts
import './index.css';
import '../ui/styles/mainMenuModal.css';
import { setupTopNav } from './components/setupTopNav';
import { setupPlayButton } from './components/setupPlayButton';
import { setupInstallButton } from './components/setupInstallButton';
import { setupDirectoryDialog } from './components/setupDirectoryDialog';
import { initializeVersionSelect } from './components/initializeVersionSelect';
import { initializeUrls } from './components/initializeUrls';

initializeVersionSelect();

document.addEventListener('DOMContentLoaded', () => {
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

  const mainMenuModal = document.getElementById('topNavBtn');
  if (mainMenuModal) {
    setupTopNav(mainMenuModal);
  }
});
