import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap } from 'lucide-react';
import { VersionSelector } from './VersionSelector';
import { VersionDetails } from './VersionDetails';
import { VersionActions } from './VersionActions';
import { logger } from '../utils/frontendLogger';
import { getApiUrl, ENV } from '@/config/environment';
import { sortByVersion } from '@/utils/version';
import { useArchivedVersion } from '@/contexts/ArchivedVersionContext';

import { GameVersion } from '@/types/game';
import type { VersionsResponse } from '@/types/api';

export function GameVersionSelector() {
  const [versions, setVersions] = useState<GameVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [installPath, setInstallPath] = useState<string>('');

  // Use ArchivedVersionContext for state management
  const {
    isDownloading,
    setIsDownloading,
    isRepairing,
    setIsRepairing,
    isDeleting,
    setIsDeleting,
    operationProgress,
    operationStatus,
    operationType,
    installedVersions,
    setInstalledVersions,
  } = useArchivedVersion();

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
      window.electronAPI.receiveOnce('get-directories', (dirResult: { status: boolean; directories: { launcherInstallPath: string } }) => {
        if (dirResult?.status) {
          setInstallPath(dirResult.directories.launcherInstallPath);
        }
      });

      window.electronAPI.send('request-archived-versions-information');
      window.electronAPI.receiveOnce(
        'request-archived-versions-information',
        (data: { versions: GameVersion[]; defaultVersion?: GameVersion }) => {
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
        }
      );
    } else {
      // For web preview, fetch from the API
      fetchVersions();
    }
  }, []);

  const selectedVersionData = versions.find(v => v.version === selectedVersion);

  const isVersionInstalled = (version: string) => {
    return installedVersions.has(version);
  };

  const handleInstallOrLaunch = () => {
    if (!selectedVersionData || !window.electronAPI) return;

    if (isVersionInstalled(selectedVersionData.version)) {
      window.electronAPI.send('launch-game', selectedVersionData.identifier);
    } else {
      if (!installPath) return;
      setIsDownloading(true);
      window.electronAPI.send('download-version', {
        version: selectedVersionData.identifier,
        downloadPath: installPath,
      });
      window.electronAPI.receiveOnce('download-version', (result: { error?: string }) => {
        if (result?.error) {
          setIsDownloading(false);
        }
        // Success is handled by the context progress listeners
      });
    }
  };

  const handleDelete = () => {
    if (!selectedVersionData || !window.electronAPI) return;
    setIsDeleting(true);

    // Listen for deletion result
    window.electronAPI.receiveOnce('delete-version', (result: { error?: string }) => {
      if (result?.error) {
        setIsDeleting(false);
      }
      // Success is handled by the context progress listeners
    });

    window.electronAPI.send('delete-version', selectedVersionData.identifier);
  };

  const handleRepair = async () => {
    if (!selectedVersionData || !window.electronAPI) return;
    setIsRepairing(true);

    // Listen for repair result
    window.electronAPI.receiveOnce('repair-version', (result: { error?: string }) => {
      if (result?.error) {
        setIsRepairing(false);
      }
      // Success is handled by the context progress listeners
    });

    window.electronAPI.send('repair-version', selectedVersionData.identifier);
  };

  const handleCreateShortcuts = async () => {
    if (!selectedVersionData || !window.electronAPI) return;

    // Create shortcuts for this specific version
    window.electronAPI.send('create-shortcuts', {
      version: selectedVersionData.identifier,
      options: {
        createExeShortcut: true,
        createDirShortcut: false,
      },
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex-1 min-h-0">
        <div className="space-y-8">
          {/* Loading Cards */}
          <Card className="mining-surface energy-glow border-primary/20">
            <CardHeader className="pb-6">
              <div className="animate-pulse space-y-3">
                <div className="h-6 bg-muted rounded w-1/3"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="h-20"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 flex-1 min-h-0">
      <div className="space-y-8">
        {/* Header Section */}

        {/* Version Selection Section */}
        <Card className="mining-surface border-primary/20 shadow-lg overflow-hidden">
          <CardHeader className="border-b border-border/50 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg text-primary">Select Version</CardTitle>
                <CardDescription>Choose from stable releases and experimental builds</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <VersionSelector versions={versions} selectedVersion={selectedVersion} onVersionChange={setSelectedVersion} />
          </CardContent>
        </Card>

        {/* Mobile Layout: Actions after Version Selection */}
        <div className="xl:hidden">
          <Card className="mining-surface border-primary/20 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-border/50 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg text-primary">Actions</CardTitle>
                  <CardDescription>Install, launch, or manage</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Progress Display */}
              {(operationType || isDownloading || isRepairing || isDeleting) && selectedVersionData && (
                <div className="space-y-2 rounded-lg bg-muted/50 border border-border p-4 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      {operationType === 'download' && 'Installing Game'}
                      {operationType === 'repair' && 'Verifying Installation'}
                      {operationType === 'delete' && 'Uninstalling Game'}
                      {!operationType && isDownloading && 'Installing Game'}
                      {!operationType && isRepairing && 'Verifying Installation'}
                      {!operationType && isDeleting && 'Uninstalling Game'}
                    </span>
                    <span className="text-sm text-muted-foreground">{operationProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={operationProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{operationStatus || 'Processing...'}</p>
                  <p className="text-xs text-yellow-600 mt-1">
                    Debug: Type={operationType}, Progress={operationProgress}, isDownloading={isDownloading ? 'yes' : 'no'}, isDeleting=
                    {isDeleting ? 'yes' : 'no'}, isRepairing={isRepairing ? 'yes' : 'no'}
                  </p>
                </div>
              )}
              <VersionActions
                version={selectedVersionData}
                isInstalled={selectedVersionData ? isVersionInstalled(selectedVersionData.version) : false}
                onInstallOrLaunch={handleInstallOrLaunch}
                onDelete={handleDelete}
                onRepair={handleRepair}
                onCreateShortcuts={handleCreateShortcuts}
                isDownloading={isDownloading}
                isRepairing={isRepairing}
                isDeleting={isDeleting}
                isCurrentVersion={false}
              />
            </CardContent>
          </Card>
        </div>

        {/* Desktop Layout: Details and Actions Grid */}
        <div className="hidden xl:grid xl:grid-cols-3 gap-6">
          {/* Version Details Card - Takes 2 columns on xl screens */}
          {selectedVersionData && (
            <Card className="mining-surface border-primary/20 shadow-lg xl:col-span-2 overflow-hidden">
              <CardHeader className="border-b border-border/50 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-primary">Version Details</CardTitle>
                    <CardDescription>Information about {selectedVersionData.displayName}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <VersionDetails version={selectedVersionData} />
              </CardContent>
            </Card>
          )}

          {/* Actions Card - Takes 1 column */}
          <Card className="mining-surface border-primary/20 shadow-lg overflow-hidden self-start">
            <CardHeader className="border-b border-border/50 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg text-primary">Actions</CardTitle>
                  <CardDescription>Install, launch, or manage</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Progress Display */}
              {(operationType || isDownloading || isRepairing || isDeleting) && selectedVersionData && (
                <div className="space-y-2 rounded-lg bg-muted/50 border border-border p-4 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      {operationType === 'download' && 'Installing Game'}
                      {operationType === 'repair' && 'Verifying Installation'}
                      {operationType === 'delete' && 'Uninstalling Game'}
                      {!operationType && isDownloading && 'Installing Game'}
                      {!operationType && isRepairing && 'Verifying Installation'}
                      {!operationType && isDeleting && 'Uninstalling Game'}
                    </span>
                    <span className="text-sm text-muted-foreground">{operationProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={operationProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{operationStatus || 'Processing...'}</p>
                  <p className="text-xs text-yellow-600 mt-1">
                    Debug: Type={operationType}, Progress={operationProgress}, isDownloading={isDownloading ? 'yes' : 'no'}, isDeleting=
                    {isDeleting ? 'yes' : 'no'}, isRepairing={isRepairing ? 'yes' : 'no'}
                  </p>
                </div>
              )}
              <VersionActions
                version={selectedVersionData}
                isInstalled={selectedVersionData ? isVersionInstalled(selectedVersionData.version) : false}
                onInstallOrLaunch={handleInstallOrLaunch}
                onDelete={handleDelete}
                onRepair={handleRepair}
                onCreateShortcuts={handleCreateShortcuts}
                isDownloading={isDownloading}
                isRepairing={isRepairing}
                isDeleting={isDeleting}
                isCurrentVersion={false}
              />
            </CardContent>
          </Card>
        </div>

        {/* Mobile Layout: Version Details */}
        <div className="xl:hidden">
          {selectedVersionData && (
            <Card className="mining-surface border-primary/20 shadow-lg overflow-hidden">
              <CardHeader className="border-b border-border/50 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-primary">Version Details</CardTitle>
                    <CardDescription>Information about {selectedVersionData.displayName}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <VersionDetails version={selectedVersionData} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <div className="h-20"></div>
    </div>
  );
}
