// In custom.d.ts
declare module '*.partial_html' {
  const content: string;
  export default content;
}


export type IpcChannel =
  | 'launch-game'
  | 'versions-updated'
  | 'request-version-information'
  | 'set-selected-version'
  | 'get-selected-version'
  | 'check-version-installed'
  | 'select-install-directory'
  | 'download-version'
  | 'download-status'
  | 'download-progress'
  | 'get-directories'
  | 'play-sound'
  | 'get-urls'
  | 'get-levels'
  | 'open-directory-dialog'
  | 'directory-selected';

export interface ElectronAPI {
  send: (channel: IpcChannel, data?: unknown) => void;
  receive: (channel: IpcChannel, func: (...args: unknown[]) => void) => void;
  receiveOnce: (channel: IpcChannel, func: (...args: unknown[]) => void) => void;
  removeAllListeners: (channel: IpcChannel) => void;
  openExternal: (url: string) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
