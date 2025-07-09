// Import IPC channels from a centralized file (adjust the import path as needed)
import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { debugLog } from '../../logger';
import { updateStatus } from './updateStatus';

export const initializeLevels = (): void => {
  window.electronAPI?.removeAllListeners(IPC_CHANNELS.GET_LEVELS);
  window.electronAPI?.removeAllListeners(IPC_CHANNELS.DOWNLOAD_LEVEL);
  window.electronAPI?.removeAllListeners(IPC_CHANNELS.LEVEL_DOWNLOAD_PROGRESS);
  window.electronAPI?.send(IPC_CHANNELS.GET_LEVELS);

  window.electronAPI?.receive(
    IPC_CHANNELS.LEVEL_DOWNLOAD_PROGRESS,
    ({ progress, status }: import('../../types/ipcMessages').ProgressStatus) => {
      updateStatus(progress ?? 0, status);
    }
  );

  window.electronAPI?.receive(IPC_CHANNELS.DOWNLOAD_LEVEL, (result: import('../../types/ipcMessages').DownloadResult) => {
    debugLog(result.message);
  });

  // Handler for receiving levels data
  window.electronAPI?.receiveOnce(
    IPC_CHANNELS.GET_LEVELS,
    (response: import('../../api/fetchLevels').LevelsResponse & { status: boolean; message: string }) => {
      if (response.status) {
        updateLevelsTable(response.levels);
        debugLog(`Received levels: ${JSON.stringify(response.levels)}`);
      } else {
        console.error('Failed to fetch levels:', response.message);
      }
    }
  );

  // Update the UI with received levels data
  function updateLevelsTable(levels: import('../../api/fetchLevels').Level[] | undefined | null) {
    if (!Array.isArray(levels)) {
      console.error('Invalid levels data received:', levels);
      return;
    }

    const tableBody = document.getElementById('levelsTable').querySelector('tbody');
    if (!tableBody) {
      console.error('The levelsTable tbody element was not found.');
      return;
    }

    // Clear existing rows
    tableBody.innerHTML = '';

    // Insert new rows for each level
    levels.forEach(level => {
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td>${level.title}</td>
        <td>${level.creator}</td>
        <td>${new Date(level.date).toLocaleDateString()}</td>
        <td>${level.downloadCount.toLocaleString()}</td>
        <td><button class="btn btn-sm btn-dark-green not-draggable" data-level-id="${level.identifier}">Install</button></td>
      `;
    });

    tableBody.querySelectorAll('button[data-level-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).getAttribute('data-level-id');
        if (id) {
          window.electronAPI.send(IPC_CHANNELS.DOWNLOAD_LEVEL, id);
        }
      });
    });
  }
};
