import { Version } from '../api/versionTypes';

export interface ProgressStatus {
  progress?: number;
  status?: string;
  /** name of the file currently being downloaded */
  fileName?: string;
  /** total size of the file in bytes */
  totalSize?: number;
  /** current download speed in bytes per second */
  speedBytesPerSec?: number;
  /** estimated time remaining in seconds */
  etaSeconds?: number;
}

export interface DownloadResult {
  downloaded: boolean;
  message: string;
}

export interface VersionsResponse {
  versions?: Array<Version & { directory?: string }>;
  defaultVersion?: Version & { directory?: string };
  error?: string;
}
