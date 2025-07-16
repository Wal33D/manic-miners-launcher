import { ipcMain } from 'electron';
import { logger } from '../../utils/logger';
import { IPC_CHANNELS } from './ipcChannels';
import { withIpcInvokeHandler } from './withIpcHandler';

interface FrontendLogData {
  category: string;
  message: string;
  data?: any;
  level: 'info' | 'warn' | 'error' | 'debug';
  timestamp: number;
}

export const setupLoggingHandler = (): void => {
  // Handle frontend log messages
  ipcMain.on(IPC_CHANNELS.FRONTEND_LOG, (_event, logData: FrontendLogData) => {
    const { category, message, data, level } = logData;

    // Add FRONTEND prefix to distinguish from backend logs
    const frontendCategory = `FRONTEND:${category}`;

    switch (level) {
      case 'error':
        logger.error(frontendCategory, message, data);
        break;
      case 'warn':
        logger.warn(frontendCategory, message, data);
        break;
      case 'info':
        logger.info(frontendCategory, message, data);
        break;
      case 'debug':
        logger.debug(frontendCategory, message, data);
        break;
      default:
        logger.info(frontendCategory, message, data);
    }
  });

  // Provide log file path to frontend
  ipcMain.handle(
    'get-log-file-path',
    withIpcInvokeHandler('get-log-file-path', async () => {
      return await logger.getLogFilePath();
    })
  );

  // Provide recent logs to frontend
  ipcMain.handle(
    'get-recent-logs',
    withIpcInvokeHandler('get-recent-logs', async (_event, lines: number = 100) => {
      return await logger.getRecentLogs(lines);
    })
  );

  // Allow frontend to clear logs
  ipcMain.handle(
    'clear-logs',
    withIpcInvokeHandler('clear-logs', async () => {
      await logger.clearLogs();
      return { success: true };
    })
  );
};
