import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { updateFavicon } from '../favicon';

// Mock fetch globally
global.fetch = vi.fn();

describe('updateFavicon', () => {
  let mockCreateElement: any;
  let mockAppendChild: any;
  let mockQuerySelectorAll: any;
  
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock DOM methods
    mockCreateElement = vi.fn(() => ({
      rel: '',
      type: '',
      href: ''
    }));
    mockAppendChild = vi.fn();
    mockQuerySelectorAll = vi.fn(() => [
      { remove: vi.fn() },
      { remove: vi.fn() }
    ]);
    
    // Setup document mocks
    document.createElement = mockCreateElement;
    document.head.appendChild = mockAppendChild;
    document.querySelectorAll = mockQuerySelectorAll;
    
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
          internalUrl: 'https://internal.com/favicon.ico'
        }
      }
    };
    
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockImages
    });
    
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
          internalUrl: 'https://internal.com/favicon.ico'
        }
      }
    };
    
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockImages
    });
    
    await updateFavicon();
    
    const createdLinks = mockCreateElement.mock.results;
    expect(createdLinks[0].value.href).toBe('https://internal.com/favicon.ico');
  });

  it('should handle API errors gracefully', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));
    
    await updateFavicon();
    
    expect(console.error).toHaveBeenCalledWith(
      'Failed to update favicon:',
      expect.any(Error)
    );
    
    // Should not create any links
    expect(mockCreateElement).not.toHaveBeenCalled();
  });

  it('should handle non-ok response gracefully', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404
    });
    
    await updateFavicon();
    
    // Should not create any links
    expect(mockCreateElement).not.toHaveBeenCalled();
  });

  it('should handle missing images data gracefully', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });
    
    await updateFavicon();
    
    // Should not create any links
    expect(mockCreateElement).not.toHaveBeenCalled();
  });

  it('should try alternative favicon names if first is not found', async () => {
    const mockImages = {
      images: {
        'manic-miners-alt-icon.ico': {
          cloudinaryUrl: 'https://cloudinary.com/alt-favicon.ico'
        }
      }
    };
    
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockImages
    });
    
    await updateFavicon();
    
    const createdLinks = mockCreateElement.mock.results;
    expect(createdLinks[0].value.href).toBe('https://cloudinary.com/alt-favicon.ico');
  });
});