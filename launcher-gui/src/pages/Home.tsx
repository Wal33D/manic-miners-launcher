import { useState } from 'react';
import { LatestVersionManager } from '@/components/LatestVersionManager';
import { GameTrailer } from '@/components/GameTrailer';
import { NewsPanel } from '@/components/NewsPanel';
import { GameNotifications, NotificationData } from '@/components/GameNotifications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

const Home = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const handleNotificationUpdate = (newNotifications: NotificationData[]) => {
    setNotifications(newNotifications);
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto relative">
      <GameNotifications 
        notifications={notifications}
        onDismiss={handleDismissNotification}
      />
      <div className="container mx-auto p-6 flex-1 min-h-0">
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Game Content */}
            <div className="lg:col-span-7 space-y-6">
              <LatestVersionManager onNotificationUpdate={handleNotificationUpdate} />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    About the Game
                  </CardTitle>
                  <CardDescription>
                    What makes Manic Miners special
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Manic Miners aims to be what could've been if the franchise continued and released a "Rock Raiders 2" 
                    or "Rock Raiders remastered", but 20 years later. All in the spirit of 90's LEGO themes and games.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Smart AI & Customization</h4>
                      <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                        <li>• Smart AI that executes tasks and doesn't ignore your input, as LRR sometimes did</li>
                        <li>• Fully customizable miners, down to the individual print and colour!</li>
                        <li>• Assembling a crew with you as the commander!</li>
                        <li>• Extensive first-person controls through Eye/Shoulder view</li>
                        <li>• Vehicles with lasers will take drill orders and shoot walls autonomously</li>
                        <li>• Scale hazards (Landslides, Erosion, Monster spawns etc) up or down to fit your playstyle!</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Level Editor</h4>
                      <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                        <li>• Incredibly easy to use</li>
                        <li>• Change the level in real-time and see how it behaves!</li>
                        <li>• Saving and loading Buildings, Vehicles and miners</li>
                        <li>• Up to 256×256 map size</li>
                        <li>• Detail-editable height map from (-100 to 100) times tile size</li>
                        <li>• Define custom objectives not present in LRR</li>
                        <li>• Advanced level scripting and Visual scripting with Script Blocks</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Graphics & Controls</h4>
                      <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                        <li>• Unreal Engine 4 providing fantastic lighting</li>
                        <li>• Upscaled wall textures and accurate high-resolution brick textures</li>
                        <li>• Pristine LDraw models with maximum detail</li>
                        <li>• Classic LRR UI with modern visuals</li>
                        <li>• Fully customizable hotkeys and modern camera controls</li>
                        <li>• Many new animations, details and secrets</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Game Trailer & News */}
            <div className="lg:col-span-5 space-y-6">
              <GameTrailer />
              <NewsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
