// Use the ElectronAPI type from global.d.ts
import type { ElectronAPI } from '../../../../global';

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
