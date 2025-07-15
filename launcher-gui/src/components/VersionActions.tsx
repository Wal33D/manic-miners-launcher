import { Button } from '@/components/ui/button';
import { Play, Download, Trash2, RotateCcw, ExternalLink } from 'lucide-react';
import { GameVersion } from '@/types/game';

interface VersionActionsProps {
  version: GameVersion | null;
  isInstalled: boolean;
  onInstallOrLaunch: () => void;
  onDelete: () => void;
  onRepair: () => void;
  onCreateShortcuts?: () => void;
}

export function VersionActions({ version, isInstalled, onInstallOrLaunch, onDelete, onRepair, onCreateShortcuts }: VersionActionsProps) {
  if (!version) return null;

  return (
    <div className="space-y-3">
      {/* Main Action Button */}
      <Button variant="energy" className="w-full" size="lg" onClick={onInstallOrLaunch}>
        {isInstalled ? (
          <>
            <Play className="w-5 h-5 mr-2" />
            Launch Game
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Install Game
          </>
        )}
      </Button>

      {/* Additional Actions Grid - Only show when installed */}
      {isInstalled && (
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={onRepair}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Verify
          </Button>
          {onCreateShortcuts && (
            <Button variant="outline" size="sm" onClick={onCreateShortcuts} title="Create desktop and application shortcuts">
              <ExternalLink className="w-4 h-4 mr-1" />
              Shortcuts
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onDelete} className="text-destructive hover:text-destructive col-span-2">
            <Trash2 className="w-4 h-4 mr-1" />
            Uninstall
          </Button>
        </div>
      )}
    </div>
  );
}
