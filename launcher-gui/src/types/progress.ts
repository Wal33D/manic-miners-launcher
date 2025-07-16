import { ProgressStatus } from '../../../shared-types';

/**
 * Progress data structure for download operations
 * Extends the shared ProgressStatus with version field
 */
export interface ProgressData extends ProgressStatus {
  version?: string;
}

/**
 * Download progress specific data
 */
export interface DownloadProgressData extends ProgressData {
  type: 'download';
  fileSize?: string;
  speed?: string;
  eta?: string;
}

/**
 * Delete progress specific data
 */
export interface DeleteProgressData extends ProgressData {
  type: 'delete';
}

/**
 * Verify/repair progress specific data
 */
export interface VerifyProgressData extends ProgressData {
  type: 'verify' | 'repair';
}

/**
 * Shortcut creation progress data
 */
export interface ShortcutProgressData extends ProgressData {
  type: 'shortcuts';
  options?: {
    createExeShortcut?: boolean;
    createDirShortcut?: boolean;
  };
}

/**
 * Union type for all progress data types
 */
export type AnyProgressData = DownloadProgressData | DeleteProgressData | VerifyProgressData | ShortcutProgressData;
