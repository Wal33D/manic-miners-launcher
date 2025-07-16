import { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { logger } from '../../utils/logger';

interface IpcErrorResponse {
  status: false;
  message: string;
}

/**
 * Wraps an asynchronous IPC handler with standardized try/catch logic and
 * automatic `event.reply` calls.
 *
 * @param replyChannel The channel to send replies on.
 * @param fn The actual handler function to execute.
 */
export const withIpcHandler = <TArgs extends unknown[], TResult>(
  replyChannel: string,
  fn: (event: IpcMainEvent, ...args: TArgs) => Promise<TResult>
) => {
  return async (event: IpcMainEvent, ...args: TArgs): Promise<void> => {
    try {
      const result = await fn(event, ...args);
      event.reply(replyChannel, result);
    } catch (error: unknown) {
      const err = error as Error;
      logger.error(
        'IPC',
        `IPC handler error on ${replyChannel}`,
        {
          channel: replyChannel,
          error: err.message,
        },
        err
      );
      const errorResponse: IpcErrorResponse = { status: false, message: err.message };
      event.reply(replyChannel, errorResponse);
    }
  };
};

/**
 * Wraps an asynchronous IPC invoke handler with standardized try/catch logic.
 * For use with ipcMain.handle.
 *
 * @param channel The channel name for logging purposes.
 * @param fn The actual handler function to execute.
 */
export const withIpcInvokeHandler = <TArgs extends unknown[], TResult>(
  channel: string,
  fn: (event: IpcMainInvokeEvent, ...args: TArgs) => Promise<TResult>
) => {
  return async (event: IpcMainInvokeEvent, ...args: TArgs): Promise<TResult> => {
    try {
      return await fn(event, ...args);
    } catch (error: unknown) {
      const err = error as Error;
      logger.error(
        'IPC',
        `IPC invoke handler error on ${channel}`,
        {
          channel,
          error: err.message,
        },
        err
      );
      throw err; // Re-throw for ipcMain.handle to handle
    }
  };
};
