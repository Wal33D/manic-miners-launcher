import { useState, useEffect, useCallback } from 'react';
import { useArchivedVersion } from '@/contexts/ArchivedVersionContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Download, RotateCcw, Check, Trash2, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { Progress } from '@/components/ui/progress';
import { logger } from '@/utils/frontendLogger';
import { useAssets } from '@/hooks/useAssets';
import { getApiUrl, ENV } from '@/config/environment';
import { sortByVersion } from '@/utils/version';

import { GameVersion } from '@/types/game';
import type { Version, VersionsResponse } from '@/types/api';

interface ArchivedVersionManagerProps {
  selectedVersion?: string;
  onVersionChange?: (version: string) => void;
  externalVersionControl?: boolean;
}

/**
 * Manages archived versions of Manic Miners with the same layout as LatestVersionManager
 * Supports both internal and external version selection
 */
/**
 * Version Selector Component for external use
 */
interface VersionSelectorProps {
  versions: GameVersion[];
  selectedVersion: string;
  onVersionChange: (version: string) => void;
  installedVersions: Set<string>;
  disabled?: boolean;
}

export function VersionSelector({ versions, selectedVersion, onVersionChange, installedVersions, disabled = false }: VersionSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Version</label>
      <Select value={selectedVersion} onValueChange={onVersionChange} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a version..." />
        </SelectTrigger>
        <SelectContent>
          {versions.map(version => (
            <SelectItem key={version.version} value={version.version}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span>{version.displayName}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-xs ${
                      version.experimental
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    }`}
                  >
                    {version.experimental ? 'Exp' : 'Stable'}
                  </span>
                </div>
                {installedVersions.has(version.version) && <Check className="w-4 h-4 ml-2 text-green-500" />}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ArchivedVersionManager({
  selectedVersion: externalSelectedVersion,
  onVersionChange: externalOnVersionChange,
  externalVersionControl = false,
}: ArchivedVersionManagerProps = {}) {
  const { getAssetUrl } = useAssets();

  // Use context for persistent state
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
    currentVersionId,
    installedVersions,
    setInstalledVersions,
  } = useArchivedVersion();

  // Local state for UI-only concerns
  const [isLaunching, setIsLaunching] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [installPath, setInstallPath] = useState<string>('');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Version management state
  const [versions, setVersions] = useState<GameVersion[]>([]);
  const [internalSelectedVersion, setInternalSelectedVersion] = useState<string>('');

  // Use external or internal version control
  const selectedVersion = externalVersionControl ? externalSelectedVersion || '' : internalSelectedVersion;
  const setSelectedVersion = externalVersionControl ? externalOnVersionChange || (() => {}) : setInternalSelectedVersion;

  // Load versions and install path
  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await fetch(getApiUrl(ENV.API_ENDPOINTS.VERSIONS_ARCHIVED));
        const data: VersionsResponse = await response.json();

        if (data?.versions) {
          const sorted = sortByVersion(data.versions);
          setVersions(sorted);
          if (sorted.length > 0 && !externalVersionControl) {
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
      // Handle directories
      window.electronAPI.send('get-directories');
      window.electronAPI.receiveOnce('get-directories', (dirResult: any) => {
        if (dirResult?.status) {
          setInstallPath(dirResult.directories.launcherInstallPath);
        }
      });

      // Set up persistent listener for version information updates
      const handleVersionUpdate = (data: any) => {
        if (data?.versions) {
          // All versions from this endpoint are archived versions only
          const sorted = sortByVersion(data.versions);
          setVersions(sorted);
          if (!externalVersionControl) {
            if (data.defaultVersion) {
              setSelectedVersion(data.defaultVersion.version);
            } else if (sorted.length > 0) {
              setSelectedVersion(sorted[0].version);
            }
          }
          const installed = new Set<string>(sorted.filter((v: any) => v.directory).map((v: any) => v.version));
          setInstalledVersions(installed);
        }
        setLoading(false);
      };

      // Set up persistent listener
      window.electronAPI.receive('request-archived-versions-information', handleVersionUpdate);

      // Request initial data
      window.electronAPI.send('request-archived-versions-information');

      // Cleanup listener on unmount
      return () => {
        window.electronAPI.removeAllListeners('request-archived-versions-information');
      };
    } else {
      // For web preview, fetch from the API
      fetchVersions();
    }
  }, []);

  const selectedVersionData = versions.find(v => v.version === selectedVersion);
  const isVersionInstalled = selectedVersionData ? installedVersions.has(selectedVersionData.version) : false;

  // Event handlers
  const handleInstallOrLaunch = () => {
    if (!selectedVersionData || !window.electronAPI) return;

    if (isVersionInstalled) {
      setIsLaunching(true);
      window.electronAPI.send('launch-game', selectedVersionData.identifier);
      // Reset launching state after delay
      setTimeout(() => setIsLaunching(false), 2000);
    } else {
      if (!installPath) return;
      setIsDownloading(true);
      window.electronAPI.send('download-version', {
        version: selectedVersionData.identifier,
        downloadPath: installPath,
      });
      window.electronAPI.receiveOnce('download-version', (result: any) => {
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
    window.electronAPI.receiveOnce('delete-version', (result: any) => {
      if (result?.error) {
        setIsDeleting(false);
      }
      // Success is handled by the context progress listeners
    });

    window.electronAPI.send('delete-version', selectedVersionData.identifier);
    setShowDeleteModal(false);
  };

  const handleRepair = async () => {
    if (!selectedVersionData || !window.electronAPI) return;
    setIsRepairing(true);

    // Listen for repair result
    window.electronAPI.receiveOnce('repair-version', (result: any) => {
      if (result?.error) {
        setIsRepairing(false);
      }
      // Success is handled by the context progress listeners
    });

    window.electronAPI.send('repair-version', selectedVersionData.identifier);
  };

  if (loading) {
    return (
      <Card className="mining-surface border-primary/20">
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
    );
  }

  if (!selectedVersionData) {
    return (
      <Card className="mining-surface border-primary/20">
        <CardContent className="p-6">
          <p className="text-muted-foreground">No archived versions available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mining-surface border-primary/20 shadow-lg overflow-hidden">
        {/* Cover Image Section (optional) */}
        {selectedVersionData.coverImage && (
          <div className="relative h-64 overflow-hidden">
            <img src={selectedVersionData.coverImage} alt={selectedVersionData.displayName} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 flex gap-2">
              {isVersionInstalled && !isDownloading && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-background/80 backdrop-blur-sm">
                  <Check className="w-3 h-3" />
                  Installed
                </Badge>
              )}
            </div>
          </div>
        )}

        <CardHeader className="space-y-1">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">{selectedVersionData.displayName}</CardTitle>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="secondary" className="text-xs">
                  v{selectedVersionData.version}
                </Badge>
                <Badge variant={selectedVersionData.experimental ? 'destructive' : 'default'} className="text-xs">
                  {selectedVersionData.experimental ? 'Experimental' : 'Stable'}
                </Badge>
                <span>Released {selectedVersionData.releaseDate}</span>
                <span>•</span>
                <span>{selectedVersionData.size}</span>
              </div>
            </div>
          </div>
          <CardDescription className="text-base mt-4">
            <div className="border border-border/50 rounded-md p-4 bg-muted/30 space-y-3">
              {/* Extract key highlights if available */}
              {selectedVersionData.description && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-foreground">Release Notes</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                      className="h-6 px-2 text-xs"
                    >
                      {isDescriptionExpanded ? (
                        <>
                          <ChevronUp className="w-3 h-3 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3 h-3 mr-1" />
                          Show More
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Description content */}
                  <div
                    className={`relative text-sm leading-relaxed text-muted-foreground overflow-hidden transition-all duration-300 ${isDescriptionExpanded ? 'max-h-none' : 'max-h-20'}`}
                  >
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      {selectedVersionData.description.split('\n').map((paragraph, index) => {
                        if (paragraph.trim() === '') return null;

                        // Handle lists and bullet points
                        if (paragraph.trim().startsWith('-')) {
                          return (
                            <ul key={index} className="list-disc list-inside space-y-1 my-2">
                              {paragraph
                                .split('\n')
                                .filter(line => line.trim().startsWith('-'))
                                .map((item, itemIndex) => (
                                  <li key={itemIndex} className="text-sm">
                                    {item.trim().substring(1).trim()}
                                  </li>
                                ))}
                            </ul>
                          );
                        }

                        // Handle regular paragraphs
                        return (
                          <p key={index} className="mb-3 last:mb-0">
                            {paragraph.trim()}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fade overlay when collapsed */}
                  {!isDescriptionExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none" />
                  )}
                </div>
              )}
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              onClick={handleInstallOrLaunch}
              disabled={isDownloading || isRepairing || isDeleting || (isVersionInstalled && isLaunching)}
              className="w-full"
              size="lg"
            >
              {isVersionInstalled ? (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  {isLaunching ? 'Launching...' : 'Launch Game'}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  {isDownloading ? 'Installing...' : 'Install Game'}
                </>
              )}
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRepair}
                disabled={!isVersionInstalled || isDownloading || isRepairing || isDeleting || isLaunching}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                {isRepairing ? 'Verifying...' : 'Verify'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                disabled={!isVersionInstalled || isDownloading || isRepairing || isDeleting || isLaunching}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Uninstall
              </Button>
            </div>
          </div>

          {/* Progress Display */}
          {(operationType || isDownloading || isRepairing || isDeleting) && (
            <div className="space-y-2 rounded-lg bg-muted/50 border border-border p-4">
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
            </div>
          )}

          {/* Status Messages */}
          {!isDownloading && !isRepairing && !isDeleting && !operationType && (
            <div
              className={`rounded-lg border p-3 ${
                isVersionInstalled ? 'bg-green-500/10 border-green-500/20' : 'bg-yellow-500/10 border-yellow-500/20'
              }`}
            >
              <p
                className={`text-sm flex items-center gap-2 ${
                  isVersionInstalled ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
                }`}
              >
                {isVersionInstalled ? (
                  <>
                    <Check className="w-4 h-4" />
                    Ready to play! {selectedVersionData.displayName} is installed and ready to launch.
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    {selectedVersionData.displayName} is not installed yet. Click "Install Game" to get started.
                  </>
                )}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={handleDelete}
        title="Uninstall Game Version"
        description={`Are you sure you want to uninstall ${selectedVersionData.displayName}? This will remove all game files and cannot be undone.`}
        confirmText="Uninstall"
        variant="destructive"
      />
    </>
  );
}
