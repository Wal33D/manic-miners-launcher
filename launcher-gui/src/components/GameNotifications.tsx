import { useEffect, useState } from 'react';
import { X, Download, Shield, RotateCcw, Trash2, CheckCircle, AlertCircle, Info, AlertTriangle, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface NotificationData {
  id: string;
  type: 'download' | 'verify' | 'reinstall' | 'delete' | 'repair' | 'info' | 'success' | 'error' | 'warning';
  title: string;
  message?: string;
  fileName?: string;
  fileSize?: string;
  progress?: number;
  speed?: string;
  eta?: string;
  status?: string;
  isActive?: boolean;
  timestamp?: string;
  persistent?: boolean;
}

interface GameNotificationsProps {
  notifications: NotificationData[];
  onDismiss: (id: string) => void;
}

export function GameNotifications({ notifications, onDismiss }: GameNotificationsProps) {
  const getIcon = (type: string, progress?: number) => {
    switch (type) {
      case 'download':
        if (progress !== undefined && progress >= 100) return <CheckCircle className="w-5 h-5 text-primary" />;
        return <Download className="w-5 h-5 text-primary animate-pulse" />;
      case 'verify':
        if (progress !== undefined && progress >= 100) return <CheckCircle className="w-5 h-5 text-primary" />;
        return <Shield className="w-5 h-5 text-primary animate-pulse" />;
      case 'reinstall':
        if (progress !== undefined && progress >= 100) return <CheckCircle className="w-5 h-5 text-primary" />;
        return <RotateCcw className="w-5 h-5 text-primary animate-spin" />;
      case 'delete':
        if (progress !== undefined && progress >= 100) return <CheckCircle className="w-5 h-5 text-primary" />;
        return <Trash2 className="w-5 h-5 text-destructive animate-pulse" />;
      case 'repair':
        if (progress !== undefined && progress >= 100) return <CheckCircle className="w-5 h-5 text-primary" />;
        return <RotateCcw className="w-5 h-5 text-primary animate-spin" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
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

  // Filter notifications - show if isActive is true OR if isActive is not defined (for new notification types)
  const activeNotifications = notifications.filter(n => n.isActive !== false);

  if (activeNotifications.length === 0) return null;

  return (
    <div className="fixed top-44 right-4 z-50 space-y-3 w-[600px]">
      {activeNotifications.map(notification => (
        <Card
          key={notification.id}
          className="group mining-surface energy-glow p-4 shadow-lg border border-primary/20 animate-slide-in-right hover:border-primary/40 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {getIcon(notification.type, notification.progress)}
              <h4 className="font-medium text-secondary-foreground">{notification.title}</h4>
            </div>
            {/* Close button - hidden by default, shown on hover or when notification is completed */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDismiss(notification.id)}
              className={`h-6 w-6 p-0 transition-opacity ${
                (notification.progress !== undefined && notification.progress >= 100) ||
                ['success', 'error', 'warning', 'info'].includes(notification.type)
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {/* Show message for new notification types */}
            {notification.message && <div className="text-sm text-muted-foreground">{notification.message}</div>}

            {notification.fileName && <div className="text-xs text-muted-foreground font-mono">{notification.fileName}</div>}

            {notification.fileSize && <div className="text-xs text-muted-foreground">{notification.fileSize}</div>}

            {/* Only show progress section for notifications that have progress */}
            {notification.progress !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className={`font-medium ${notification.type === 'delete' ? 'text-destructive' : 'text-primary'}`}>
                    {notification.progress.toFixed(1)}% complete
                  </span>
                  {notification.speed && <span className="text-muted-foreground">{notification.speed}</span>}
                </div>

                <Progress value={notification.progress} className="h-2" />

                {notification.eta && notification.type === 'download' && (
                  <div className="text-xs text-muted-foreground">ETA: {notification.eta}</div>
                )}
              </div>
            )}

            {/* Show status for progress notifications or timestamp for simple notifications */}
            {notification.status && <div className="text-xs text-muted-foreground italic">{notification.status}</div>}

            {notification.timestamp && !notification.status && (
              <div className="text-xs text-muted-foreground">{new Date(notification.timestamp).toLocaleTimeString()}</div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
