import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map, Mountain, Zap, Star } from "lucide-react";

interface Level {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  description?: string;
  crystals: number;
  completed?: boolean;
}

export function LevelBrowser() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch('https://manic-launcher.vercel.app/api/levels');
        const data = await response.json();
        setLevels(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch levels:', error);
        // Fallback levels for demo
        setLevels([
          {
            id: '1',
            name: 'Crystal Caverns',
            difficulty: 'easy',
            description: 'Your first mining expedition into the energy-rich caverns.',
            crystals: 15,
            completed: true
          },
          {
            id: '2',
            name: 'Deep Core Descent', 
            difficulty: 'medium',
            description: 'Navigate treacherous underground passages to reach the core.',
            crystals: 32,
            completed: false
          },
          {
            id: '3',
            name: 'Thermal Vents',
            difficulty: 'hard',
            description: 'Extreme heat and volatile energy sources test your skills.',
            crystals: 48,
            completed: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

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

  if (loading) {
    return (
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
    );
  }

  return (
    <Card className="mining-surface">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Map className="w-5 h-5" />
          Mining Levels
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Choose your next excavation site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {levels.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No levels available
            </p>
          ) : (
            levels.map((level) => (
              <div
                key={level.id}
                className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                  level.completed 
                    ? 'bg-primary/10 border-primary/30' 
                    : 'bg-secondary/30 border-border/50 hover:bg-secondary/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-secondary-foreground">
                      {level.name}
                    </h4>
                    {level.completed && (
                      <Badge variant="default" className="bg-primary/20 text-primary">
                        ✓ Complete
                      </Badge>
                    )}
                  </div>
                  <Badge variant={getDifficultyVariant(level.difficulty)}>
                    <div className="flex items-center gap-1">
                      {getDifficultyIcon(level.difficulty)}
                      {level.difficulty}
                    </div>
                  </Badge>
                </div>
                
                {level.description && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {level.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-primary">
                    <Zap className="w-4 h-4" />
                    {level.crystals} crystals
                  </div>
                  <Button 
                    variant={level.completed ? "mining" : "energy"} 
                    size="sm"
                  >
                    {level.completed ? "Replay" : "Start"}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}