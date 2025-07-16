// Common type definitions for tests

export interface Notification {
  id: string;
  type: 'info' | 'error' | 'warning' | 'success';
  title: string;
  message: string;
  persistent?: boolean;
  duration?: number;
  progress?: number;
  actions?: NotificationAction[];
  timestamp?: number;
  displayed?: boolean;
  priority?: number;
}

export interface NotificationAction {
  label: string;
  action: string;
  primary?: boolean;
  description?: string;
}

export interface ProgressEvent {
  progress: number;
  status: string;
  fileName?: string;
  error?: string;
}

export interface DownloadOptions {
  version: string;
  forceDownload?: boolean;
  downloadPath?: string;
}

export interface GameState {
  isInstalled: boolean;
  isDownloading: boolean;
  isLaunching: boolean;
  downloadProgress: number;
  downloadStatus: string;
  currentVersion: string | null;
}

export interface Operation {
  active: boolean;
  progress: number;
  status: string;
}

export interface ComponentState {
  props: Record<string, unknown>;
  state: Record<string, unknown>;
}

export interface IpcMainEvent {
  sender: {
    send: (channel: string, data: unknown) => void;
  };
}

export type IpcHandler = (event: IpcMainEvent, ...args: unknown[]) => void | Promise<unknown>;

export interface MockedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  mockResolvedValueOnce(value: any): this;
  mockRejectedValueOnce(value: any): this;
  mock: {
    results: Array<{ value: any }>;
  };
}

export type MockedFetch = MockedFunction<typeof fetch>;

export interface MockElectronAPI {
  send: (channel: string, ...args: unknown[]) => void;
  receive: (channel: string, callback: (...args: unknown[]) => void) => void;
  receiveOnce: (channel: string, callback: (...args: unknown[]) => void) => void;
  invoke?: (channel: string, ...args: unknown[]) => Promise<unknown>;
}

export interface ErrorEvent {
  error: string;
  type?: 'error' | 'warning';
  details?: unknown;
}
