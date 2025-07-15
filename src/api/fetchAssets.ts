import { fetchServerData } from './fetchServerData';
import { logger } from '../utils/logger';

export interface Assets {
  [key: string]: string;
}

export interface AssetsResponse {
  assets: Assets;
}

const SERVER_BASE_URL =
  typeof process !== 'undefined' && process.env?.SERVER_BASE_URL ? process.env.SERVER_BASE_URL : 'https://manic-launcher.vercel.app';

let cachedAssets: Assets | null = null;

export async function fetchAssets(): Promise<Assets> {
  if (cachedAssets) {
    return cachedAssets;
  }

  try {
    const result = await fetchServerData({ routeName: 'assets' });

    if (!result.status || !result.data) {
      throw new Error('Failed to fetch assets from server');
    }

    const assetsData = result.data as AssetsResponse;

    if (!assetsData.assets) {
      throw new Error('Invalid assets response format');
    }

    // Convert relative paths to absolute URLs
    const processedAssets: Assets = {};
    for (const [key, value] of Object.entries(assetsData.assets)) {
      processedAssets[key] = `${SERVER_BASE_URL}${value}`;
    }

    cachedAssets = processedAssets;
    logger.info('ASSETS', 'Assets fetched successfully', {
      assetCount: Object.keys(processedAssets).length,
    });

    return processedAssets;
  } catch (error) {
    logger.error('ASSETS', 'Failed to fetch assets', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    // Return empty assets object on error
    return {};
  }
}

export function getAssetUrl(assetName: string): string {
  if (cachedAssets && cachedAssets[assetName]) {
    return cachedAssets[assetName];
  }

  // Fallback to local assets if not loaded from server
  return `/assets/${assetName}`;
}
