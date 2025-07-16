import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { GameTrailer } from './GameTrailer';

// Mock fetch
global.fetch = vi.fn();

// Mock the logger
vi.mock('@/utils/frontendLogger', () => ({
  logger: {
    debug: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

// Mock environment config
vi.mock('@/config/environment', () => ({
  getApiUrl: (endpoint: string) => `http://localhost:3001${endpoint}`,
  ENV: {
    API_ENDPOINTS: {
      VIDEOS: '/api/videos',
    },
  },
}));

describe('GameTrailer', () => {
  const mockFetch = vi.mocked(fetch);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<GameTrailer />);

    // Check for the loading card structure
    expect(screen.getByText('Game Trailer')).toBeInTheDocument();
    expect(screen.getByText('Watch the official launch trailer')).toBeInTheDocument();
    // The loading state shows an animated placeholder
    const placeholder = document.querySelector('.animate-pulse .h-48');
    expect(placeholder).toBeInTheDocument();
  });

  it('should render video iframe when API returns intro video', async () => {
    const mockVideos = [
      {
        id: '1mQacGNeNVA',
        name: 'Manic Miners Intro',
        url: 'https://www.youtube.com/watch?v=1mQacGNeNVA',
        description: 'Official trailer',
        internalUrl: '',
        cloudinaryUrl: '',
      },
      {
        id: 'other-video',
        name: 'Other Video',
        url: 'https://www.youtube.com/watch?v=other-video',
        description: 'Other content',
        internalUrl: '',
        cloudinaryUrl: '',
      },
    ];

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockVideos),
    } as Response);

    render(<GameTrailer />);

    await waitFor(() => {
      const iframe = screen.getByTitle('Manic Miners Trailer');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/1mQacGNeNVA');
    });
  });

  it('should fall back to default video when intro video not found', async () => {
    const mockVideos = [
      {
        id: 'other-video',
        name: 'Other Video',
        url: 'https://www.youtube.com/watch?v=other-video',
        description: 'Other content',
        internalUrl: '',
        cloudinaryUrl: '',
      },
    ];

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockVideos),
    } as Response);

    render(<GameTrailer />);

    await waitFor(() => {
      const iframe = screen.getByTitle('Manic Miners Trailer');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/1mQacGNeNVA');
    });
  });

  it('should handle API errors gracefully', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<GameTrailer />);

    await waitFor(() => {
      const iframe = screen.getByTitle('Manic Miners Trailer');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/1mQacGNeNVA');
    });
  });

  it('should handle empty videos array', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    } as Response);

    render(<GameTrailer />);

    await waitFor(() => {
      const iframe = screen.getByTitle('Manic Miners Trailer');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/1mQacGNeNVA');
    });
  });

  it('should render iframe with correct attributes', async () => {
    const mockVideos = [
      {
        id: '1mQacGNeNVA',
        name: 'Manic Miners Intro',
        url: 'https://www.youtube.com/watch?v=1mQacGNeNVA',
        description: 'Official trailer',
        internalUrl: '',
        cloudinaryUrl: '',
      },
    ];

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockVideos),
    } as Response);

    render(<GameTrailer />);

    await waitFor(() => {
      const iframe = screen.getByTitle('Manic Miners Trailer');
      expect(iframe).toHaveAttribute('allowFullScreen');
      expect(iframe).toHaveClass('w-full', 'h-full');
    });
  });

  it('should extract YouTube video ID from different URL formats', async () => {
    const testCases = [
      {
        url: 'https://www.youtube.com/watch?v=1mQacGNeNVA',
        expectedId: '1mQacGNeNVA',
      },
      {
        url: 'https://www.youtube.com/watch?v=1mQacGNeNVA&t=30s',
        expectedId: '1mQacGNeNVA',
      },
    ];

    for (const testCase of testCases) {
      const mockVideos = [
        {
          id: '1mQacGNeNVA',
          name: 'Test Video',
          url: testCase.url,
          description: 'Test video',
          internalUrl: '',
          cloudinaryUrl: '',
        },
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockVideos),
      } as Response);

      const { unmount } = render(<GameTrailer />);

      await waitFor(() => {
        const iframe = screen.getByTitle('Manic Miners Trailer');
        expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${testCase.expectedId}`);
      });

      unmount();
      vi.clearAllMocks();
    }
  });
});
