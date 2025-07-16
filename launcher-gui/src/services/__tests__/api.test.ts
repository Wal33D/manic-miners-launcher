import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { api, ApiError } from '../api';
import type { MockedFetch } from '../../../../src/tests/testTypes';

// Mock fetch globally
global.fetch = vi.fn() as MockedFetch;

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('apiFetch', () => {
    it('makes successful API calls', async () => {
      const mockData = { test: 'data' };
      (global.fetch as MockedFetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await api.getUrls();

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/urls'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('throws ApiError on non-ok response', async () => {
      (global.fetch as MockedFetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      await expect(api.getUrls()).rejects.toThrow(ApiError);

      // Need to mock again for second call
      (global.fetch as MockedFetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      await expect(api.getUrls()).rejects.toThrow('API request failed: Not Found');
    });

    it('throws ApiError on network error', async () => {
      (global.fetch as MockedFetch).mockRejectedValueOnce(new Error('Network error'));

      await expect(api.getUrls()).rejects.toThrow(ApiError);
      await expect(api.getUrls()).rejects.toThrow('Network error - please check your connection');
    });
  });

  describe('API methods', () => {
    const mockSuccessResponse = (data: unknown) => {
      (global.fetch as MockedFetch).mockResolvedValueOnce({
        ok: true,
        json: async () => data,
      } as Response);
    };

    it('getUrls fetches social URLs', async () => {
      const mockUrls = {
        Discord: 'https://discord.gg/test',
        Website: 'https://example.com',
      };
      mockSuccessResponse(mockUrls);

      const result = await api.getUrls();

      expect(result).toEqual(mockUrls);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/urls'), expect.objectContaining({}));
    });

    it('getNews fetches news items', async () => {
      const mockNews = {
        news: [{ id: 1, title: 'Test News' }],
      };
      mockSuccessResponse(mockNews);

      const result = await api.getNews();

      expect(result).toEqual(mockNews);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/news'), expect.objectContaining({}));
    });

    it('getComments fetches comments', async () => {
      const mockComments = {
        count: 2,
        comments: [{ id: 1, text: 'Test comment' }],
      };
      mockSuccessResponse(mockComments);

      const result = await api.getComments();

      expect(result).toEqual(mockComments);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/comments'), expect.objectContaining({}));
    });

    it('getLevels fetches game levels', async () => {
      const mockLevels = [
        { id: '1', name: 'Level 1' },
        { id: '2', name: 'Level 2' },
      ];
      mockSuccessResponse(mockLevels);

      const result = await api.getLevels();

      expect(result).toEqual(mockLevels);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/levels'), expect.objectContaining({}));
    });

    it('getVideos fetches videos', async () => {
      const mockVideos = {
        videos: [{ id: '1', url: 'https://youtube.com/test' }],
      };
      mockSuccessResponse(mockVideos);

      const result = await api.getVideos();

      expect(result).toEqual(mockVideos);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/videos'), expect.objectContaining({}));
    });

    it('getArchivedVersions fetches versions', async () => {
      const mockVersions = {
        versions: [{ version: '1.0.0' }, { version: '2.0.0' }],
      };
      mockSuccessResponse(mockVersions);

      const result = await api.getArchivedVersions();

      expect(result).toEqual(mockVersions);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/versions/archived'), expect.objectContaining({}));
    });

    it('getImages fetches image assets', async () => {
      const mockImages = {
        images: { logo: { url: 'https://example.com/logo.png' } },
      };
      mockSuccessResponse(mockImages);

      const result = await api.getImages();

      expect(result).toEqual(mockImages);
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/images'), expect.objectContaining({}));
    });
  });
});

describe('ApiError', () => {
  it('creates error with correct properties', () => {
    const error = new ApiError(404, 'Not Found', '/api/test');

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('ApiError');
    expect(error.status).toBe(404);
    expect(error.message).toBe('Not Found');
    expect(error.endpoint).toBe('/api/test');
  });
});
