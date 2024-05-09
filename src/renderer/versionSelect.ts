export const loadVersionSelect = (): void => {
  window.electronAPI?.send('request-mainprocess-action', 'fetchVersions');

  window.electronAPI?.receive('reply-fetchVersions', data => {
    console.log('Versions Data:', data);
    const versionSelect = document.getElementById('versionSelect');
    if (versionSelect) {
      while (versionSelect.children.length > 1) {
        versionSelect.removeChild(versionSelect.lastChild);
      }

      if (Array.isArray(data) && data.length > 0) {
        data.forEach(version => {
          const option = document.createElement('option');
          option.value = version.identifier;
          option.textContent = version.displayName;
          versionSelect.appendChild(option);
        });

        window.electronAPI?.send('request-mainprocess-action', 'fetchInstalledVersions');
      } else {
        console.error('No versions data received or data is not an array.');
      }
    } else {
      console.error('The versionSelect element was not found.');
    }
  });

  window.electronAPI?.receive('reply-fetchInstalledVersions', data => {
    console.log('Installed Versions Data:', data);
    const versionSelect = document.getElementById('versionSelect');
    if (versionSelect && data.existingInstalls && data.existingInstalls.length > 0) {
      const firstInstalledIdentifier = data.existingInstalls[0].directory;
      const optionToSelect = Array.from(versionSelect.options).find(option => option.value === firstInstalledIdentifier);
      if (optionToSelect) {
        optionToSelect.selected = true;
      }
    } else {
      console.error('No installed versions data received or data format is incorrect.');
    }
  });
};
