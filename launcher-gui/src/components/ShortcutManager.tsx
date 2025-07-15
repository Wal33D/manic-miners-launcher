import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Link, ExternalLink, FolderOpen, CheckCircle, AlertCircle } from 'lucide-react';

interface ShortcutManagerProps {
  onNotificationUpdate?: (notification: any) => void;
}

export function ShortcutManager({ onNotificationUpdate }: ShortcutManagerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [createExeShortcut, setCreateExeShortcut] = useState(true);
  const [createDirShortcut, setCreateDirShortcut] = useState(true);
  const [lastResult, setLastResult] = useState<{ success: boolean; filePaths?: string[] } | null>(null);

  const handleCreateShortcuts = async () => {
    if (!window.electronAPI) {
      logger.stateLog('ShortcutManager', 'Desktop API not available in preview mode');
      return;
    }

    setIsCreating(true);
    setProgress(0);
    setStatus('Starting shortcut creation...');
    setLastResult(null);

    try {
      // Listen for completion only (progress is handled globally)
      window.electronAPI.receive('create-shortcuts-progress', (progressData: any) => {
        if (progressData.progress >= 100) {
          setIsCreating(false);
          setLastResult({
            success: true,
            filePaths: progressData.filePaths || [],
          });
          // Clean up listener
          window.electronAPI.removeAllListeners('create-shortcuts-progress');
        }
      });

      // Trigger shortcut creation
      window.electronAPI.send('create-shortcuts', {
        options: {
          createExeShortcut,
          createDirShortcut,
        },
      });

      // Update notification if callback provided
      if (onNotificationUpdate) {
        onNotificationUpdate({
          id: 'shortcut-creation',
          type: 'info',
          title: 'Creating Shortcuts',
          message: 'Creating desktop and menu shortcuts...',
          isActive: true,
        });
      }
    } catch (error) {
      console.error('Error creating shortcuts:', error);
      setIsCreating(false);
      setStatus(`Error: ${error.message}`);
      setLastResult({ success: false });
      window.electronAPI.removeAllListeners('create-shortcuts-progress');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Link className="w-5 h-5" />
          Desktop Shortcuts
        </CardTitle>
        <CardDescription>Create cross-platform shortcuts for easy access to the game</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Shortcut Options */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="exe-shortcut"
              checked={createExeShortcut}
              onCheckedChange={checked => setCreateExeShortcut(checked as boolean)}
              disabled={isCreating}
            />
            <label
              htmlFor="exe-shortcut"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Create game executable shortcut
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="dir-shortcut"
              checked={createDirShortcut}
              onCheckedChange={checked => setCreateDirShortcut(checked as boolean)}
              disabled={isCreating}
            />
            <label
              htmlFor="dir-shortcut"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Create installation directory shortcut
            </label>
          </div>
        </div>

        {/* Progress */}
        {isCreating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Creating shortcuts...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
            {status && <div className="text-xs text-muted-foreground">{status}</div>}
          </div>
        )}

        {/* Results */}
        {lastResult && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {lastResult.success ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
              <span className="text-sm font-medium">
                {lastResult.success ? 'Shortcuts created successfully!' : 'Failed to create shortcuts'}
              </span>
            </div>
            {lastResult.filePaths && lastResult.filePaths.length > 0 && (
              <div className="text-xs text-muted-foreground">
                <p>Created {lastResult.filePaths.length} shortcuts:</p>
                <ul className="mt-1 space-y-1">
                  {lastResult.filePaths.slice(0, 5).map((filePath, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <FolderOpen className="w-3 h-3" />
                      {filePath.length > 60 ? `...${filePath.slice(-57)}` : filePath}
                    </li>
                  ))}
                  {lastResult.filePaths.length > 5 && (
                    <li className="text-muted-foreground">...and {lastResult.filePaths.length - 5} more</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleCreateShortcuts}
          disabled={isCreating || (!createExeShortcut && !createDirShortcut)}
          className="w-full flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          {isCreating ? 'Creating Shortcuts...' : 'Create Shortcuts'}
        </Button>

        {/* Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Desktop shortcuts will be created on your desktop</p>
          <p>• System shortcuts will be created (Start Menu on Windows, Applications on macOS/Linux)</p>
          <p>• Works across Windows, macOS, and Linux platforms</p>
        </div>
      </CardContent>
    </Card>
  );
}
