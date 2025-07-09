import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Map, Zap, Mountain, Waves, Flame, Snowflake, Shuffle, Download } from "lucide-react";

const MapGenerator = () => {
  const [mapName, setMapName] = useState("");
  const [biome, setBiome] = useState("caverns");
  const [difficulty, setDifficulty] = useState("medium");
  const [size, setSize] = useState([32]);
  const [crystalDensity, setCrystalDensity] = useState([50]);
  const [enemies, setEnemies] = useState([30]);
  const [terrain, setTerrain] = useState([60]);
  const [generating, setGenerating] = useState(false);

  const biomes = [
    { value: "caverns", label: "Crystal Caverns", icon: Zap, color: "text-primary" },
    { value: "volcanic", label: "Volcanic Tunnels", icon: Flame, color: "text-red-500" },
    { value: "frozen", label: "Frozen Depths", icon: Snowflake, color: "text-blue-400" },
    { value: "underwater", label: "Underwater Caves", icon: Waves, color: "text-cyan-400" },
    { value: "mountain", label: "Mountain Core", icon: Mountain, color: "text-stone-400" },
  ];

  const handleGenerate = () => {
    setGenerating(true);
    // Simulate map generation
    setTimeout(() => {
      setGenerating(false);
    }, 3000);
  };

  const randomizeSettings = () => {
    setSize([Math.floor(Math.random() * 64) + 16]);
    setCrystalDensity([Math.floor(Math.random() * 100)]);
    setEnemies([Math.floor(Math.random() * 100)]);
    setTerrain([Math.floor(Math.random() * 100)]);
    setBiome(biomes[Math.floor(Math.random() * biomes.length)].value);
    setDifficulty(['easy', 'medium', 'hard', 'extreme'][Math.floor(Math.random() * 4)]);
  };

  const selectedBiome = biomes.find(b => b.value === biome);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="mining-surface energy-glow">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Map className="w-5 h-5" />
            Map Generator
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create custom mining levels with procedural generation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-secondary-foreground">Basic Settings</h3>
              
              <div className="space-y-2">
                <Label htmlFor="mapName">Map Name</Label>
                <Input
                  id="mapName"
                  placeholder="Enter map name..."
                  value={mapName}
                  onChange={(e) => setMapName(e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Biome Type</Label>
                <Select value={biome} onValueChange={setBiome}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {biomes.map((biomeOption) => (
                      <SelectItem key={biomeOption.value} value={biomeOption.value}>
                        <div className="flex items-center gap-2">
                          <biomeOption.icon className={`w-4 h-4 ${biomeOption.color}`} />
                          {biomeOption.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="extreme">Extreme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-secondary-foreground">Advanced Settings</h3>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Map Size</Label>
                    <span className="text-sm text-muted-foreground">{size[0]}x{size[0]}</span>
                  </div>
                  <Slider
                    value={size}
                    onValueChange={setSize}
                    min={16}
                    max={64}
                    step={8}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Crystal Density</Label>
                    <span className="text-sm text-muted-foreground">{crystalDensity[0]}%</span>
                  </div>
                  <Slider
                    value={crystalDensity}
                    onValueChange={setCrystalDensity}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Enemy Presence</Label>
                    <span className="text-sm text-muted-foreground">{enemies[0]}%</span>
                  </div>
                  <Slider
                    value={enemies}
                    onValueChange={setEnemies}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Terrain Complexity</Label>
                    <span className="text-sm text-muted-foreground">{terrain[0]}%</span>
                  </div>
                  <Slider
                    value={terrain}
                    onValueChange={setTerrain}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="energy" 
              className="flex-1"
              onClick={handleGenerate}
              disabled={generating || !mapName}
            >
              {generating ? (
                "Generating..."
              ) : (
                <>
                  <Map className="w-4 h-4 mr-2" />
                  Generate Map
                </>
              )}
            </Button>
            
            <Button variant="mining" onClick={randomizeSettings}>
              <Shuffle className="w-4 h-4 mr-2" />
              Randomize
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card className="mining-surface">
        <CardHeader>
          <CardTitle className="text-primary">Map Preview</CardTitle>
          <CardDescription className="text-muted-foreground">
            Generated map details and download options
          </CardDescription>
        </CardHeader>
        <CardContent>
          {generating ? (
            <div className="text-center py-12">
              <div className="animate-pulse space-y-4">
                <div className="w-64 h-64 bg-muted rounded-lg mx-auto"></div>
                <div className="text-primary">Generating your custom mining level...</div>
              </div>
            </div>
          ) : mapName ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-secondary-foreground">
                    {mapName || "Untitled Map"}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {selectedBiome && <selectedBiome.icon className={`w-4 h-4 ${selectedBiome.color}`} />}
                      <span className="text-sm text-muted-foreground">
                        {selectedBiome?.label} - {difficulty} difficulty
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{size[0]}x{size[0]} tiles</Badge>
                      <Badge variant="outline">{crystalDensity[0]}% crystals</Badge>
                      <Badge variant="outline">{enemies[0]}% enemies</Badge>
                      <Badge variant="outline">{terrain[0]}% complexity</Badge>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="energy" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Map
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-secondary/30 to-secondary/60 rounded-lg border border-border/50 flex items-center justify-center">
                    <div className="text-center">
                      <Map className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Map preview will appear here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Enter a map name and click "Generate Map" to create your custom level
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MapGenerator;