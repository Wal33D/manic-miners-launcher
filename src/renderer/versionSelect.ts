export const loadVersionSelect = (): void => {
  //@ts-ignore
  window.electronAPI?.send('request-version-information', 'fetchVersions');
  //@ts-ignore
  window.electronAPI?.receive('version-information-reply', data => {
    console.log(data);
    const { versions, currentlyInstalledVersions } = data;
    const versionSelect = document.getElementById('versionSelect');
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

        if (Array.isArray(currentlyInstalledVersions) && currentlyInstalledVersions.length > 0) {
          const firstInstalledVersion = currentlyInstalledVersions[0];
          //@ts-ignore
          versionSelect.value = firstInstalledVersion.identifier;
        } else {
          console.error('No currently installed versions data received or data is not an array.');
        }
      } else {
        console.error('No versions data received or data is not an array.');
      }
    } else {
      console.error('The versionSelect element was not found.');
    }
  });
};
