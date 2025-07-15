import { ipcMain } from 'electron';
import { withIpcHandler } from './withIpcHandler';
import { logger } from '../../utils/logger';
import {
  detectWhisky,
  listWhiskyBottles,
  checkBottleForManicMiners,
  findManicMinersBottles,
  installWhiskyCmd,
} from '../../functions/whiskyDetection';
import {
  createManicMinersBottle,
  installManicMinersToBottle,
  verifyManicMinersInBottle,
  launchManicMinersFromBottle,
  deleteBottle,
  getAllManicMinersInstallations,
} from '../../functions/whiskyBottleManager';

export const setupWhiskyHandler = async (): Promise<{ status: boolean; message: string }> => {
  let status = false;
  let message = '';

  try {
    // Whisky Detection Handlers
    ipcMain.handle(
      'detect-whisky',
      withIpcHandler('detect-whisky', async () => {
        logger.info('WHISKY', 'IPC: Detecting Whisky installation');
        const result = await detectWhisky();
        logger.info('WHISKY', 'IPC: Whisky detection result', result);
        return result;
      })
    );

    ipcMain.handle(
      'list-whisky-bottles',
      withIpcHandler('list-whisky-bottles', async () => {
        logger.info('WHISKY', 'IPC: Listing Whisky bottles');
        const result = await listWhiskyBottles();
        logger.info('WHISKY', 'IPC: Found bottles', { count: result.length });
        return result;
      })
    );

    ipcMain.handle(
      'check-bottle-manic-miners',
      withIpcHandler('check-bottle-manic-miners', async (event, bottleName: string) => {
        logger.info('WHISKY', 'IPC: Checking bottle for Manic Miners', { bottleName });
        const bottles = await listWhiskyBottles();
        const bottle = bottles.find(b => b.name === bottleName);
        if (!bottle) {
          logger.warn('WHISKY', 'IPC: Bottle not found', { bottleName });
          return false;
        }
        const result = await checkBottleForManicMiners(bottle);
        logger.info('WHISKY', 'IPC: Bottle check result', { bottleName, hasManicMiners: result });
        return result;
      })
    );

    ipcMain.handle(
      'find-manic-miners-bottles',
      withIpcHandler('find-manic-miners-bottles', async () => {
        logger.info('WHISKY', 'IPC: Finding bottles with Manic Miners');
        const result = await findManicMinersBottles();
        logger.info('WHISKY', 'IPC: Found Manic Miners bottles', { count: result.length });
        return result;
      })
    );

    ipcMain.handle(
      'install-whisky-cmd',
      withIpcHandler('install-whisky-cmd', async () => {
        logger.info('WHISKY', 'IPC: Installing Whisky CLI tool');
        const result = await installWhiskyCmd();
        logger.info('WHISKY', 'IPC: CLI installation result', result);
        return result;
      })
    );

    // Bottle Management Handlers
    ipcMain.handle(
      'create-manic-miners-bottle',
      withIpcHandler(
        'create-manic-miners-bottle',
        async (event, options: { name: string; windowsVersion?: 'winxp' | 'win7' | 'win8' | 'win81' | 'win10' }) => {
          logger.info('WHISKY', 'IPC: Creating Manic Miners bottle', options);
          const result = await createManicMinersBottle(options);
          logger.info('WHISKY', 'IPC: Bottle creation result', result);
          return result;
        }
      )
    );

    ipcMain.handle(
      'install-manic-miners-to-bottle',
      withIpcHandler('install-manic-miners-to-bottle', async (event, sourcePath: string, bottleName: string, targetSubPath?: string) => {
        logger.info('WHISKY', 'IPC: Installing Manic Miners to bottle', { sourcePath, bottleName, targetSubPath });
        const result = await installManicMinersToBottle(sourcePath, bottleName, targetSubPath);
        logger.info('WHISKY', 'IPC: Installation result', result);
        return result;
      })
    );

    ipcMain.handle(
      'verify-manic-miners-in-bottle',
      withIpcHandler('verify-manic-miners-in-bottle', async (event, bottleName: string) => {
        logger.info('WHISKY', 'IPC: Verifying Manic Miners in bottle', { bottleName });
        const result = await verifyManicMinersInBottle(bottleName);
        logger.info('WHISKY', 'IPC: Verification result', result);
        return result;
      })
    );

    ipcMain.handle(
      'launch-manic-miners-from-bottle',
      withIpcHandler('launch-manic-miners-from-bottle', async (event, bottleName: string, executablePath?: string) => {
        logger.info('WHISKY', 'IPC: Launching Manic Miners from bottle', { bottleName, executablePath });
        const result = await launchManicMinersFromBottle(bottleName, executablePath);
        logger.info('WHISKY', 'IPC: Launch result', { success: result.success, message: result.message });
        return result;
      })
    );

    ipcMain.handle(
      'delete-whisky-bottle',
      withIpcHandler('delete-whisky-bottle', async (event, bottleName: string) => {
        logger.info('WHISKY', 'IPC: Deleting bottle', { bottleName });
        const result = await deleteBottle(bottleName);
        logger.info('WHISKY', 'IPC: Deletion result', result);
        return result;
      })
    );

    ipcMain.handle(
      'get-all-manic-miners-installations',
      withIpcHandler('get-all-manic-miners-installations', async () => {
        logger.info('WHISKY', 'IPC: Getting all Manic Miners installations');
        const result = await getAllManicMinersInstallations();
        logger.info('WHISKY', 'IPC: Found installations', { count: result.length });
        return result;
      })
    );

    // Launch Integration Handler
    ipcMain.handle(
      'launch-with-whisky',
      withIpcHandler(
        'launch-with-whisky',
        async (
          event,
          options: {
            executablePath: string;
            bottleName?: string;
            preferWhisky?: boolean;
            platform?: 'native' | 'whisky';
          }
        ) => {
          logger.info('WHISKY', 'IPC: Launching with Whisky integration', options);

          const { launchExecutable } = await import('../../functions/launchExecutable');
          const result = await launchExecutable({
            executablePath: options.executablePath,
            preferWhisky: options.preferWhisky,
            bottleName: options.bottleName,
            platform: options.platform,
          });

          logger.info('WHISKY', 'IPC: Whisky launch result', {
            success: result.status,
            method: result.launchMethod,
            message: result.message,
          });

          return result;
        }
      )
    );

    status = true;
    message = 'Whisky handler setup successfully';
    logger.info('WHISKY', message);
  } catch (error) {
    const errorMessage = `Error setting up Whisky handler: ${error.message}`;
    logger.error('WHISKY', errorMessage, { error: error.message }, error);
    message = errorMessage;
  }

  return { status, message };
};
