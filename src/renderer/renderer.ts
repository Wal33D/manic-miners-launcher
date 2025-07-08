// renderer.ts
import './index.css';
import '../ui/styles/mainMenuModal.css';
import { setupTopNav } from './components/setupTopNav';
import { setupPlayButton } from './components/setupPlayButton';
import { setupInstallButton } from './components/setupInstallButton';
import { setupDirectoryDialog } from './components/setupDirectoryDialog';
import { initializeVersionSelect } from './components/initializeVersionSelect';
import { initializeUrls } from './components/initializeUrls';
import { initializeLevels } from './components/initializeLevels';
import { initializeSettings } from './components/initializeSettings';
import { setupNavigation } from './components/setupNavigation';
import { setupWindowControls } from './components/setupWindowControls';

initializeVersionSelect();
initializeSettings();

document.addEventListener('DOMContentLoaded', () => {
  if (window.electronAPI.platform !== 'win32') {
    console.warn('Running on non-Windows platform. Shortcut options are disabled.');
    const startMenuCb = document.getElementById('start-menu-shortcut') as HTMLInputElement | null;
    const desktopCb = document.getElementById('desktop-shortcut') as HTMLInputElement | null;
    [startMenuCb, desktopCb].forEach(cb => {
      if (cb) {
        cb.disabled = true;
      }
    });
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
    initializeLevels();
  }

  const menuBtns = [document.getElementById('navbar-main-menu-modal-btn'), document.getElementById('navbar-menu-btn')];
  menuBtns.forEach(btn => {
    if (btn) setupTopNav(btn as HTMLElement);
  });

  setupNavigation();
  setupWindowControls();
});
