import { stat } from 'fs/promises';
import { promises as fs } from 'fs';
import { getDirectories } from '../functions/fetchDirectories';
import { fetchServerEndpoints } from './fetchServerEndpoints';
import { logger } from '../utils/logger';

const SERVER_BASE_URL =
  typeof process !== 'undefined' && process.env?.SERVER_BASE_URL ? process.env.SERVER_BASE_URL : 'https://manic-launcher.vercel.app';

const DEFAULT_FETCH_TIMEOUT_MS = 30000;
let FETCH_TIMEOUT_MS = DEFAULT_FETCH_TIMEOUT_MS;

if (process.env.FETCH_TIMEOUT_MS) {
  const parsedTimeout = parseInt(process.env.FETCH_TIMEOUT_MS, 10);
  if (Number.isNaN(parsedTimeout)) {
    const warningMessage = `Invalid FETCH_TIMEOUT_MS value "${process.env.FETCH_TIMEOUT_MS}". Falling back to default of ${DEFAULT_FETCH_TIMEOUT_MS}ms.`;
    logger.warn('CONFIG', 'Invalid FETCH_TIMEOUT_MS value', { 
      invalidValue: process.env.FETCH_TIMEOUT_MS, 
      defaultValue: DEFAULT_FETCH_TIMEOUT_MS,
      message: warningMessage 
    });
  } else {
    FETCH_TIMEOUT_MS = parsedTimeout;
  }
}

interface FetchResult {
  status: boolean;
  data?: any;
  message: string;
}

export async function fetchServerData({ routeName = 'launcher.all' }: { routeName?: string }): Promise<FetchResult> {
  let message = 'Failed to fetch data.';
  let status = false;
  let data: any;

  try {
    // Get directories asynchronously and safely extract the cache path
    const directoriesResult = await getDirectories();
    if (!directoriesResult.status) {
      throw new Error(`Failed to get directories: ${directoriesResult.message}`);
    }
    const launcherCachePath = directoriesResult.directories.launcherCachePath;
    const cacheFilePath = `${launcherCachePath}/${routeName}.json`;

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
    const endpointResult = await fetchServerEndpoints({ routeName });
    if (!endpointResult.status || !endpointResult.data || Array.isArray(endpointResult.data)) {
      throw new Error('Expected a single endpoint, but received none or multiple.');
    }

    // Fetch data from the selected endpoint with timeout
    const endpoint = endpointResult.data; // Safely extracted single endpoint data
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const response = await fetch(`${SERVER_BASE_URL}${endpoint.endpoint}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    data = await response.json();
    status = true;
    message = 'Data fetched successfully.';

    // Cache the fetched data
    await fs.writeFile(cacheFilePath, JSON.stringify({ status, data, message }), 'utf8');
  } catch (error) {
    const err = error as Error;
    if (err.name === 'AbortError') {
      message = `Request to ${routeName} timed out.`;
    } else {
      message = `Error: ${err.message}`;
    }
  }

  return { status, data, message };
}
