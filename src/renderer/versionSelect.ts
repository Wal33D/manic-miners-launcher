export const loadVersionSelect = (): void => {
  setTimeout(() => {
    const fetchVersionsButton = document.getElementById('fetchVersionsButton');
    if (fetchVersionsButton) {
      fetchVersionsButton.addEventListener('click', () => {
        //@ts-ignore
        window.electronAPI?.send('request-mainprocess-action', 'fetchVersions');
      });
    } else {
      console.error('The fetchVersionsButton was not found.');
    }

    //@ts-ignore
    window.electronAPI?.receive('action-reply', data => {
      console.log(data); // Continue to log the data for debugging

      // Get the select element from the DOM
      const versionSelect = document.getElementById('versionSelect');
      if (versionSelect) {
        // Clear existing options (excluding the placeholder)
        while (versionSelect.children.length > 1) {
          versionSelect.removeChild(versionSelect.lastChild);
        }

        // Check if data is an array and has content
        if (Array.isArray(data) && data.length > 0) {
          // Append new options from the data
          data.forEach(version => {
            const option = document.createElement('option');
            option.value = version.identifier; // Assuming 'identifier' can be used as a value
            option.textContent = version.displayName; // Display name for the option
            versionSelect.appendChild(option);
          });
        } else {
          console.error('No versions data received or data is not an array.');
        }
      } else {
        console.error('The versionSelect element was not found.');
      }
    });
  }, 100);
};
