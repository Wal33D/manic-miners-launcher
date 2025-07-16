import { ipcMain, app } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { withIpcHandler } from './withIpcHandler';
import player from 'play-sound';
import path from 'path';
import { logger } from '../../utils/logger';

const soundPlayer = player();

export const setupPlaySoundHandler = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(
      IPC_CHANNELS.PLAY_SOUND,
      withIpcHandler('play-sound-reply', async () => {
        const soundPath = path.join(app.getAppPath(), 'assets', 'success.mp3');
        logger.ipcLog('Playing sound effect', { soundPath });

        return new Promise<{ success: boolean }>((resolve, reject) => {
          soundPlayer.play(soundPath, (err: any) => {
            if (err) {
              logger.error('SOUND', 'Failed to play sound', { soundPath, error: err.message });
              reject(new Error(`Failed to play sound: ${err.message}`));
            } else {
              resolve({ success: true });
            }
          });
        });
      })
    );

    message = 'Play sound handler set up successfully.';
    status = true;
    logger.ipcLog('Play sound handler setup complete');
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up play sound handler: ${err.message}`;
    status = false;
    logger.error('IPC', 'Failed to set up play sound handler', { error: err.message }, err);
  }

  return { status, message };
};
