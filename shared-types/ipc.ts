// Progress types
export interface ProgressStatus {
  status?: string;
  progress?: number;
  stage?: string;
  /** name of the file currently being downloaded */
  fileName?: string;
  /** total size of the file in bytes */
  totalSize?: number;
  /** current download speed in bytes per second */
  speedBytesPerSec?: number;
  /** estimated time remaining in seconds */
  etaSeconds?: number;
}

// Download types
export interface DownloadResult {
  downloaded: boolean;
  unpacked?: boolean;
  message: string;
}

// IPC message types
export interface IpcMessage<T = any> {
  channel: string;
  data: T;
}

// Verification types
export interface VerificationProgress {
  status: string;
  progress: number;
  filesVerified?: number;
  totalFiles?: number;
  currentFile?: string;
}

export interface VerificationResult {
  status: boolean;
  message: string;
  missingFiles?: string[];
  modifiedFiles?: string[];
}

// Delete progress types
export interface DeleteProgress {
  status: string;
  progress: number;
  deletedCount?: number;
  totalCount?: number;
}
