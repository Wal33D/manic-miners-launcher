// setupTopNav.ts
import { Modal } from 'bootstrap';

/**
 * Sets up event listeners for the top navigation bar, particularly for the main menu modal.
 * @param {HTMLElement} topNavButton The navbar brand element that opens the menu modal.
 */
export function setupTopNav(topNavButton: HTMLElement) {
  topNavButton.addEventListener('click', function () {
    const mainMenuModal = document.getElementById('navbar-main-menu-modal');
    if (mainMenuModal) {
      const bsModal = new Modal(mainMenuModal, {
        keyboard: true,
      });
      bsModal.toggle();
    }
  });
}
