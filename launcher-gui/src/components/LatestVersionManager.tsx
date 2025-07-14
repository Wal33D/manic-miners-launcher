import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Download, RotateCcw, Check } from 'lucide-react';
import { NotificationData } from '@/components/GameNotifications';
import { Version } from '@/api/versionTypes';

interface LatestVersionManagerProps {
  onNotificationUpdate: (notifications: NotificationData[]) => void;
}

export function LatestVersionManager({ onNotificationUpdate }: LatestVersionManagerProps) {
  const [latestVersion, setLatestVersion] = useState<Version | null>(null);
  const [installPath, setInstallPath] = useState('');
  const [isInstalled, setIsInstalled] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const fetchLatest = async () => {
      if (window.electronAPI) {
        window.electronAPI.send('get-directories');
        window.electronAPI.receiveOnce('get-directories', dirResult => {
          if (dirResult?.status) {
            setInstallPath(dirResult.directories.launcherInstallPath);
          }
        });

        window.electronAPI.send('request-version-information');
        window.electronAPI.receiveOnce('request-version-information', data => {
          if (data?.versions?.length) {
            const sorted = data.versions.sort((a: Version, b: Version) => {
              const parse = (v: string) => v.split('.').map(n => parseInt(n, 10));
              const aParts = parse(a.version);
              const bParts = parse(b.version);
              for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
                const numA = aParts[i] || 0;
                const numB = bParts[i] || 0;
                if (numA !== numB) return numB - numA;
              }
              return 0;
            });
            const latest = sorted[0];
            setLatestVersion(latest);
            setIsInstalled(!!latest.directory);
          }
        });
      } else {
        try {
          const resp = await fetch('https://manic-launcher.vercel.app/api/versions/archived');
          const json = await resp.json();
          if (json?.versions?.length) {
            const sorted = json.versions.sort((a: Version, b: Version) => {
              const parse = (v: string) => v.split('.').map((n: string) => parseInt(n, 10));
              const aParts = parse(a.version);
              const bParts = parse(b.version);
              for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
                const numA = aParts[i] || 0;
                const numB = bParts[i] || 0;
                if (numA !== numB) return numB - numA;
              }
              return 0;
            });
            setLatestVersion(sorted[0]);
            setIsInstalled(false);
          }
        } catch {
          // ignore fetch errors in preview mode
        }
      }
    };

    fetchLatest();
  }, []);

  useEffect(() => {
    if (!latestVersion) return;
    if (isDownloading && downloadProgress > 0) {
      const notifications: NotificationData[] = [
        {
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
        },
      ];
      onNotificationUpdate(notifications);
    } else if (!isDownloading) {
      onNotificationUpdate([]);
    }
  }, [isDownloading, downloadProgress, latestVersion, onNotificationUpdate]);

  const handleInstall = async () => {
    if (!latestVersion) return;
    if (window.electronAPI) {
      setIsDownloading(true);
      setDownloadProgress(0);

      window.electronAPI.send('download-version', {
        version: latestVersion.identifier,
        downloadPath: installPath,
      });

      window.electronAPI.receive('download-progress', status => {
        if (status.progress !== undefined) setDownloadProgress(status.progress);
      });

      window.electronAPI.receiveOnce('download-version', result => {
        setIsDownloading(false);
        if (result?.downloaded) {
          setIsInstalled(true);
        }
      });
    } else {
      // Web preview simulation
      setIsDownloading(true);
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
    if (!latestVersion) return;
    setIsLaunching(true);

    if (window.electronAPI) {
      window.electronAPI.send('launch-game', latestVersion.identifier);
      window.electronAPI.receiveOnce('launch-game', () => {
        setIsLaunching(false);
      });
    } else {
      setTimeout(() => {
        setIsLaunching(false);
      }, 2000);
    }
  };

  const handleUpdate = async () => {
    await handleInstall();
  };

  if (!latestVersion) {
    return null;
  }

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
        <p className="text-sm text-muted-foreground">{latestVersion.description}</p>

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
            <Button onClick={handleInstall} disabled={isDownloading} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              {isDownloading ? 'Installing...' : 'Install Latest'}
            </Button>
          ) : (
            <>
              <Button onClick={handleLaunch} disabled={isLaunching} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                {isLaunching ? 'Launching...' : 'Launch Game'}
              </Button>
              <Button variant="outline" onClick={handleUpdate} disabled={isDownloading} className="flex items-center gap-2">
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
