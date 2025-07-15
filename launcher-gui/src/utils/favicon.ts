const SERVER_BASE_URL = 'https://manic-launcher.vercel.app';

export async function updateFavicon() {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/api/assets`);
    if (!response.ok) return;

    const data = await response.json();
    if (!data.assets) return;

    // Look for favicon assets
    const faviconAssets = ['manic-miners-favicon.ico', 'manic-miners.ico', 'manic-miners-alt.ico'];

    for (const assetName of faviconAssets) {
      if (data.assets[assetName]) {
        const faviconUrl = `${SERVER_BASE_URL}${data.assets[assetName]}`;

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
