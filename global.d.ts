import { IPC_CHANNELS } from './src/main/ipcHandlers/ipcChannels';

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];

export interface ElectronAPI {
  send: (channel: IpcChannel, data?: unknown) => void;
  receive: (channel: IpcChannel, func: (...args: unknown[]) => void) => void;
  receiveOnce: (channel: IpcChannel, func: (...args: unknown[]) => void) => void;
  removeAllListeners: (channel: IpcChannel) => void;
  openExternal: (url: string) => void;
  platform: NodeJS.Platform;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
