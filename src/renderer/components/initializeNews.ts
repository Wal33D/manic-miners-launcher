import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { debugLog } from '../../logger';

export function initializeNews(): void {
  const container = document.getElementById('news-container');
  if (!container) return;

  window.electronAPI.removeAllListeners(IPC_CHANNELS.GET_NEWS);
  window.electronAPI.send(IPC_CHANNELS.GET_NEWS);

  window.electronAPI.receiveOnce(IPC_CHANNELS.GET_NEWS, (response: any) => {
    if (response.status && Array.isArray(response.news)) {
      container.innerHTML = '';
      response.news.forEach((item: any) => {
        const div = document.createElement('div');
        div.className = 'news-item mb-3 p-2 bg-dark rounded';
        div.innerHTML = `<h5>${item.title}</h5><p>${item.content}</p><small>${new Date(item.date).toLocaleDateString()}</small>`;
        container.appendChild(div);
      });
    } else {
      debugLog('Failed to fetch news: ' + response.message);
      container.textContent = 'Failed to load news.';
    }
  });
}
