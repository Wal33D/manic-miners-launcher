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
export type VersionSelectionType = 'all' | 'latest' | 'past' | 'experimental' | 'archived';

export interface Versions {
  versions: Version[];
}
