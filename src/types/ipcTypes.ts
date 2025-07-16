import { IPC_CHANNELS } from '../main/ipcHandlers/ipcChannels';
import { ProgressStatus, DownloadResult, VerificationProgress, VerificationResult, DeleteProgress } from '../../shared-types/ipc';
import { Version } from '../api/versionTypes';
import { LauncherSettings } from './launcherSettings';

// Define the data types for each IPC channel
export interface IpcChannelDataMap {
  // Game operations
  'launch-game': string; // version identifier
  'download-version': { version: string; downloadPath: string };
  'delete-version': string; // version identifier
  'repair-version': string; // version identifier

  // Version updates
  'update-latest-version': void;
  'request-installed-versions': void;
  'request-all-versions': void;

  // Settings
  'get-settings': void;
  'save-settings': LauncherSettings;
  'select-directory': { title: string; defaultPath?: string };

  // Window controls
  'window-minimize': void;
  'window-maximize': void;
  'window-close': void;

  // External operations
  'open-external-url': string; // URL
  'play-sound': string; // sound name
  'show-game-folder': string; // version identifier
  'create-shortcuts': string; // version identifier

  // Legacy (for backward compatibility)
  'set-selected-version': Version;
  'get-selected-version': void;
  'request-version-information': void;

  // Logging
  'get-log-file-path': void;
  'log-to-file': { level: string; category: string; message: string; data?: unknown };
}

// Define the response types for each IPC channel
export interface IpcChannelResponseMap {
  // Progress channels
  'download-progress': ProgressStatus;
  'delete-progress': DeleteProgress;
  'update-progress': ProgressStatus;
  'repair-progress': VerificationProgress;
  'create-shortcuts-progress': { status: string; progress: number };

  // Result channels
  'download-version': DownloadResult;
  'delete-version': { success: boolean; message: string };
  'repair-version': VerificationResult;
  'launch-game-result': { success: boolean; message: string };

  // Data channels
  'selected-directory': string | null;
  'installed-versions': { installedVersions: Version[]; currentVersion: Version | null };
  'all-versions': { allVersions: Version[]; installedVersions: Version[]; currentVersion: Version | null };
  settings: LauncherSettings;

  // Update notifications
  'update-available': void;
  'update-not-available': void;
  'update-error': { error: string };
  'versions-updated': void;

  // Legacy responses
  'set-selected-version': Version | null;
  'get-selected-version': Version | null;
  'request-version-information': { allVersions: Version[]; installedVersions: Version[]; currentVersion: Version | null };
}

// Type helper for getting the data type for a channel
export type IpcChannelData<T extends keyof IpcChannelDataMap> = IpcChannelDataMap[T];

// Type helper for getting the response type for a channel
export type IpcChannelResponse<T extends keyof IpcChannelResponseMap> = IpcChannelResponseMap[T];

// Typed IPC handler function
export type IpcHandler<T extends keyof IpcChannelDataMap> = (event: Electron.IpcMainEvent, data: IpcChannelData<T>) => void | Promise<void>;

// Typed IPC invoke handler function
export type IpcInvokeHandler<T extends keyof IpcChannelDataMap, R = any> = (
  event: Electron.IpcMainInvokeEvent,
  data: IpcChannelData<T>
) => R | Promise<R>;
