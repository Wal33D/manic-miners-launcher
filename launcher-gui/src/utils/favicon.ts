const SERVER_BASE_URL = 'https://manic-launcher.vercel.app';

/**
 * Updates the favicon dynamically by fetching it from the API
 * Tries multiple favicon names in order of preference and applies the first one found
 * 
 * @returns {Promise<void>} Resolves when favicon update is complete
 * @throws {Error} Logs error to console if favicon update fails
 */
export async function updateFavicon() {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/api/images`);
    if (!response.ok) return;

    const data = await response.json();
    if (!data.images) return;

    // Look for favicon assets by name
    const faviconNames = ['manic-miners-basic.ico', 'manic-miners-alt-icon.ico'];

    for (const faviconName of faviconNames) {
      const faviconImage = data.images[faviconName];
      if (faviconImage) {
        const faviconUrl = faviconImage.cloudinaryUrl || faviconImage.internalUrl;

        // Remove existing favicon links
        const existingLinks = document.querySelectorAll("link[rel*='icon']");
        existingLinks.forEach(link => link.remove());

        // Add new favicon link
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/x-icon';
        link.href = faviconUrl;
        document.head.appendChild(link);

        // Also add as shortcut icon for older browsers
        const shortcutLink = document.createElement('link');
        shortcutLink.rel = 'shortcut icon';
        shortcutLink.href = faviconUrl;
        document.head.appendChild(shortcutLink);

        break;
      }
    }
  } catch (error) {
    console.error('Failed to update favicon:', error);
  }
}
