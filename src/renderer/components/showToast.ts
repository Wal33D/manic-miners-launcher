export function showToast(message: string, type: 'success' | 'error' = 'success'): void {
  const container = document.createElement('div');
  container.className = `toast-container position-fixed top-0 end-0 p-3`;
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-bg-${type} border-0 show`;
  toast.role = 'alert';
  toast.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div><button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="toast"></button></div>`;
  container.appendChild(toast);
  document.body.appendChild(container);
  setTimeout(() => container.remove(), 3000);
}
