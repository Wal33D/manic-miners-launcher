export const loadVersionSelect = (): void => {
  //@ts-ignore
  window.electronAPI?.send('request-version-information', 'fetchVersions');
  //@ts-ignore
  window.electronAPI?.receive('version-information-reply', data => {
    console.log(data);
    const { versions, currentlyInstalledVersions } = data;
    const versionSelect = document.getElementById('versionSelect') as any;
    if (versionSelect) {
      while (versionSelect.children.length > 1) {
        versionSelect.removeChild(versionSelect.lastChild);
      }

      if (Array.isArray(versions) && versions.length > 0) {
        versions.forEach(version => {
          const option = document.createElement('option');
          option.value = version.identifier;
          option.textContent = version.displayName;
          versionSelect.appendChild(option);
        });

        // Set the default selected version
        if (Array.isArray(currentlyInstalledVersions) && currentlyInstalledVersions.length > 0) {
          const firstInstalledVersion = currentlyInstalledVersions[0];
          versionSelect.value = firstInstalledVersion.identifier;
          // Immediately save the default selected version
          //@ts-ignore
          window.electronAPI.send('set-selected-version', firstInstalledVersion.identifier);
        } else {
          console.error('No currently installed versions data received or data is not an array.');
        }

        // Add an event listener to save the selected version whenever it changes
        versionSelect.addEventListener('change', () => {
          const selectedVersion = versionSelect.value;
          console.log(`Version selected: ${selectedVersion}`);
          //@ts-ignore
          window.electronAPI.send('set-selected-version', selectedVersion);
        });
      } else {
        console.error('No versions data received or data is not an array.');
      }
    } else {
      console.error('The versionSelect element was not found.');
    }
  });
};
