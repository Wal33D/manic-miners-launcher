import { Version } from '../api/versionTypes';

export interface ProgressStatus {
  progress?: number;
  status?: string;
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
