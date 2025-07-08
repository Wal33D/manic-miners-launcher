// setupTopNav.ts
import { Modal } from 'bootstrap';

/**
 * Sets up event listeners for the top navigation bar, particularly for the main menu modal.
 * @param {HTMLElement} topNavButton The navbar brand element that opens the menu modal.
 */
export function setupTopNav(topNavButton: HTMLElement) {
  const mainMenuModal = document.getElementById('navbar-main-menu-modal');
  if (!mainMenuModal) return;

  const bsModal = Modal.getOrCreateInstance(mainMenuModal, { keyboard: true });

  topNavButton.addEventListener('click', function (e) {
    e.preventDefault();
    bsModal.show();
  });
}
