import { shell, contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '../main/ipcHandlers/ipcChannels';

const validSendChannels = [
  IPC_CHANNELS.GET_DIRECTORIES,
  IPC_CHANNELS.LAUNCH_GAME,
  IPC_CHANNELS.DOWNLOAD_VERSION,
  IPC_CHANNELS.PLAY_SOUND,
  IPC_CHANNELS.ALL_VERSION_INFO,
  IPC_CHANNELS.SET_SELECTED_VERSION,
  IPC_CHANNELS.GET_URLS,
  IPC_CHANNELS.GET_LEVELS,
  'open-directory-dialog',
];

const validReceiveChannels = [
  IPC_CHANNELS.GET_DIRECTORIES,
  IPC_CHANNELS.LAUNCH_GAME,
  IPC_CHANNELS.DOWNLOAD_PROGRESS,
  IPC_CHANNELS.DOWNLOAD_VERSION,
  IPC_CHANNELS.VERSIONS_UPDATED,
  IPC_CHANNELS.ALL_VERSION_INFO,
  IPC_CHANNELS.GET_URLS,
  IPC_CHANNELS.GET_LEVELS,
  'directory-selected',
];

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel: string, data?: any) => {
    if (validSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: (...args: any[]) => void) => {
    if (validReceiveChannels.includes(channel)) {
      ipcRenderer.on(channel, (_event, ...args) => func(...args));
    }
  },
  openExternal: shell.openExternal,
});
