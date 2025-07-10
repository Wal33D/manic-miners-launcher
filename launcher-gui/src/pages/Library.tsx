import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Library as LibraryIcon, Play, Trash2, Search, Folder, Calendar } from "lucide-react";
import { useInstalledLevels, InstalledLevel } from "../hooks/useInstalledLevels";

const Library = () => {
  const { levels: installedLevels, uninstallLevel } = useInstalledLevels();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLevels = installedLevels.filter(level =>
    level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    level.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyVariant = (difficulty: InstalledLevel['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'secondary';
      case 'medium': return 'default';
      case 'hard': return 'destructive';
      case 'extreme': return 'outline';
      default: return 'secondary';
    }
  };

  const handleUninstall = (levelId: string) => {
    uninstallLevel(levelId);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="mining-surface energy-glow">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <LibraryIcon className="w-5 h-5" />
            My Library
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your installed levels and view play statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search your library..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Folder className="w-4 h-4" />
              {installedLevels.length} levels installed
            </div>
          </div>

          <div className="space-y-4">
            {filteredLevels.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchTerm ? 'No levels found matching your search' : 'No levels installed yet'}
              </div>
            ) : (
              filteredLevels.map((level) => (
                <Card
                  key={level.id}
                  className="bg-secondary/30 border-border/50 hover:bg-secondary/50 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-secondary-foreground">
                            {level.name}
                          </h3>
                          <Badge variant={getDifficultyVariant(level.difficulty)}>
                            {level.difficulty}
                          </Badge>
                          {level.highScore && (
                            <Badge variant="outline" className="border-primary/50 text-primary">
                              Best: {level.highScore.toLocaleString()}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>by {level.author}</span>
                          <span>•</span>
                          <span>{level.size}</span>
                          <span>•</span>
                          <span>Played: {level.playTime ?? '0h 0m'}</span>
                          {level.lastPlayed && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(level.lastPlayed).toLocaleDateString()}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="energy" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUninstall(level.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {installedLevels.length > 0 && (
        <Card className="mining-surface">
          <CardHeader>
            <CardTitle className="text-primary">Library Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-secondary/30">
                <div className="text-2xl font-bold text-primary">
                  {installedLevels.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Levels Installed
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/30">
                <div className="text-2xl font-bold text-primary">
                  {installedLevels.reduce((acc, level) => {
                    const playTime = level.playTime ?? '0h 0m';
                    const hours = parseInt(playTime.split('h')[0]) || 0;
                    const minutes = parseInt(playTime.split('h')[1]?.split('m')[0]) || 0;
                    return acc + hours + minutes / 60;
                  }, 0).toFixed(1)}h
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Playtime
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/30">
                <div className="text-2xl font-bold text-primary">
                  {Math.max(...installedLevels.map(l => l.highScore || 0)).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Best Score
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/30">
                <div className="text-2xl font-bold text-primary">
                  {installedLevels.reduce((acc, level) => acc + parseInt(level.size || '0'), 0)} MB
                </div>
                <div className="text-sm text-muted-foreground">
                  Storage Used
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Library;