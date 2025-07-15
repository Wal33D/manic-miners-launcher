import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { apiCache, cacheKeys } from './apiCache';

// Mock logger
vi.mock('@/utils/frontendLogger', () => ({
  logger: {
    debug: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock environment config
vi.mock('@/config/environment', () => ({
  ENV: {
    CACHE: {
      API_DATA: 5000, // 5 seconds for testing
    },
  },
}));

describe('ApiCache', () => {
  beforeEach(() => {
    apiCache.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    apiCache.clear();
  });

  describe('basic caching', () => {
    it('should cache and return data', async () => {
      const mockData = { test: 'data' };
      const fetcher = vi.fn().mockResolvedValue(mockData);

      const result1 = await apiCache.get('test-key', fetcher);
      const result2 = await apiCache.get('test-key', fetcher);

      expect(result1).toEqual(mockData);
      expect(result2).toEqual(mockData);
      expect(fetcher).toHaveBeenCalledTimes(1); // Should only fetch once
    });

    it('should respect TTL and refetch expired data', async () => {
      const mockData1 = { test: 'data1' };
      const mockData2 = { test: 'data2' };
      const fetcher = vi.fn()
        .mockResolvedValueOnce(mockData1)
        .mockResolvedValueOnce(mockData2);

      // First fetch
      const result1 = await apiCache.get('test-key', fetcher, 100); // 100ms TTL

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 150));

      // Second fetch should get new data
      const result2 = await apiCache.get('test-key', fetcher, 100);

      expect(result1).toEqual(mockData1);
      expect(result2).toEqual(mockData2);
      expect(fetcher).toHaveBeenCalledTimes(2);
    });
  });

  describe('request deduplication', () => {
    it('should deduplicate concurrent requests', async () => {
      const mockData = { test: 'data' };
      const fetcher = vi.fn().mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve(mockData), 100))
      );

      // Start multiple concurrent requests
      const promises = [
        apiCache.get('test-key', fetcher),
        apiCache.get('test-key', fetcher),
        apiCache.get('test-key', fetcher),
      ];

      const results = await Promise.all(promises);

      expect(results).toEqual([mockData, mockData, mockData]);
      expect(fetcher).toHaveBeenCalledTimes(1); // Should only fetch once
    });
  });

  describe('error handling', () => {
    it('should not cache failed requests', async () => {
      const error = new Error('Network error');
      const fetcher = vi.fn()
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce({ test: 'success' });

      // First request should fail
      await expect(apiCache.get('test-key', fetcher)).rejects.toThrow('Network error');

      // Second request should succeed and fetch again
      const result = await apiCache.get('test-key', fetcher);
      expect(result).toEqual({ test: 'success' });
      expect(fetcher).toHaveBeenCalledTimes(2);
    });
  });

  describe('cache management', () => {
    it('should invalidate specific keys', async () => {
      const mockData = { test: 'data' };
      const fetcher = vi.fn().mockResolvedValue(mockData);

      await apiCache.get('test-key', fetcher);
      expect(fetcher).toHaveBeenCalledTimes(1);

      apiCache.invalidate('test-key');

      await apiCache.get('test-key', fetcher);
      expect(fetcher).toHaveBeenCalledTimes(2); // Should fetch again
    });

    it('should invalidate by pattern', async () => {
      const mockData = { test: 'data' };
      const fetcher = vi.fn().mockResolvedValue(mockData);

      await apiCache.get('api:news:1', fetcher);
      await apiCache.get('api:news:2', fetcher);
      await apiCache.get('api:other', fetcher);

      apiCache.invalidatePattern(/^api:news/);

      // News keys should be invalidated
      await apiCache.get('api:news:1', fetcher);
      await apiCache.get('api:news:2', fetcher);
      
      // Other key should still be cached
      await apiCache.get('api:other', fetcher);

      expect(fetcher).toHaveBeenCalledTimes(5); // 3 initial + 2 refetched
    });

    it('should provide cache statistics', async () => {
      const mockData = { test: 'data' };
      const fetcher = vi.fn().mockResolvedValue(mockData);

      await apiCache.get('test-key-1', fetcher);
      await apiCache.get('test-key-2', fetcher);

      const stats = apiCache.getStats();
      expect(stats.cacheSize).toBe(2);
      expect(stats.entries).toHaveLength(2);
      expect(stats.entries[0].key).toMatch(/test-key/);
    });
  });
});

describe('cacheKeys', () => {
  it('should generate consistent cache keys', () => {
    expect(cacheKeys.urls()).toBe('api:urls');
    expect(cacheKeys.news()).toBe('api:news');
    expect(cacheKeys.comments()).toBe('api:comments');
    expect(cacheKeys.levels()).toBe('api:levels');
    expect(cacheKeys.videos()).toBe('api:videos');
    expect(cacheKeys.versions()).toBe('api:versions:archived');
    expect(cacheKeys.versions('latest')).toBe('api:versions:latest');
    expect(cacheKeys.images()).toBe('api:images');
  });
});