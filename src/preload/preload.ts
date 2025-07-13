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
  IPC_CHANNELS.GET_SETTINGS,
  IPC_CHANNELS.SET_SETTINGS,
  IPC_CHANNELS.WINDOW_MINIMIZE,
  IPC_CHANNELS.WINDOW_EXIT,
  IPC_CHANNELS.OPEN_DIRECTORY_DIALOG,
  IPC_CHANNELS.VERIFY_VERSION,
  IPC_CHANNELS.DELETE_VERSION,
  IPC_CHANNELS.REPAIR_VERSION,
  IPC_CHANNELS.DOWNLOAD_LATEST,
];

const validReceiveChannels: IpcChannel[] = [
  IPC_CHANNELS.GET_DIRECTORIES,
  IPC_CHANNELS.LAUNCH_GAME,
  IPC_CHANNELS.DOWNLOAD_PROGRESS,
  IPC_CHANNELS.DOWNLOAD_VERSION,
  IPC_CHANNELS.VERSIONS_UPDATED,
  IPC_CHANNELS.ALL_VERSION_INFO,
  IPC_CHANNELS.GET_URLS,
  IPC_CHANNELS.DIRECTORY_SELECTED,
  IPC_CHANNELS.GET_SETTINGS,
  IPC_CHANNELS.SET_SETTINGS,
  IPC_CHANNELS.VERIFY_VERSION,
  IPC_CHANNELS.DELETE_VERSION,
  IPC_CHANNELS.REPAIR_VERSION,
  IPC_CHANNELS.DOWNLOAD_LATEST,
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
