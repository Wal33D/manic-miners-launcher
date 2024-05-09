export const loadVersionSelect = (): void => {
  //@ts-ignore
  window.electronAPI?.send('request-version-information', 'fetchVersions');
  //@ts-ignore
  window.electronAPI?.receive('version-information-reply', data => {
    console.log(data);

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
      } else {
        console.error('No versions data received or data is not an array.');
      }
    } else {
      console.error('The versionSelect element was not found.');
    }
  });
};
