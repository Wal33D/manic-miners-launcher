import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Download, RotateCcw, Check, Trash2, RefreshCw, Settings, ChevronDown, ExternalLink } from 'lucide-react';
import { NotificationData } from '@/components/GameNotifications';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { logger } from '@/utils/frontendLogger';
import { useAssets } from '@/hooks/useAssets';

interface LatestVersionManagerProps {
  onNotificationUpdate: (notifications: NotificationData[]) => void;
  removeNotification: (id: string) => void;
}

export function LatestVersionManager({ onNotificationUpdate, removeNotification }: LatestVersionManagerProps) {
  const { getAssetUrl } = useAssets();
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCheckingInstallation, setIsCheckingInstallation] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreatingShortcuts, setIsCreatingShortcuts] = useState(false);

  // State for version information - latest version is always "latest"
  const [latestVersion, setLatestVersion] = useState({
    version: 'latest', // Use 'latest' instead of hardcoded version
    title: 'ManicMiners',
    displayName: 'Manic Miners (Latest)',
    releaseDate: 'Current',
    size: '~1.0 GB',
    sizeInBytes: 1073741824,
    description: 'Latest stable release with bug fixes and performance improvements.',
    experimental: false,
    coverImage: getAssetUrl('manic-miners-cover-image.png'),
  });
  const [isLoadingVersion, setIsLoadingVersion] = useState(false);

  // Note: Removed itch.io data.json fetch due to CSP restrictions and limited usefulness

  // Function to check installation status with fresh retry state
  const checkInstallStatus = useCallback(() => {
    if (!window.electronAPI) {
      // In web preview, randomly set as installed or not
      setIsCheckingInstallation(false);
      setIsInstalled(Math.random() > 0.5);
      return;
    }

    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 5000; // 5 seconds - give more time for file system operations

    const performCheck = () => {
      logger.componentLog('LatestVersionManager', `Checking installation status (attempt ${retryCount + 1}/${maxRetries})`);

      let responseReceived = false;

      // Set up listener first
      const handleVersionInfo = (data: any) => {
        responseReceived = true;
        setIsCheckingInstallation(false);

        if (data?.versions) {
          // Look for installed version matching our latest version
          const identifier = 'latest'; // Use 'latest' as the identifier
          const installedVersion = data.versions.find((v: any) => v.identifier === identifier && v.directory);
          setIsInstalled(!!installedVersion);
          logger.stateLog('LatestVersionManager', 'Installation check result', {
            isInstalled: !!installedVersion,
            identifier: identifier,
          });

          // Clean up listener
          window.electronAPI.removeAllListeners('request-latest-version-information');
        } else if (data?.error) {
          logger.error('LatestVersionManager', 'Version check error', { error: data.error });
          retryCheck();
        } else {
          logger.warn('LatestVersionManager', 'No versions data in response, retrying...');
          retryCheck();
        }
      };

      // Set up the listener
      window.electronAPI.receive('request-latest-version-information', handleVersionInfo);

      // Send the request
      window.electronAPI.send('request-latest-version-information');

      // Set up timeout for retry
      const timeoutId = setTimeout(() => {
        if (!responseReceived) {
          logger.warn('LatestVersionManager', 'Request timed out, retrying...');
          window.electronAPI.removeAllListeners('request-latest-version-information');
          retryCheck();
        }
      }, retryDelay);

      const retryCheck = () => {
        clearTimeout(timeoutId);
        retryCount++;
        if (retryCount < maxRetries) {
          setTimeout(performCheck, retryDelay);
        } else {
          logger.warn('LatestVersionManager', 'Max retries reached, assuming not installed');
          setIsCheckingInstallation(false);
          setIsInstalled(false);
          window.electronAPI.removeAllListeners('request-latest-version-information');
        }
      };
    };

    performCheck();
  }, [latestVersion.version]);

  useEffect(() => {
    checkInstallStatus();

    // Cleanup function
    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('request-latest-version-information');
      }
    };
  }, [checkInstallStatus]);

  // Listen for version updates (after installations, repairs, etc.)
  useEffect(() => {
    if (window.electronAPI) {
      const handleVersionsUpdated = () => {
        logger.info('LatestVersionManager', 'Versions updated, rechecking installation status');
        setIsCheckingInstallation(true);
        // Use the fresh checkInstallStatus function with reset retry state
        checkInstallStatus();
      };

      window.electronAPI.receive('versions-updated', handleVersionsUpdated);

      return () => {
        window.electronAPI.removeAllListeners('versions-updated');
      };
    }
  }, [checkInstallStatus]);

  // Note: Progress notifications are now handled globally in App.tsx
  // This component only needs to manage its own state

  const handleInstall = async () => {
    setIsDownloading(true);

    if (window.electronAPI) {
      // Trigger itch.io download for latest version
      window.electronAPI.send('download-latest-version', {
        version: 'latest', // Use 'latest' instead of hardcoded version
      });

      // Listen for completion only (progress is handled globally)
      window.electronAPI.receive('download-latest-progress', (progressData: any) => {
        if (progressData.progress >= 100) {
          setIsDownloading(false);
          window.electronAPI.removeAllListeners('download-latest-progress');
        }
      });
    } else {
      // Fallback simulation for web preview
      setTimeout(() => {
        setIsDownloading(false);
        setIsInstalled(true);
      }, 2000);
    }
  };

  const handleLaunch = async () => {
    setIsLaunching(true);

    if (window.electronAPI) {
      const identifier = 'latest'; // Use 'latest' as the identifier
      logger.userActionLog('Launch game', { identifier });
      window.electronAPI.send('launch-game', identifier);
    }

    // Simulate launch delay
    setTimeout(() => {
      setIsLaunching(false);
    }, 2000);
  };

  const handleVerify = async () => {
    setIsVerifying(true);

    if (window.electronAPI) {
      // Listen for completion only (progress is handled globally)
      window.electronAPI.receive('verify-repair-progress', (progressData: any) => {
        if (progressData.progress >= 100) {
          setIsVerifying(false);
          window.electronAPI.removeAllListeners('verify-repair-progress');
        }
      });

      // Listen for version updates after repair
      window.electronAPI.receive('versions-updated', () => {
        // Refresh installation status
        window.electronAPI.send('request-latest-version-information');
      });

      // Start verification and repair
      window.electronAPI.send('verify-and-repair-installation', {
        version: 'latest', // Use 'latest' instead of hardcoded version
      });
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);

    // Create update notification
    const updateNotification: NotificationData = {
      id: `update-${Date.now()}`,
      type: 'info',
      title: 'Update Started',
      message: 'Updating to the latest version...',
      timestamp: new Date().toISOString(),
      persistent: true,
    };
    onNotificationUpdate([updateNotification]);

    if (window.electronAPI) {
      // Listen for completion only (progress is handled globally)
      window.electronAPI.receive('update-progress', (progressData: any) => {
        if (progressData.progress >= 100) {
          setIsUpdating(false);
          window.electronAPI.removeAllListeners('update-progress');

          // Create success notification
          const successNotification: NotificationData = {
            id: `update-success-${Date.now()}`,
            type: 'success',
            title: 'Update Complete',
            message: 'Game has been successfully updated to the latest version!',
            timestamp: new Date().toISOString(),
            persistent: false,
          };
          onNotificationUpdate([successNotification]);
        }
      });

      // Listen for update errors
      window.electronAPI.receive('update-error', (error: any) => {
        logger.error('LatestVersionManager', 'Update error', { error });
        setIsUpdating(false);

        // Create error notification
        const errorNotification: NotificationData = {
          id: `update-error-${Date.now()}`,
          type: 'error',
          title: 'Update Failed',
          message: `Failed to update: ${error.message || 'Unknown error'}`,
          timestamp: new Date().toISOString(),
          persistent: true,
        };
        onNotificationUpdate([errorNotification]);
      });

      // Listen for version updates after update
      window.electronAPI.receive('versions-updated', () => {
        // Refresh installation status
        window.electronAPI.send('request-latest-version-information');
      });

      // Start update process (similar to install but for existing installations)
      window.electronAPI.send('update-latest-version', {
        version: 'latest', // Use 'latest' instead of hardcoded version
      });
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    if (window.electronAPI) {
      try {
        logger.userActionLog('Delete latest version');

        // Listen for completion only (progress is handled globally)
        window.electronAPI.receive('delete-latest-progress', (progressData: any) => {
          if (progressData.progress >= 100) {
            // Clean up listener and finish deletion
            setTimeout(() => {
              setIsDeleting(false);
              setIsInstalled(false);
              window.electronAPI.removeAllListeners('delete-latest-progress');
            }, 1000);
          }
        });

        // Start the deletion process
        window.electronAPI.send('delete-latest-version', {
          version: 'latest', // Use 'latest' instead of hardcoded version
        });
      } catch (error) {
        logger.error('LatestVersionManager', 'Error deleting version', { error });
        setIsDeleting(false);
        window.electronAPI.removeAllListeners('delete-latest-progress');
      }
    } else {
      // Fallback simulation for web preview
      setTimeout(() => {
        setIsDeleting(false);
        setIsInstalled(false);
      }, 2000);
    }
  };

  const handleCreateShortcuts = async () => {
    setIsCreatingShortcuts(true);

    // Create shortcut creation notification
    const notificationId = `shortcuts-${Date.now()}`;
    const shortcutNotification: NotificationData = {
      id: notificationId,
      type: 'info',
      title: 'Creating Shortcuts',
      message: 'Creating desktop and start menu shortcuts...',
      timestamp: new Date().toISOString(),
      persistent: true,
    };
    onNotificationUpdate([shortcutNotification]);

    if (window.electronAPI) {
      try {
        logger.userActionLog('Create shortcuts');

        // Listen for completion only (progress is handled globally)
        window.electronAPI.receive('create-shortcuts-progress', (progressData: any) => {
          if (progressData.progress >= 100) {
            setIsCreatingShortcuts(false);
            window.electronAPI.removeAllListeners('create-shortcuts-progress');
            window.electronAPI.removeAllListeners('create-shortcuts-error');

            // Remove the initial notification
            removeNotification(notificationId);

            // Create success notification
            const successNotification: NotificationData = {
              id: `shortcuts-success-${Date.now()}`,
              type: 'success',
              title: 'Shortcuts Created',
              message: 'Desktop and start menu shortcuts have been created successfully!',
              timestamp: new Date().toISOString(),
              persistent: false,
            };
            onNotificationUpdate([successNotification]);
          }
        });

        // Listen for shortcut creation errors
        window.electronAPI.receive('create-shortcuts-error', (error: any) => {
          setIsCreatingShortcuts(false);
          window.electronAPI.removeAllListeners('create-shortcuts-progress');
          window.electronAPI.removeAllListeners('create-shortcuts-error');

          // Remove the initial notification
          removeNotification(notificationId);

          // Create error notification
          const errorNotification: NotificationData = {
            id: `shortcuts-error-${Date.now()}`,
            type: 'error',
            title: 'Shortcut Creation Failed',
            message: `Failed to create shortcuts: ${error.message || 'Unknown error'}`,
            timestamp: new Date().toISOString(),
            persistent: true,
          };
          onNotificationUpdate([errorNotification]);
        });

        // Start shortcut creation - only create executable shortcut
        window.electronAPI.send('create-shortcuts', {
          options: {
            createExeShortcut: true,
            createDirShortcut: false,
          },
        });
      } catch (error) {
        logger.error('LatestVersionManager', 'Error creating shortcuts', { error });
        setIsCreatingShortcuts(false);
        window.electronAPI.removeAllListeners('create-shortcuts-progress');

        // Remove the initial "Creating Shortcuts" notification
        removeNotification(notificationId);

        // Create error notification
        const errorNotification: NotificationData = {
          id: `shortcuts-error-${Date.now()}`,
          type: 'error',
          title: 'Shortcut Creation Failed',
          message: `Failed to create shortcuts: ${error.message || 'Unknown error'}`,
          timestamp: new Date().toISOString(),
          persistent: true,
        };
        onNotificationUpdate([errorNotification]);
      }
    } else {
      // Fallback simulation for web preview
      setTimeout(() => {
        setIsCreatingShortcuts(false);
      }, 2000);
    }
  };

  return (
    <>
      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        title="Uninstall Latest Version"
        description={`Are you sure you want to uninstall ${latestVersion.displayName}? This will permanently remove all game files and you'll need to download them again to play.`}
        confirmText="Uninstall"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={handleDelete}
        icon={
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
        }
      />
      <Card className="w-full overflow-hidden">
        {/* Hero Image Section */}
        {latestVersion.coverImage && (
          <div className="relative h-40 w-full">
            <img src={latestVersion.coverImage} alt={latestVersion.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

            {/* Status Badge Overlay */}
            <div className="absolute top-4 right-4">
              {isCheckingInstallation ? (
                <Badge variant="outline" className="flex items-center gap-1 bg-background/80 backdrop-blur-sm">
                  <Download className="w-3 h-3 animate-spin" />
                  Checking...
                </Badge>
              ) : (
                isInstalled &&
                !isDownloading && (
                  <Badge variant="secondary" className="flex items-center gap-1 bg-background/80 backdrop-blur-sm">
                    <Check className="w-3 h-3" />
                    Installed
                  </Badge>
                )
              )}
            </div>
          </div>
        )}

        <CardHeader className="space-y-1">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">{latestVersion.title}</CardTitle>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="default" className="text-xs">
                  LATEST
                </Badge>
                <span>Released {latestVersion.releaseDate}</span>
                <span>•</span>
                <span>{latestVersion.size}</span>
              </div>
            </div>
          </div>
          <CardDescription className="text-base mt-2">{latestVersion.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Action Buttons */}
          <div className="space-y-3">
            {isCheckingInstallation ? (
              <Button disabled className="w-full" size="lg">
                <Download className="w-4 h-4 mr-2 animate-spin" />
                Checking Installation...
              </Button>
            ) : !isInstalled ? (
              <Button onClick={handleInstall} disabled={isDownloading || isVerifying} className="w-full" size="lg">
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? 'Installing...' : 'Install Game'}
              </Button>
            ) : (
              <div className="space-y-2">
                <Button onClick={handleLaunch} disabled={isLaunching || isVerifying || isUpdating} className="w-full" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  {isLaunching ? 'Launching...' : 'Launch Game'}
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUpdate}
                    disabled={isDownloading || isVerifying || isDeleting || isLaunching || isUpdating || isCreatingShortcuts}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Update
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleVerify}
                    disabled={isDownloading || isVerifying || isDeleting || isLaunching || isUpdating || isCreatingShortcuts}
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Verify
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCreateShortcuts}
                    disabled={isDownloading || isVerifying || isDeleting || isLaunching || isUpdating || isCreatingShortcuts}
                    title="Create desktop and application shortcuts"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    {isCreatingShortcuts ? 'Creating...' : 'Shortcuts'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteModal(true)}
                    disabled={isDownloading || isVerifying || isDeleting || isLaunching || isUpdating || isCreatingShortcuts}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Uninstall
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Status Messages */}
          {isInstalled && !isCheckingInstallation && !isDownloading && !isVerifying && !isUpdating && (
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3">
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Ready to play! The latest version is installed and up to date.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
