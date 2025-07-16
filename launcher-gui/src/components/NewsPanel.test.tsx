import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { NewsPanel } from './NewsPanel';
import { api } from '@/services/api';

// Mock the API service
vi.mock('@/services/api', () => ({
  api: {
    getNews: vi.fn(),
  },
}));

// Mock the logger
vi.mock('@/utils/frontendLogger', () => ({
  logger: {
    debug: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe('NewsPanel', () => {
  const mockApiGetNews = vi.mocked(api.getNews);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockApiGetNews.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<NewsPanel />);

    expect(screen.getByText('Loading news...')).toBeInTheDocument();
  });

  it('should render news items from new API format', async () => {
    const mockNews = {
      news: [
        {
          id: 1,
          title: 'Test News 1',
          content: 'This is test content 1',
          date: '2024-01-01',
          author: 'Test Author',
        },
        {
          id: 2,
          title: 'Test News 2',
          content: 'This is test content 2',
          date: '2024-01-02',
          author: 'Another Author',
        },
      ],
    };

    mockApiGetNews.mockResolvedValue(mockNews);

    render(<NewsPanel />);

    await waitFor(() => {
      expect(screen.getByText('Test News 1')).toBeInTheDocument();
      expect(screen.getByText('Test News 2')).toBeInTheDocument();
    });

    expect(screen.getByText('This is test content 1')).toBeInTheDocument();
    expect(screen.getByText('This is test content 2')).toBeInTheDocument();
  });

  it('should render news items from legacy API format', async () => {
    const mockNews = [
      {
        id: 1,
        title: 'Legacy News 1',
        content: 'This is legacy content 1',
        date: '2024-01-01',
        author: 'Legacy Author',
      },
      {
        id: 2,
        title: 'Legacy News 2',
        content: 'This is legacy content 2',
        date: '2024-01-02',
        author: 'Another Legacy Author',
      },
    ];

    mockApiGetNews.mockResolvedValue(mockNews);

    render(<NewsPanel />);

    await waitFor(() => {
      expect(screen.getByText('Legacy News 1')).toBeInTheDocument();
      expect(screen.getByText('Legacy News 2')).toBeInTheDocument();
    });

    expect(screen.getByText('This is legacy content 1')).toBeInTheDocument();
    expect(screen.getByText('This is legacy content 2')).toBeInTheDocument();
  });

  it('should handle empty news array', async () => {
    mockApiGetNews.mockResolvedValue({ news: [] });

    render(<NewsPanel />);

    await waitFor(() => {
      expect(screen.getByText('No news available')).toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully', async () => {
    mockApiGetNews.mockRejectedValue(new Error('Network error'));

    render(<NewsPanel />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load news')).toBeInTheDocument();
    });
  });

  it('should display formatted dates correctly', async () => {
    const mockNews = {
      news: [
        {
          id: 1,
          title: 'Date Test News',
          content: 'Testing date formatting',
          date: '2024-01-15T10:30:00Z',
          author: 'Date Tester',
        },
      ],
    };

    mockApiGetNews.mockResolvedValue(mockNews);

    render(<NewsPanel />);

    await waitFor(() => {
      expect(screen.getByText('Date Test News')).toBeInTheDocument();
    });

    // Should format the date nicely
    expect(screen.getByText(/Jan/)).toBeInTheDocument();
  });

  it('should limit news items to maximum display count', async () => {
    const mockNews = {
      news: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `News Item ${i + 1}`,
        content: `Content for news item ${i + 1}`,
        date: '2024-01-01',
        author: 'Test Author',
      })),
    };

    mockApiGetNews.mockResolvedValue(mockNews);

    render(<NewsPanel />);

    await waitFor(() => {
      expect(screen.getByText('News Item 1')).toBeInTheDocument();
    });

    // Should only show first 10 items (or whatever the limit is)
    const newsItems = screen.getAllByText(/News Item \d+/);
    expect(newsItems.length).toBeLessThanOrEqual(10);
  });
});
