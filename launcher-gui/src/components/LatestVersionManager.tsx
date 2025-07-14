import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Download, RotateCcw, Check, Trash2, RefreshCw, Settings, ChevronDown } from 'lucide-react';
import { NotificationData } from '@/components/GameNotifications';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LatestVersionManagerProps {
  onNotificationUpdate: (notifications: NotificationData[]) => void;
  removeNotification: (id: string) => void;
}

export function LatestVersionManager({ onNotificationUpdate, removeNotification }: LatestVersionManagerProps) {
  const [isInstalled, setIsInstalled] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState('');
  const [isCheckingInstallation, setIsCheckingInstallation] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteProgress, setDeleteProgress] = useState(0);
  const [deleteStatus, setDeleteStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [updateStatus, setUpdateStatus] = useState('');

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
  });


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
      console.log(`Checking installation status (attempt ${retryCount + 1}/${maxRetries})`);

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
          console.log('Installation check result:', !!installedVersion, 'for identifier:', identifier);

          // Clean up listener
          window.electronAPI.removeAllListeners('request-latest-version-information');
        } else if (data?.error) {
          console.error('Version check error:', data.error);
          retryCheck();
        } else {
          console.log('No versions data in response, retrying...');
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
          console.log('Request timed out, retrying...');
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
          console.log('Max retries reached, assuming not installed');
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
        console.log('Versions updated, rechecking installation status');
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
    setDownloadProgress(0);

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
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsDownloading(false);
            setIsInstalled(true);
            return 100;
          }
          return prev + Math.random() * 5;
        });
      }, 200);
    }
  };

  const handleLaunch = async () => {
    setIsLaunching(true);

    if (window.electronAPI) {
      const identifier = 'latest'; // Use 'latest' as the identifier
      console.log('Launching game with identifier:', identifier);
      window.electronAPI.send('launch-game', identifier);
    }

    // Simulate launch delay
    setTimeout(() => {
      setIsLaunching(false);
    }, 2000);
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setDownloadProgress(0);
    setVerifyStatus('Starting verification...');

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
    setUpdateProgress(0);
    setUpdateStatus('Starting update...');

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
        console.error('Update error:', error);
        setIsUpdating(false);
        setUpdateStatus('Update failed');
        
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
    setDeleteProgress(0);

    if (window.electronAPI) {
      try {
        console.log('Deleting latest version...');
        
        // Listen for completion only (progress is handled globally)
        window.electronAPI.receive('delete-latest-progress', (progressData: any) => {
          if (progressData.progress >= 100) {
            // Clean up listener and finish deletion
            setTimeout(() => {
              setIsDeleting(false);
              setIsInstalled(false);
              setDeleteProgress(0);
              setDeleteStatus('');
              window.electronAPI.removeAllListeners('delete-latest-progress');
            }, 1000);
          }
        });

        // Start the deletion process
        window.electronAPI.send('delete-latest-version', {
          version: 'latest', // Use 'latest' instead of hardcoded version
        });
      } catch (error) {
        console.error('Error deleting version:', error);
        setIsDeleting(false);
        setDeleteProgress(0);
        window.electronAPI.removeAllListeners('delete-latest-progress');
      }
    } else {
      // Fallback simulation for web preview
      const progressInterval = setInterval(() => {
        setDeleteProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setIsDeleting(false);
              setIsInstalled(false);
              setDeleteProgress(0);
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 150);
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
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {latestVersion.displayName}
              <Badge variant="default" className="ml-2">
                Latest
              </Badge>
            </CardTitle>
            <CardDescription>
              Released {latestVersion.releaseDate} • {latestVersion.size}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {isCheckingInstallation ? (
              <Badge variant="outline" className="flex items-center gap-1">
                <Download className="w-3 h-3 animate-spin" />
                Checking...
              </Badge>
            ) : (
              isInstalled &&
              !isDownloading && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Installed
                </Badge>
              )
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{latestVersion.description}</p>

        {(isDownloading || isVerifying || isUpdating) && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{isVerifying ? 'Verifying...' : isUpdating ? 'Updating...' : 'Downloading...'}</span>
              <span>{Math.round(isUpdating ? updateProgress : downloadProgress)}%</span>
            </div>
            <Progress value={isUpdating ? updateProgress : downloadProgress} className="w-full" />
            {isVerifying && verifyStatus && <div className="text-xs text-muted-foreground">{verifyStatus}</div>}
            {isUpdating && updateStatus && <div className="text-xs text-muted-foreground">{updateStatus}</div>}
          </div>
        )}

        <div className="flex gap-2">
          {isCheckingInstallation ? (
            <Button disabled className="flex items-center gap-2">
              <Download className="w-4 h-4 animate-spin" />
              Checking Installation...
            </Button>
          ) : !isInstalled ? (
            <Button onClick={handleInstall} disabled={isDownloading || isVerifying} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              {isDownloading ? 'Installing...' : 'Install Latest'}
            </Button>
          ) : (
            <>
              <Button onClick={handleLaunch} disabled={isLaunching || isVerifying || isUpdating} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                {isLaunching ? 'Launching...' : 'Launch Game'}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" disabled={isDownloading || isVerifying || isDeleting || isLaunching || isUpdating} className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Game Options
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleUpdate} disabled={isDownloading || isVerifying || isDeleting || isLaunching || isUpdating}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {isUpdating ? 'Updating...' : 'Update Game'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleVerify} disabled={isDownloading || isVerifying || isDeleting || isLaunching || isUpdating}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {isVerifying ? 'Verifying...' : 'Verify & Repair'}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setShowDeleteModal(true)} 
                    disabled={isDownloading || isVerifying || isDeleting || isLaunching || isUpdating}
                    className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {isDeleting ? 'Uninstalling...' : 'Uninstall'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {isCheckingInstallation && <div className="text-xs text-muted-foreground mt-2">🔍 Checking if latest version is installed...</div>}

        {!isCheckingInstallation && isInstalled && !isVerifying && !isUpdating && (
          <div className="text-xs text-muted-foreground mt-2">
            ✅ Latest version is installed. Use "Launch Game" to play or "Game Options" for update, repair, and uninstall options.
          </div>
        )}
      </CardContent>
    </Card>
    </>
  );
}
