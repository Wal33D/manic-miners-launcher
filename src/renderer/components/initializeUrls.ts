// Import IPC channels from a centralized file (adjust the import path as needed)
import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';

export const initializeUrls = (): void => {
  // Initially fetch URL data and set up a listener for updates
  fetchUrlData();

  // Listener to refresh URL data when updated
  //@ts-ignore
  window.electronAPI?.receive(IPC_CHANNELS.URLS_UPDATED, () => {
    fetchUrlData(); // Fetch the latest URLs after update notifications
  });

  // Function to fetch URL data
  function fetchUrlData() {
    //@ts-ignore

    window.electronAPI?.send(IPC_CHANNELS.GET_URLS);
  }

  // Handler for receiving URL data
  //@ts-ignore

  window.electronAPI?.receive(IPC_CHANNELS.GET_URLS, urls => {
    updateLinksUI(urls);
  });

  // Update the UI with received URL data
  function updateLinksUI(urls: { [s: string]: unknown } | ArrayLike<unknown>) {
    const linksContainer = document.getElementById('links-pane');
    if (!linksContainer) {
      console.error('The links-pane element was not found.');
      return;
    }

    // Clear existing links
    while (linksContainer.firstChild) {
      linksContainer.removeChild(linksContainer.firstChild);
    }

    // Dynamically create link elements for each URL
    Object.entries(urls).forEach(([key, url]) => {
      const link: any = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.className = 'not-draggable icon-button';
      link.innerHTML = `<i class="${getIconClass(key)}"></i>`;
      linksContainer.appendChild(link);
    });
  }

  // Helper function to determine the icon class based on the key
  function getIconClass(key: string) {
    const iconMap = {
      Website: 'fas fa-globe',
      Discord: 'fab fa-discord',
      Reddit: 'fab fa-reddit-alien',
      YouTube: 'fab fa-youtube',
      Facebook: 'fab fa-facebook-f',
      FAQ: 'fas fa-question-circle',
      Email: 'fas fa-envelope',
    } as any;
    return iconMap[key] || 'fas fa-link'; // Default icon if key is not found
  }
};
