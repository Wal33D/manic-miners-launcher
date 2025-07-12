import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import { Navigation } from "./Navigation";
import { SettingsModal } from "./SettingsModal";

export function LauncherHeader() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <header className="border-b border-border mining-surface">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center energy-glow">
                <Zap className="w-6 h-6 text-primary-foreground animate-pulse-energy" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ManicMiners</h1>
                <p className="text-sm text-muted-foreground">Game Launcher</p>
              </div>
            </div>
            <Badge variant="outline" className="border-primary/50 text-primary">
              v2.1.3
            </Badge>
          </div>
        </div>
        
        <Navigation onSettingsClick={() => setSettingsOpen(true)} />
        
        <SettingsModal 
          open={settingsOpen} 
          onOpenChange={setSettingsOpen} 
        />
      </div>
    </header>
  );
}