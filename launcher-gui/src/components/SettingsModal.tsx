import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Settings, Folder, Download, Volume2, Monitor, Gamepad2 } from 'lucide-react';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [installPath, setInstallPath] = useState('');
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [downloadLimit, setDownloadLimit] = useState('unlimited');
  const [soundVolume, setSoundVolume] = useState('80');
  const [resolution, setResolution] = useState('1920x1080');
  const [fullscreen, setFullscreen] = useState(false);
  const [controllerEnabled, setControllerEnabled] = useState(false);

  useEffect(() => {
    if (!window.electronAPI) return;
    
    window.electronAPI.send('get-directories');
    window.electronAPI.receiveOnce('get-directories', (dirResult: any) => {
      if (dirResult?.status) {
        setInstallPath(dirResult.directories.launcherInstallPath);
      }
    });
  }, []);

  const handleBrowseFolder = () => {
    if (!window.electronAPI) return;
    
    window.electronAPI.send('open-directory-dialog');
    window.electronAPI.receiveOnce('directory-selected', (selectedPath: string) => {
      if (selectedPath) {
        setInstallPath(selectedPath);
      }
    });
  };

  const handleSave = () => {
    // In a real app, this would save settings to localStorage or backend
    console.log('Settings saved:', {
      installPath,
      autoUpdate,
      downloadLimit,
      soundVolume,
      resolution,
      fullscreen,
      controllerEnabled,
    });
    onOpenChange(false);
  };

  const handleReset = () => {
    if (window.electronAPI) {
      window.electronAPI.send('get-directories');
      window.electronAPI.receiveOnce('get-directories', (dirResult: any) => {
        if (dirResult?.status) {
          setInstallPath(dirResult.directories.launcherInstallPath);
        } else {
          setInstallPath('');
        }
      });
    } else {
      setInstallPath('');
    }
    setAutoUpdate(true);
    setDownloadLimit('unlimited');
    setSoundVolume('80');
    setResolution('1920x1080');
    setFullscreen(false);
    setControllerEnabled(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Launcher Settings
          </DialogTitle>
          <DialogDescription>Configure your Manic Miners launcher preferences</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="downloads" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Downloads
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Display
            </TabsTrigger>
            <TabsTrigger value="input" className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              Input
            </TabsTrigger>
          </TabsList>

          <div className="min-h-[300px]">
            <TabsContent value="general" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="install-path">Installation Path</Label>
                <div className="flex gap-2">
                  <Input id="install-path" value={installPath} onChange={e => setInstallPath(e.target.value)} className="flex-1" />
                  <Button variant="outline" onClick={handleBrowseFolder}>
                    <Folder className="w-4 h-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-update Game</Label>
                  <p className="text-sm text-muted-foreground">Automatically download and install game updates</p>
                </div>
                <Switch checked={autoUpdate} onCheckedChange={setAutoUpdate} />
              </div>
            </TabsContent>

            <TabsContent value="downloads" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="download-limit">Download Speed Limit</Label>
                <Select value={downloadLimit} onValueChange={setDownloadLimit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                    <SelectItem value="1mb">1 MB/s</SelectItem>
                    <SelectItem value="5mb">5 MB/s</SelectItem>
                    <SelectItem value="10mb">10 MB/s</SelectItem>
                    <SelectItem value="25mb">25 MB/s</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="display" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="sound-volume">Master Volume</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="sound-volume"
                    type="range"
                    min="0"
                    max="100"
                    value={soundVolume}
                    onChange={e => setSoundVolume(e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground w-12">{soundVolume}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resolution">Resolution</Label>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1920x1080">1920 x 1080 (Full HD)</SelectItem>
                    <SelectItem value="2560x1440">2560 x 1440 (2K)</SelectItem>
                    <SelectItem value="3840x2160">3840 x 2160 (4K)</SelectItem>
                    <SelectItem value="1366x768">1366 x 768</SelectItem>
                    <SelectItem value="1280x720">1280 x 720 (HD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Fullscreen Mode</Label>
                  <p className="text-sm text-muted-foreground">Launch game in fullscreen by default</p>
                </div>
                <Switch checked={fullscreen} onCheckedChange={setFullscreen} />
              </div>
            </TabsContent>

            <TabsContent value="input" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Controller Support</Label>
                  <p className="text-sm text-muted-foreground">Enable gamepad/controller input</p>
                </div>
                <Switch checked={controllerEnabled} onCheckedChange={setControllerEnabled} />
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
