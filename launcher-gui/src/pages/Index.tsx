import Home from './Home';
import { NotificationData } from '@/components/GameNotifications';

interface IndexProps {
  onNotificationUpdate: (notifications: NotificationData[]) => void;
  removeNotification: (id: string) => void;
}

const Index = ({ onNotificationUpdate, removeNotification }: IndexProps) => {
  return <Home onNotificationUpdate={onNotificationUpdate} removeNotification={removeNotification} />;
};

export default Index;
