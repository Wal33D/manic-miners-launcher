import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { logger } from '@/utils/frontendLogger';

interface ArchivedVersionContextType {
  // Operation states
  isDownloading: boolean;
  setIsDownloading: (value: boolean) => void;
  isRepairing: boolean;
  setIsRepairing: (value: boolean) => void;
  isDeleting: boolean;
  setIsDeleting: (value: boolean) => void;

  // Progress tracking
  operationProgress: number;
  operationStatus: string;
  operationType: 'download' | 'repair' | 'delete' | null;
  currentVersionId: string | null;

  // Installation status per version
  installedVersions: Set<string>;
  setInstalledVersions: (value: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
}

const ArchivedVersionContext = createContext<ArchivedVersionContextType | undefined>(undefined);

export const useArchivedVersion = () => {
  const context = useContext(ArchivedVersionContext);
  if (!context) {
    throw new Error('useArchivedVersion must be used within an ArchivedVersionProvider');
  }
  return context;
};

interface ArchivedVersionProviderProps {
  children: ReactNode;
}

export const ArchivedVersionProvider: React.FC<ArchivedVersionProviderProps> = ({ children }) => {
  // Operation states
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRepairing, setIsRepairing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Progress tracking
  const [operationProgress, setOperationProgress] = useState(0);
  const [operationStatus, setOperationStatus] = useState('');
  const [operationType, setOperationType] = useState<'download' | 'repair' | 'delete' | null>(null);
  const [currentVersionId, setCurrentVersionId] = useState<string | null>(null);

  // Installation status per version
  const [installedVersions, setInstalledVersions] = useState<Set<string>>(new Set());

  // Set up progress listeners that persist across navigation
  useEffect(() => {
    if (!window.electronAPI) return;

    // Enhanced download progress listener to handle both download and repair
    const handleDownloadProgressEnhanced = (data: any) => {
      if (data.progress !== undefined) {
        // Check if this is a repair operation based on current state
        if (isRepairing) {
          setOperationProgress(data.progress);
          setOperationStatus(data.status || 'Repairing...');
          setOperationType('repair');
          if (data.fileName) {
            setCurrentVersionId(data.fileName);
          }

          if (data.progress >= 100) {
            setTimeout(() => {
              setIsRepairing(false);
              setOperationType(null);
              setOperationProgress(0);
              setOperationStatus('');
              setCurrentVersionId(null);
            }, 1000);
          }
        } else {
          // This is a download operation
          setOperationProgress(data.progress);
          setOperationStatus(data.status || 'Downloading...');
          setOperationType('download');
          if (data.fileName) {
            setCurrentVersionId(data.fileName);
          }

          if (data.progress >= 100) {
            setTimeout(() => {
              setIsDownloading(false);
              setOperationType(null);
              setOperationProgress(0);
              setOperationStatus('');
              setCurrentVersionId(null);
            }, 1000);
          }
        }
      }
    };

    // Delete progress listener for archived versions
    const handleDeleteProgress = (data: any) => {
      if (data.progress !== undefined) {
        setOperationProgress(data.progress);
        setOperationStatus(data.status || 'Uninstalling...');
        setOperationType('delete');
        if (data.fileName) {
          setCurrentVersionId(data.fileName);
        }

        if (data.progress >= 100) {
          setTimeout(() => {
            setIsDeleting(false);
            setOperationType(null);
            setOperationProgress(0);
            setOperationStatus('');
            setCurrentVersionId(null);

            // Trigger a refresh of version information to update installed status
            if (window.electronAPI) {
              window.electronAPI.send('request-archived-versions-information');
            }
          }, 1000);
        }
      }
    };

    // Error handlers
    const handleDownloadError = (error: any) => {
      logger.error('ArchivedVersionContext', 'Download error', { error });
      setIsDownloading(false);
      setOperationType(null);
      setOperationProgress(0);
      setOperationStatus('');
      setCurrentVersionId(null);
    };

    const handleRepairError = (error: any) => {
      logger.error('ArchivedVersionContext', 'Repair error', { error });
      setIsRepairing(false);
      setOperationType(null);
      setOperationProgress(0);
      setOperationStatus('');
      setCurrentVersionId(null);
    };

    const handleDeleteError = (error: any) => {
      logger.error('ArchivedVersionContext', 'Delete error', { error });
      setIsDeleting(false);
      setOperationType(null);
      setOperationProgress(0);
      setOperationStatus('');
      setCurrentVersionId(null);
    };

    // Set up all listeners for archived version operations
    window.electronAPI.receive('download-progress', handleDownloadProgressEnhanced);

    window.electronAPI.receive('delete-progress', handleDeleteProgress);

    window.electronAPI.receive('download-error', handleDownloadError);
    window.electronAPI.receive('repair-error', handleRepairError);
    window.electronAPI.receive('delete-error', handleDeleteError);

    // Listen for version updates to refresh installation status
    window.electronAPI.receive('versions-updated', () => {
      logger.info('ArchivedVersionContext', 'Versions updated, will recheck installation status');
      // Re-fetch the installed versions from the backend
      window.electronAPI.send('request-archived-versions-information');
    });

    return () => {
      window.electronAPI.removeAllListeners('download-progress');
      window.electronAPI.removeAllListeners('delete-progress');

      window.electronAPI.removeAllListeners('download-error');
      window.electronAPI.removeAllListeners('repair-error');
      window.electronAPI.removeAllListeners('delete-error');

      window.electronAPI.removeAllListeners('versions-updated');
    };
  }, []);

  const value: ArchivedVersionContextType = {
    isDownloading,
    setIsDownloading,
    isRepairing,
    setIsRepairing,
    isDeleting,
    setIsDeleting,
    operationProgress,
    operationStatus,
    operationType,
    currentVersionId,
    installedVersions,
    setInstalledVersions,
  };

  return <ArchivedVersionContext.Provider value={value}>{children}</ArchivedVersionContext.Provider>;
};
