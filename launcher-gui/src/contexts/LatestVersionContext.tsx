import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { logger } from '@/utils/frontendLogger';

interface LatestVersionContextType {
  // Operation states
  isDownloading: boolean;
  setIsDownloading: (value: boolean) => void;
  isUpdating: boolean;
  setIsUpdating: (value: boolean) => void;
  isVerifying: boolean;
  setIsVerifying: (value: boolean) => void;
  isDeleting: boolean;
  setIsDeleting: (value: boolean) => void;
  
  // Progress tracking
  operationProgress: number;
  operationStatus: string;
  operationType: 'download' | 'update' | 'verify' | 'delete' | null;
  
  // Installation status
  isInstalled: boolean;
  setIsInstalled: (value: boolean) => void;
  isCheckingInstallation: boolean;
  setIsCheckingInstallation: (value: boolean) => void;
}

const LatestVersionContext = createContext<LatestVersionContextType | undefined>(undefined);

export const useLatestVersion = () => {
  const context = useContext(LatestVersionContext);
  if (!context) {
    throw new Error('useLatestVersion must be used within a LatestVersionProvider');
  }
  return context;
};

interface LatestVersionProviderProps {
  children: ReactNode;
}

export const LatestVersionProvider: React.FC<LatestVersionProviderProps> = ({ children }) => {
  // Operation states
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Progress tracking
  const [operationProgress, setOperationProgress] = useState(0);
  const [operationStatus, setOperationStatus] = useState('');
  const [operationType, setOperationType] = useState<'download' | 'update' | 'verify' | 'delete' | null>(null);
  
  // Installation status
  const [isInstalled, setIsInstalled] = useState(false);
  const [isCheckingInstallation, setIsCheckingInstallation] = useState(true);

  // Set up progress listeners that persist across navigation
  useEffect(() => {
    if (!window.electronAPI) return;

    // Download progress listener
    const handleDownloadProgress = (data: any) => {
      if (data.progress !== undefined) {
        setOperationProgress(data.progress);
        setOperationStatus(data.status || 'Downloading...');
        setOperationType('download');
        
        if (data.progress >= 100) {
          setTimeout(() => {
            setIsDownloading(false);
            setOperationType(null);
            setOperationProgress(0);
            setOperationStatus('');
            // Refresh installation status
            setIsCheckingInstallation(true);
          }, 1000);
        }
      }
    };

    // Update progress listener
    const handleUpdateProgress = (data: any) => {
      if (data.progress !== undefined) {
        setOperationProgress(data.progress);
        setOperationStatus(data.status || 'Updating...');
        setOperationType('update');
        
        if (data.progress >= 100) {
          setTimeout(() => {
            setIsUpdating(false);
            setOperationType(null);
            setOperationProgress(0);
            setOperationStatus('');
          }, 1000);
        }
      }
    };

    // Verify/repair progress listener
    const handleVerifyProgress = (data: any) => {
      if (data.progress !== undefined) {
        setOperationProgress(data.progress);
        setOperationStatus(data.status || 'Verifying...');
        setOperationType('verify');
        
        if (data.progress >= 100) {
          setTimeout(() => {
            setIsVerifying(false);
            setOperationType(null);
            setOperationProgress(0);
            setOperationStatus('');
          }, 1000);
        }
      }
    };

    // Delete progress listener
    const handleDeleteProgress = (data: any) => {
      if (data.progress !== undefined) {
        setOperationProgress(data.progress);
        setOperationStatus(data.status || 'Uninstalling...');
        setOperationType('delete');
        
        if (data.progress >= 100) {
          setTimeout(() => {
            setIsDeleting(false);
            setOperationType(null);
            setOperationProgress(0);
            setOperationStatus('');
            setIsInstalled(false);
          }, 1000);
        }
      }
    };

    // Error handlers
    const handleDownloadError = (error: any) => {
      logger.error('LatestVersionContext', 'Download error', { error });
      setIsDownloading(false);
      setOperationType(null);
      setOperationProgress(0);
      setOperationStatus('');
    };

    const handleUpdateError = (error: any) => {
      logger.error('LatestVersionContext', 'Update error', { error });
      setIsUpdating(false);
      setOperationType(null);
      setOperationProgress(0);
      setOperationStatus('');
    };

    const handleVerifyError = (error: any) => {
      logger.error('LatestVersionContext', 'Verify error', { error });
      setIsVerifying(false);
      setOperationType(null);
      setOperationProgress(0);
      setOperationStatus('');
    };

    const handleDeleteError = (error: any) => {
      logger.error('LatestVersionContext', 'Delete error', { error });
      setIsDeleting(false);
      setOperationType(null);
      setOperationProgress(0);
      setOperationStatus('');
    };

    // Set up all listeners
    window.electronAPI.receive('download-latest-progress', handleDownloadProgress);
    window.electronAPI.receive('update-progress', handleUpdateProgress);
    window.electronAPI.receive('verify-repair-progress', handleVerifyProgress);
    window.electronAPI.receive('delete-latest-progress', handleDeleteProgress);
    
    window.electronAPI.receive('download-latest-error', handleDownloadError);
    window.electronAPI.receive('update-error', handleUpdateError);
    window.electronAPI.receive('verify-repair-error', handleVerifyError);
    window.electronAPI.receive('delete-latest-error', handleDeleteError);

    // Listen for version updates to refresh installation status
    window.electronAPI.receive('versions-updated', () => {
      logger.info('LatestVersionContext', 'Versions updated, will recheck installation status');
      setIsCheckingInstallation(true);
    });

    return () => {
      window.electronAPI.removeAllListeners('download-latest-progress');
      window.electronAPI.removeAllListeners('update-progress');
      window.electronAPI.removeAllListeners('verify-repair-progress');
      window.electronAPI.removeAllListeners('delete-latest-progress');
      
      window.electronAPI.removeAllListeners('download-latest-error');
      window.electronAPI.removeAllListeners('update-error');
      window.electronAPI.removeAllListeners('verify-repair-error');
      window.electronAPI.removeAllListeners('delete-latest-error');
      
      window.electronAPI.removeAllListeners('versions-updated');
    };
  }, []);

  const value: LatestVersionContextType = {
    isDownloading,
    setIsDownloading,
    isUpdating,
    setIsUpdating,
    isVerifying,
    setIsVerifying,
    isDeleting,
    setIsDeleting,
    operationProgress,
    operationStatus,
    operationType,
    isInstalled,
    setIsInstalled,
    isCheckingInstallation,
    setIsCheckingInstallation,
  };

  return (
    <LatestVersionContext.Provider value={value}>
      {children}
    </LatestVersionContext.Provider>
  );
};