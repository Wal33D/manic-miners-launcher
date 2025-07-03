// setupTopNav.ts
import { Modal } from 'bootstrap';

/**
 * Sets up event listeners for the top navigation bar, particularly for the main menu modal.
 * @param {HTMLElement} topNav The top navbar container element.
 */
export function setupTopNav(topNav: HTMLElement) {
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
