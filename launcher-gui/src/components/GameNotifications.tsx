import { useEffect, useState } from 'react';
import { X, Download, Shield, RotateCcw, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface NotificationData {
  id: string;
  type: 'download' | 'verify' | 'reinstall' | 'delete';
  title: string;
  fileName?: string;
  fileSize?: string;
  progress: number;
  speed?: string;
  eta?: string;
  status: string;
  isActive: boolean;
}

interface GameNotificationsProps {
  notifications: NotificationData[];
  onDismiss: (id: string) => void;
}

export function GameNotifications({ notifications, onDismiss }: GameNotificationsProps) {
  const getIcon = (type: string, progress: number) => {
    switch (type) {
      case 'download':
        if (progress >= 100) return <CheckCircle className="w-5 h-5 text-primary" />;
        return <Download className="w-5 h-5 text-primary animate-pulse" />;
      case 'verify':
        if (progress >= 100) return <CheckCircle className="w-5 h-5 text-primary" />;
        return <Shield className="w-5 h-5 text-primary animate-pulse" />;
      case 'reinstall':
        if (progress >= 100) return <CheckCircle className="w-5 h-5 text-primary" />;
        return <RotateCcw className="w-5 h-5 text-primary animate-spin" />;
      case 'delete':
        if (progress >= 100) return <CheckCircle className="w-5 h-5 text-primary" />;
        return <Trash2 className="w-5 h-5 text-destructive animate-pulse" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getProgressColor = (type: string) => {
    switch (type) {
      case 'delete':
        return 'bg-destructive';
      default:
        return 'bg-primary';
    }
  };

  const activeNotifications = notifications.filter(n => n.isActive);

  if (activeNotifications.length === 0) return null;

  return (
    <div className="fixed top-32 right-4 z-50 space-y-3 w-80">
      {activeNotifications.map((notification) => (
        <Card 
          key={notification.id}
          className="mining-surface energy-glow p-4 shadow-lg border border-primary/20 animate-slide-in-right"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {getIcon(notification.type, notification.progress)}
              <h4 className="font-medium text-secondary-foreground">{notification.title}</h4>
            </div>
            {notification.progress >= 100 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDismiss(notification.id)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {notification.fileName && (
              <div className="text-xs text-muted-foreground font-mono">
                {notification.fileName}
              </div>
            )}

            {notification.fileSize && (
              <div className="text-xs text-muted-foreground">
                {notification.fileSize}
              </div>
            )}

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className={`font-medium ${notification.type === 'delete' ? 'text-destructive' : 'text-primary'}`}>
                  {notification.progress.toFixed(1)}% complete
                </span>
                {notification.speed && (
                  <span className="text-muted-foreground">{notification.speed}</span>
                )}
              </div>

              <Progress 
                value={notification.progress} 
                className="h-2"
              />

              {notification.eta && notification.type === 'download' && (
                <div className="text-xs text-muted-foreground">
                  ETA: {notification.eta}
                </div>
              )}

              <div className="text-xs text-muted-foreground italic">
                {notification.status}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}