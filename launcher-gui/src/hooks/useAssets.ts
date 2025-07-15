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

        // Create fallback with direct endpoint URLs
        const fallbackAssets: Assets = {
          'manic-miners-background.jpg': `${SERVER_BASE_URL}/manic-miners-background.jpg`,
          'manic-miners.png': `${SERVER_BASE_URL}/manic-miners.png`,
          'manic-miners-lms.png': `${SERVER_BASE_URL}/manic-miners-lms.png`,
          'manic-miners-supportstation.png': `${SERVER_BASE_URL}/manic-miners-supportstation.png`,
          'manic-miners-teleportstation.png': `${SERVER_BASE_URL}/manic-miners-teleportstation.png`,
          'manic-miners-toolstore.png': `${SERVER_BASE_URL}/manic-miners-toolstore.png`,
          'manic-miners-cover-image.png': `${SERVER_BASE_URL}/manic-miners-cover-image.png`,
          'manic-miners-alt.png': `${SERVER_BASE_URL}/manic-miners-alt.png`,
          'manic-miners-favicon.ico': `${SERVER_BASE_URL}/manic-miners-favicon.ico`,
          'manic-miners.ico': `${SERVER_BASE_URL}/manic-miners.ico`,
          'manic-miners-alt.ico': `${SERVER_BASE_URL}/manic-miners-alt.ico`,
          'intro-video.mp4': `${SERVER_BASE_URL}/intro-video.mp4`,
          'success.mp3': `${SERVER_BASE_URL}/success.mp3`,
        };
        setAssets(fallbackAssets);
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  const getAssetUrl = (assetName: string): string => {
    // Always use the fetched or fallback assets
    if (assets[assetName]) {
      return assets[assetName];
    }

    // Direct fallback to endpoint URL
    return `${SERVER_BASE_URL}/${assetName}`;
  };

  return { assets, getAssetUrl, loading, error };
}
