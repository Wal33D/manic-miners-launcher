import { stat } from 'fs/promises';
import { promises as fs } from 'fs';
import { getDirectories } from '../functions/fetchDirectories';
import { default as fetch } from 'node-fetch';

const SERVER_BASE_URL = process.env.SERVER_BASE_URL ||
  'https://manic-launcher.vercel.app';

interface Endpoint {
  name: string;
  endpoint: string;
}

export async function fetchServerEndpoints({
  routeName,
}: {
  routeName?: string;
}): Promise<{ status: boolean; message: string; data?: Endpoint | Endpoint[] }> {
  let message = '';
  let data: Endpoint[] = [];

  try {
    const { status: dirStatus, message: dirMessage, directories } = await getDirectories();
    if (!dirStatus) {
      throw new Error(`Directory fetch failed: ${dirMessage}`);
    }
    const launcherCachePath = directories.launcherCachePath;
    const cacheFilePath = `${launcherCachePath}/endpoints.json`;

    try {
      const stats = await stat(cacheFilePath);
      const lastModified = new Date(stats.mtime).getTime();
      const now = Date.now();
      const twentyMinutes = 20 * 60 * 1000; // Fixed to 20 minutes as per typical definition

      if (now - lastModified > twentyMinutes) {
        throw new Error('Cache expired'); // Trigger fetch from API
      }

      // Try to read from cache
      const cachedData = await fs.readFile(cacheFilePath, 'utf8');
      data = JSON.parse(cachedData);
    } catch (error) {
      // If reading fails or cache is expired, fetch from API and cache the result
      const routesResponse = await fetch(`${SERVER_BASE_URL}/api/routes`);
      if (!routesResponse.ok) {
        throw new Error(`Failed to fetch endpoints. Status: ${routesResponse.status}`);
      }
      const routesData = await routesResponse.json();
      data = Object.keys(routesData).map(key => ({
        name: key,
        endpoint: routesData[key],
      }));

      // Cache the endpoints data
      await fs.writeFile(cacheFilePath, JSON.stringify(data), 'utf8');
    }

    // Validate if the requested route exists and return just that endpoint
    if (routeName) {
      const matchedEndpoint = data.find(e => e.name === routeName);
      if (!matchedEndpoint) {
        throw new Error(`Route not found: ${routeName}`);
      }
      return { status: true, message: 'Endpoint found successfully', data: matchedEndpoint };
    }

    return { status: true, message: 'Endpoints fetched successfully', data };
  } catch (error: any) {
    message = `Error fetching server endpoints: ${error.message}`;
    return { status: false, message };
  }
}
