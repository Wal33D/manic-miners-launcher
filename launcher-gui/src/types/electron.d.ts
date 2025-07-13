declare global {
  interface Window {
    electronAPI?: {
      send: (channel: string, data?: any) => void;
      receive: (channel: string, func: (data: any) => void) => void;
      receiveOnce: (channel: string, func: (data: any) => void) => void;
      removeAllListeners: (channel: string) => void;
    };
  }
}

export {};