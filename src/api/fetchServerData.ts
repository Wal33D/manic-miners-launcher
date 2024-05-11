import { stat } from 'fs/promises';
import { promises as fs } from 'fs';
import { getDirectories } from '../functions/fetchDirectories';
import { default as fetch } from 'node-fetch';
import { fetchServerEndpoints } from './fetchServerEndpoints';

interface FetchResult {
  status: boolean;
  data?: any;
  message: string;
}

export async function fetchServerData({ routeName = 'launcher.all' }: { routeName?: string }): Promise<FetchResult> {
  const { launcherCachePath } = getDirectories();
  const cacheFilePath = `${launcherCachePath}/${routeName}.json`;

  let message = 'Failed to fetch data.';
  let status = false;
  let data: any;

  try {
    // Check cache first
    try {
      const stats = await stat(cacheFilePath);
      const now = Date.now();
      const cacheAge = now - new Date(stats.mtime).getTime();
      const cacheExpiration = 20 * 60 * 1000; // 20 minutes in milliseconds

      if (cacheAge < cacheExpiration) {
        const cachedData = await fs.readFile(cacheFilePath, 'utf8');
        return JSON.parse(cachedData);
      }
    } catch (cacheError) {
      // Cache not found or expired, fetch from server
    }

    // Fetching the endpoint, expecting a single Endpoint back
    const endpoint = await fetchServerEndpoints({ routeName });

    // If 'fetchServerEndpoints' can return an array, ensure we handle it:
    if (!endpoint || Array.isArray(endpoint)) {
      throw new Error('Expected a single endpoint, but received none or multiple.');
    }

    // Fetch data from the selected endpoint
    const response = await fetch(`https://manic-launcher.vercel.app${endpoint.endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    data = await response.json();
    status = true;
    message = 'Data fetched successfully.';

    // Cache the fetched data
    await fs.writeFile(cacheFilePath, JSON.stringify({ status, data, message }), 'utf8');
  } catch (error) {
    message = `Error: ${error.message}`;
  }

  return { status, data, message };
}
