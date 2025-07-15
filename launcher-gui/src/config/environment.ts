/**
 * Environment configuration for the Manic Miners launcher
 * Centralizes all external URLs and API endpoints
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const ENV = {
  // API Base URL - use proxy in development to avoid CORS issues
  API_BASE_URL: process.env.VITE_API_BASE_URL || (isDevelopment ? '' : 'https://manic-launcher.vercel.app'),
  
  // API Endpoints
  API_ENDPOINTS: {
    URLS: '/api/urls',
    NEWS: '/api/news',
    COMMENTS: '/api/comments',
    LEVELS: '/api/levels',
    VIDEOS: '/api/videos',
    VERSIONS_ARCHIVED: '/api/versions/archived',
  },
  
  // Feature flags
  FEATURES: {
    SHOW_DEBUG_INFO: isDevelopment,
    ENABLE_ANALYTICS: !isDevelopment,
  },
  
  // Timeouts and intervals (in milliseconds)
  TIMEOUTS: {
    API_REQUEST: 30000, // 30 seconds
    NOTIFICATION_AUTO_DISMISS: 5000, // 5 seconds
    RETRY_DELAY: 2000, // 2 seconds
    LONG_OPERATION: 120000, // 2 minutes
  },
  
  // Sizes
  SIZES: {
    MAX_LOG_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MIN_TOUCH_TARGET: 44, // 44px minimum for accessibility
  },
  
  // Cache durations (in milliseconds)
  CACHE: {
    ASSETS: 20 * 60 * 1000, // 20 minutes
    API_DATA: 5 * 60 * 1000, // 5 minutes
  }
} as const;

/**
 * Helper function to get full API URL
 */
export function getApiUrl(endpoint: string): string {
  return `${ENV.API_BASE_URL}${endpoint}`;
}