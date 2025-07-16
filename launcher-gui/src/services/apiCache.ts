/**
 * API Cache and Request Deduplication Service
 * Provides in-memory caching with TTL and prevents duplicate concurrent requests
 */

import { ENV } from '@/config/environment';
import { logger } from '@/utils/frontendLogger';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface PendingRequest<T> {
  promise: Promise<T>;
  timestamp: number;
}

class ApiCacheService {
  private cache = new Map<string, CacheEntry<any>>();
  private pendingRequests = new Map<string, PendingRequest<any>>();
  private cleanupInterval?: NodeJS.Timeout;

  constructor() {
    // Cleanup expired entries every 5 minutes
    this.cleanupInterval = setInterval(
      () => {
        this.cleanup();
      },
      5 * 60 * 1000
    );
  }

  /**
   * Get data from cache or execute the fetcher function
   */
  async get<T>(key: string, fetcher: () => Promise<T>, ttl: number = ENV.CACHE.API_DATA): Promise<T> {
    // Check if we have a valid cached entry
    const cached = this.cache.get(key);
    if (cached && this.isValid(cached)) {
      logger.debug('CACHE', 'Cache hit', { key, age: Date.now() - cached.timestamp });
      return cached.data;
    }

    // Check if there's already a pending request for this key
    const pending = this.pendingRequests.get(key);
    if (pending && this.isPendingValid(pending)) {
      logger.debug('CACHE', 'Request deduplication', { key });
      return pending.promise;
    }

    // Create new request
    logger.debug('CACHE', 'Cache miss - fetching data', { key });
    const promise = this.executeRequest(key, fetcher, ttl);

    // Store pending request for deduplication
    this.pendingRequests.set(key, {
      promise,
      timestamp: Date.now(),
    });

    return promise;
  }

  /**
   * Execute the actual request and handle caching
   */
  private async executeRequest<T>(key: string, fetcher: () => Promise<T>, ttl: number): Promise<T> {
    try {
      const data = await fetcher();

      // Cache the successful result
      this.cache.set(key, {
        data,
        timestamp: Date.now(),
        ttl,
      });

      logger.debug('CACHE', 'Data cached successfully', { key, ttl });
      return data;
    } catch (error) {
      logger.error('CACHE', 'Request failed', { key, error });
      throw error;
    } finally {
      // Remove from pending requests
      this.pendingRequests.delete(key);
    }
  }

  /**
   * Check if cached entry is still valid
   */
  private isValid<T>(entry: CacheEntry<T>): boolean {
    return Date.now() - entry.timestamp < entry.ttl;
  }

  /**
   * Check if pending request is still valid (not timed out)
   */
  private isPendingValid<T>(pending: PendingRequest<T>): boolean {
    // Consider pending requests stale after 30 seconds
    return Date.now() - pending.timestamp < 30000;
  }

  /**
   * Manually invalidate cache entry
   */
  invalidate(key: string): void {
    this.cache.delete(key);
    this.pendingRequests.delete(key);
    logger.debug('CACHE', 'Cache entry invalidated', { key });
  }

  /**
   * Invalidate all cache entries matching a pattern
   */
  invalidatePattern(pattern: RegExp): void {
    const keys = Array.from(this.cache.keys()).filter(key => pattern.test(key));
    keys.forEach(key => this.invalidate(key));
    logger.debug('CACHE', 'Cache pattern invalidated', { pattern: pattern.toString(), keys });
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
    this.pendingRequests.clear();
    logger.debug('CACHE', 'All cache cleared');
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    let cleaned = 0;

    // Clean expired cache entries
    for (const [key, entry] of this.cache.entries()) {
      if (!this.isValid(entry)) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    // Clean stale pending requests
    for (const [key, pending] of this.pendingRequests.entries()) {
      if (!this.isPendingValid(pending)) {
        this.pendingRequests.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      logger.debug('CACHE', 'Cleanup completed', {
        cleaned,
        cacheSize: this.cache.size,
        pendingSize: this.pendingRequests.size,
      });
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      cacheSize: this.cache.size,
      pendingRequests: this.pendingRequests.size,
      entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
        key,
        age: Date.now() - entry.timestamp,
        ttl: entry.ttl,
        isValid: this.isValid(entry),
      })),
    };
  }

  /**
   * Destroy the cache service
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
  }
}

// Export singleton instance
export const apiCache = new ApiCacheService();

/**
 * Cache key generators for consistent naming
 */
export const cacheKeys = {
  urls: () => 'api:urls',
  news: () => 'api:news',
  comments: () => 'api:comments',
  levels: () => 'api:levels',
  videos: () => 'api:videos',
  versions: (type: string = 'archived') => `api:versions:${type}`,
  images: () => 'api:images',
} as const;
