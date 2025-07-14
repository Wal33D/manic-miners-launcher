import fs from 'fs/promises';
import path from 'path';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: string;
  message: string;
  data?: any;
  stack?: string;
}

class Logger {
  private logQueue: LogEntry[] = [];
  private isWriting = false;
  private logPath: string;
  private maxFileSize = 10 * 1024 * 1024; // 10MB
  private maxBackupFiles = 5;

  constructor() {
    // Create logs directory in user data path
    let userDataPath: string;
    try {
      // Try to use electron app.getPath, fallback to temp directory for tests
      const { app } = require('electron');
      userDataPath = app.getPath('userData');
    } catch (error) {
      // In test environment, use a temp directory
      userDataPath = path.join(process.cwd(), 'temp', 'test-logs');
    }

    const logsDir = path.join(userDataPath, 'logs');
    this.logPath = path.join(logsDir, 'manic-miners-launcher.log');

    // Ensure logs directory exists
    this.ensureLogsDirectory();
  }

  private async ensureLogsDirectory() {
    try {
      const logsDir = path.dirname(this.logPath);
      await fs.mkdir(logsDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create logs directory:', error);
    }
  }

  private formatLogEntry(entry: LogEntry): string {
    const levelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    const levelName = levelNames[entry.level] || 'UNKNOWN';

    let logLine = `[${entry.timestamp}] [${levelName}] [${entry.category}] ${entry.message}`;

    if (entry.data) {
      logLine += `\nData: ${JSON.stringify(entry.data, null, 2)}`;
    }

    if (entry.stack) {
      logLine += `\nStack: ${entry.stack}`;
    }

    return logLine + '\n';
  }

  private async rotateLogFile() {
    try {
      const stats = await fs.stat(this.logPath);
      if (stats.size >= this.maxFileSize) {
        // Rotate existing backup files
        for (let i = this.maxBackupFiles - 1; i >= 1; i--) {
          const oldPath = `${this.logPath}.${i}`;
          const newPath = `${this.logPath}.${i + 1}`;
          try {
            await fs.rename(oldPath, newPath);
          } catch (error) {
            // File doesn't exist, ignore
          }
        }

        // Move current log to .1
        await fs.rename(this.logPath, `${this.logPath}.1`);
      }
    } catch (error) {
      // Log file doesn't exist yet, ignore
    }
  }

  private async writeQueueToFile() {
    if (this.isWriting || this.logQueue.length === 0) return;

    this.isWriting = true;

    const entriesToWrite = [...this.logQueue];
    this.logQueue = [];

    try {
      await this.rotateLogFile();

      const logContent = entriesToWrite.map(entry => this.formatLogEntry(entry)).join('');
      await fs.appendFile(this.logPath, logContent);
    } catch (error) {
      console.error('Failed to write to log file:', error);
      // Put entries back in queue
      this.logQueue.unshift(...entriesToWrite);
    } finally {
      this.isWriting = false;

      // Process any new entries that came in while writing
      if (this.logQueue.length > 0) {
        setImmediate(() => this.writeQueueToFile());
      }
    }
  }

  private log(level: LogLevel, category: string, message: string, data?: any, error?: Error) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      data,
      stack: error?.stack,
    };

    // Also log to console for immediate visibility
    const levelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    const levelName = levelNames[level];
    console.log(`[${levelName}] [${category}] ${message}`, data || '');

    this.logQueue.push(entry);
    setImmediate(() => this.writeQueueToFile());
  }

  debug(category: string, message: string, data?: any) {
    this.log(LogLevel.DEBUG, category, message, data);
  }

  info(category: string, message: string, data?: any) {
    this.log(LogLevel.INFO, category, message, data);
  }

  warn(category: string, message: string, data?: any) {
    this.log(LogLevel.WARN, category, message, data);
  }

  error(category: string, message: string, data?: any, error?: Error) {
    this.log(LogLevel.ERROR, category, message, data, error);
  }

  // Specific logging methods for different categories
  downloadLog(message: string, data?: any) {
    this.info('DOWNLOAD', message, data);
  }

  installLog(message: string, data?: any) {
    this.info('INSTALL', message, data);
  }

  versionLog(message: string, data?: any) {
    this.info('VERSION', message, data);
  }

  ipcLog(message: string, data?: any) {
    this.info('IPC', message, data);
  }

  async getLogFilePath(): Promise<string> {
    return this.logPath;
  }

  async getRecentLogs(lines: number = 100): Promise<string[]> {
    try {
      const content = await fs.readFile(this.logPath, 'utf-8');
      const logLines = content.split('\n').filter(line => line.trim());
      return logLines.slice(-lines);
    } catch (error) {
      return [];
    }
  }

  async clearLogs() {
    try {
      await fs.unlink(this.logPath);
      this.logQueue = [];
    } catch (error) {
      // Log file doesn't exist, ignore
    }
  }
}

// Export singleton instance
export const logger = new Logger();
