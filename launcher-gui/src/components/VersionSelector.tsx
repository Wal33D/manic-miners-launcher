import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Star } from 'lucide-react';

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

interface VersionSelectorProps {
  versions: GameVersion[];
  selectedVersion: string;
  onVersionChange: (version: string) => void;
}

export function VersionSelector({ versions, selectedVersion, onVersionChange }: VersionSelectorProps) {
  const getVersionIcon = (experimental: boolean) => {
    return experimental ? <AlertTriangle className="w-4 h-4" /> : <Star className="w-4 h-4" />;
  };

  const getVersionVariant = (experimental: boolean) => {
    return experimental ? 'secondary' : 'default';
  };

  return (
    <Select value={selectedVersion} onValueChange={onVersionChange}>
      <SelectTrigger className="bg-input border-border">
        <SelectValue placeholder="Select version..." />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border">
        {versions.map(version => (
          <SelectItem key={version.version} value={version.version}>
            <div className="flex items-center gap-2">
              {getVersionIcon(version.experimental)}
              {version.displayName}
              <Badge variant={getVersionVariant(version.experimental)} className="ml-2">
                {version.experimental ? 'experimental' : 'stable'}
              </Badge>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}