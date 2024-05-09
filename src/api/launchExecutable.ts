import { spawn } from 'child_process';

/**
 * Launches an executable file located at the provided path.
 * @param executablePath The file system path to the executable to be launched.
 */

export function launchExecutable(executablePath: string): void {
  try {
    const process = spawn(executablePath, [], {
      detached: true, // This allows the process to run independently of its parent (the Node.js process).
    });

    process.on('error', err => {
      console.error(`Failed to start process: ${err.message}`);
    });

    // Since we do not need to monitor the process, we'll unreference it.
    // This tells Node.js not to wait for this process to finish before exiting.
    process.unref();
  } catch (error) {
    console.error(`Error launching executable: ${error.message}`);
  }
}
