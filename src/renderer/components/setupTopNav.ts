// setupTopNav.ts
/**
 * Toggles the sidebar when the top navigation button is clicked.
 * @param {HTMLElement} topNavButton The navbar brand element that toggles the sidebar.
 */
export function setupTopNav(topNavButton: HTMLElement) {
  const sidebar = document.getElementById('side-pane');
  if (!sidebar) return;

  topNavButton.addEventListener('click', e => {
    e.preventDefault();
    sidebar.classList.toggle('collapsed');
  });
}
