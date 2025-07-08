import { Modal } from 'bootstrap';

export function setupNavigation() {
  const modalEl = document.getElementById('navbar-main-menu-modal');
  if (!modalEl) return;
  const bsModal = Modal.getOrCreateInstance(modalEl);

  const links: { id: string; target: string }[] = [
    { id: 'nav-home', target: 'news' },
    { id: 'nav-levels', target: 'levels' },
    { id: 'nav-library', target: 'library' },
    { id: 'nav-store', target: 'store' },
    { id: 'nav-settings', target: 'settings' },
  ];

  links.forEach(({ id, target }) => {
    const link = document.getElementById(id);
    if (!link) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      showTab(target);
      bsModal.hide();
    });
  });

  function showTab(target: string) {
    document.querySelectorAll('.tab-content .tab-pane').forEach(p => {
      p.classList.remove('show', 'active');
    });
    const pane = document.getElementById(target);
    if (pane) {
      pane.classList.add('show', 'active');
    }
  }
}
