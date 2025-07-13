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

  // Mock data for latest version
  const latestVersion = {
    version: '1.0.4',
    title: 'ManicMiners',
    displayName: 'ManicMiners v1.0.4',
    releaseDate: '2024-07-13',
    size: '582.3 MB',
    sizeInBytes: 610871296,
    description: 'Latest stable release with bug fixes and performance improvements.',
    experimental: false
  };

  useEffect(() => {
    // Check if latest version is installed (mock check)
    const checkInstallStatus = () => {
      if (window.electronAPI) {
        // In Electron environment
        window.electronAPI.send('get-directory-info');
        window.electronAPI.receive('directory-info', (directoryInfo: any) => {
          if (directoryInfo.versions) {
            setIsInstalled(directoryInfo.versions.includes(latestVersion.version));
          }
        });
      } else {
        // In web preview, randomly set as installed or not
        setIsInstalled(Math.random() > 0.5);
      }
    };

    checkInstallStatus();
  }, []);

  useEffect(() => {
    if (isDownloading && downloadProgress > 0) {
      const notifications: NotificationData[] = [{
        id: 'latest-download',
        type: 'download',
        title: `Game Download`,
        fileName: `${latestVersion.title}V${latestVersion.version}.zip`,
        fileSize: latestVersion.size,
        progress: downloadProgress,
        speed: '15.2 MB/s',
        eta: '0:24',
        status: 'Downloading version file...',
        isActive: true
      }];
      onNotificationUpdate(notifications);
    } else if (!isDownloading) {
      onNotificationUpdate([]);
    }
  }, [isDownloading, downloadProgress, onNotificationUpdate]);

  const handleInstall = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
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

    if (window.electronAPI) {
      // In Electron environment, trigger actual download
      window.electronAPI.send('download-version', {
        version: latestVersion.version,
        downloadUrl: `https://example.com/download/${latestVersion.version}`,
        fileName: `${latestVersion.title}V${latestVersion.version}.zip`,
        size: latestVersion.sizeInBytes
      });
    }
  };

  const handleLaunch = async () => {
    setIsLaunching(true);
    
    if (window.electronAPI) {
      window.electronAPI.send('launch-version', latestVersion.version);
    }
    
    // Simulate launch delay
    setTimeout(() => {
      setIsLaunching(false);
    }, 2000);
  };

  const handleUpdate = async () => {
    // For now, just re-install
    await handleInstall();
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
            {isInstalled && !isDownloading && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                Installed
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {latestVersion.description}
        </p>

        {isDownloading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Downloading...</span>
              <span>{Math.round(downloadProgress)}%</span>
            </div>
            <Progress value={downloadProgress} className="w-full" />
          </div>
        )}

        <div className="flex gap-2">
          {!isInstalled ? (
            <Button 
              onClick={handleInstall} 
              disabled={isDownloading}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Installing...' : 'Install Latest'}
            </Button>
          ) : (
            <>
              <Button 
                onClick={handleLaunch} 
                disabled={isLaunching}
                className="flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                {isLaunching ? 'Launching...' : 'Launch Game'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleUpdate} 
                disabled={isDownloading}
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Update
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}