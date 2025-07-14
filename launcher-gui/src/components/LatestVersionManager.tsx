import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Download, RotateCcw, Check, Trash2 } from 'lucide-react';
import { NotificationData } from '@/components/GameNotifications';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';

interface LatestVersionManagerProps {
  onNotificationUpdate: (notifications: NotificationData[]) => void;
}

export function LatestVersionManager({ onNotificationUpdate }: LatestVersionManagerProps) {
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

  // State for version information
  const [latestVersion, setLatestVersion] = useState({
    version: '1.0.4',
    title: 'ManicMiners',
    displayName: 'ManicMiners v1.0.4',
    releaseDate: '2024-07-13',
    size: '1.0 GB',
    sizeInBytes: 1073741824,
    description: 'Latest stable release with bug fixes and performance improvements.',
    experimental: false,
  });
  const [isLoadingVersion, setIsLoadingVersion] = useState(false);

  // Fetch latest version information
  useEffect(() => {
    const fetchLatestVersion = async () => {
      if (window.electronAPI) {
        setIsLoadingVersion(true);
        try {
          // Add IPC call to get latest version info when implemented
          console.log('Fetching latest version info...');
          // For now, keep the default version
        } catch (error) {
          console.error('Failed to fetch latest version:', error);
        } finally {
          setIsLoadingVersion(false);
        }
      }
    };

    fetchLatestVersion();
  }, []);

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
          const identifier = `ManicMiners-Baraklava-V${latestVersion.version}`;
          const installedVersion = data.versions.find((v: any) => v.identifier === identifier && v.directory);
          setIsInstalled(!!installedVersion);
          console.log('Installation check result:', !!installedVersion, 'for identifier:', identifier);

          // Clean up listener
          window.electronAPI.removeAllListeners('request-version-information');
        } else if (data?.error) {
          console.error('Version check error:', data.error);
          retryCheck();
        } else {
          console.log('No versions data in response, retrying...');
          retryCheck();
        }
      };

      // Set up the listener
      window.electronAPI.receive('request-version-information', handleVersionInfo);

      // Send the request
      window.electronAPI.send('request-version-information');

      // Set up timeout for retry
      const timeoutId = setTimeout(() => {
        if (!responseReceived) {
          console.log('Request timed out, retrying...');
          window.electronAPI.removeAllListeners('request-version-information');
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
          window.electronAPI.removeAllListeners('request-version-information');
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
        window.electronAPI.removeAllListeners('request-version-information');
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

  useEffect(() => {
    const notifications: NotificationData[] = [];

    if (isDownloading && downloadProgress > 0) {
      notifications.push({
        id: 'latest-download',
        type: 'download',
        title: `Game Download`,
        fileName: `${latestVersion.title}V${latestVersion.version}.zip`,
        fileSize: latestVersion.size,
        progress: downloadProgress,
        speed: '15.2 MB/s',
        eta: '0:24',
        status: 'Downloading version file...',
        isActive: true,
      });
    }

    if (isVerifying && downloadProgress >= 0) {
      notifications.push({
        id: 'latest-verify',
        type: 'repair',
        title: `Game Verification`,
        fileName: `${latestVersion.title}V${latestVersion.version}`,
        progress: downloadProgress,
        status: verifyStatus || 'Verifying installation...',
        isActive: true,
      });
    }

    if (isDeleting) {
      notifications.push({
        id: 'latest-uninstall',
        type: 'delete',
        title: `Game Uninstall`,
        fileName: `${latestVersion.title}V${latestVersion.version}`,
        progress: deleteProgress,
        status: deleteStatus || 'Starting uninstall...',
        isActive: true,
      });
    }

    onNotificationUpdate(notifications);
  }, [isDownloading, isVerifying, isDeleting, downloadProgress, deleteProgress, deleteStatus, verifyStatus, onNotificationUpdate, latestVersion.title, latestVersion.version]);

  const handleInstall = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    if (window.electronAPI) {
      // Listen for download progress first
      window.electronAPI.receive('download-latest-progress', (progressData: any) => {
        console.log('Download progress:', progressData);
        if (progressData.progress !== undefined) {
          setDownloadProgress(progressData.progress);
        }
        if (progressData.progress >= 100) {
          setIsDownloading(false);
          // Don't set isInstalled here - wait for versions-updated event
          // Clean up listener
          window.electronAPI.removeAllListeners('download-latest-progress');
        }
      });

      // Trigger itch.io download for latest version
      window.electronAPI.send('download-latest-version', {
        version: latestVersion.version,
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
      const identifier = `ManicMiners-Baraklava-V${latestVersion.version}`;
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
      // Listen for verification progress
      window.electronAPI.receive('verify-repair-progress', (progressData: any) => {
        console.log('Verification progress:', progressData);
        if (progressData.progress !== undefined) {
          setDownloadProgress(progressData.progress);
        }
        if (progressData.status) {
          setVerifyStatus(progressData.status);
        }
        if (progressData.progress >= 100) {
          setIsVerifying(false);
          // Clean up listener
          window.electronAPI.removeAllListeners('verify-repair-progress');
        }
      });

      // Listen for version updates after repair
      window.electronAPI.receive('versions-updated', () => {
        // Refresh installation status
        window.electronAPI.send('request-version-information');
      });

      // Start verification and repair
      window.electronAPI.send('verify-and-repair-installation', {
        version: latestVersion.version,
      });
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteProgress(0);

    if (window.electronAPI) {
      try {
        console.log('Deleting latest version...');
        
        // Listen for delete progress updates
        window.electronAPI.receive('delete-latest-progress', (progressData: any) => {
          console.log('Delete progress:', progressData);
          if (progressData.progress !== undefined) {
            setDeleteProgress(progressData.progress);
          }
          if (progressData.status) {
            setDeleteStatus(progressData.status);
          }
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
          version: latestVersion.version,
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

        {(isDownloading || isVerifying) && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{isVerifying ? 'Verifying...' : 'Downloading...'}</span>
              <span>{Math.round(downloadProgress)}%</span>
            </div>
            <Progress value={downloadProgress} className="w-full" />
            {isVerifying && verifyStatus && <div className="text-xs text-muted-foreground">{verifyStatus}</div>}
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
              <Button onClick={handleLaunch} disabled={isLaunching || isVerifying} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                {isLaunching ? 'Launching...' : 'Launch Game'}
              </Button>
              <Button variant="outline" onClick={handleVerify} disabled={isDownloading || isVerifying || isDeleting} className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                {isVerifying ? 'Verifying...' : 'Verify & Repair'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteModal(true)} 
                disabled={isDownloading || isVerifying || isDeleting || isLaunching} 
                className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
              >
                <Trash2 className="w-4 h-4" />
                {isDeleting ? 'Uninstalling...' : 'Uninstall'}
              </Button>
            </>
          )}
        </div>

        {isCheckingInstallation && <div className="text-xs text-muted-foreground mt-2">🔍 Checking if latest version is installed...</div>}

        {!isCheckingInstallation && isInstalled && !isVerifying && (
          <div className="text-xs text-muted-foreground mt-2">
            ✅ Latest version is installed. Use "Launch Game" to play or "Verify & Repair" to check files.
          </div>
        )}
      </CardContent>
    </Card>
    </>
  );
}
