import { useState } from 'react';
import { GameVersionSelector } from '@/components/GameVersionSelector';
import { GameNotifications, NotificationData } from '@/components/GameNotifications';

const GameVersions = () => {
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
      <GameVersionSelector onNotificationUpdate={handleNotificationUpdate} />
    </div>
  );
};

export default GameVersions;
