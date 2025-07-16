import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '../main/ipcHandlers/ipcChannels';
import { validateIpcData, isValidExternalUrl } from '../utils/ipcValidation';

type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];

const validSendChannels: IpcChannel[] = [
  IPC_CHANNELS.GET_DIRECTORIES,
  IPC_CHANNELS.LAUNCH_GAME,
  IPC_CHANNELS.DOWNLOAD_VERSION,
  IPC_CHANNELS.PLAY_SOUND,
  IPC_CHANNELS.ALL_VERSION_INFO,
  IPC_CHANNELS.ARCHIVED_VERSIONS_INFO,
  IPC_CHANNELS.LATEST_VERSION_INFO,
  IPC_CHANNELS.SET_SELECTED_VERSION,
  IPC_CHANNELS.GET_SELECTED_VERSION,
  IPC_CHANNELS.SET_SELECTED_ARCHIVED_VERSION,
  IPC_CHANNELS.GET_SELECTED_ARCHIVED_VERSION,
  IPC_CHANNELS.GET_URLS,
  IPC_CHANNELS.GET_SETTINGS,
  IPC_CHANNELS.SET_SETTINGS,
  IPC_CHANNELS.WINDOW_MINIMIZE,
  IPC_CHANNELS.WINDOW_EXIT,
  IPC_CHANNELS.OPEN_DIRECTORY_DIALOG,
  IPC_CHANNELS.VERIFY_VERSION,
  IPC_CHANNELS.DELETE_VERSION,
  IPC_CHANNELS.REPAIR_VERSION,
  IPC_CHANNELS.OPEN_EXTERNAL_URL, // Add new channel for opening external URLs
  IPC_CHANNELS.DOWNLOAD_LATEST_VERSION, // Add new channel for itch.io downloads
  IPC_CHANNELS.VERIFY_AND_REPAIR_INSTALLATION, // Add new channel for verification and repair
  IPC_CHANNELS.DELETE_LATEST_VERSION, // Add new channel for deleting latest version
  IPC_CHANNELS.UPDATE_LATEST_VERSION, // Add new channel for updating latest version
  IPC_CHANNELS.CREATE_SHORTCUTS, // Add new channel for creating shortcuts
  IPC_CHANNELS.FRONTEND_LOG, // Add new channel for frontend logging
];

const validReceiveChannels: IpcChannel[] = [
  IPC_CHANNELS.GET_DIRECTORIES,
  IPC_CHANNELS.LAUNCH_GAME,
  IPC_CHANNELS.DOWNLOAD_PROGRESS,
  IPC_CHANNELS.DOWNLOAD_VERSION,
  IPC_CHANNELS.VERSIONS_UPDATED,
  IPC_CHANNELS.ALL_VERSION_INFO,
  IPC_CHANNELS.ARCHIVED_VERSIONS_INFO,
  IPC_CHANNELS.LATEST_VERSION_INFO,
  IPC_CHANNELS.GET_SELECTED_VERSION,
  IPC_CHANNELS.GET_SELECTED_ARCHIVED_VERSION,
  IPC_CHANNELS.GET_URLS,
  IPC_CHANNELS.DIRECTORY_SELECTED,
  IPC_CHANNELS.GET_SETTINGS,
  IPC_CHANNELS.SET_SETTINGS,
  IPC_CHANNELS.VERIFY_VERSION,
  IPC_CHANNELS.DELETE_VERSION,
  IPC_CHANNELS.REPAIR_VERSION,
  IPC_CHANNELS.DOWNLOAD_LATEST_PROGRESS, // Add new channel for itch.io download progress
  IPC_CHANNELS.VERIFY_REPAIR_PROGRESS, // Add new channel for verification progress
  IPC_CHANNELS.DELETE_LATEST_PROGRESS, // Add new channel for uninstall progress
  IPC_CHANNELS.UPDATE_PROGRESS, // Add new channel for update progress
  IPC_CHANNELS.UPDATE_ERROR, // Add new channel for update errors
  IPC_CHANNELS.VERSIONS_UPDATED, // Add channel for version updates
  IPC_CHANNELS.CREATE_SHORTCUTS_PROGRESS, // Add new channel for shortcut creation progress
];

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel: IpcChannel, data?: any) => {
    if (!validSendChannels.includes(channel)) {
      console.error('Invalid IPC channel:', channel);
      return;
    }

    // Validate data if validation exists for this channel
    const validation = validateIpcData(channel, data);
    if (!validation.isValid) {
      console.error('Invalid IPC data for channel', channel, ':', validation.error);
      return;
    }

    ipcRenderer.send(channel, validation.data || data);
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
    // Validate URL before sending to main process
    if (!isValidExternalUrl(url)) {
      console.error('Invalid or unsafe URL:', url);
      return;
    }

    // Opening external URL via IPC to main process
    // Always use IPC since shell is not available in preload context
    ipcRenderer.send(IPC_CHANNELS.OPEN_EXTERNAL_URL, url);
  },
  platform: process.platform,
});
