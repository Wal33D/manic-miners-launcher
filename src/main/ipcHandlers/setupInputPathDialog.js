import { ipcMain } from 'electron';
const { dialog } = require('electron');

export const setupInputPathDialog = () => {
  ipcMain.on('open-directory-dialog', event => {
    dialog
      .showOpenDialog({
        properties: ['openDirectory'],
      })
      .then(result => {
        if (!result.canceled && result.filePaths.length > 0) {
          event.reply('directory-selected', result.filePaths[0]);
        }
      })
      .catch(err => {
        console.error('Failed to open directory dialog:', err);
      });
  });
};
