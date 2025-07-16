import { Badge } from '@/components/ui/badge';
import { GameVersion } from '@/types/game';

interface VersionDetailsProps {
  version: GameVersion;
}

export function VersionDetails({ version }: VersionDetailsProps) {
  const getVersionVariant = (experimental: boolean) => {
    return experimental ? 'secondary' : 'default';
  };

  return (
    <div className="p-4 rounded-lg bg-secondary/50 border border-border hover:bg-secondary/50">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <img
            src={version.thumbnailUrl}
            alt={`${version.title} thumbnail`}
            className="w-16 h-16 rounded object-cover border border-border"
            onError={e => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Version Info */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-secondary-foreground">{version.title}</h4>
            <Badge variant={getVersionVariant(version.experimental)}>{version.experimental ? 'experimental' : 'stable'}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Release Date:</span> {new Date(version.releaseDate).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">File Size:</span> {version.size}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-sm text-muted-foreground">{version.description || 'No description available.'}</p>
      </div>
    </div>
  );
}
