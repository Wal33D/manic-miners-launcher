import { useState, useEffect } from 'react';

interface Assets {
  [key: string]: string;
}

const SERVER_BASE_URL = 'https://manic-launcher.vercel.app';
let cachedAssets: Assets | null = null;

export function useAssets() {
  const [assets, setAssets] = useState<Assets>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAssets() {
      if (cachedAssets) {
        setAssets(cachedAssets);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${SERVER_BASE_URL}/api/assets`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.assets) {
          throw new Error('Invalid assets response format');
        }

        // Convert relative paths to absolute URLs
        const processedAssets: Assets = {};
        for (const [key, value] of Object.entries(data.assets)) {
          processedAssets[key] = `${SERVER_BASE_URL}${value}`;
        }

        cachedAssets = processedAssets;
        setAssets(processedAssets);
      } catch (err) {
        console.error('Failed to fetch assets:', err);
        setError(err instanceof Error ? err.message : 'Failed to load assets');

        // Fallback to local assets
        setAssets({});
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  const getAssetUrl = (assetName: string): string => {
    // Try to get from fetched assets first
    if (assets[assetName]) {
      return assets[assetName];
    }

    // Fallback to local assets
    return `/assets/${assetName.replace('/assets/', '')}`;
  };

  return { assets, getAssetUrl, loading, error };
}
