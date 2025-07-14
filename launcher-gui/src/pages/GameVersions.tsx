import { GameVersionSelector } from '@/components/GameVersionSelector';
import { NotificationData } from '@/components/GameNotifications';

interface GameVersionsProps {
  onNotificationUpdate: (notifications: NotificationData[]) => void;
  removeNotification: (id: string) => void;
}

const GameVersions = ({ onNotificationUpdate, removeNotification }: GameVersionsProps) => {
  return (
    <div className="h-full flex flex-col overflow-y-auto relative">
      <GameVersionSelector onNotificationUpdate={onNotificationUpdate} removeNotification={removeNotification} />
    </div>
  );
};

export default GameVersions;
