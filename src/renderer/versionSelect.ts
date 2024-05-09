/**
 * Loads the version select options by fetching versions from the main process.
 * This function sends a request to the main process to fetch the versions and receives the response.
 * The response data is used to populate the version select dropdown element with options.
 * If the response data is an array with at least one element, each element is added as an option to the dropdown.
 * The option value is set to the version identifier and the option text is set to the version display name.
 * If the response data is not an array or if no data is received, an error message is logged.
 * If the versionSelect element is not found, an error message is logged.
 */
export const loadVersionSelect = (): void => {
  //@ts-ignore
  window.electronAPI?.send('request-mainprocess-action', 'fetchVersions');
  //@ts-ignore
  window.electronAPI?.receive('action-reply', data => {
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
