/**
 * Progress data structure for download operations
 */
export interface ProgressData {
  progress?: number;
  status?: string;
  fileName?: string;
  totalSize?: number;
  speedBytesPerSec?: number;
  etaSeconds?: number;
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
export type AnyProgressData = 
  | DownloadProgressData 
  | DeleteProgressData 
  | VerifyProgressData 
  | ShortcutProgressData;