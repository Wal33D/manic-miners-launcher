import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DownloadProgress } from "@/components/DownloadProgress";
import { Map, Mountain, Zap, Star, Search, Filter, Download } from "lucide-react";

interface Level {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  description?: string;
  crystals: number;
  author: string;
  downloads: number;
  rating: number;
  size: string;
  installed?: boolean;
}

const LevelDownloader = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [downloadingLevel, setDownloadingLevel] = useState<string | null>(null);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch('https://manic-launcher.vercel.app/api/levels');
        const data = await response.json();
        setLevels(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch levels:', error);
        // Enhanced fallback levels for demo
        setLevels([
          {
            id: '1',
            name: 'Crystal Caverns',
            difficulty: 'easy',
            description: 'Your first mining expedition into the energy-rich caverns. Perfect for beginners.',
            crystals: 15,
            author: 'RockRaider_Dev',
            downloads: 12543,
            rating: 4.8,
            size: '45 MB',
            installed: true
          },
          {
            id: '2',
            name: 'Deep Core Descent', 
            difficulty: 'medium',
            description: 'Navigate treacherous underground passages to reach the planetary core.',
            crystals: 32,
            author: 'MiningMaster',
            downloads: 8721,
            rating: 4.6,
            size: '78 MB',
            installed: false
          },
          {
            id: '3',
            name: 'Thermal Vents',
            difficulty: 'hard',
            description: 'Extreme heat and volatile energy sources test your mining skills.',
            crystals: 48,
            author: 'DrillCommander',
            downloads: 5432,
            rating: 4.9,
            size: '92 MB',
            installed: false
          },
          {
            id: '4',
            name: 'Lava Flow Laboratory',
            difficulty: 'extreme',
            description: 'The ultimate challenge - mine through active lava flows and unstable terrain.',
            crystals: 75,
            author: 'ExtremeExcavator',
            downloads: 2156,
            rating: 4.7,
            size: '156 MB',
            installed: false
          },
          {
            id: '5',
            name: 'Ice Age Expedition',
            difficulty: 'medium',
            description: 'Frozen underground lakes and crystal formations await your drilling team.',
            crystals: 28,
            author: 'FrostMiner',
            downloads: 6789,
            rating: 4.5,
            size: '67 MB',
            installed: false
          },
          {
            id: '6',
            name: 'Radioactive Ruins',
            difficulty: 'hard',
            description: 'Ancient alien technology and dangerous radiation levels complicate this dig.',
            crystals: 55,
            author: 'AlienArchaeologist',
            downloads: 4321,
            rating: 4.8,
            size: '134 MB',
            installed: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  const filteredLevels = levels.filter(level => {
    const matchesSearch = level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         level.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || level.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyVariant = (difficulty: Level['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'secondary';
      case 'medium': return 'default';
      case 'hard': return 'destructive';
      case 'extreme': return 'outline';
      default: return 'secondary';
    }
  };

  const getDifficultyIcon = (difficulty: Level['difficulty']) => {
    switch (difficulty) {
      case 'easy': return <Mountain className="w-3 h-3" />;
      case 'medium': return <Map className="w-3 h-3" />;
      case 'hard': return <Zap className="w-3 h-3" />;
      case 'extreme': return <Star className="w-3 h-3" />;
      default: return <Mountain className="w-3 h-3" />;
    }
  };

  const handleDownload = (levelId: string) => {
    setDownloadingLevel(levelId);
    // Simulate download completion after a few seconds
    setTimeout(() => {
      setDownloadingLevel(null);
      setLevels(prev => prev.map(level => 
        level.id === levelId ? { ...level, installed: true } : level
      ));
    }, 5000);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Card className="mining-surface">
          <CardHeader>
            <CardTitle className="text-primary">Loading Levels...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-3">
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-16 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {downloadingLevel && (
        <DownloadProgress
          isActive={!!downloadingLevel}
          fileName={`${levels.find(l => l.id === downloadingLevel)?.name || 'Level'}.zip`}
          totalSize={levels.find(l => l.id === downloadingLevel)?.size || '0 MB'}
          downloadType="level"
          onCancel={() => setDownloadingLevel(null)}
          onPause={() => console.log('Paused')}
          onResume={() => console.log('Resumed')}
        />
      )}

      <Card className="mining-surface energy-glow">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Download className="w-5 h-5" />
            Level Downloader
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Discover and download community-created mining levels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search levels or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-48 bg-input border-border">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
                <SelectItem value="extreme">Extreme</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLevels.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No levels found matching your criteria
          </div>
        ) : (
          filteredLevels.map((level) => (
            <Card
              key={level.id}
              className={`mining-surface transition-all hover:shadow-md ${
                level.installed 
                  ? 'border-primary/30 bg-primary/5' 
                  : 'border-border/50 hover:border-primary/30'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg text-secondary-foreground">
                      {level.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      by {level.author}
                    </p>
                  </div>
                  <Badge variant={getDifficultyVariant(level.difficulty)}>
                    <div className="flex items-center gap-1">
                      {getDifficultyIcon(level.difficulty)}
                      {level.difficulty}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {level.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-primary">
                    <Zap className="w-4 h-4" />
                    {level.crystals} crystals
                  </div>
                  <div className="text-muted-foreground">
                    ⭐ {level.rating}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{level.downloads.toLocaleString()} downloads</span>
                  <span>{level.size}</span>
                </div>

                <Button 
                  variant={level.installed ? "secondary" : "energy"} 
                  className="w-full"
                  disabled={downloadingLevel === level.id}
                  onClick={() => !level.installed && handleDownload(level.id)}
                >
                  {level.installed ? (
                    "✓ Installed"
                  ) : downloadingLevel === level.id ? (
                    "Downloading..."
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default LevelDownloader;