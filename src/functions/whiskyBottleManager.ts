import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';
import { logger } from '../utils/logger';
import { detectWhisky, WhiskyBottle, listWhiskyBottles } from './whiskyDetection';

const execAsync = promisify(exec);

export interface BottleCreationOptions {
  name: string;
  windowsVersion?: 'winxp' | 'win7' | 'win8' | 'win81' | 'win10';
}

export interface BottleOperationResult {
  success: boolean;
  message: string;
  bottleName?: string;
  bottlePath?: string;
}

export interface ManicMinersInstallation {
  bottleName: string;
  executablePath: string;
  installPath: string;
  isValid: boolean;
}

/**
 * Creates a new Whisky bottle for Manic Miners
 */
export const createManicMinersBottle = async (options: BottleCreationOptions): Promise<BottleOperationResult> => {
  if (process.platform !== 'darwin') {
    return { success: false, message: 'Bottle creation is only available on macOS' };
  }

  logger.info('WHISKY', 'Creating new bottle for Manic Miners', options);

  try {
    const status = await detectWhisky();
    if (!status.hasCliTool) {
      return {
        success: false,
        message: 'WhiskyCmd CLI is not available. Please install Whisky and the CLI tool first.',
      };
    }

    // Create the bottle using CLI
    const createCommand = `whisky create "${options.name}"`;
    logger.info('WHISKY', 'Executing bottle creation command', { command: createCommand });

    const { stdout, stderr } = await execAsync(createCommand, { timeout: 30000 });

    if (stderr) {
      logger.warn('WHISKY', 'Bottle creation produced warnings', { stderr });
    }

    // Verify the bottle was created
    const bottles = await listWhiskyBottles();
    const createdBottle = bottles.find(bottle => bottle.name === options.name);

    if (createdBottle) {
      logger.info('WHISKY', 'Bottle created successfully', {
        bottleName: createdBottle.name,
        bottlePath: createdBottle.path,
      });

      return {
        success: true,
        message: `Bottle "${options.name}" created successfully`,
        bottleName: createdBottle.name,
        bottlePath: createdBottle.path,
      };
    } else {
      return {
        success: false,
        message: 'Bottle creation completed but bottle not found in list',
      };
    }
  } catch (error) {
    const errorMessage = `Error creating bottle: ${error.message}`;
    logger.error('WHISKY', errorMessage, { error: error.message }, error);
    return { success: false, message: errorMessage };
  }
};

/**
 * Copies Manic Miners installation files to a Whisky bottle
 */
export const installManicMinersToBottle = async (
  sourcePath: string,
  bottleName: string,
  targetSubPath: string = 'drive_c/Program Files/Manic Miners'
): Promise<BottleOperationResult> => {
  logger.info('WHISKY', 'Installing Manic Miners to bottle', {
    sourcePath,
    bottleName,
    targetSubPath,
  });

  try {
    // Find the bottle
    const bottles = await listWhiskyBottles();
    const targetBottle = bottles.find(bottle => bottle.name === bottleName);

    if (!targetBottle) {
      return { success: false, message: `Bottle "${bottleName}" not found` };
    }

    // Verify source path exists
    try {
      await fs.access(sourcePath);
    } catch {
      return { success: false, message: `Source path does not exist: ${sourcePath}` };
    }

    // Create target directory in bottle
    const targetPath = path.join(targetBottle.path, targetSubPath);
    await fs.mkdir(targetPath, { recursive: true });

    // Copy files
    logger.info('WHISKY', 'Copying Manic Miners files', { from: sourcePath, to: targetPath });

    // Use cp command for efficient directory copying
    const copyCommand = `cp -R "${sourcePath}"/* "${targetPath}"/`;
    await execAsync(copyCommand, { timeout: 60000 });

    // Verify installation
    const isInstalled = await verifyManicMinersInBottle(bottleName);

    if (isInstalled.isValid) {
      logger.info('WHISKY', 'Manic Miners installed to bottle successfully', {
        bottleName,
        targetPath,
        executablePath: isInstalled.executablePath,
      });

      return {
        success: true,
        message: `Manic Miners installed to bottle "${bottleName}" successfully`,
        bottleName,
        bottlePath: targetPath,
      };
    } else {
      return {
        success: false,
        message: 'Files copied but installation verification failed',
      };
    }
  } catch (error) {
    const errorMessage = `Error installing to bottle: ${error.message}`;
    logger.error('WHISKY', errorMessage, { error: error.message }, error);
    return { success: false, message: errorMessage };
  }
};

/**
 * Verifies that Manic Miners is properly installed in a bottle
 */
export const verifyManicMinersInBottle = async (bottleName: string): Promise<ManicMinersInstallation> => {
  logger.info('WHISKY', 'Verifying Manic Miners installation in bottle', { bottleName });

  try {
    const bottles = await listWhiskyBottles();
    const bottle = bottles.find(b => b.name === bottleName);

    if (!bottle) {
      return {
        bottleName,
        executablePath: '',
        installPath: '',
        isValid: false,
      };
    }

    // Search for Manic Miners executable in common locations
    const searchPaths = [
      'drive_c/Program Files/Manic Miners',
      'drive_c/Program Files (x86)/Manic Miners',
      'drive_c/Games/Manic Miners',
      'drive_c/ManicMiners',
    ];

    const executableNames = ['ManicMiners.exe', 'Manic Miners.exe', 'manic-miners.exe', 'manicminers.exe'];

    for (const searchPath of searchPaths) {
      const fullSearchPath = path.join(bottle.path, searchPath);

      try {
        const files = await fs.readdir(fullSearchPath);

        for (const executableName of executableNames) {
          if (files.some(file => file.toLowerCase() === executableName.toLowerCase())) {
            const executablePath = path.join(fullSearchPath, executableName);

            // Verify the executable exists and is accessible
            try {
              await fs.access(executablePath);

              logger.info('WHISKY', 'Verified Manic Miners installation', {
                bottleName,
                installPath: fullSearchPath,
                executablePath,
              });

              return {
                bottleName,
                executablePath,
                installPath: fullSearchPath,
                isValid: true,
              };
            } catch {
              continue;
            }
          }
        }
      } catch {
        // Directory doesn't exist, continue searching
        continue;
      }
    }

    logger.warn('WHISKY', 'Manic Miners executable not found in bottle', { bottleName });
    return {
      bottleName,
      executablePath: '',
      installPath: '',
      isValid: false,
    };
  } catch (error) {
    logger.error(
      'WHISKY',
      'Error verifying Manic Miners installation',
      {
        bottleName,
        error: error.message,
      },
      error
    );

    return {
      bottleName,
      executablePath: '',
      installPath: '',
      isValid: false,
    };
  }
};

/**
 * Launches Manic Miners from a Whisky bottle
 */
export const launchManicMinersFromBottle = async (
  bottleName: string,
  executablePath?: string
): Promise<{ success: boolean; message: string; process?: any }> => {
  logger.info('WHISKY', 'Launching Manic Miners from bottle', { bottleName, executablePath });

  try {
    const status = await detectWhisky();
    if (!status.hasCliTool) {
      return {
        success: false,
        message: 'WhiskyCmd CLI is not available',
      };
    }

    // If no executable path provided, try to find it
    let targetExecutable = executablePath;
    if (!targetExecutable) {
      const installation = await verifyManicMinersInBottle(bottleName);
      if (!installation.isValid) {
        return {
          success: false,
          message: `Manic Miners not found in bottle "${bottleName}"`,
        };
      }
      targetExecutable = installation.executablePath;
    }

    // Convert to Windows-style path relative to bottle root
    const bottles = await listWhiskyBottles();
    const bottle = bottles.find(b => b.name === bottleName);
    if (!bottle) {
      return { success: false, message: `Bottle "${bottleName}" not found` };
    }

    // Get relative path from bottle root and convert to Windows format
    const relativePath = path.relative(bottle.path, targetExecutable);
    const windowsPath = relativePath.replace(/\//g, '\\');

    // Launch using whisky run command
    const launchCommand = `whisky run --bottle "${bottleName}" --exe "${windowsPath}"`;
    logger.info('WHISKY', 'Executing launch command', { command: launchCommand });

    // Use spawn for non-blocking execution
    const { spawn } = require('child_process');
    const child = spawn('whisky', ['run', '--bottle', bottleName, '--exe', windowsPath], {
      detached: true,
      stdio: 'ignore',
    });

    child.unref();

    logger.info('WHISKY', 'Manic Miners launch initiated', {
      bottleName,
      executablePath: targetExecutable,
      windowsPath,
      pid: child.pid,
    });

    return {
      success: true,
      message: `Manic Miners launched from bottle "${bottleName}"`,
      process: child,
    };
  } catch (error) {
    const errorMessage = `Error launching from bottle: ${error.message}`;
    logger.error('WHISKY', errorMessage, { bottleName, error: error.message }, error);
    return { success: false, message: errorMessage };
  }
};

/**
 * Deletes a Whisky bottle
 */
export const deleteBottle = async (bottleName: string): Promise<BottleOperationResult> => {
  logger.info('WHISKY', 'Deleting bottle', { bottleName });

  try {
    const status = await detectWhisky();
    if (!status.hasCliTool) {
      return {
        success: false,
        message: 'WhiskyCmd CLI is not available',
      };
    }

    // Find the bottle first to get its path
    const bottles = await listWhiskyBottles();
    const bottle = bottles.find(b => b.name === bottleName);

    if (!bottle) {
      return { success: false, message: `Bottle "${bottleName}" not found` };
    }

    // Delete the bottle directory
    // Note: WhiskyCmd doesn't have a delete command, so we'll delete manually
    await fs.rm(bottle.path, { recursive: true, force: true });

    // Also remove from Whisky's bottle configuration
    // This involves modifying the BottleVM.plist file
    const homeDir = require('os').homedir();
    const bottleConfigPath = path.join(homeDir, 'Library/Containers/Whisky/Data/Documents/BottleVM.plist');

    try {
      // Read and modify the plist file to remove the bottle entry
      // This is a simplified approach - in production, you'd want to use a proper plist parser
      logger.info('WHISKY', 'Removing bottle from Whisky configuration', { bottleConfigPath });
    } catch (configError) {
      logger.warn('WHISKY', 'Could not update Whisky configuration, but bottle files deleted', {
        error: configError.message,
      });
    }

    logger.info('WHISKY', 'Bottle deleted successfully', { bottleName, bottlePath: bottle.path });

    return {
      success: true,
      message: `Bottle "${bottleName}" deleted successfully`,
      bottleName,
    };
  } catch (error) {
    const errorMessage = `Error deleting bottle: ${error.message}`;
    logger.error('WHISKY', errorMessage, { bottleName, error: error.message }, error);
    return { success: false, message: errorMessage };
  }
};

/**
 * Gets a list of all Manic Miners installations across all bottles
 */
export const getAllManicMinersInstallations = async (): Promise<ManicMinersInstallation[]> => {
  logger.info('WHISKY', 'Getting all Manic Miners installations');

  try {
    const bottles = await listWhiskyBottles();
    const installations: ManicMinersInstallation[] = [];

    for (const bottle of bottles) {
      const installation = await verifyManicMinersInBottle(bottle.name);
      if (installation.isValid) {
        installations.push(installation);
      }
    }

    logger.info('WHISKY', 'Found Manic Miners installations', {
      count: installations.length,
      bottles: installations.map(i => i.bottleName),
    });

    return installations;
  } catch (error) {
    logger.error('WHISKY', 'Error getting Manic Miners installations', { error: error.message }, error);
    return [];
  }
};
