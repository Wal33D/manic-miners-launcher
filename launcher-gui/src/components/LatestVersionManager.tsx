import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Download, RotateCcw, Check } from 'lucide-react';
import { NotificationData } from '@/components/GameNotifications';

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

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;
    const retryDelay = 1000; // 1 second

    // Check if latest version is installed
    const checkInstallStatus = () => {
      if (window.electronAPI) {
        console.log(`Checking installation status (attempt ${retryCount + 1}/${maxRetries})`);

        // Set up listener first
        const handleVersionInfo = (data: any) => {
          console.log('Version information received:', data);
          setIsCheckingInstallation(false);

          if (data?.versions) {
            // Look for installed version matching our latest version
            const identifier = `ManicMiners-Baraklava-V${latestVersion.version}`;
            console.log('Looking for identifier:', identifier);
            const installedVersion = data.versions.find((v: any) => v.identifier === identifier && v.directory);
            console.log('Found installed version:', installedVersion);
            setIsInstalled(!!installedVersion);

            // Clean up listener
            window.electronAPI.removeAllListeners('request-version-information');
          } else {
            console.log('No version data received, retrying...');
            retryCheck();
          }
        };

        // Set up the listener
        window.electronAPI.receive('request-version-information', handleVersionInfo);

        // Send the request
        window.electronAPI.send('request-version-information');

        // Set up timeout for retry
        const timeoutId = setTimeout(() => {
          console.log('Request timed out, retrying...');
          retryCheck();
        }, retryDelay);

        const retryCheck = () => {
          clearTimeout(timeoutId);
          retryCount++;
          if (retryCount < maxRetries) {
            setTimeout(checkInstallStatus, retryDelay);
          } else {
            console.log('Max retries reached, assuming not installed');
            setIsCheckingInstallation(false);
            setIsInstalled(false);
            window.electronAPI.removeAllListeners('request-version-information');
          }
        };
      } else {
        // In web preview, randomly set as installed or not
        setIsCheckingInstallation(false);
        setIsInstalled(Math.random() > 0.5);
      }
    };

    checkInstallStatus();

    // Cleanup function
    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('request-version-information');
      }
    };
  }, [latestVersion.version]);

  // Listen for version updates (after installations, repairs, etc.)
  useEffect(() => {
    if (window.electronAPI) {
      const handleVersionsUpdated = () => {
        console.log('Versions updated, rechecking installation status');
        setIsCheckingInstallation(true);
        // Trigger a recheck
        window.electronAPI.send('request-version-information');
      };

      window.electronAPI.receive('versions-updated', handleVersionsUpdated);

      return () => {
        window.electronAPI.removeAllListeners('versions-updated');
      };
    }
  }, []);

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

    onNotificationUpdate(notifications);
  }, [isDownloading, isVerifying, downloadProgress, verifyStatus, onNotificationUpdate]);

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
          setIsInstalled(true);
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

  return (
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
              <Button variant="outline" onClick={handleVerify} disabled={isDownloading || isVerifying} className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                {isVerifying ? 'Verifying...' : 'Verify & Repair'}
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
  );
}
