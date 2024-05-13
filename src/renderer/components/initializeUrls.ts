// Import IPC channels from a centralized file (adjust the import path as needed)
import { IPC_CHANNELS } from '../../main/ipcHandlers/ipcChannels';

export const initializeUrls = (): void => {
  //@ts-ignore
  window.electronAPI?.send(IPC_CHANNELS.GET_URLS);

  // Handler for receiving URL data
  //@ts-ignore
  window.electronAPI?.receive(IPC_CHANNELS.GET_URLS, response => {
    if (response.status) {
      updateLinksUI(response.urls); // Pass only the URLs object
      console.log('Received URLs:', response.urls);
    } else {
      console.error('Failed to fetch URLs:', response.message);
    }
  });

  // Update the UI with received URL data
  function updateLinksUI(urls: { [s: string]: string } | ArrayLike<unknown>) {
    const linksContainer = document.getElementById('links-pane');
    if (!linksContainer) {
      console.error('The links-pane element was not found.');
      return;
    }

    // Clear existing links
    while (linksContainer.firstChild) {
      linksContainer.removeChild(linksContainer.firstChild);
    }

    // Correctly access each URL and associated key
    Object.entries(urls).forEach(([key, url]) => {
      console.log(`URL for ${key}: ${url}`); // Debugging output
      const link = document.createElement('a');
      link.setAttribute('data-url', url as string);
      link.className = 'not-draggable icon-button';
      link.innerHTML = `<i class="${getIconClass(key)}"></i>`;
      link.addEventListener('click', event => {
        event.preventDefault();
        //@ts-ignore
        window.electronAPI.openExternal(url);
      });
      linksContainer.appendChild(link);
    });
  }

  function getIconClass(key: string) {
    const iconMap = {
      Website: 'fas fa-globe',
      Discord: 'fab fa-discord',
      Reddit: 'fab fa-reddit-alien',
      YouTube: 'fab fa-youtube',
      Facebook: 'fab fa-facebook-f',
      FAQ: 'fas fa-question-circle',
      Email: 'fas fa-envelope',
    };
    //@ts-ignore
    const iconClass = iconMap[key] || 'fas fa-link';
    console.log(`Icon for ${key}: ${iconClass}`);
    return iconClass;
  }
};
