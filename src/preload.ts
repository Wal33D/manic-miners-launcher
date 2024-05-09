const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel: string, data: any) => {
    let validSendChannels = ['request-version-information', 'launch-game', 'set-selected-version'];
    if (validSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: Function) => {
    let validReceiveChannels = ['version-information-reply', 'game-launch-reply', 'set-selected-version-reply'];
    if (validReceiveChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
