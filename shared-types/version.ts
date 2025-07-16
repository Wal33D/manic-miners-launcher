export interface Version {
  // Required fields
  gameId: number;
  title: string;
  displayName: string;
  identifier: string;
  experimental: boolean;
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

  // Optional fields - for installed versions
  directory?: string | null;
  latest?: boolean;
  executablePath?: string;
  installationSize?: number;

  // Optional fields - for display
  screenshots?: string[];
  changelog?: string;
}

export interface VersionsResponse {
  versions: Version[];
}
