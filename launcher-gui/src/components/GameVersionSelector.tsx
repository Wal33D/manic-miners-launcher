import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Play, AlertTriangle, Star, Zap, ChevronDown, Menu, Shield, Trash2, RotateCcw } from "lucide-react";

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

export function GameVersionSelector() {
  const [versions, setVersions] = useState<GameVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [installedVersions, setInstalledVersions] = useState<Set<string>>(new Set());
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await fetch('https://manic-launcher.vercel.app/api/versions/archived');
        const data = await response.json();
        
        if (data.versions && Array.isArray(data.versions)) {
          const sortedVersions = data.versions.sort((a: GameVersion, b: GameVersion) => {
            // Function to parse version strings for comparison
            const parseVersion = (version: string) => {
              // Handle versions like "0.0.22.05.08" or "0.3.5"
              return version.split('.').map(num => parseInt(num, 10));
            };
            
            const versionA = parseVersion(a.version);
            const versionB = parseVersion(b.version);
            
            // Compare version numbers part by part
            for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
              const numA = versionA[i] || 0;
              const numB = versionB[i] || 0;
              
              if (numA !== numB) {
                return numB - numA; // Newer version first (descending)
              }
            }
            
            return 0; // Versions are equal
          });
          
          setVersions(sortedVersions);
          if (sortedVersions.length > 0) {
            setSelectedVersion(sortedVersions[0].version);
          }
        }
      } catch (error) {
        console.error('Failed to fetch versions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, []);

  const selectedVersionData = versions.find(v => v.version === selectedVersion);

  const getVersionIcon = (experimental: boolean) => {
    return experimental ? <AlertTriangle className="w-4 h-4" /> : <Star className="w-4 h-4" />;
  };

  const getVersionVariant = (experimental: boolean) => {
    return experimental ? 'secondary' : 'default';
  };

  const isVersionInstalled = (version: string) => {
    return installedVersions.has(version);
  };

  const handleInstallOrLaunch = () => {
    if (!selectedVersionData) return;
    
    if (isVersionInstalled(selectedVersionData.version)) {
      // Launch the game
      console.log('Launching game version:', selectedVersionData.version);
    } else {
      // Install the game
      console.log('Installing game version:', selectedVersionData.version);
      // Simulate installation (in real app, this would trigger actual download)
      setInstalledVersions(prev => new Set([...prev, selectedVersionData.version]));
    }
  };

  const handleVerify = () => {
    if (!selectedVersionData) return;
    console.log('Verifying game version:', selectedVersionData.version);
  };

  const handleDelete = () => {
    if (!selectedVersionData) return;
    console.log('Deleting game version:', selectedVersionData.version);
    setInstalledVersions(prev => {
      const newSet = new Set(prev);
      newSet.delete(selectedVersionData.version);
      return newSet;
    });
  };

  const handleReinstall = () => {
    if (!selectedVersionData) return;
    console.log('Reinstalling game version:', selectedVersionData.version);
    // Remove from installed versions first, then add back (simulate reinstall)
    setInstalledVersions(prev => {
      const newSet = new Set(prev);
      newSet.delete(selectedVersionData.version);
      return newSet;
    });
    setTimeout(() => {
      setInstalledVersions(prev => new Set([...prev, selectedVersionData.version]));
    }, 100);
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
    <Card className="mining-surface">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Game Versions
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Install and manage Manic Miners releases
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

        {selectedVersionData && (
          <div className="p-4 rounded-lg bg-secondary/50 border border-border hover:bg-secondary/50">
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <img 
                  src={selectedVersionData.thumbnailUrl} 
                  alt={`${selectedVersionData.title} thumbnail`}
                  className="w-16 h-16 rounded object-cover border border-border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              
              {/* Version Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-secondary-foreground">
                    {selectedVersionData.title}
                  </h4>
                  <Badge variant={getVersionVariant(selectedVersionData.experimental)}>
                    {selectedVersionData.experimental ? 'experimental' : 'stable'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Release Date:</span> {new Date(selectedVersionData.releaseDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">File Size:</span> {selectedVersionData.size}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 relative">
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isDescriptionExpanded ? 'max-h-96' : 'max-h-24'
                }`}
              >
                <p className="text-sm text-muted-foreground">
                  {selectedVersionData.description || "No description available."}
                </p>
              </div>
              
              {/* Expand/Collapse Button */}
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                  aria-label={isDescriptionExpanded ? "Collapse description" : "Expand description"}
                >
                  <ChevronDown 
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                      isDescriptionExpanded ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            variant="energy" 
            className="flex-1" 
            onClick={handleInstallOrLaunch}
          >
            {selectedVersionData && isVersionInstalled(selectedVersionData.version) ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Launch Game
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Install Game
              </>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="mining">
                <Menu className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover border-border" align="end">
              <DropdownMenuItem onClick={handleVerify} className="cursor-pointer">
                <Shield className="w-4 h-4 mr-2" />
                Verify
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete} 
                className="cursor-pointer text-destructive hover:text-destructive"
                disabled={!selectedVersionData || !isVersionInstalled(selectedVersionData.version)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleReinstall} 
                className="cursor-pointer"
                disabled={!selectedVersionData || !isVersionInstalled(selectedVersionData.version)}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reinstall
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}