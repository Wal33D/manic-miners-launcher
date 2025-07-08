import { shell, contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '../main/ipcHandlers/ipcChannels';

type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];

const validSendChannels: IpcChannel[] = [
  IPC_CHANNELS.GET_DIRECTORIES,
  IPC_CHANNELS.LAUNCH_GAME,
  IPC_CHANNELS.DOWNLOAD_VERSION,
  IPC_CHANNELS.PLAY_SOUND,
  IPC_CHANNELS.ALL_VERSION_INFO,
  IPC_CHANNELS.SET_SELECTED_VERSION,
  IPC_CHANNELS.GET_URLS,
  IPC_CHANNELS.GET_LEVELS,
  IPC_CHANNELS.GET_NEWS,
  IPC_CHANNELS.DOWNLOAD_LEVEL,
  IPC_CHANNELS.GET_SETTINGS,
  IPC_CHANNELS.SET_SETTINGS,
  IPC_CHANNELS.OPEN_DIRECTORY_DIALOG,
  IPC_CHANNELS.MINIMIZE_WINDOW,
  IPC_CHANNELS.MAXIMIZE_WINDOW,
  IPC_CHANNELS.CLOSE_WINDOW,
];

const validReceiveChannels: IpcChannel[] = [
  IPC_CHANNELS.GET_DIRECTORIES,
  IPC_CHANNELS.LAUNCH_GAME,
  IPC_CHANNELS.DOWNLOAD_PROGRESS,
  IPC_CHANNELS.DOWNLOAD_VERSION,
  IPC_CHANNELS.LEVEL_DOWNLOAD_PROGRESS,
  IPC_CHANNELS.DOWNLOAD_LEVEL,
  IPC_CHANNELS.VERSIONS_UPDATED,
  IPC_CHANNELS.ALL_VERSION_INFO,
  IPC_CHANNELS.GET_URLS,
  IPC_CHANNELS.GET_LEVELS,
  IPC_CHANNELS.GET_NEWS,
  IPC_CHANNELS.DIRECTORY_SELECTED,
  IPC_CHANNELS.GET_SETTINGS,
  IPC_CHANNELS.SET_SETTINGS,
];

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel: IpcChannel, data?: any) => {
    if (validSendChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: IpcChannel, func: (...args: any[]) => void) => {
    if (validReceiveChannels.includes(channel)) {
      ipcRenderer.on(channel, (_event, ...args) => func(...args));
    }
  },
  receiveOnce: (channel: IpcChannel, func: (...args: any[]) => void) => {
    if (validReceiveChannels.includes(channel)) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    }
  },
  removeAllListeners: (channel: IpcChannel) => {
    if (validReceiveChannels.includes(channel)) {
      ipcRenderer.removeAllListeners(channel);
    }
  },
  openExternal: (url: string) => {
    if (typeof shell?.openExternal === 'function') {
      shell.openExternal(url);
    }
  },
  platform: process.platform,
});
