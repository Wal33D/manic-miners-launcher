// Centralized interfaces and types for the Manic Miners Launcher

// API related types
export interface Endpoint {
  name: string;
  endpoint: string;
}

export interface FetchResult {
  status: boolean;
  data?: any;
  message: string;
}

export interface Version {
  directory: string | null;
  gameId: number;
  title: string;
  displayName: string;
  experimental: boolean;
  latest: boolean;
  identifier: string;
  version: string;
  releaseDate: string;
  filename: string;
  type: string;
  md5Hash: string;
  size: string;
  sizeInBytes: number;
  downloadUrl: string;
  coverImage: string;
  thumbnailUrl: string;
  detailsUrl: string;
  description: string;
}

export type VersionSelectionType = 'all' | 'latest' | 'past' | 'experimental';

export interface Versions {
  versions: Version[];
}

export interface Urls {
  Website: string;
  Discord: string;
  Reddit: string;
  YouTube: string;
  Facebook: string;
  FAQ: string;
}

export interface Level {
  title: string;
  identifier: string;
  creator: string;
  date: string;
  downloadCount: number;
  description: string;
  detailsUrl: string;
  downloadUrl: string;
  xmlFileUrl: string;
}

export interface LevelsResponse {
  count: number;
  levels: Level[];
}

// Directory related
export interface Directories {
  launcherInstallPath: string;
  launcherCachePath: string;
  launcherLogsPath: string;
  levelsPath: string;
  levelsBackupPath: string;
  logsPath: string;
  configPath: string;
  configIniPath: string;
  saveGamesPath: string;
  LRRPath: string;
  profilesPath: string;
  minersPath: string;
  backupSavesPath: string;
}

// Settings and IPC related
export interface LauncherSettings {
  playSoundOnInstall: boolean;
  autoLaunchAfterInstall: boolean;
  darkMode: boolean;
}

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

// File utilities
export interface IVerifyFileParams {
  filePath: string;
  expectedSize?: number;
}

export interface IFileDetails {
  exists: boolean;
  size: number;
  sizeMatches?: boolean;
  name: string;
  extension: string;
  pathRelative: string;
  pathFull: string;
  isFile: boolean;
  isDirectory: boolean;
  isSymbolicLink: boolean;
  permissions: string;
  accessedAt: number;
  updatedAt: number;
  createdAt: number;
}
