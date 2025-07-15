import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LauncherHeader } from '@/components/LauncherHeader';
import { Footer } from '@/components/Footer';
import { GameNotifications, NotificationData } from '@/components/GameNotifications';
import type { ProgressData } from '@/types/progress';

import { logger } from './utils/frontendLogger';

// Direct imports for Electron compatibility
import Index from './pages/Index';
import GameVersions from './pages/GameVersions';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  // Global progress tracking for persistent notifications
  useEffect(() => {
    if (!window.electronAPI) return;

    // Setup persistent IPC listeners for progress updates
    const setupProgressListeners = () => {
      // Latest version progress listeners
      window.electronAPI.receive('download-latest-progress', (progressData: ProgressData) => {
        logger.debug('DOWNLOAD', 'Global download progress', progressData);
        if (progressData.progress !== undefined) {
          const notification: NotificationData = {
            id: 'latest-download',
            type: 'download',
            title: 'Game Download',
            fileName: `ManicMinersV${progressData.version || 'Latest'}.zip`,
            fileSize: '1.0 GB',
            progress: progressData.progress,
            speed: '15.2 MB/s',
            eta: '0:24',
            status: progressData.status || 'Downloading version file...', // Use actual status from backend
            isActive: true,
          };
          addNotification(notification);

          if (progressData.progress >= 100) {
            logger.info('DOWNLOAD', 'Download complete, removing notification');
            removeNotification('latest-download');
          }
        }
      });

      window.electronAPI.receive('verify-repair-progress', (progressData: ProgressData) => {
        if (progressData.progress !== undefined) {
          const notification: NotificationData = {
            id: 'latest-verify',
            type: 'repair',
            title: 'Game Verification',
            fileName: `ManicMinersV${progressData.version || 'Latest'}`,
            progress: progressData.progress,
            status: progressData.status || 'Verifying installation...',
            isActive: true,
          };
          addNotification(notification);

          if (progressData.progress >= 100) {
            removeNotification('latest-verify');
          }
        }
      });

      window.electronAPI.receive('delete-latest-progress', (progressData: ProgressData) => {
        if (progressData.progress !== undefined) {
          const notification: NotificationData = {
            id: 'latest-uninstall',
            type: 'delete',
            title: 'Game Uninstall',
            fileName: `ManicMinersV${progressData.version || 'Latest'}`,
            progress: progressData.progress,
            status: progressData.status || 'Starting uninstall...',
            isActive: true,
          };
          addNotification(notification);

          if (progressData.progress >= 100) {
            removeNotification('latest-uninstall');
          }
        }
      });

      window.electronAPI.receive('update-progress', (progressData: any) => {
        if (progressData.progress !== undefined) {
          const notification: NotificationData = {
            id: 'latest-update',
            type: 'download',
            title: 'Game Update',
            fileName: `ManicMinersV${progressData.version || 'Latest'}`,
            fileSize: '1.0 GB',
            progress: progressData.progress,
            speed: '15.2 MB/s',
            eta: '0:24',
            status: progressData.status || 'Updating to latest version...',
            isActive: true,
          };
          addNotification(notification);

          if (progressData.progress >= 100) {
            removeNotification('latest-update');
          }
        }
      });

      // Archived versions progress listeners
      window.electronAPI.receive('download-progress', (progressData: any) => {
        if (progressData.progress !== undefined) {
          const notification: NotificationData = {
            id: 'download',
            type: 'download',
            title: 'Game Download',
            fileName: progressData.fileName || 'ManicMiners.zip',
            fileSize: progressData.totalSize ? `${(progressData.totalSize / 1024 / 1024).toFixed(1)} MB` : '528.0 MB',
            progress: progressData.progress,
            speed: progressData.speedBytesPerSec ? `${(progressData.speedBytesPerSec / 1024 / 1024).toFixed(1)} MB/s` : '15.2 MB/s',
            eta: progressData.etaSeconds
              ? `${Math.floor(progressData.etaSeconds / 60)}:${(progressData.etaSeconds % 60).toString().padStart(2, '0')}`
              : '0:24',
            status: progressData.status || 'Downloading version file...',
            isActive: true,
          };
          addNotification(notification);

          if (progressData.progress >= 100) {
            removeNotification('download');
          }
        }
      });

      // Shortcut creation progress
      window.electronAPI.receive('create-shortcuts-progress', (progressData: ProgressData) => {
        if (progressData.progress !== undefined) {
          const notification: NotificationData = {
            id: 'shortcut-creation',
            type: 'info',
            title: 'Creating Shortcuts',
            message: 'Creating desktop and menu shortcuts...',
            progress: progressData.progress,
            status: progressData.status || 'Creating shortcuts...',
            isActive: true,
          };
          addNotification(notification);

          if (progressData.progress >= 100) {
            removeNotification('shortcut-creation');
          }
        }
      });
    };

    setupProgressListeners();

    // Cleanup function
    return () => {
      window.electronAPI.removeAllListeners('download-latest-progress');
      window.electronAPI.removeAllListeners('verify-repair-progress');
      window.electronAPI.removeAllListeners('delete-latest-progress');
      window.electronAPI.removeAllListeners('update-progress');
      window.electronAPI.removeAllListeners('download-progress');
      window.electronAPI.removeAllListeners('create-shortcuts-progress');
    };
  }, []);

  // Add or update a notification
  const addNotification = (notification: NotificationData) => {
    setNotifications(prev => {
      const existingIndex = prev.findIndex(n => n.id === notification.id);
      if (existingIndex >= 0) {
        // Update existing notification
        const updated = [...prev];
        updated[existingIndex] = notification;
        return updated;
      } else {
        // Add new notification
        return [...prev, notification];
      }
    });
  };

  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // For backwards compatibility - but now properly merges notifications
  const handleNotificationUpdate = (newNotifications: NotificationData[]) => {
    // Only update notifications that are provided, don't clear others
    setNotifications(prev => {
      const updated = [...prev];

      newNotifications.forEach(notification => {
        const existingIndex = updated.findIndex(n => n.id === notification.id);
        if (existingIndex >= 0) {
          // Update existing notification
          updated[existingIndex] = notification;
        } else {
          // Add new notification
          updated.push(notification);
        }
      });

      return updated;
    });
  };

  const handleDismissNotification = (id: string) => {
    removeNotification(id);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <div className="h-screen bg-background flex flex-col overflow-hidden">
            <GameNotifications notifications={notifications} onDismiss={handleDismissNotification} />
            <LauncherHeader />
            <main className="flex-1 overflow-hidden">
              <Routes>
                <Route
                  path="/"
                  element={<Index onNotificationUpdate={handleNotificationUpdate} removeNotification={removeNotification} />}
                />
                <Route
                  path="/game-versions"
                  element={<GameVersions onNotificationUpdate={handleNotificationUpdate} removeNotification={removeNotification} />}
                />
                <Route path="/faq" element={<FAQ />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
