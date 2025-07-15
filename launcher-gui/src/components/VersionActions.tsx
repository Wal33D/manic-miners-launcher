import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Play, Download, Trash2, RotateCcw, Settings, ChevronDown } from 'lucide-react';
import { GameVersion } from '@/types/game';

interface VersionActionsProps {
  version: GameVersion | null;
  isInstalled: boolean;
  onInstallOrLaunch: () => void;
  onDelete: () => void;
  onRepair: () => void;
}

export function VersionActions({ version, isInstalled, onInstallOrLaunch, onDelete, onRepair }: VersionActionsProps) {
  if (!version) return null;

  return (
    <div className="flex gap-2">
      <Button variant="energy" className="flex-1" onClick={onInstallOrLaunch}>
        {isInstalled ? (
          <>
            <Play className="w-4 h-4 mr-2" />
            Launch
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Install
          </>
        )}
      </Button>

      {isInstalled && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Game Options
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mining-surface border-primary/20">
            <DropdownMenuItem onClick={onRepair} className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Repair
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-4 h-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
