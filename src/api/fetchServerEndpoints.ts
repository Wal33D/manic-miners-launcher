import { stat } from 'fs/promises';
import { promises as fs } from 'fs';
import { getDirectories } from './getDirectories';
import { default as fetch } from 'node-fetch';

interface Endpoint {
  name: string;
  endpoint: string;
}

export async function fetchServerEndpoints({ routeName }: { routeName?: string }): Promise<Endpoint | Endpoint[]> {
  const { launcherCachePath } = getDirectories();
  const cacheFilePath = `${launcherCachePath}/endpoints.json`;

  let endpoints: Endpoint[];
  try {
    const stats = await stat(cacheFilePath);
    const lastModified = new Date(stats.mtime).getTime();
    const now = Date.now();
    const twentyMinutes = 10 * 60 * 1000;

    if (now - lastModified > twentyMinutes) {
      throw new Error('Cache expired'); // Trigger fetch from API
    }

    // Try to read from cache
    const cachedData = await fs.readFile(cacheFilePath, 'utf8');
    endpoints = JSON.parse(cachedData);
  } catch (error) {
    // If reading fails or cache is expired, fetch from API and cache the result
    const routesResponse = await fetch('https://manic-launcher.vercel.app/api/routes');
    if (!routesResponse.ok) {
      throw new Error(`Failed to fetch endpoints. Status: ${routesResponse.status}`);
    }
    const routesData = await routesResponse.json();
    endpoints = Object.keys(routesData).map(key => ({
      name: key,
      endpoint: routesData[key],
    }));

    // Cache the endpoints data
    await fs.writeFile(cacheFilePath, JSON.stringify(endpoints), 'utf8');
  }

  // Validate if the requested route exists and return just that endpoint
  if (routeName) {
    const matchedEndpoint = endpoints.find(e => e.name === routeName);
    if (!matchedEndpoint) {
      throw new Error(`Route not found: ${routeName}`);
    }
    return matchedEndpoint;
  }

  return endpoints;
}
