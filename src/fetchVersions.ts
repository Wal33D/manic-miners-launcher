// Interface for each version item
interface Version {
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

// Interface for the complete response from 'versions' routes
interface Versions {
  versions: Version[];
}

import { fetchServerData } from './fetchServerData';

type SimpleVersionType = 'all' | 'latest' | 'past' | 'experimental';

// Function to fetch versions based on a simplified version type
export async function fetchVersions({
  versionType = 'all',
}: {
  versionType?: SimpleVersionType;
}): Promise<Versions> {
  // Format the route name by prepending 'versions.' to the versionType
  const formattedVersionType = `versions.${versionType}`;

  // Call fetchServerData with the formatted version type and map the response to our VersionsResponse type
  const { data, status, message } = await fetchServerData({
    routeName: formattedVersionType,
  });

  if (!status) {
    throw new Error(message);
  }

  return { versions: data.versions as Version[] }; // Type assertion used here for simplicity
}
