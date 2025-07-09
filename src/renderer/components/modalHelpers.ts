export function createModal(modalEl: HTMLElement) {
  const closeButtons = modalEl.querySelectorAll('[data-bs-dismiss="modal"]');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      hide();
    });
  });

  function show() {
    modalEl.classList.add('show');
    modalEl.style.display = 'block';
  }

  function hide() {
    modalEl.classList.remove('show');
    modalEl.style.display = 'none';
  }

  return { show, hide };
}
