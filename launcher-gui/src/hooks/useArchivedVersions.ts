import { useState, useEffect } from 'react';
import { logger } from '@/utils/frontendLogger';
import { getApiUrl, ENV } from '@/config/environment';
import { sortByVersion } from '@/utils/version';
import { useArchivedVersion } from '@/contexts/ArchivedVersionContext';

import { GameVersion } from '@/types/game';
import type { VersionsResponse } from '@/types/api';

// Response type for archived versions with enhanced data
interface ArchivedVersionsResponse {
  versions: GameVersion[];
  defaultVersion?: GameVersion;
  status?: boolean;
  message?: string;
}

// Directory response type
interface DirectoriesResponse {
  status: boolean;
  message: string;
  directories?: {
    launcherInstallPath: string;
    [key: string]: string;
  };
}

/**
 * Hook for managing archived versions data and selection
 */
export function useArchivedVersions() {
  const { installedVersions, setInstalledVersions } = useArchivedVersion();

  const [versions, setVersions] = useState<GameVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [installPath, setInstallPath] = useState<string>('');

  // Load versions and install path
  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await fetch(getApiUrl(ENV.API_ENDPOINTS.VERSIONS_ARCHIVED));
        const data: VersionsResponse = await response.json();

        if (data?.versions) {
          const sorted = sortByVersion(data.versions);
          setVersions(sorted);
          if (sorted.length > 0) {
            setSelectedVersion(sorted[0].version);
          }
          // For web preview, assume no versions are installed
          setInstalledVersions(new Set<string>());
        }
      } catch (error) {
        logger.error('VERSION', 'Failed to fetch versions', { error: error.message });
      } finally {
        setLoading(false);
      }
    };

    // For Electron, use the API calls if available
    if (window.electronAPI) {
      window.electronAPI.send('get-directories');
      window.electronAPI.receiveOnce('get-directories', (dirResult: DirectoriesResponse) => {
        if (dirResult?.status) {
          setInstallPath(dirResult.directories.launcherInstallPath);
        }
      });

      window.electronAPI.send('request-archived-versions-information');
      window.electronAPI.receiveOnce('request-archived-versions-information', (data: ArchivedVersionsResponse) => {
        if (data?.versions) {
          // All versions from this endpoint are archived versions only
          const sorted = sortByVersion(data.versions);
          setVersions(sorted);
          if (data.defaultVersion) {
            setSelectedVersion(data.defaultVersion.version);
          } else if (sorted.length > 0) {
            setSelectedVersion(sorted[0].version);
          }
          const installed = new Set<string>(sorted.filter((v: GameVersion) => v.directory).map((v: GameVersion) => v.version));
          setInstalledVersions(installed);
        }
        setLoading(false);
      });
    } else {
      // For web preview, fetch from the API
      fetchVersions();
    }
  }, [setInstalledVersions]);

  const selectedVersionData = versions.find(v => v.version === selectedVersion);
  const isVersionInstalled = selectedVersionData ? installedVersions.has(selectedVersionData.version) : false;

  return {
    versions,
    selectedVersion,
    setSelectedVersion,
    selectedVersionData,
    isVersionInstalled,
    installedVersions,
    loading,
    installPath,
  };
}
