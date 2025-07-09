import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Play, AlertTriangle, Star, Zap } from "lucide-react";

interface GameVersion {
  version: string;
  type: 'latest' | 'experimental' | 'past';
  description?: string;
  downloadUrl?: string;
}

export function GameVersionSelector() {
  const [versions, setVersions] = useState<GameVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        // Fetch all version types
        const [latest, experimental, past] = await Promise.all([
          fetch('https://manic-launcher.vercel.app/api/versions/latest').then(r => r.json()),
          fetch('https://manic-launcher.vercel.app/api/versions/experimental').then(r => r.json()),
          fetch('https://manic-launcher.vercel.app/api/versions/past').then(r => r.json())
        ]);

        const allVersions: GameVersion[] = [
          { ...latest, type: 'latest' as const },
          ...experimental.map((v: any) => ({ ...v, type: 'experimental' as const })),
          ...past.map((v: any) => ({ ...v, type: 'past' as const }))
        ];

        setVersions(allVersions);
        setSelectedVersion(latest.version);
      } catch (error) {
        console.error('Failed to fetch versions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, []);

  const selectedVersionData = versions.find(v => v.version === selectedVersion);

  const getVersionIcon = (type: GameVersion['type']) => {
    switch (type) {
      case 'latest': return <Star className="w-4 h-4" />;
      case 'experimental': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getVersionVariant = (type: GameVersion['type']) => {
    switch (type) {
      case 'latest': return 'default';
      case 'experimental': return 'secondary';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <Card className="mining-surface energy-glow">
        <CardHeader>
          <CardTitle className="text-primary">Loading Versions...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mining-surface energy-glow">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Game Version
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Select and launch your preferred game version
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedVersion} onValueChange={setSelectedVersion}>
          <SelectTrigger className="bg-input border-border">
            <SelectValue placeholder="Select version..." />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {versions.map((version) => (
              <SelectItem key={version.version} value={version.version}>
                <div className="flex items-center gap-2">
                  {getVersionIcon(version.type)}
                  {version.version}
                  <Badge variant={getVersionVariant(version.type)} className="ml-2">
                    {version.type}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedVersionData && (
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-secondary-foreground">
                {selectedVersionData.version}
              </h4>
              <Badge variant={getVersionVariant(selectedVersionData.type)}>
                {selectedVersionData.type}
              </Badge>
            </div>
            {selectedVersionData.description && (
              <p className="text-sm text-muted-foreground mb-3">
                {selectedVersionData.description}
              </p>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="energy" className="flex-1">
            <Play className="w-4 h-4 mr-2" />
            Launch Game
          </Button>
          <Button variant="mining">
            <Download className="w-4 h-4 mr-2" />
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}