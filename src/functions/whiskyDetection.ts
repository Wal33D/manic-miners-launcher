import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';
import { logger } from '../utils/logger';

const execAsync = promisify(exec);

export interface WhiskyStatus {
  isInstalled: boolean;
  hasCliTool: boolean;
  version?: string;
  whiskyAppPath?: string;
  cliPath?: string;
  error?: string;
}

export interface WhiskyBottle {
  name: string;
  windowsVersion: string;
  path: string;
  id?: string;
}

/**
 * Detects if Whisky is installed on macOS and checks CLI availability
 */
export const detectWhisky = async (): Promise<WhiskyStatus> => {
  // Only check on macOS
  if (process.platform !== 'darwin') {
    return {
      isInstalled: false,
      hasCliTool: false,
      error: 'Whisky is only available on macOS',
    };
  }

  logger.info('WHISKY', 'Starting Whisky detection on macOS');

  try {
    // Check if Whisky app is installed
    const whiskyAppPath = '/Applications/Whisky.app';
    let isInstalled = false;

    try {
      await fs.access(whiskyAppPath);
      isInstalled = true;
      logger.info('WHISKY', 'Whisky app found', { whiskyAppPath });
    } catch {
      logger.warn('WHISKY', 'Whisky app not found in Applications folder');
    }

    // Check if CLI tool is available
    let hasCliTool = false;
    let version: string | undefined;
    let cliPath: string | undefined;

    try {
      // Try to run whisky command to check if CLI is installed
      const { stdout } = await execAsync('which whisky');
      cliPath = stdout.trim();

      if (cliPath) {
        hasCliTool = true;
        logger.info('WHISKY', 'WhiskyCmd CLI found', { cliPath });

        // Try to get version
        try {
          const { stdout: versionOutput } = await execAsync('whisky --version', { timeout: 5000 });
          version = versionOutput.trim();
          logger.info('WHISKY', 'Whisky version detected', { version });
        } catch (error) {
          logger.warn('WHISKY', 'Could not get Whisky version', { error: error.message });
        }
      }
    } catch {
      logger.info('WHISKY', 'WhiskyCmd CLI not found in PATH');

      // Check if CLI exists in Whisky app bundle but not linked
      if (isInstalled) {
        const bundledCliPath = path.join(whiskyAppPath, 'Contents/Resources/WhiskyCmd');
        try {
          await fs.access(bundledCliPath);
          logger.info('WHISKY', 'WhiskyCmd found in app bundle but not linked to PATH', { bundledCliPath });
        } catch {
          logger.warn('WHISKY', 'WhiskyCmd not found in app bundle');
        }
      }
    }

    const status: WhiskyStatus = {
      isInstalled,
      hasCliTool,
      version,
      whiskyAppPath: isInstalled ? whiskyAppPath : undefined,
      cliPath: hasCliTool ? cliPath : undefined,
    };

    logger.info('WHISKY', 'Whisky detection complete', status);
    return status;
  } catch (error) {
    const errorMessage = `Error detecting Whisky: ${error.message}`;
    logger.error('WHISKY', errorMessage, { error: error.message }, error);
    return {
      isInstalled: false,
      hasCliTool: false,
      error: errorMessage,
    };
  }
};

/**
 * Lists all available Whisky bottles
 */
export const listWhiskyBottles = async (): Promise<WhiskyBottle[]> => {
  if (process.platform !== 'darwin') {
    logger.warn('WHISKY', 'Cannot list bottles on non-macOS platform');
    return [];
  }

  logger.info('WHISKY', 'Listing Whisky bottles');

  try {
    // Check if CLI is available
    const status = await detectWhisky();
    if (!status.hasCliTool) {
      logger.warn('WHISKY', 'Cannot list bottles: CLI tool not available');
      return [];
    }

    // Run whisky list command
    const { stdout } = await execAsync('whisky list', { timeout: 10000 });

    // Parse the table output
    const bottles: WhiskyBottle[] = [];
    const lines = stdout.split('\n');

    // Find the header line and data lines
    let foundHeader = false;
    for (const line of lines) {
      if (line.includes('Name') && line.includes('Windows Version') && line.includes('Path')) {
        foundHeader = true;
        continue;
      }

      if (foundHeader && line.trim() && line.includes('|')) {
        // Parse table row: | Name | Windows Version | Path |
        const parts = line
          .split('|')
          .map(part => part.trim())
          .filter(part => part);
        if (parts.length >= 3) {
          bottles.push({
            name: parts[0],
            windowsVersion: parts[1],
            path: parts[2],
          });
        }
      }
    }

    logger.info('WHISKY', 'Found bottles', { count: bottles.length, bottles });
    return bottles;
  } catch (error) {
    logger.error('WHISKY', 'Error listing bottles', { error: error.message }, error);
    return [];
  }
};

/**
 * Checks if a specific bottle contains Manic Miners
 */
export const checkBottleForManicMiners = async (bottle: WhiskyBottle): Promise<boolean> => {
  try {
    logger.info('WHISKY', 'Checking bottle for Manic Miners', { bottleName: bottle.name, bottlePath: bottle.path });

    // Look for common Manic Miners executable patterns
    const commonPaths = [
      'drive_c/Program Files/Manic Miners',
      'drive_c/Program Files (x86)/Manic Miners',
      'drive_c/Games/Manic Miners',
      'drive_c/ManicMiners',
    ];

    const executablePatterns = ['ManicMiners.exe', 'Manic Miners.exe', 'manic-miners.exe', 'manicminers.exe'];

    for (const subPath of commonPaths) {
      const fullPath = path.join(bottle.path, subPath);

      try {
        const files = await fs.readdir(fullPath);

        // Check if any executable matches our patterns
        for (const file of files) {
          if (executablePatterns.some(pattern => file.toLowerCase() === pattern.toLowerCase())) {
            logger.info('WHISKY', 'Found Manic Miners in bottle', {
              bottleName: bottle.name,
              executablePath: path.join(fullPath, file),
            });
            return true;
          }
        }
      } catch {
        // Directory doesn't exist, continue checking
        continue;
      }
    }

    logger.info('WHISKY', 'Manic Miners not found in bottle', { bottleName: bottle.name });
    return false;
  } catch (error) {
    logger.error(
      'WHISKY',
      'Error checking bottle for Manic Miners',
      {
        bottleName: bottle.name,
        error: error.message,
      },
      error
    );
    return false;
  }
};

/**
 * Finds all bottles that contain Manic Miners
 */
export const findManicMinersBottles = async (): Promise<WhiskyBottle[]> => {
  logger.info('WHISKY', 'Searching for Manic Miners bottles');

  try {
    const allBottles = await listWhiskyBottles();
    const manicMinersBottles: WhiskyBottle[] = [];

    for (const bottle of allBottles) {
      const hasManicMiners = await checkBottleForManicMiners(bottle);
      if (hasManicMiners) {
        manicMinersBottles.push(bottle);
      }
    }

    logger.info('WHISKY', 'Found Manic Miners bottles', {
      count: manicMinersBottles.length,
      bottles: manicMinersBottles.map(b => b.name),
    });

    return manicMinersBottles;
  } catch (error) {
    logger.error('WHISKY', 'Error finding Manic Miners bottles', { error: error.message }, error);
    return [];
  }
};

/**
 * Installs the Whisky CLI tool by creating a symlink
 */
export const installWhiskyCmd = async (): Promise<{ success: boolean; message: string }> => {
  if (process.platform !== 'darwin') {
    return { success: false, message: 'Whisky CLI installation is only available on macOS' };
  }

  logger.info('WHISKY', 'Installing WhiskyCmd CLI tool');

  try {
    const status = await detectWhisky();
    if (!status.isInstalled) {
      return { success: false, message: 'Whisky app is not installed. Please install Whisky first.' };
    }

    if (status.hasCliTool) {
      return { success: true, message: 'WhiskyCmd CLI is already installed' };
    }

    // Create the symlink as Whisky would do
    const sourcePath = path.join(status.whiskyAppPath!, 'Contents/Resources/WhiskyCmd');
    const targetPath = '/usr/local/bin/whisky';

    // Check if source exists
    try {
      await fs.access(sourcePath);
    } catch {
      return { success: false, message: 'WhiskyCmd not found in Whisky app bundle' };
    }

    // Create symlink
    await execAsync(`ln -sf "${sourcePath}" "${targetPath}"`);

    // Verify installation
    const newStatus = await detectWhisky();
    if (newStatus.hasCliTool) {
      logger.info('WHISKY', 'WhiskyCmd CLI installed successfully');
      return { success: true, message: 'WhiskyCmd CLI installed successfully' };
    } else {
      return { success: false, message: 'Failed to verify CLI installation' };
    }
  } catch (error) {
    const errorMessage = `Error installing WhiskyCmd: ${error.message}`;
    logger.error('WHISKY', errorMessage, { error: error.message }, error);
    return { success: false, message: errorMessage };
  }
};
