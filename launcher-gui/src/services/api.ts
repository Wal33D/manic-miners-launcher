import { ENV, getApiUrl } from '@/config/environment';
import { logger } from '@/utils/frontendLogger';
import type { 
  UrlData, 
  NewsItem, 
  NewsResponse, 
  CommentsResponse, 
  VideosResponse, 
  VersionsResponse,
  ImagesResponse 
} from '@/types/api';

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
      throw new ApiError(
        response.status,
        `API request failed: ${response.statusText}`,
        endpoint
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error('API', `API Error: ${error.message}`, { 
        status: error.status, 
        endpoint: error.endpoint 
      });
      throw error;
    }
    
    logger.error('API', 'Network error', { endpoint, error });
    throw new ApiError(0, 'Network error - please check your connection', endpoint);
  }
}

/**
 * API Service - Centralized API calls
 */
export const api = {
  /**
   * Fetch social media URLs
   */
  async getUrls(): Promise<UrlData> {
    return apiFetch<UrlData>(ENV.API_ENDPOINTS.URLS);
  },

  /**
   * Fetch news items
   */
  async getNews(): Promise<NewsResponse | NewsItem[]> {
    return apiFetch<NewsResponse | NewsItem[]>(ENV.API_ENDPOINTS.NEWS);
  },

  /**
   * Fetch comments
   */
  async getComments(): Promise<CommentsResponse> {
    return apiFetch<CommentsResponse>(ENV.API_ENDPOINTS.COMMENTS);
  },

  /**
   * Fetch levels
   */
  async getLevels(): Promise<any[]> {
    return apiFetch<any[]>(ENV.API_ENDPOINTS.LEVELS);
  },

  /**
   * Fetch videos
   */
  async getVideos(): Promise<VideosResponse> {
    return apiFetch<VideosResponse>(ENV.API_ENDPOINTS.VIDEOS);
  },

  /**
   * Fetch archived versions
   */
  async getArchivedVersions(): Promise<VersionsResponse> {
    return apiFetch<VersionsResponse>(ENV.API_ENDPOINTS.VERSIONS_ARCHIVED);
  },

  /**
   * Fetch images/assets
   */
  async getImages(): Promise<ImagesResponse> {
    return apiFetch<ImagesResponse>('/api/images');
  },
};