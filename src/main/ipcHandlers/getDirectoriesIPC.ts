import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { getDirectories } from '../../functions/fetchDirectories';

export const setupDirectoryHandler = () => {
  ipcMain.on(IPC_CHANNELS.GET_DIRECTORIES, event => {
    const directories = getDirectories();
    event.reply(IPC_CHANNELS.GET_DIRECTORIES, directories);
  });
};
