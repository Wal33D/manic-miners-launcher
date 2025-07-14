import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import { NotificationData } from './GameNotifications';
import { VersionSelector } from './VersionSelector';
import { VersionDetails } from './VersionDetails';
import { VersionActions } from './VersionActions';

interface GameVersion {
  gameId: number;
  title: string;
  displayName: string;
  identifier: string;
  experimental: boolean;
  version: string;
  releaseDate: string;
  filename: string;
  type: string;
  md5Hash: string;
  size: string;
  sizeInBytes: number;
  downloadUrl: string;
  coverImage: string;
  thumbnailUrl: string;
  detailsUrl: string;
  description: string;
}

interface GameVersionSelectorProps {
  onDownloadStart?: () => void;
  onDownloadEnd?: () => void;
  onNotificationUpdate: (notifications: NotificationData[]) => void;
}

export function GameVersionSelector({ onDownloadStart, onDownloadEnd, onNotificationUpdate }: GameVersionSelectorProps) {
  const [versions, setVersions] = useState<GameVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [installedVersions, setInstalledVersions] = useState<Set<string>>(new Set());
  
  const [installPath, setInstallPath] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState('');
  const [downloadFileName, setDownloadFileName] = useState('');
  const [downloadTotalSize, setDownloadTotalSize] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState('0 MB/s');
  const [downloadEta, setDownloadEta] = useState('--:--');


  // Repair states
  const [isRepairing, setIsRepairing] = useState(false);
  const [repairProgress, setRepairProgress] = useState(0);
  const [repairStatus, setRepairStatus] = useState('');

  // Delete states
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteProgress, setDeleteProgress] = useState(0);
  const [deleteStatus, setDeleteStatus] = useState('');

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await fetch('https://manic-launcher.vercel.app/api/versions/archived');
        const data = await response.json();
        
        if (data?.versions) {
          const sorted = data.versions.sort((a: GameVersion, b: GameVersion) => {
            const parseVersion = (v: string) => v.split('.').map(num => parseInt(num, 10));
            const aParts = parseVersion(a.version);
            const bParts = parseVersion(b.version);
            for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
              const numA = aParts[i] || 0;
              const numB = bParts[i] || 0;
              if (numA !== numB) return numB - numA;
            }
            return 0;
          });
          setVersions(sorted);
          if (sorted.length > 0) {
            setSelectedVersion(sorted[0].version);
          }
          // For web preview, assume no versions are installed
          setInstalledVersions(new Set<string>());
        }
      } catch (error) {
        console.error('Failed to fetch versions:', error);
      } finally {
        setLoading(false);
      }
    };

    // For Electron, use the API calls if available
    if (window.electronAPI) {
      window.electronAPI.send('get-directories');
      window.electronAPI.receiveOnce('get-directories', (dirResult: any) => {
        if (dirResult?.status) {
          setInstallPath(dirResult.directories.launcherInstallPath);
        }
      });

      window.electronAPI.send('request-version-information');
      window.electronAPI.receiveOnce('request-version-information', (data: any) => {
        if (data?.versions) {
          const sorted = data.versions.sort((a: GameVersion, b: GameVersion) => {
            const parseVersion = (v: string) => v.split('.').map(num => parseInt(num, 10));
            const aParts = parseVersion(a.version);
            const bParts = parseVersion(b.version);
            for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
              const numA = aParts[i] || 0;
              const numB = bParts[i] || 0;
              if (numA !== numB) return numB - numA;
            }
            return 0;
          });
          setVersions(sorted);
          if (data.defaultVersion) {
            setSelectedVersion(data.defaultVersion.version);
          } else if (sorted.length > 0) {
            setSelectedVersion(sorted[0].version);
          }
          const installed = new Set<string>(sorted.filter((v: any) => v.directory).map((v: any) => v.version));
          setInstalledVersions(installed);
        }
        setLoading(false);
      });
    } else {
      // For web preview, fetch from the API
      fetchVersions();
    }

    // Only set up download progress listener in Electron environment
    if (window.electronAPI) {
      window.electronAPI.receive('download-progress', (status: any) => {
        if (status.progress !== undefined) setDownloadProgress(status.progress);
        if (status.status) setDownloadStatus(status.status);
        if (status.fileName) setDownloadFileName(status.fileName);
        if (status.totalSize) setDownloadTotalSize(status.totalSize);
        if (status.speedBytesPerSec !== undefined) {
          const mb = status.speedBytesPerSec / 1024 / 1024;
          setDownloadSpeed(`${mb.toFixed(1)} MB/s`);
        }
        if (status.etaSeconds !== undefined) {
          const minutes = Math.floor(status.etaSeconds / 60);
          const seconds = Math.floor(status.etaSeconds % 60);
          setDownloadEta(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }
      });
      
      return () => {
        window.electronAPI?.removeAllListeners('download-progress');
      };
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
      onDownloadStart?.();
      setIsDownloading(true);
      setDownloadProgress(0);
      window.electronAPI.send('download-version', {
        version: selectedVersionData.identifier,
        downloadPath: installPath,
      });
      window.electronAPI.receiveOnce('download-version', (result: any) => {
        setIsDownloading(false);
        onDownloadEnd?.();
        if (result?.downloaded) {
          setInstalledVersions(prev => new Set([...prev, selectedVersionData.version]));
        }
      });
    }
  };

  // Update notifications whenever states change
  useEffect(() => {
    const notifications: NotificationData[] = [];

    if (isDownloading) {
      notifications.push({
        id: 'download',
        type: 'download',
        title: 'Game Download',
        fileName: downloadFileName || 'ManicMiners2020-05-09.zip',
        fileSize: downloadTotalSize ? `${(downloadTotalSize / 1024 / 1024).toFixed(1)} MB` : '528.0 MB',
        progress: downloadProgress,
        speed: downloadSpeed,
        eta: downloadEta,
        status: downloadStatus || 'Downloading version file...',
        isActive: true
      });
    }


    if (isRepairing) {
      notifications.push({
        id: 'repair',
        type: 'repair',
        title: 'Game Repair',
        fileName: selectedVersionData?.filename || 'ManicMiners2020-05-09.zip',
        progress: repairProgress,
        status: repairStatus,
        isActive: true
      });
    }

    if (isDeleting) {
      notifications.push({
        id: 'delete',
        type: 'delete',
        title: 'Game Deletion',
        fileName: selectedVersionData?.filename || 'ManicMiners2020-05-09.zip',
        progress: deleteProgress,
        status: deleteStatus,
        isActive: true
      });
    }

    onNotificationUpdate(notifications);
  }, [isDownloading, downloadProgress, downloadFileName, downloadTotalSize, downloadSpeed, downloadEta, downloadStatus,
      isRepairing, repairProgress, repairStatus,
      isDeleting, deleteProgress, deleteStatus,
      selectedVersionData?.filename, onNotificationUpdate]);


  const handleDelete = () => {
    if (!selectedVersionData || !window.electronAPI) return;
    setIsDeleting(true);
    setDeleteProgress(0);
    setDeleteStatus('Removing game files...');
    
    // Simulate delete progress
    const deleteInterval = setInterval(() => {
      setDeleteProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(deleteInterval);
          setDeleteStatus('Deletion completed successfully!');
          setTimeout(() => setIsDeleting(false), 2000);
          return 100;
        }
        return newProgress;
      });
    }, 300);
    
    window.electronAPI.send('delete-version', selectedVersionData.identifier);
    window.electronAPI.receiveOnce('delete-version', (result: any) => {
      if (result?.deleted) {
        setInstalledVersions(prev => {
          const newSet = new Set(prev);
          newSet.delete(selectedVersionData.version);
          return newSet;
        });
      }
    });
  };

  const handleRepair = async () => {
    if (!selectedVersionData || !window.electronAPI) return;
    setIsRepairing(true);
    setRepairProgress(0);
    setRepairStatus('Checking files...');

    window.electronAPI.send('repair-version', selectedVersionData.identifier);

    const repairInterval = setInterval(() => {
      setRepairProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(repairInterval);
          setRepairStatus('Repair completed successfully!');
          setTimeout(() => setIsRepairing(false), 2000);
          return 100;
        }
        return newProgress;
      });
    }, 400);
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
        <div className="flex justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center energy-glow">
              <Zap className="w-6 h-6 text-primary-foreground animate-pulse-energy" />
            </div>
          </div>
        </div>

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
            <VersionSelector 
              versions={versions}
              selectedVersion={selectedVersion}
              onVersionChange={setSelectedVersion}
            />
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
              <VersionActions
                version={selectedVersionData}
                isInstalled={selectedVersionData ? isVersionInstalled(selectedVersionData.version) : false}
                onInstallOrLaunch={handleInstallOrLaunch}
                onDelete={handleDelete}
                onRepair={handleRepair}
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
              <VersionActions
                version={selectedVersionData}
                isInstalled={selectedVersionData ? isVersionInstalled(selectedVersionData.version) : false}
                onInstallOrLaunch={handleInstallOrLaunch}
                onDelete={handleDelete}
                onRepair={handleRepair}
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
