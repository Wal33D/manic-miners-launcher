// setupTopNav.ts
import { createModal } from './modalHelpers';

/**
 * Sets up event listeners for the top navigation bar, particularly for the main menu modal.
 * @param {HTMLElement} topNavButton The navbar brand element that opens the menu modal.
 */
export function setupTopNav(topNavButton: HTMLElement) {
  const mainMenuModal = document.getElementById('navbar-main-menu-modal');
  if (!mainMenuModal) return;

  const modal = createModal(mainMenuModal);

  topNavButton.addEventListener('click', function (e) {
    e.preventDefault();
    modal.show();
  });
}
