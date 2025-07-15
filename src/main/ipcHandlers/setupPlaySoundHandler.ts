import { ipcMain, app } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import player from 'play-sound';
import path from 'path';
import { logger } from '../../utils/logger';

const soundPlayer = player();

export const setupPlaySoundHandler = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.PLAY_SOUND, () => {
      try {
        const soundPath = path.join(app.getAppPath(), 'assets', 'success.mp3');
        logger.ipcLog('Playing sound effect', { soundPath });
        soundPlayer.play(soundPath, (err: any) => {
          if (err) {
            logger.error('SOUND', 'Failed to play sound', { soundPath, error: err.message });
          }
        });
      } catch (error: unknown) {
        const err = error as Error;
        logger.error('SOUND', 'Failed to play sound', { error: err.message }, err);
      }
    });

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
