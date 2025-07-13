import { useState } from 'react';
import { LatestVersionManager } from '@/components/LatestVersionManager';
import { GameTrailer } from '@/components/GameTrailer';
import { NewsPanel } from '@/components/NewsPanel';
import { GameNotifications, NotificationData } from '@/components/GameNotifications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const handleNotificationUpdate = (newNotifications: NotificationData[]) => {
    setNotifications(newNotifications);
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="h-full flex flex-col overflow-hidden relative">
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
                  <CardTitle>About the Game</CardTitle>
                  <CardDescription>
                    What makes Manic Miners special
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    This fresh Rock Raiders experience brings customizable hotkeys, extensive Rock Raider customization, 
                    Buildings, Vehicles, terrifying Creatures, a Level Editor, an extensive scripting system, lava erosion, 
                    landslides, and an abundance of new details and animations not in the original game!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Manic Miners aims to be what could've been if the franchise continued and released a "Rock Raiders 2" 
                    or "Rock Raiders remastered", but 20 years later. All in the spirit of 90's LEGO themes and games.
                  </p>
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
