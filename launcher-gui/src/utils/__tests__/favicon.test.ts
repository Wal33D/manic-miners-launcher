import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { updateFavicon } from '../favicon';
import type { MockedFetch } from '../../../../src/tests/testTypes';

// Mock fetch globally
global.fetch = vi.fn() as MockedFetch;

// Define proper types for DOM mocks
type MockElement = {
  rel: string;
  type: string;
  href: string;
  remove?: () => void;
};

type MockCreateElement = jest.MockedFunction<(tagName: string) => MockElement>;
type MockAppendChild = jest.MockedFunction<(node: Node) => Node>;
type MockQuerySelectorAll = jest.MockedFunction<(selectors: string) => NodeListOf<MockElement>>;

describe('updateFavicon', () => {
  let mockCreateElement: MockCreateElement;
  let mockAppendChild: MockAppendChild;
  let mockQuerySelectorAll: MockQuerySelectorAll;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Mock DOM methods
    mockCreateElement = vi.fn(() => ({
      rel: '',
      type: '',
      href: '',
    })) as MockCreateElement;
    mockAppendChild = vi.fn() as MockAppendChild;
    mockQuerySelectorAll = vi.fn(
      () =>
        [
          { remove: vi.fn(), rel: '', type: '', href: '' },
          { remove: vi.fn(), rel: '', type: '', href: '' },
        ] as unknown as NodeListOf<MockElement>
    ) as MockQuerySelectorAll;

    // Setup document mocks
    document.createElement = mockCreateElement as unknown as typeof document.createElement;
    document.head.appendChild = mockAppendChild as unknown as typeof document.head.appendChild;
    document.querySelectorAll = mockQuerySelectorAll as unknown as typeof document.querySelectorAll;

    // Mock console.error to avoid test output noise
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should update favicon when API returns valid data', async () => {
    const mockImages = {
      images: {
        'manic-miners-basic.ico': {
          cloudinaryUrl: 'https://cloudinary.com/favicon.ico',
          internalUrl: 'https://internal.com/favicon.ico',
        },
      },
    };

    (global.fetch as MockedFetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockImages,
    } as Response);

    await updateFavicon();

    // Should remove existing favicon links
    expect(mockQuerySelectorAll).toHaveBeenCalledWith("link[rel*='icon']");

    // Should create new favicon links
    expect(mockCreateElement).toHaveBeenCalledWith('link');
    expect(mockCreateElement).toHaveBeenCalledTimes(2); // icon and shortcut icon

    // Should append new links
    expect(mockAppendChild).toHaveBeenCalledTimes(2);

    // Check that the correct URL was used
    const createdLinks = mockCreateElement.mock.results;
    expect(createdLinks[0].value.href).toBe('https://cloudinary.com/favicon.ico');
  });

  it('should use internalUrl when cloudinaryUrl is not available', async () => {
    const mockImages = {
      images: {
        'manic-miners-basic.ico': {
          internalUrl: 'https://internal.com/favicon.ico',
        },
      },
    };

    (global.fetch as MockedFetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockImages,
    } as Response);

    await updateFavicon();

    const createdLinks = mockCreateElement.mock.results;
    expect(createdLinks[0].value.href).toBe('https://internal.com/favicon.ico');
  });

  it('should handle API errors gracefully', async () => {
    (global.fetch as MockedFetch).mockRejectedValueOnce(new Error('Network error'));

    await updateFavicon();

    expect(console.error).toHaveBeenCalledWith('Failed to update favicon:', expect.any(Error));

    // Should not create any links
    expect(mockCreateElement).not.toHaveBeenCalled();
  });

  it('should handle non-ok response gracefully', async () => {
    (global.fetch as MockedFetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    await updateFavicon();

    // Should not create any links
    expect(mockCreateElement).not.toHaveBeenCalled();
  });

  it('should handle missing images data gracefully', async () => {
    (global.fetch as MockedFetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);

    await updateFavicon();

    // Should not create any links
    expect(mockCreateElement).not.toHaveBeenCalled();
  });

  it('should try alternative favicon names if first is not found', async () => {
    const mockImages = {
      images: {
        'manic-miners-alt-icon.ico': {
          cloudinaryUrl: 'https://cloudinary.com/alt-favicon.ico',
        },
      },
    };

    (global.fetch as MockedFetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockImages,
    } as Response);

    await updateFavicon();

    const createdLinks = mockCreateElement.mock.results;
    expect(createdLinks[0].value.href).toBe('https://cloudinary.com/alt-favicon.ico');
  });
});
