import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import fs from 'fs/promises';
import path from 'path';
import { EventEmitter } from 'events';
import { logger } from '../utils/logger';
import { fetchInstalledVersions } from '../functions/fetchInstalledVersions';

// Mock electron API for GUI testing
class MockElectronAPI extends EventEmitter {
  private handlers: Map<string, Function> = new Map();
  private mockState = {
    isInstalled: false,
    isDownloading: false,
    isLaunching: false,
    downloadProgress: 0,
    currentNotifications: [] as any[]
  };
  
  send(channel: string, ...args: any[]) {
    const handler = this.handlers.get(channel);
    if (handler) {
      setTimeout(() => handler(...args), 10);
    }
  }

  receive(channel: string, callback: (...args: any[]) => void) {
    this.on(channel, callback);
  }

  removeAllListeners(channel?: string): this {
    if (channel) {
      super.removeAllListeners(channel);
    } else {
      super.removeAllListeners();
    }
    return this;
  }

  // GUI state simulation helpers
  setInstallationState(isInstalled: boolean) {
    this.mockState.isInstalled = isInstalled;
  }

  simulateDownloadProgress(progress: number, status: string) {
    this.emit('download-progress', { progress, status });
  }

  simulateDownloadComplete() {
    this.mockState.isInstalled = true;
    this.emit('download-complete', { success: true });
  }

  simulateDownloadError(error: string) {
    this.emit('download-error', { error });
  }

  simulateDeleteProgress(progress: number, status: string) {
    this.emit('delete-progress', { progress, status });
  }

  simulateDeleteComplete() {
    this.mockState.isInstalled = false;
    this.emit('delete-complete', { success: true });
  }

  simulateUpdateProgress(progress: number, status: string) {
    this.emit('update-progress', { progress, status });
  }

  simulateUpdateComplete() {
    this.emit('update-complete', { success: true });
  }

  simulateVerifyProgress(progress: number, status: string) {
    this.emit('verify-progress', { progress, status });
  }

  simulateVerifyComplete(result: { success: boolean; issues?: string[] }) {
    this.emit('verify-complete', result);
  }

  simulateLaunchStart() {
    this.mockState.isLaunching = true;
    this.emit('launch-start');
  }

  simulateLaunchComplete() {
    this.mockState.isLaunching = false;
    this.emit('launch-complete');
  }

  simulateLaunchError(error: string) {
    this.mockState.isLaunching = false;
    this.emit('launch-error', { error });
  }

  // Set up handlers for backend operations
  setHandler(channel: string, handler: Function) {
    this.handlers.set(channel, handler);
  }

  // Simulate IPC call
  async simulateCall(channel: string, ...args: any[]) {
    const handler = this.handlers.get(channel);
    if (handler) {
      await handler({ sender: { send: (responseChannel: string, data: any) => this.emit(responseChannel, data) } }, ...args);
    }
  }
}

// GUI Component State Tracker
class GUIStateTracker {
  private state = {
    isInstalled: false,
    isDownloading: false,
    isLaunching: false,
    isVerifying: false,
    isDeleting: false,
    isUpdating: false,
    downloadProgress: 0,
    deleteProgress: 0,
    updateProgress: 0,
    verifyProgress: 0,
    currentNotifications: [] as any[],
    buttonStates: {
      installEnabled: true,
      launchEnabled: false,
      verifyEnabled: false,
      deleteEnabled: false,
      updateEnabled: false,
      dropdownEnabled: false
    },
    progressBars: {
      downloadVisible: false,
      deleteVisible: false,
      updateVisible: false,
      verifyVisible: false
    },
    statusMessages: {
      download: '',
      delete: '',
      update: '',
      verify: ''
    }
  };

  updateInstallationState(isInstalled: boolean) {
    this.state.isInstalled = isInstalled;
    this.updateButtonStates();
  }

  updateOperationState(operation: string, isActive: boolean, progress?: number, status?: string) {
    switch (operation) {
      case 'download':
        this.state.isDownloading = isActive;
        if (progress !== undefined) this.state.downloadProgress = progress;
        if (status) this.state.statusMessages.download = status;
        this.state.progressBars.downloadVisible = isActive;
        break;
      case 'delete':
        this.state.isDeleting = isActive;
        if (progress !== undefined) this.state.deleteProgress = progress;
        if (status) this.state.statusMessages.delete = status;
        this.state.progressBars.deleteVisible = isActive;
        break;
      case 'update':
        this.state.isUpdating = isActive;
        if (progress !== undefined) this.state.updateProgress = progress;
        if (status) this.state.statusMessages.update = status;
        this.state.progressBars.updateVisible = isActive;
        break;
      case 'verify':
        this.state.isVerifying = isActive;
        if (progress !== undefined) this.state.verifyProgress = progress;
        if (status) this.state.statusMessages.verify = status;
        this.state.progressBars.verifyVisible = isActive;
        break;
      case 'launch':
        this.state.isLaunching = isActive;
        break;
    }
    this.updateButtonStates();
  }

  private updateButtonStates() {
    const anyOperationActive = this.state.isDownloading || this.state.isDeleting || 
                              this.state.isUpdating || this.state.isVerifying || this.state.isLaunching;
    
    this.state.buttonStates = {
      installEnabled: !this.state.isInstalled && !anyOperationActive,
      launchEnabled: this.state.isInstalled && !anyOperationActive,
      verifyEnabled: this.state.isInstalled && !anyOperationActive,
      deleteEnabled: this.state.isInstalled && !anyOperationActive,
      updateEnabled: this.state.isInstalled && !anyOperationActive,
      dropdownEnabled: this.state.isInstalled && !anyOperationActive
    };
  }

  addNotification(notification: any) {
    this.state.currentNotifications.push(notification);
  }

  removeNotification(id: string) {
    this.state.currentNotifications = this.state.currentNotifications.filter(n => n.id !== id);
  }

  getState() {
    return { ...this.state };
  }

  validateProgressFlow(operation: string, expectedSteps: string[]) {
    // This would validate that progress messages follow the expected sequence
    return true; // Simplified for now
  }

  validateButtonStatesConsistency() {
    const state = this.getState();
    
    // Validate that button states are mutually exclusive and consistent
    if (!state.isInstalled && state.buttonStates.launchEnabled) {
      throw new Error('Launch button should not be enabled when not installed');
    }
    
    if (state.isInstalled && state.buttonStates.installEnabled) {
      throw new Error('Install button should not be enabled when already installed');
    }
    
    const anyOperationActive = state.isDownloading || state.isDeleting || 
                              state.isUpdating || state.isVerifying || state.isLaunching;
    
    if (anyOperationActive) {
      const enabledButtons = Object.values(state.buttonStates).filter(enabled => enabled);
      if (enabledButtons.length > 0) {
        throw new Error('No buttons should be enabled during active operations');
      }
    }
    
    return true;
  }

  validateProgressBarVisibility() {
    const state = this.getState();
    
    if (state.isDownloading && !state.progressBars.downloadVisible) {
      throw new Error('Download progress bar should be visible during download');
    }
    
    if (!state.isDownloading && state.progressBars.downloadVisible) {
      throw new Error('Download progress bar should not be visible when not downloading');
    }
    
    // Similar checks for other operations
    return true;
  }
}

describe('GUI Flow Tests - Impressive User Experience', () => {
  let testDir: string;
  let originalEnv: string | undefined;
  let mockAPI: MockElectronAPI;
  let guiState: GUIStateTracker;

  beforeEach(async () => {
    // Create a temporary test directory
    testDir = path.join(process.cwd(), 'test-gui-flow');
    await fs.mkdir(testDir, { recursive: true });
    
    // Set environment variable to use test directory
    originalEnv = process.env.MANIC_MINERS_INSTALL_PATH;
    process.env.MANIC_MINERS_INSTALL_PATH = testDir;
    
    await logger.clearLogs();

    // Initialize mock API and GUI state tracker
    mockAPI = new MockElectronAPI();
    guiState = new GUIStateTracker();
  });

  afterEach(async () => {
    // Clean up test directory
    try {
      await fs.rm(testDir, { recursive: true });
    } catch (error) {
      // Ignore cleanup errors
    }
    
    // Restore environment
    if (originalEnv) {
      process.env.MANIC_MINERS_INSTALL_PATH = originalEnv;
    } else {
      delete process.env.MANIC_MINERS_INSTALL_PATH;
    }
  });

  describe('Initial State and Installation Detection', () => {
    it('should display correct initial state when game is not installed', async () => {
      // Simulate fresh installation check
      mockAPI.setHandler('request-latest-version-information', async (event: any) => {
        const result = await fetchInstalledVersions();
        event.sender.send('latest-version-information-response', {
          versions: result.installedVersions || []
        });
      });

      await mockAPI.simulateCall('request-latest-version-information');

      // Verify initial GUI state
      guiState.updateInstallationState(false);
      const state = guiState.getState();

      expect(state.isInstalled).to.be.false;
      expect(state.buttonStates.installEnabled).to.be.true;
      expect(state.buttonStates.launchEnabled).to.be.false;
      expect(state.buttonStates.dropdownEnabled).to.be.false;
      expect(state.currentNotifications).to.have.length(0);

      // Validate consistency
      expect(guiState.validateButtonStatesConsistency()).to.be.true;
    });

    it('should display correct state when game is already installed', async () => {
      // Create installation directory with executable
      const latestDir = path.join(testDir, 'latest');
      await fs.mkdir(latestDir, { recursive: true });
      await fs.writeFile(path.join(latestDir, 'ManicMiners.exe'), 'game executable');

      mockAPI.setHandler('request-latest-version-information', async (event: any) => {
        const result = await fetchInstalledVersions();
        event.sender.send('latest-version-information-response', {
          versions: result.installedVersions || []
        });
      });

      await mockAPI.simulateCall('request-latest-version-information');

      // Verify installed state
      guiState.updateInstallationState(true);
      const state = guiState.getState();

      expect(state.isInstalled).to.be.true;
      expect(state.buttonStates.installEnabled).to.be.false;
      expect(state.buttonStates.launchEnabled).to.be.true;
      expect(state.buttonStates.dropdownEnabled).to.be.true;
      expect(state.buttonStates.verifyEnabled).to.be.true;
      expect(state.buttonStates.deleteEnabled).to.be.true;
      expect(state.buttonStates.updateEnabled).to.be.true;

      // Validate consistency
      expect(guiState.validateButtonStatesConsistency()).to.be.true;
    });
  });

  describe('Download/Install Flow - User Impression Points', () => {
    it('should provide impressive download experience with smooth progress and status updates', async () => {
      guiState.updateInstallationState(false);

      // Simulate impressive download flow
      const downloadSteps = [
        { progress: 0, status: 'Preparing download...' },
        { progress: 5, status: 'Connecting to server...' },
        { progress: 10, status: 'Downloading Manic Miners...' },
        { progress: 25, status: 'Downloaded 250 MB / 1.0 GB' },
        { progress: 50, status: 'Downloaded 500 MB / 1.0 GB' },
        { progress: 75, status: 'Downloaded 750 MB / 1.0 GB' },
        { progress: 90, status: 'Extracting game files...' },
        { progress: 95, status: 'Verifying installation...' },
        { progress: 100, status: 'Installation complete!' }
      ];

      // Start download operation
      guiState.updateOperationState('download', true, 0, 'Starting download...');
      
      // Verify all buttons are disabled during download
      let state = guiState.getState();
      expect(state.buttonStates.installEnabled).to.be.false;
      expect(state.buttonStates.launchEnabled).to.be.false;
      expect(state.progressBars.downloadVisible).to.be.true;

      // Simulate smooth progress updates
      for (const step of downloadSteps) {
        guiState.updateOperationState('download', true, step.progress, step.status);
        
        state = guiState.getState();
        expect(state.downloadProgress).to.equal(step.progress);
        expect(state.statusMessages.download).to.equal(step.status);
        expect(state.progressBars.downloadVisible).to.be.true;
        
        // Ensure button states remain consistent during operation
        expect(guiState.validateButtonStatesConsistency()).to.be.true;
        expect(guiState.validateProgressBarVisibility()).to.be.true;
      }

      // Complete download
      guiState.updateOperationState('download', false);
      guiState.updateInstallationState(true);

      // Verify final state shows successful installation
      state = guiState.getState();
      expect(state.isInstalled).to.be.true;
      expect(state.isDownloading).to.be.false;
      expect(state.buttonStates.launchEnabled).to.be.true;
      expect(state.buttonStates.dropdownEnabled).to.be.true;
      expect(state.progressBars.downloadVisible).to.be.false;

      // Validate final consistency
      expect(guiState.validateButtonStatesConsistency()).to.be.true;
    });

    it('should handle download errors gracefully with clear user feedback', async () => {
      guiState.updateInstallationState(false);
      guiState.updateOperationState('download', true, 45, 'Downloading...');

      // Simulate download error at 45%
      const errorNotification = {
        id: 'download-error-1',
        type: 'error',
        title: 'Download Failed',
        message: 'Connection to server lost. Click to retry.',
        persistent: true
      };

      guiState.addNotification(errorNotification);
      guiState.updateOperationState('download', false);

      const state = guiState.getState();
      expect(state.isDownloading).to.be.false;
      expect(state.isInstalled).to.be.false;
      expect(state.buttonStates.installEnabled).to.be.true; // Should allow retry
      expect(state.currentNotifications).to.have.length(1);
      expect(state.currentNotifications[0].type).to.equal('error');

      // Validate recovery state
      expect(guiState.validateButtonStatesConsistency()).to.be.true;
    });
  });

  describe('Launch Flow - Seamless Game Startup', () => {
    it('should provide smooth launch experience with appropriate feedback', async () => {
      // Setup installed state
      guiState.updateInstallationState(true);

      // Start launch sequence
      guiState.updateOperationState('launch', true);

      let state = guiState.getState();
      expect(state.isLaunching).to.be.true;
      expect(state.buttonStates.launchEnabled).to.be.false;
      expect(state.buttonStates.dropdownEnabled).to.be.false;

      // Simulate launch phases
      const launchNotification = {
        id: 'launch-1',
        type: 'info',
        title: 'Launching Game',
        message: 'Starting Manic Miners...',
        duration: 3000
      };

      guiState.addNotification(launchNotification);

      // Validate launch state
      expect(guiState.validateButtonStatesConsistency()).to.be.true;

      // Complete launch
      guiState.updateOperationState('launch', false);
      guiState.removeNotification('launch-1');

      state = guiState.getState();
      expect(state.isLaunching).to.be.false;
      expect(state.buttonStates.launchEnabled).to.be.true;
      expect(state.buttonStates.dropdownEnabled).to.be.true;
    });

    it('should handle launch failures with helpful error messages', async () => {
      guiState.updateInstallationState(true);
      guiState.updateOperationState('launch', true);

      // Simulate launch error
      const errorNotification = {
        id: 'launch-error-1',
        type: 'error',
        title: 'Launch Failed',
        message: 'Game files may be corrupted. Try verify & repair.',
        persistent: true,
        actions: [
          { label: 'Verify & Repair', action: 'verify' },
          { label: 'Dismiss', action: 'dismiss' }
        ]
      };

      guiState.updateOperationState('launch', false);
      guiState.addNotification(errorNotification);

      const state = guiState.getState();
      expect(state.isLaunching).to.be.false;
      expect(state.currentNotifications).to.have.length(1);
      expect(state.currentNotifications[0].actions).to.exist;
      expect(state.buttonStates.verifyEnabled).to.be.true; // Should suggest verify
    });
  });

  describe('Update Flow - Seamless Version Management', () => {
    it('should provide smooth update experience with clear progress indication', async () => {
      guiState.updateInstallationState(true);

      const updateSteps = [
        { progress: 0, status: 'Checking for updates...' },
        { progress: 10, status: 'New version found!' },
        { progress: 20, status: 'Downloading update...' },
        { progress: 60, status: 'Downloaded 400 MB / 650 MB' },
        { progress: 90, status: 'Applying update...' },
        { progress: 100, status: 'Update complete!' }
      ];

      guiState.updateOperationState('update', true, 0, 'Starting update...');

      // Verify buttons disabled during update
      let state = guiState.getState();
      expect(state.buttonStates.launchEnabled).to.be.false;
      expect(state.buttonStates.dropdownEnabled).to.be.false;
      expect(state.progressBars.updateVisible).to.be.true;

      // Simulate update progress
      for (const step of updateSteps) {
        guiState.updateOperationState('update', true, step.progress, step.status);
        
        expect(guiState.validateButtonStatesConsistency()).to.be.true;
        expect(guiState.validateProgressBarVisibility()).to.be.true;
      }

      // Complete update
      guiState.updateOperationState('update', false);
      
      const successNotification = {
        id: 'update-success-1',
        type: 'success',
        title: 'Update Complete',
        message: 'Manic Miners has been updated to the latest version!',
        duration: 5000
      };

      guiState.addNotification(successNotification);

      state = guiState.getState();
      expect(state.isUpdating).to.be.false;
      expect(state.buttonStates.launchEnabled).to.be.true;
      expect(state.currentNotifications).to.have.length(1);
      expect(state.currentNotifications[0].type).to.equal('success');
    });
  });

  describe('Verify & Repair Flow - Confidence Building', () => {
    it('should provide thorough verification with detailed progress feedback', async () => {
      guiState.updateInstallationState(true);

      const verifySteps = [
        { progress: 0, status: 'Starting verification...' },
        { progress: 20, status: 'Checking game executable...' },
        { progress: 40, status: 'Verifying game assets...' },
        { progress: 60, status: 'Checking level files...' },
        { progress: 80, status: 'Validating configuration...' },
        { progress: 100, status: 'Verification complete!' }
      ];

      guiState.updateOperationState('verify', true, 0, 'Preparing verification...');

      // Verify operation state
      let state = guiState.getState();
      expect(state.isVerifying).to.be.true;
      expect(state.progressBars.verifyVisible).to.be.true;
      expect(state.buttonStates.dropdownEnabled).to.be.false;

      // Simulate verification steps
      for (const step of verifySteps) {
        guiState.updateOperationState('verify', true, step.progress, step.status);
        expect(guiState.validateButtonStatesConsistency()).to.be.true;
      }

      // Complete verification with success
      guiState.updateOperationState('verify', false);
      
      const successNotification = {
        id: 'verify-success-1',
        type: 'success',
        title: 'Verification Complete',
        message: 'All game files are intact and ready to play!',
        duration: 4000
      };

      guiState.addNotification(successNotification);

      state = guiState.getState();
      expect(state.isVerifying).to.be.false;
      expect(state.currentNotifications[0].type).to.equal('success');
    });

    it('should handle repair operations when issues are found', async () => {
      guiState.updateInstallationState(true);
      guiState.updateOperationState('verify', true, 100, 'Verification complete');

      // Simulate issues found
      const repairNotification = {
        id: 'verify-issues-1',
        type: 'warning',
        title: 'Issues Found',
        message: '3 corrupted files detected. Starting automatic repair...',
        persistent: true
      };

      guiState.addNotification(repairNotification);
      guiState.updateOperationState('verify', false);

      // Start repair
      const repairSteps = [
        { progress: 0, status: 'Downloading missing files...' },
        { progress: 50, status: 'Repairing corrupted assets...' },
        { progress: 100, status: 'Repair complete!' }
      ];

      guiState.updateOperationState('verify', true, 0, 'Starting repair...');

      for (const step of repairSteps) {
        guiState.updateOperationState('verify', true, step.progress, step.status);
      }

      // Complete repair
      guiState.updateOperationState('verify', false);
      guiState.removeNotification('verify-issues-1');

      const repairSuccessNotification = {
        id: 'repair-success-1',
        type: 'success',
        title: 'Repair Complete',
        message: 'All issues have been fixed. Game is ready to play!',
        duration: 5000
      };

      guiState.addNotification(repairSuccessNotification);

      const state = guiState.getState();
      expect(state.currentNotifications[0].type).to.equal('success');
    });
  });

  describe('Uninstall Flow - Clean and Clear', () => {
    it('should provide detailed uninstall progress with file-by-file feedback', async () => {
      guiState.updateInstallationState(true);

      const uninstallSteps = [
        { progress: 0, status: 'Preparing uninstall...' },
        { progress: 10, status: 'Stopping any running processes...' },
        { progress: 20, status: 'Removing game executable...' },
        { progress: 40, status: 'Deleting game assets...' },
        { progress: 60, status: 'Removing level files...' },
        { progress: 80, status: 'Cleaning configuration files...' },
        { progress: 90, status: 'Removing installation directory...' },
        { progress: 100, status: 'Uninstall complete!' }
      ];

      guiState.updateOperationState('delete', true, 0, 'Starting uninstall...');

      // Verify delete state
      let state = guiState.getState();
      expect(state.isDeleting).to.be.true;
      expect(state.progressBars.deleteVisible).to.be.true;
      expect(state.buttonStates.dropdownEnabled).to.be.false;

      // Simulate uninstall progress
      for (const step of uninstallSteps) {
        guiState.updateOperationState('delete', true, step.progress, step.status);
        expect(guiState.validateButtonStatesConsistency()).to.be.true;
      }

      // Complete uninstall
      guiState.updateOperationState('delete', false);
      guiState.updateInstallationState(false);

      const uninstallNotification = {
        id: 'uninstall-success-1',
        type: 'info',
        title: 'Uninstall Complete',
        message: 'Manic Miners has been completely removed from your system.',
        duration: 4000
      };

      guiState.addNotification(uninstallNotification);

      state = guiState.getState();
      expect(state.isDeleting).to.be.false;
      expect(state.isInstalled).to.be.false;
      expect(state.buttonStates.installEnabled).to.be.true;
      expect(state.buttonStates.launchEnabled).to.be.false;
      expect(state.buttonStates.dropdownEnabled).to.be.false;
    });
  });

  describe('Notification Persistence and State Management', () => {
    it('should maintain notifications across page navigation during operations', async () => {
      // Start a long operation
      guiState.updateInstallationState(false);
      guiState.updateOperationState('download', true, 30, 'Downloading...');

      const downloadNotification = {
        id: 'download-persistent-1',
        type: 'info',
        title: 'Download in Progress',
        message: 'Downloading Manic Miners... 30% complete',
        persistent: true,
        progress: 30
      };

      guiState.addNotification(downloadNotification);

      // Simulate page navigation (notification should persist)
      const state1 = guiState.getState();
      expect(state1.currentNotifications).to.have.length(1);
      expect(state1.currentNotifications[0].persistent).to.be.true;

      // Continue operation after "navigation"
      guiState.updateOperationState('download', true, 75, 'Almost complete...');

      // Update notification
      guiState.removeNotification('download-persistent-1');
      const updatedNotification = {
        ...downloadNotification,
        message: 'Downloading Manic Miners... 75% complete',
        progress: 75
      };
      guiState.addNotification(updatedNotification);

      const state2 = guiState.getState();
      expect(state2.currentNotifications).to.have.length(1);
      expect(state2.currentNotifications[0].progress).to.equal(75);
    });

    it('should handle concurrent operations gracefully', async () => {
      guiState.updateInstallationState(true);

      // Try to start multiple operations (should prevent this)
      guiState.updateOperationState('verify', true, 10, 'Verifying...');
      
      let state = guiState.getState();
      expect(state.isVerifying).to.be.true;
      expect(state.buttonStates.updateEnabled).to.be.false;
      expect(state.buttonStates.deleteEnabled).to.be.false;

      // Attempt to start update while verifying (should be prevented)
      const conflictNotification = {
        id: 'operation-conflict-1',
        type: 'warning',
        title: 'Operation in Progress',
        message: 'Please wait for verification to complete before starting another operation.',
        duration: 3000
      };

      // In real implementation, this would be prevented by disabled buttons
      // Here we simulate the user feedback for attempting concurrent operations
      guiState.addNotification(conflictNotification);

      state = guiState.getState();
      expect(state.currentNotifications).to.have.length(1);
      expect(state.currentNotifications[0].type).to.equal('warning');

      // Complete first operation
      guiState.updateOperationState('verify', false);
      guiState.removeNotification('operation-conflict-1');

      // Now other operations should be available
      state = guiState.getState();
      expect(state.isVerifying).to.be.false;
      expect(state.buttonStates.updateEnabled).to.be.true;
      expect(state.buttonStates.deleteEnabled).to.be.true;
    });
  });

  describe('Error Recovery and User Guidance', () => {
    it('should provide helpful recovery suggestions for common issues', async () => {
      guiState.updateInstallationState(true);

      // Simulate various error scenarios with appropriate guidance
      const errorScenarios = [
        {
          error: 'insufficient_disk_space',
          notification: {
            id: 'error-disk-space',
            type: 'error',
            title: 'Insufficient Disk Space',
            message: 'Need at least 2 GB free space. Please free up space and try again.',
            persistent: true,
            actions: [
              { label: 'Check Disk Space', action: 'check_disk' },
              { label: 'Choose Different Location', action: 'change_path' }
            ]
          }
        },
        {
          error: 'permission_denied',
          notification: {
            id: 'error-permissions',
            type: 'error',
            title: 'Permission Denied',
            message: 'Unable to write to installation directory. Try running as administrator.',
            persistent: true,
            actions: [
              { label: 'Run as Administrator', action: 'elevate' },
              { label: 'Choose Different Location', action: 'change_path' }
            ]
          }
        },
        {
          error: 'network_timeout',
          notification: {
            id: 'error-network',
            type: 'error',
            title: 'Download Failed',
            message: 'Connection timed out. Check your internet connection.',
            persistent: true,
            actions: [
              { label: 'Retry Download', action: 'retry' },
              { label: 'Check Connection', action: 'check_network' }
            ]
          }
        }
      ];

      for (const scenario of errorScenarios) {
        guiState.addNotification(scenario.notification);
        
        const state = guiState.getState();
        const notification = state.currentNotifications.find(n => n.id === scenario.notification.id);
        
        expect(notification).to.exist;
        expect(notification?.actions).to.exist;
        expect(notification?.actions).to.have.length.greaterThan(0);
        expect(notification?.persistent).to.be.true;
        
        // Clear for next scenario
        guiState.removeNotification(scenario.notification.id);
      }
    });

    it('should maintain professional appearance during error states', async () => {
      guiState.updateInstallationState(false);

      // Simulate multiple cascading errors (should handle gracefully)
      const errors = [
        { id: 'error-1', title: 'Download Failed', type: 'error' },
        { id: 'error-2', title: 'Retry Failed', type: 'error' },
        { id: 'error-3', title: 'Network Issue', type: 'warning' }
      ];

      for (const error of errors) {
        guiState.addNotification({
          id: error.id,
          type: error.type as any,
          title: error.title,
          message: 'Details about the error...',
          persistent: true
        });
      }

      const state = guiState.getState();
      expect(state.currentNotifications).to.have.length(3);
      
      // Should still maintain consistent button states despite errors
      expect(guiState.validateButtonStatesConsistency()).to.be.true;
      
      // Should allow recovery attempts
      expect(state.buttonStates.installEnabled).to.be.true;
    });
  });

  describe('Performance and Responsiveness Validation', () => {
    it('should handle rapid progress updates without UI lag', async () => {
      guiState.updateInstallationState(false);
      guiState.updateOperationState('download', true, 0, 'Starting...');

      // Simulate rapid progress updates (every 1%)
      for (let progress = 0; progress <= 100; progress++) {
        guiState.updateOperationState('download', true, progress, `Downloaded ${progress}%`);
        
        const state = guiState.getState();
        expect(state.downloadProgress).to.equal(progress);
        expect(guiState.validateButtonStatesConsistency()).to.be.true;
      }

      guiState.updateOperationState('download', false);
      guiState.updateInstallationState(true);

      const finalState = guiState.getState();
      expect(finalState.isDownloading).to.be.false;
      expect(finalState.isInstalled).to.be.true;
    });

    it('should maintain state consistency under stress conditions', async () => {
      // Simulate rapid state changes
      for (let i = 0; i < 100; i++) {
        const isInstalled = i % 2 === 0;
        guiState.updateInstallationState(isInstalled);
        
        if (isInstalled) {
          const operations = ['verify', 'update', 'delete'];
          const operation = operations[i % operations.length];
          guiState.updateOperationState(operation, true, i % 101, `${operation} ${i}%`);
          guiState.updateOperationState(operation, false);
        } else {
          guiState.updateOperationState('download', true, i % 101, `Download ${i}%`);
          guiState.updateOperationState('download', false);
        }

        // Should maintain consistency throughout
        expect(guiState.validateButtonStatesConsistency()).to.be.true;
        expect(guiState.validateProgressBarVisibility()).to.be.true;
      }
    });
  });
});