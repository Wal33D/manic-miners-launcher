// Import IPC channels from a centralized file (adjust the import path as needed)
import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';
import { debugLog } from '../../logger';

export const initializeLevels = (): void => {
  window.electronAPI?.removeAllListeners(IPC_CHANNELS.GET_LEVELS);
  window.electronAPI?.send(IPC_CHANNELS.GET_LEVELS);

  // Handler for receiving levels data
  window.electronAPI?.receiveOnce(IPC_CHANNELS.GET_LEVELS, (response: any) => {
    if (response.status) {
      updateLevelsTable(response.levels); // Pass only the levels array
      debugLog(`Received levels: ${JSON.stringify(response.levels)}`);
    } else {
      console.error('Failed to fetch levels:', response.message);
    }
  });

  // Update the UI with received levels data
  function updateLevelsTable(levels: any[] | undefined | null) {
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
      `;
    });
  }
};
