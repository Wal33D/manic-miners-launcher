import { useState, useEffect } from 'react';
import type { ImagesResponse, Assets } from '@/types/api';
import { ENV, getApiUrl } from '@/config/environment';

const SERVER_BASE_URL = ENV.API_BASE_URL;
let cachedAssets: Assets | null = null;

/**
 * Custom hook for managing and caching asset URLs from the API
 * Provides a centralized way to access all image and media assets
 *
 * @returns {Object} Hook return object
 * @returns {Object} returns.assets - Map of asset names to URLs
 * @returns {Function} returns.getAssetUrl - Function to get URL for a specific asset
 * @returns {boolean} returns.loading - Loading state
 * @returns {string|null} returns.error - Error message if asset loading fails
 */
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
        const response = await fetch(getApiUrl('/api/images'));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Create asset mapping from images API
        const processedAssets: Assets = {};

        // Map each image to its cloudinary URL or internal URL
        for (const [filename, imageData] of Object.entries(data.images)) {
          processedAssets[filename] = (imageData as any).cloudinaryUrl || (imageData as any).internalUrl;
        }

        // Add mappings for common asset names that might not match exactly
        const assetMappings = {
          'manic-miners.png': 'manic-miners-basic.png',
          'manic-miners-alt.png': 'manic-miners-alt-icon.png',
          'manic-miners.ico': 'manic-miners-basic.ico',
          'manic-miners-alt.ico': 'manic-miners-alt-icon.ico',
          'manic-miners-lms.png': 'manic-miners-level-editor.png',
          'manic-miners-supportstation.png': 'manic-miners-combat.png',
          'manic-miners-teleportstation.png': 'manic-miners-combat.png',
          'manic-miners-toolstore.png': 'manic-miners-combat.png',
        };

        // Apply mappings
        for (const [alias, actualName] of Object.entries(assetMappings)) {
          if (data.images[actualName]) {
            processedAssets[alias] = (data.images[actualName] as any).cloudinaryUrl || (data.images[actualName] as any).internalUrl;
          }
        }

        cachedAssets = processedAssets;
        setAssets(processedAssets);
      } catch (err) {
        console.error('Failed to fetch assets:', err);
        setError(err instanceof Error ? err.message : 'Failed to load assets');

        // Create fallback with direct endpoint URLs
        const fallbackAssets: Assets = {
          'manic-miners-background.jpg': `${SERVER_BASE_URL}/images/manic-miners-background.jpg`,
          'manic-miners.png': `${SERVER_BASE_URL}/images/manic-miners-basic.png`,
          'manic-miners-lms.png': `${SERVER_BASE_URL}/images/manic-miners-level-editor.png`,
          'manic-miners-supportstation.png': `${SERVER_BASE_URL}/images/manic-miners-combat.png`,
          'manic-miners-teleportstation.png': `${SERVER_BASE_URL}/images/manic-miners-combat.png`,
          'manic-miners-toolstore.png': `${SERVER_BASE_URL}/images/manic-miners-combat.png`,
          'manic-miners-cover-image.png': `${SERVER_BASE_URL}/images/manic-miners-cover-image.png`,
          'manic-miners-alt.png': `${SERVER_BASE_URL}/images/manic-miners-alt-icon.png`,
          'manic-miners-favicon.ico': `${SERVER_BASE_URL}/images/manic-miners-basic.ico`,
          'manic-miners.ico': `${SERVER_BASE_URL}/images/manic-miners-basic.ico`,
          'manic-miners-alt.ico': `${SERVER_BASE_URL}/images/manic-miners-alt-icon.ico`,
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

  /**
   * Gets the URL for a specific asset by name
   * Falls back to direct endpoint URL if asset not found in cache
   *
   * @param {string} assetName - Name of the asset file
   * @returns {string} URL for the asset
   */
  const getAssetUrl = (assetName: string): string => {
    // Always use the fetched or fallback assets
    if (assets[assetName]) {
      return assets[assetName];
    }

    // Direct fallback to endpoint URL
    return `${SERVER_BASE_URL}/images/${assetName}`;
  };

  return { assets, getAssetUrl, loading, error };
}
