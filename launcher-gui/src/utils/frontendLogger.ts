/**
 * Frontend logger that sends log messages to the backend logger via IPC
 */

interface LogData {
  category: string;
  message: string;
  data?: any;
  level: 'info' | 'warn' | 'error' | 'debug';
  timestamp: number;
}

class FrontendLogger {
  private sendLog(level: 'info' | 'warn' | 'error' | 'debug', category: string, message: string, data?: any) {
    // Check if electronAPI is available (not in web preview)
    if (window.electronAPI) {
      const logData: LogData = {
        category,
        message,
        data,
        level,
        timestamp: Date.now(),
      };

      // Send log to backend via IPC
      window.electronAPI.send('frontend-log', logData);
    } else {
      // Fallback for web preview - use console with formatted output
      const prefix = `[${new Date().toISOString()}] [${level.toUpperCase()}] [${category}]`;
      const logMessage = data ? `${prefix} ${message}` : `${prefix} ${message}`;

      switch (level) {
        case 'error':
          console.error(logMessage, data || '');
          break;
        case 'warn':
          console.warn(logMessage, data || '');
          break;
        case 'info':
        case 'debug':
        default:
          console.log(logMessage, data || '');
      }
    }
  }

  debug(category: string, message: string, data?: any) {
    this.sendLog('debug', category, message, data);
  }

  info(category: string, message: string, data?: any) {
    this.sendLog('info', category, message, data);
  }

  warn(category: string, message: string, data?: any) {
    this.sendLog('warn', category, message, data);
  }

  error(category: string, message: string, data?: any) {
    this.sendLog('error', category, message, data);
  }

  // Convenience methods for common categories
  componentLog(component: string, message: string, data?: any) {
    this.info(`COMPONENT:${component}`, message, data);
  }

  uiLog(message: string, data?: any) {
    this.info('UI', message, data);
  }

  stateLog(component: string, message: string, data?: any) {
    this.info(`STATE:${component}`, message, data);
  }

  ipcLog(message: string, data?: any) {
    this.info('IPC:FRONTEND', message, data);
  }

  networkLog(message: string, data?: any) {
    this.info('NETWORK', message, data);
  }

  userActionLog(action: string, data?: any) {
    this.info('USER_ACTION', action, data);
  }
}

// Export singleton instance
export const logger = new FrontendLogger();
