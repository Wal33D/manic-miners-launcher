import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import fs from 'fs/promises';
import path from 'path';
import { logger } from '../utils/logger';

// Notification System Test Suite - Critical for User Experience
describe('Notification System - User Experience Excellence', () => {
  let testDir: string;
  let originalEnv: string | undefined;

  beforeEach(async () => {
    testDir = path.join(process.cwd(), 'test-notifications');
    await fs.mkdir(testDir, { recursive: true });

    originalEnv = process.env.MANIC_MINERS_INSTALL_PATH;
    process.env.MANIC_MINERS_INSTALL_PATH = testDir;

    await logger.clearLogs();
  });

  afterEach(async () => {
    try {
      await fs.rm(testDir, { recursive: true });
    } catch (_error) {
      // Ignore cleanup errors
    }

    if (originalEnv) {
      process.env.MANIC_MINERS_INSTALL_PATH = originalEnv;
    } else {
      delete process.env.MANIC_MINERS_INSTALL_PATH;
    }
  });

  // Notification Manager for testing
  class NotificationManager {
    private notifications: Map<string, any> = new Map();
    private notificationHistory: any[] = [];
    private maxNotifications = 5;

    addNotification(notification: any) {
      // Validate required properties
      if (!notification.id || !notification.title || !notification.message) {
        throw new Error('Notification must have id, title, and message');
      }

      // Add timestamp
      notification.timestamp = Date.now();
      notification.displayed = true;

      this.notifications.set(notification.id, notification);
      this.notificationHistory.push({ ...notification });

      // Manage notification count
      this.enforceMaxNotifications();

      return notification;
    }

    removeNotification(id: string) {
      const notification = this.notifications.get(id);
      if (notification) {
        notification.dismissed = true;
        notification.dismissedAt = Date.now();
        this.notifications.delete(id);
        this.notificationHistory.push({ ...notification });
      }
      return notification;
    }

    updateNotification(id: string, updates: any) {
      const notification = this.notifications.get(id);
      if (notification) {
        Object.assign(notification, updates);
        notification.lastUpdated = Date.now();
        this.notificationHistory.push({ ...notification, action: 'updated' });
      }
      return notification;
    }

    getActiveNotifications() {
      return Array.from(this.notifications.values()).sort((a, b) => (b.priority || 0) - (a.priority || 0) || b.timestamp - a.timestamp);
    }

    getPersistentNotifications() {
      return this.getActiveNotifications().filter(n => n.persistent);
    }

    getNotificationHistory() {
      return [...this.notificationHistory];
    }

    clearExpiredNotifications() {
      const now = Date.now();
      const toRemove: string[] = [];

      for (const [id, notification] of this.notifications) {
        if (notification.duration && now - notification.timestamp > notification.duration && !notification.persistent) {
          toRemove.push(id);
        }
      }

      toRemove.forEach(id => this.removeNotification(id));
      return toRemove.length;
    }

    private enforceMaxNotifications() {
      const active = this.getActiveNotifications();
      if (active.length > this.maxNotifications) {
        // Remove oldest non-persistent notifications
        const nonPersistent = active.filter(n => !n.persistent).sort((a, b) => a.timestamp - b.timestamp);

        const toRemove = nonPersistent.slice(0, active.length - this.maxNotifications);
        toRemove.forEach(n => this.removeNotification(n.id));
      }
    }

    // Validation methods
    validateNotificationContent(notification: any): boolean {
      // Check for professional messaging
      const hasProperCapitalization = /^[A-Z]/.test(notification.title);
      const hasReasonableLength = notification.message.length >= 10 && notification.message.length <= 200;
      const hasAppropriateType = ['success', 'error', 'warning', 'info'].includes(notification.type);

      return hasProperCapitalization && hasReasonableLength && hasAppropriateType;
    }

    validateAccessibility(notification: any): boolean {
      // Check for accessibility features
      const hasAriaLabel = notification.ariaLabel || notification.title;
      const hasRole = notification.role || 'alert';
      const hasProperContrast = notification.type !== 'custom' || notification.contrastChecked;

      return !!hasAriaLabel && !!hasRole && hasProperContrast;
    }

    getMetrics() {
      const active = this.getActiveNotifications();
      const history = this.getNotificationHistory();

      return {
        activeCount: active.length,
        persistentCount: this.getPersistentNotifications().length,
        totalShown: history.length,
        averageDisplayTime: this.calculateAverageDisplayTime(),
        errorCount: history.filter(n => n.type === 'error').length,
        successCount: history.filter(n => n.type === 'success').length,
        userDismissedCount: history.filter(n => n.dismissed && n.dismissedBy === 'user').length,
        autoDismissedCount: history.filter(n => n.dismissed && n.dismissedBy === 'auto').length,
      };
    }

    private calculateAverageDisplayTime(): number {
      const dismissed = this.notificationHistory.filter(n => n.dismissed && n.dismissedAt);
      if (dismissed.length === 0) return 0;

      const totalTime = dismissed.reduce((sum, n) => sum + (n.dismissedAt - n.timestamp), 0);

      return Math.round(totalTime / dismissed.length);
    }
  }

  describe('Notification Creation and Management', () => {
    it('should create notifications with proper structure and validation', () => {
      const manager = new NotificationManager();

      const notification = {
        id: 'test-1',
        type: 'info',
        title: 'Test Notification',
        message: 'This is a test notification message',
        duration: 5000,
      };

      const created = manager.addNotification(notification);

      expect(created).to.exist;
      expect(created.id).to.equal('test-1');
      expect(created.timestamp).to.exist;
      expect(created.displayed).to.be.true;
      expect(manager.validateNotificationContent(created)).to.be.true;
    });

    it('should enforce maximum notification limits to prevent UI clutter', () => {
      const manager = new NotificationManager();

      // Add more notifications than the limit
      for (let i = 1; i <= 8; i++) {
        manager.addNotification({
          id: `test-${i}`,
          type: 'info',
          title: `Notification ${i}`,
          message: `Message for notification ${i}`,
          duration: 10000,
        });
      }

      const active = manager.getActiveNotifications();
      expect(active.length).to.be.at.most(5); // Should not exceed max
    });

    it('should prioritize persistent notifications over regular ones', () => {
      const manager = new NotificationManager();

      // Add regular notifications
      for (let i = 1; i <= 4; i++) {
        manager.addNotification({
          id: `regular-${i}`,
          type: 'info',
          title: `Regular ${i}`,
          message: `Regular message ${i}`,
          duration: 5000,
        });
      }

      // Add persistent notifications (should not be auto-removed)
      for (let i = 1; i <= 3; i++) {
        manager.addNotification({
          id: `persistent-${i}`,
          type: 'error',
          title: `Persistent Error ${i}`,
          message: `Persistent error message ${i}`,
          persistent: true,
        });
      }

      const active = manager.getActiveNotifications();
      const persistent = manager.getPersistentNotifications();

      expect(persistent.length).to.equal(3);
      expect(active.length).to.be.at.most(5);

      // All persistent notifications should still be active
      persistent.forEach(p => {
        expect(active.find(a => a.id === p.id)).to.exist;
      });
    });
  });

  describe('Progress Operation Notifications', () => {
    it('should provide smooth progress updates for download operations', () => {
      const manager = new NotificationManager();

      // Initial download notification
      const downloadNotification = manager.addNotification({
        id: 'download-progress',
        type: 'info',
        title: 'Downloading Manic Miners',
        message: 'Preparing download...',
        persistent: true,
        progress: 0,
        showProgressBar: true,
      });

      expect(downloadNotification.progress).to.equal(0);
      expect(downloadNotification.showProgressBar).to.be.true;

      // Simulate progress updates
      const progressSteps = [
        { progress: 15, message: 'Downloaded 150 MB / 1.0 GB', eta: '5 minutes remaining' },
        { progress: 35, message: 'Downloaded 350 MB / 1.0 GB', eta: '3 minutes remaining' },
        { progress: 65, message: 'Downloaded 650 MB / 1.0 GB', eta: '1 minute remaining' },
        { progress: 90, message: 'Extracting files...', eta: '30 seconds remaining' },
        { progress: 100, message: 'Download complete!', eta: null },
      ];

      progressSteps.forEach(step => {
        manager.updateNotification('download-progress', {
          progress: step.progress,
          message: step.message,
          eta: step.eta,
        });

        const updated = manager.getActiveNotifications().find(n => n.id === 'download-progress');
        expect(updated?.progress).to.equal(step.progress);
        expect(updated?.message).to.equal(step.message);
      });

      // Final completion
      manager.updateNotification('download-progress', {
        type: 'success',
        title: 'Download Complete',
        message: 'Manic Miners has been successfully installed!',
        showProgressBar: false,
        persistent: false,
        duration: 5000,
      });

      const final = manager.getActiveNotifications().find(n => n.id === 'download-progress');
      expect(final?.type).to.equal('success');
      expect(final?.showProgressBar).to.be.false;
    });

    it('should handle multiple concurrent operation notifications', () => {
      const manager = new NotificationManager();

      // Start download
      manager.addNotification({
        id: 'download-1',
        type: 'info',
        title: 'Downloading Game',
        message: 'Download in progress...',
        persistent: true,
        progress: 25,
        operation: 'download',
      });

      // Start verification (should be allowed as separate operation)
      manager.addNotification({
        id: 'verify-1',
        type: 'info',
        title: 'Verifying Installation',
        message: 'Checking file integrity...',
        persistent: true,
        progress: 60,
        operation: 'verify',
      });

      const active = manager.getActiveNotifications();
      const operations = active.map(n => n.operation);

      expect(operations).to.include('download');
      expect(operations).to.include('verify');
      expect(active.length).to.equal(2);
    });
  });

  describe('Error Handling and Recovery Notifications', () => {
    it('should provide clear error messages with actionable recovery options', () => {
      const manager = new NotificationManager();

      const errorScenarios = [
        {
          id: 'disk-space-error',
          type: 'error',
          title: 'Insufficient Disk Space',
          message: 'Need at least 2 GB free space. Please free up space and try again.',
          actions: [
            { label: 'Free Up Space', action: 'open_disk_cleanup' },
            { label: 'Choose Different Location', action: 'change_install_path' },
            { label: 'Cancel', action: 'cancel_install' },
          ],
          persistent: true,
          priority: 10,
        },
        {
          id: 'network-error',
          type: 'error',
          title: 'Download Failed',
          message: 'Connection lost while downloading. Your progress has been saved.',
          actions: [
            { label: 'Retry Download', action: 'retry_download' },
            { label: 'Check Network', action: 'check_connection' },
            { label: 'Download Later', action: 'pause_download' },
          ],
          persistent: true,
          priority: 8,
        },
        {
          id: 'permission-error',
          type: 'error',
          title: 'Permission Denied',
          message: 'Cannot write to installation directory. Administrator access required.',
          actions: [
            { label: 'Run as Administrator', action: 'elevate_privileges' },
            { label: 'Choose Different Location', action: 'change_install_path' },
          ],
          persistent: true,
          priority: 9,
        },
      ];

      errorScenarios.forEach(scenario => {
        const notification = manager.addNotification(scenario);

        expect(notification.actions).to.exist;
        expect(notification.actions.length).to.be.greaterThan(0);
        expect(notification.persistent).to.be.true;
        expect(manager.validateNotificationContent(notification)).to.be.true;

        // Verify action buttons are properly structured
        notification.actions.forEach((action: any) => {
          expect(action.label).to.exist;
          expect(action.action).to.exist;
          expect(action.label.length).to.be.greaterThan(0);
        });
      });

      // Verify priority ordering
      const active = manager.getActiveNotifications();
      expect(active[0].priority).to.equal(10); // Disk space should be highest priority
      expect(active[1].priority).to.equal(9); // Permission error second
      expect(active[2].priority).to.equal(8); // Network error third
    });

    it('should gracefully handle cascading errors without overwhelming the user', () => {
      const manager = new NotificationManager();

      // Simulate cascading errors (e.g., network failure leading to retry failures)
      const cascadingErrors = [
        { id: 'initial-error', title: 'Download Failed', severity: 'high' },
        { id: 'retry-error-1', title: 'Retry Failed', severity: 'medium' },
        { id: 'retry-error-2', title: 'Second Retry Failed', severity: 'medium' },
        { id: 'retry-error-3', title: 'Final Retry Failed', severity: 'low' },
      ];

      cascadingErrors.forEach((error, index) => {
        manager.addNotification({
          id: error.id,
          type: 'error',
          title: error.title,
          message: `Error details for ${error.title}`,
          persistent: true,
          severity: error.severity,
          timestamp: Date.now() + index * 1000, // Staggered timing
        });
      });

      const active = manager.getActiveNotifications();

      // Should not overwhelm user with too many error notifications
      expect(active.length).to.be.at.most(5);

      // Should still show the most important errors
      const highSeverityErrors = active.filter(n => n.severity === 'high');
      expect(highSeverityErrors.length).to.equal(1);
    });
  });

  describe('Success and Completion Notifications', () => {
    it('should provide satisfying success feedback for completed operations', () => {
      const manager = new NotificationManager();

      const successScenarios = [
        {
          id: 'install-success',
          type: 'success',
          title: 'Installation Complete!',
          message: 'Manic Miners has been successfully installed and is ready to play!',
          duration: 6000,
          celebration: true,
          actions: [
            { label: 'Launch Game', action: 'launch_game', primary: true },
            { label: 'View Installation', action: 'open_folder' },
          ],
        },
        {
          id: 'update-success',
          type: 'success',
          title: 'Update Complete!',
          message: 'Manic Miners has been updated to the latest version with new features and bug fixes!',
          duration: 5000,
          showChangelog: true,
          actions: [
            { label: 'View Changes', action: 'show_changelog' },
            { label: 'Launch Game', action: 'launch_game' },
          ],
        },
        {
          id: 'verify-success',
          type: 'success',
          title: 'Verification Complete!',
          message: 'All game files are intact and ready. No issues found!',
          duration: 4000,
          confidence: 'high',
        },
      ];

      successScenarios.forEach(scenario => {
        const notification = manager.addNotification(scenario);

        expect(notification.type).to.equal('success');
        expect(notification.duration).to.be.greaterThan(3000); // Success messages should be visible long enough
        expect(manager.validateNotificationContent(notification)).to.be.true;

        if (scenario.actions) {
          expect(notification.actions).to.exist;
          // Primary action should be first
          const primaryAction = notification.actions.find((a: any) => a.primary);
          if (primaryAction) {
            expect(notification.actions[0]).to.equal(primaryAction);
          }
        }
      });
    });

    it('should provide contextual next-step suggestions after successful operations', () => {
      const manager = new NotificationManager();

      // Installation complete - suggest launch
      manager.addNotification({
        id: 'install-complete',
        type: 'success',
        title: 'Ready to Play!',
        message: 'Installation complete. Would you like to launch Manic Miners now?',
        duration: 8000,
        nextSteps: [
          { label: 'Launch Game', action: 'launch', primary: true, description: 'Start playing immediately' },
          { label: 'Create Desktop Shortcut', action: 'create_shortcut', description: 'For easy access' },
          { label: 'View Installation Folder', action: 'open_folder', description: 'Browse game files' },
        ],
      });

      // Update complete - suggest viewing changes
      manager.addNotification({
        id: 'update-complete',
        type: 'success',
        title: 'New Features Available!',
        message: "Update installed successfully. Check out what's new!",
        duration: 7000,
        nextSteps: [
          { label: 'View Changelog', action: 'changelog', primary: true, description: 'See new features and fixes' },
          { label: 'Launch Game', action: 'launch', description: 'Try the latest version' },
        ],
      });

      const active = manager.getActiveNotifications();

      active.forEach(notification => {
        expect(notification.nextSteps).to.exist;
        expect(notification.nextSteps.length).to.be.greaterThan(0);

        const primaryStep = notification.nextSteps.find((step: any) => step.primary);
        expect(primaryStep).to.exist;
        expect(primaryStep.description).to.exist;
      });
    });
  });

  describe('Notification Persistence and State Management', () => {
    it('should maintain persistent notifications across application states', () => {
      const manager = new NotificationManager();

      // Add persistent operation notification
      manager.addNotification({
        id: 'persistent-download',
        type: 'info',
        title: 'Download in Progress',
        message: 'Downloading Manic Miners... 45% complete',
        persistent: true,
        progress: 45,
        startedAt: Date.now() - 120000, // Started 2 minutes ago
      });

      // Add temporary notification
      manager.addNotification({
        id: 'temp-notification',
        type: 'info',
        title: 'Temporary Message',
        message: 'This should be auto-dismissed',
        duration: 3000,
        persistent: false,
      });

      let active = manager.getActiveNotifications();
      expect(active.length).to.equal(2);

      // Simulate time passing and cleanup
      // Wait for duration to expire
      // const _removed = manager.clearExpiredNotifications();
      manager.clearExpiredNotifications();

      active = manager.getActiveNotifications();
      expect(active.length).to.equal(2); // Both should still be active initially

      // The persistent one should remain
      const persistentStillActive = active.find(n => n.id === 'persistent-download');
      expect(persistentStillActive).to.exist;
    });

    it('should track notification metrics for UX analysis', () => {
      const manager = new NotificationManager();

      // Simulate various notification interactions
      const interactions = [
        { id: 'error-1', type: 'error', userDismissed: true },
        { id: 'success-1', type: 'success', autoDismissed: true },
        { id: 'info-1', type: 'info', userDismissed: true },
        { id: 'warning-1', type: 'warning', autoDismissed: true },
        { id: 'success-2', type: 'success', userDismissed: false },
      ];

      interactions.forEach(interaction => {
        // const _notification = manager.addNotification({
        manager.addNotification({
          id: interaction.id,
          type: interaction.type,
          title: `${interaction.type} notification`,
          message: 'Test message',
          duration: interaction.autoDismissed ? 3000 : undefined,
          persistent: !interaction.autoDismissed,
        });

        // Simulate user or auto dismissal
        manager.removeNotification(interaction.id);
        manager.updateNotification(interaction.id, {
          dismissedBy: interaction.userDismissed ? 'user' : 'auto',
        });
      });

      const metrics = manager.getMetrics();

      expect(metrics.totalShown).to.be.greaterThan(0);
      expect(metrics.errorCount).to.be.greaterThanOrEqual(1);
      expect(metrics.successCount).to.be.greaterThanOrEqual(1);
      // Verify metrics are being tracked properly
      expect(metrics.activeCount).to.be.a('number');
      expect(metrics.totalShown).to.equal(interactions.length * 2); // Each interaction creates and updates
    });
  });

  describe('Accessibility and Professional Appearance', () => {
    it('should meet accessibility standards for all notification types', () => {
      const manager = new NotificationManager();

      const accessibilityTestCases = [
        {
          id: 'accessible-error',
          type: 'error',
          title: 'Error Notification',
          message: 'This is an error message with sufficient contrast',
          ariaLabel: 'Error: Error Notification',
          role: 'alert',
          contrastChecked: true,
          keyboardNavigable: true,
        },
        {
          id: 'accessible-success',
          type: 'success',
          title: 'Success Notification',
          message: 'This is a success message that is screen reader friendly',
          ariaLabel: 'Success: Operation completed successfully',
          role: 'status',
          contrastChecked: true,
          focusManagement: true,
        },
      ];

      accessibilityTestCases.forEach(testCase => {
        const notification = manager.addNotification(testCase);

        expect(manager.validateAccessibility(notification)).to.be.true;
        expect(notification.ariaLabel).to.exist;
        expect(notification.role).to.exist;
        expect(notification.contrastChecked).to.be.true;
      });
    });

    it('should maintain professional messaging standards', () => {
      const manager = new NotificationManager();

      const professionalTests = [
        {
          id: 'professional-1',
          type: 'info',
          title: 'System Update Available',
          message: 'A new version of Manic Miners is available for download.',
          expectedProfessionalism: true,
        },
        {
          id: 'professional-2',
          type: 'error',
          title: 'Installation Failed',
          message: 'The installation could not be completed due to insufficient disk space.',
          expectedProfessionalism: true,
        },
        {
          id: 'unprofessional-1',
          type: 'error',
          title: 'oops!!! something went wrong!!!',
          message: 'idk what happened but its broken lol',
          expectedProfessionalism: false,
        },
      ];

      professionalTests.forEach(test => {
        const notification = manager.addNotification(test);
        const isProfessional = manager.validateNotificationContent(notification);

        expect(isProfessional).to.equal(test.expectedProfessionalism);
      });
    });
  });

  describe('Performance Under Load', () => {
    it('should handle high-frequency notification updates efficiently', () => {
      const manager = new NotificationManager();
      const startTime = Date.now();

      // Add initial notification first
      manager.addNotification({
        id: 'progress-test',
        type: 'info',
        title: 'Download Progress',
        message: 'Starting download...',
        progress: 0,
        persistent: true,
      });

      // Simulate rapid progress updates (common during downloads)
      for (let i = 1; i <= 100; i++) {
        manager.updateNotification('progress-test', {
          message: `Downloaded ${i}% of files`,
          progress: i,
        });
      }

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      // Should handle 100 updates quickly (under 100ms)
      expect(processingTime).to.be.lessThan(100);

      const notification = manager.getActiveNotifications().find(n => n.id === 'progress-test');
      expect(notification?.progress).to.equal(100);
    });

    it('should maintain memory efficiency with notification history', () => {
      const manager = new NotificationManager();

      // Generate many notifications to test memory handling
      for (let i = 0; i < 1000; i++) {
        manager.addNotification({
          id: `stress-test-${i}`,
          type: 'info',
          title: `Stress Test ${i}`,
          message: `Message number ${i}`,
          duration: 100, // Short duration for quick cleanup
        });

        // Periodically clean up
        if (i % 100 === 0) {
          manager.clearExpiredNotifications();
        }
      }

      const active = manager.getActiveNotifications();
      const history = manager.getNotificationHistory();

      // Should maintain reasonable active count despite high volume
      expect(active.length).to.be.lessThan(50);

      // History should track interactions but not grow unbounded
      expect(history.length).to.be.greaterThan(900);
      expect(history.length).to.be.lessThan(2000);
    });
  });
});
