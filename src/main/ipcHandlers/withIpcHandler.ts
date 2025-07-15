import { IpcMainEvent } from 'electron';
import { logger } from '../../utils/logger';

/**
 * Wraps an asynchronous IPC handler with standardized try/catch logic and
 * automatic `event.reply` calls.
 *
 * @param replyChannel The channel to send replies on.
 * @param fn The actual handler function to execute.
 */
export const withIpcHandler = <Args extends any[], Result>(
  replyChannel: string,
  fn: (event: IpcMainEvent, ...args: Args) => Promise<Result>
) => {
  return async (event: IpcMainEvent, ...args: Args): Promise<void> => {
    try {
      const result = await fn(event, ...args);
      event.reply(replyChannel, result as any);
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
      event.reply(replyChannel, { status: false, message: err.message });
    }
  };
};
