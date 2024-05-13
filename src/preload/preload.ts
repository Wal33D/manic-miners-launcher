const { shell, contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel: string, data: any) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel: string, func: Function) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  openExternal: (url: any) => shell.openExternal(url),
});
