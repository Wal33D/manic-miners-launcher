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
  isDownloading?: boolean;
  isRepairing?: boolean;
  isDeleting?: boolean;
  isCurrentVersion?: boolean;
}

export function VersionActions({
  version,
  isInstalled,
  onInstallOrLaunch,
  onDelete,
  onRepair,
  onCreateShortcuts,
  isDownloading = false,
  isRepairing = false,
  isDeleting = false,
  isCurrentVersion = false,
}: VersionActionsProps) {
  if (!version) return null;

  const anyOperationActive = isDownloading || isRepairing || isDeleting;
  const thisVersionActive = isCurrentVersion && anyOperationActive;

  return (
    <div className="space-y-3">
      {/* Main Action Button */}
      <Button
        variant="energy"
        className="w-full"
        size="lg"
        onClick={onInstallOrLaunch}
        disabled={anyOperationActive || (isInstalled && (isDeleting || isRepairing))}
      >
        {isInstalled ? (
          <>
            <Play className="w-5 h-5 mr-2" />
            Launch Game
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            {isDownloading && thisVersionActive ? 'Installing...' : 'Install Game'}
          </>
        )}
      </Button>

      {/* Additional Actions Grid - Only show when installed */}
      {isInstalled && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRepair}
            disabled={anyOperationActive}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            {isRepairing && thisVersionActive ? 'Repairing...' : 'Verify'}
          </Button>
          {onCreateShortcuts && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCreateShortcuts}
              title="Create desktop and application shortcuts"
              disabled={anyOperationActive}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Shortcuts
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-destructive hover:text-destructive col-span-2"
            disabled={anyOperationActive}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            {isDeleting && thisVersionActive ? 'Uninstalling...' : 'Uninstall'}
          </Button>
        </div>
      )}
    </div>
  );
}
