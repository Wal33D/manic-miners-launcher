import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wine, Download, CheckCircle, AlertCircle, Info, ExternalLink, Terminal, Bottle } from 'lucide-react';

interface WhiskyStatusData {
  isInstalled: boolean;
  hasCliTool: boolean;
  version?: string;
  whiskyAppPath?: string;
  cliPath?: string;
  error?: string;
}

interface WhiskyBottle {
  name: string;
  windowsVersion: string;
  path: string;
  hasManicMiners?: boolean;
}

export function WhiskyStatus() {
  const [status, setStatus] = useState<WhiskyStatusData | null>(null);
  const [bottles, setBottles] = useState<WhiskyBottle[]>([]);
  const [loading, setLoading] = useState(true);
  const [installing, setInstalling] = useState(false);

  // Check if we're on macOS
  const isMacOS = navigator.platform.toLowerCase().includes('mac');

  useEffect(() => {
    if (!isMacOS) {
      setLoading(false);
      return;
    }

    fetchWhiskyStatus();
  }, [isMacOS]);

  const fetchWhiskyStatus = async () => {
    if (!window.electronAPI) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Get Whisky status
      const whiskyStatus = await window.electronAPI.invoke('detect-whisky');
      setStatus(whiskyStatus);

      // If Whisky is available, get bottles
      if (whiskyStatus.hasCliTool) {
        const bottleList = await window.electronAPI.invoke('list-whisky-bottles');

        // Check each bottle for Manic Miners
        const bottlesWithStatus = await Promise.all(
          bottleList.map(async (bottle: WhiskyBottle) => {
            const hasManicMiners = await window.electronAPI.invoke('check-bottle-manic-miners', bottle.name);
            return { ...bottle, hasManicMiners };
          })
        );

        setBottles(bottlesWithStatus);
      }
    } catch (error) {
      console.error('Error fetching Whisky status:', error);
      setStatus({
        isInstalled: false,
        hasCliTool: false,
        error: `Error checking Whisky: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const installCliTool = async () => {
    if (!window.electronAPI || !status?.isInstalled) return;

    try {
      setInstalling(true);
      const result = await window.electronAPI.invoke('install-whisky-cmd');

      if (result.success) {
        // Refresh status
        await fetchWhiskyStatus();
      } else {
        alert(`Failed to install CLI: ${result.message}`);
      }
    } catch (error) {
      console.error('Error installing CLI:', error);
      alert(`Error installing CLI: ${error.message}`);
    } finally {
      setInstalling(false);
    }
  };

  const openWhiskyWebsite = () => {
    window.electronAPI?.send('open-external-url', 'https://getwhisky.app');
  };

  if (!isMacOS) {
    return (
      <Card className="mining-surface">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Wine className="w-5 h-5" />
            Whisky Compatibility
          </CardTitle>
          <CardDescription>Windows app compatibility layer for macOS</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>Whisky is only available on macOS. You're currently on {navigator.platform}.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="mining-surface">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Wine className="w-5 h-5" />
            Whisky Compatibility
          </CardTitle>
          <CardDescription>Checking Whisky installation...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-20 bg-muted rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!status) {
    return (
      <Card className="mining-surface">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Wine className="w-5 h-5" />
            Whisky Compatibility
          </CardTitle>
          <CardDescription>Unable to check Whisky status</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Could not determine Whisky installation status.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mining-surface">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Wine className="w-5 h-5" />
          Whisky Compatibility
          {status.isInstalled && (
            <Badge variant="secondary" className="ml-2">
              <CheckCircle className="w-3 h-3 mr-1" />
              Installed
            </Badge>
          )}
        </CardTitle>
        <CardDescription>Run Windows games on macOS using Wine compatibility layer</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {status.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{status.error}</AlertDescription>
          </Alert>
        )}

        {/* Installation Status */}
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wine className="w-4 h-4" />
              <span className="font-medium">Whisky App</span>
            </div>
            <div className="flex items-center gap-2">
              {status.isInstalled ? (
                <Badge variant="secondary">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Installed
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Not Found
                </Badge>
              )}
              {status.version && <Badge variant="outline">{status.version}</Badge>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span className="font-medium">CLI Tool</span>
            </div>
            <div className="flex items-center gap-2">
              {status.hasCliTool ? (
                <Badge variant="secondary">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Available
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Not Available
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          {!status.isInstalled && (
            <div className="space-y-2">
              <Alert>
                <Download className="h-4 w-4" />
                <AlertDescription>
                  Whisky is not installed. Download it from the official website to run Windows games on macOS.
                </AlertDescription>
              </Alert>
              <Button onClick={openWhiskyWebsite} className="w-full" variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Download Whisky
              </Button>
            </div>
          )}

          {status.isInstalled && !status.hasCliTool && (
            <div className="space-y-2">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Whisky is installed but the CLI tool is not linked. Install it to enable launcher integration.
                </AlertDescription>
              </Alert>
              <Button onClick={installCliTool} disabled={installing} className="w-full">
                <Terminal className="w-4 h-4 mr-2" />
                {installing ? 'Installing...' : 'Install CLI Tool'}
              </Button>
            </div>
          )}
        </div>

        {/* Bottles List */}
        {status.hasCliTool && bottles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Bottle className="w-4 h-4" />
              <span className="font-medium">Available Bottles ({bottles.length})</span>
            </div>
            <div className="space-y-2">
              {bottles.map(bottle => (
                <div key={bottle.name} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <div>
                    <div className="font-medium">{bottle.name}</div>
                    <div className="text-sm text-muted-foreground">{bottle.windowsVersion}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {bottle.hasManicMiners && (
                      <Badge variant="secondary">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Has Manic Miners
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {status.hasCliTool && bottles.length === 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>No bottles found. Create a bottle in Whisky to install Windows applications.</AlertDescription>
          </Alert>
        )}

        {/* Information */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Whisky allows you to run Windows games on macOS using Wine</p>
          <p>• Create bottles to install and run Windows applications</p>
          <p>• The launcher can automatically detect and launch games from bottles</p>
          {status.isInstalled && <p>• Found at: {status.whiskyAppPath}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
