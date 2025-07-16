import { ENV, getApiUrl } from '@/config/environment';
import { logger } from '@/utils/frontendLogger';
import { apiCache, cacheKeys } from './apiCache';
import type { UrlData, NewsItem, NewsResponse, CommentsResponse, VideosResponse, VersionsResponse, ImagesResponse } from '@/types/api';

/**
 * Base API error class
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public endpoint: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Generic fetch wrapper with error handling and logging
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = getApiUrl(endpoint);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        // Add CORS headers for development
        ...(process.env.NODE_ENV === 'development' && {
          'Access-Control-Allow-Origin': '*',
        }),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, `API request failed: ${response.statusText}`, endpoint);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error('API', `API Error: ${error.message}`, {
        status: error.status,
        endpoint: error.endpoint,
      });
      throw error;
    }

    logger.error('API', 'Network error', { endpoint, error });
    throw new ApiError(0, 'Network error - please check your connection', endpoint);
  }
}

/**
 * API Service - Centralized API calls with caching
 */
export const api = {
  /**
   * Fetch social media URLs (cached for 20 minutes)
   */
  async getUrls(): Promise<UrlData> {
    return apiCache.get(
      cacheKeys.urls(),
      () => apiFetch<UrlData>(ENV.API_ENDPOINTS.URLS),
      20 * 60 * 1000 // 20 minutes
    );
  },

  /**
   * Fetch news items (cached for 5 minutes)
   */
  async getNews(): Promise<NewsResponse | NewsItem[]> {
    return apiCache.get(
      cacheKeys.news(),
      () => apiFetch<NewsResponse | NewsItem[]>(ENV.API_ENDPOINTS.NEWS),
      5 * 60 * 1000 // 5 minutes
    );
  },

  /**
   * Fetch comments (cached for 2 minutes)
   */
  async getComments(): Promise<CommentsResponse> {
    return apiCache.get(
      cacheKeys.comments(),
      () => apiFetch<CommentsResponse>(ENV.API_ENDPOINTS.COMMENTS),
      2 * 60 * 1000 // 2 minutes
    );
  },

  /**
   * Fetch levels (cached for 10 minutes)
   */
  async getLevels(): Promise<any[]> {
    return apiCache.get(
      cacheKeys.levels(),
      () => apiFetch<any[]>(ENV.API_ENDPOINTS.LEVELS),
      10 * 60 * 1000 // 10 minutes
    );
  },

  /**
   * Fetch videos (cached for 15 minutes)
   */
  async getVideos(): Promise<VideosResponse> {
    return apiCache.get(
      cacheKeys.videos(),
      () => apiFetch<VideosResponse>(ENV.API_ENDPOINTS.VIDEOS),
      15 * 60 * 1000 // 15 minutes
    );
  },

  /**
   * Fetch archived versions (cached for 5 minutes)
   */
  async getArchivedVersions(): Promise<VersionsResponse> {
    return apiCache.get(
      cacheKeys.versions('archived'),
      () => apiFetch<VersionsResponse>(ENV.API_ENDPOINTS.VERSIONS_ARCHIVED),
      5 * 60 * 1000 // 5 minutes
    );
  },

  /**
   * Fetch images/assets (cached for 15 minutes)
   */
  async getImages(): Promise<ImagesResponse> {
    return apiCache.get(
      cacheKeys.images(),
      () => apiFetch<ImagesResponse>('/api/images'),
      15 * 60 * 1000 // 15 minutes
    );
  },

  /**
   * Cache management utilities
   */
  cache: {
    /**
     * Invalidate specific cache entries
     */
    invalidate: (key: string) => apiCache.invalidate(key),

    /**
     * Invalidate all news-related cache
     */
    invalidateNews: () => apiCache.invalidatePattern(/^api:news/),

    /**
     * Invalidate all version-related cache
     */
    invalidateVersions: () => apiCache.invalidatePattern(/^api:versions/),

    /**
     * Clear all API cache
     */
    clear: () => apiCache.clear(),

    /**
     * Get cache statistics
     */
    getStats: () => apiCache.getStats(),
  },
};
