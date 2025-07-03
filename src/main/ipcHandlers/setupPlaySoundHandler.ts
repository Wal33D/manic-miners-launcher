import { ipcMain, app } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import player from 'play-sound';
import path from 'path';

const soundPlayer = player();

export const setupPlaySoundHandler = async (): Promise<{ status: boolean; message: string }> => {
  let message = '';
  let status = false;

  try {
    ipcMain.on(IPC_CHANNELS.PLAY_SOUND, () => {
      try {
        const soundPath = path.join(app.getAppPath(), 'assets', 'success.mp3');
        soundPlayer.play(soundPath, (err: any) => {
          if (err) {
            console.error(`Failed to play sound: ${err.message}`);
          }
        });
      } catch (error: unknown) {
        const err = error as Error;
        console.error(`Failed to play sound: ${err.message}`);
      }
    });

    message = 'Play sound handler set up successfully.';
    status = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Failed to set up play sound handler: ${err.message}`;
    status = false;
  }

  return { status, message };
};
