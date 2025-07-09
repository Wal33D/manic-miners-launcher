import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { LauncherHeader } from "@/components/LauncherHeader";
import { InstalledLevelsProvider } from "./hooks/useInstalledLevels";
import Index from "./pages/Index";
import LevelDownloader from "./pages/LevelDownloader";
import Library from "./pages/Library";
import MapGenerator from "./pages/MapGenerator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <InstalledLevelsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <div className="flex flex-col h-screen bg-background overflow-hidden">

            <LauncherHeader />
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/levels" element={<LevelDownloader />} />
                <Route path="/library" element={<Library />} />
                <Route path="/map-generator" element={<MapGenerator />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </HashRouter>
      </TooltipProvider>
    </InstalledLevelsProvider>
  </QueryClientProvider>
);

export default App;
