export function openUrl(url: string) {
  if (window.electronAPI?.openExternal) {
    window.electronAPI.openExternal(url);
    return;
  }

  try {
    const { shell } = require('electron');
    if (shell?.openExternal) {
      shell.openExternal(url);
      return;
    }
  } catch {
    // ignore - window.require may not be available
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}
