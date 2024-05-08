import fetch from 'node-fetch';

interface VersionInfo {
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

interface FetchVersionsResponse {
  status: boolean;
  versions?: VersionInfo[];
  message: string;
}

export const fetchVersions = async (): Promise<FetchVersionsResponse> => {
  let message = 'Failed to fetch versions.';
  let status = false;
  let versions: VersionInfo[] = [];

  try {
    const response = await fetch(
      'https://manic-launcher.vercel.app/api/versions/all'
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    if (data && data.versions) {
      versions = data.versions;
      status = true;
      message = 'Versions fetched successfully.';
    } else {
      message = 'No versions data found.';
    }
  } catch (error: any) {
    message = `Error: ${error.message}`;
  }

  return { status, versions, message };
};
