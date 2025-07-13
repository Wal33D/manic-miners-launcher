import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Play, Download, Menu, Shield, Trash2, RotateCcw } from 'lucide-react';

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

interface VersionActionsProps {
  version: GameVersion | null;
  isInstalled: boolean;
  onInstallOrLaunch: () => void;
  onVerify: () => void;
  onDelete: () => void;
  onReinstall: () => void;
}

export function VersionActions({ 
  version, 
  isInstalled, 
  onInstallOrLaunch, 
  onVerify, 
  onDelete, 
  onReinstall 
}: VersionActionsProps) {
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
            <Button variant="outline" size="icon">
              <Menu className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mining-surface border-primary/20">
            <DropdownMenuItem onClick={onVerify} className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Verify Files
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onReinstall} className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Reinstall
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