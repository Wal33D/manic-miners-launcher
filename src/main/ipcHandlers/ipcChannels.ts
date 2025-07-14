export const IPC_CHANNELS = {
  LAUNCH_GAME: 'launch-game',
  VERSIONS_UPDATED: 'versions-updated',
  ALL_VERSION_INFO: 'request-version-information',
  
  // Archived versions (Internet Archive only)
  ARCHIVED_VERSIONS_INFO: 'request-archived-versions-information',
  SET_SELECTED_ARCHIVED_VERSION: 'set-selected-archived-version',
  GET_SELECTED_ARCHIVED_VERSION: 'get-selected-archived-version',
  
  // Latest version (itch.io only)
  LATEST_VERSION_INFO: 'request-latest-version-information',
  
  CHECK_VERSION_INSTALLED: 'check-version-installed',
  SELECT_INSTALL_DIRECTORY: 'select-install-directory',
  DOWNLOAD_VERSION: 'download-version',
  DOWNLOAD_STATUS: 'download-status',
  DOWNLOAD_PROGRESS: 'download-progress',
  GET_DIRECTORIES: 'get-directories',
  PLAY_SOUND: 'play-sound',
  GET_URLS: 'get-urls',
  OPEN_DIRECTORY_DIALOG: 'open-directory-dialog',
  DIRECTORY_SELECTED: 'directory-selected',
  GET_SETTINGS: 'get-settings',
  SET_SETTINGS: 'set-settings',
  WINDOW_MINIMIZE: 'window-minimize',
  WINDOW_EXIT: 'window-exit',
  VERIFY_VERSION: 'verify-version',
  DELETE_VERSION: 'delete-version',
  REPAIR_VERSION: 'repair-version',
  DELETE_LATEST_VERSION: 'delete-latest-version',
  UPDATE_LATEST_VERSION: 'update-latest-version',
  UPDATE_PROGRESS: 'update-progress',
  UPDATE_ERROR: 'update-error',
  CREATE_SHORTCUTS: 'create-shortcuts',
  CREATE_SHORTCUTS_PROGRESS: 'create-shortcuts-progress',
} as const;
