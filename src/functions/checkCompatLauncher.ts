import { spawnSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

async function findProtonFromSteam(): Promise<string | undefined> {
  const home = process.env.HOME;
  if (!home) return undefined;

  const possibleDirs = [
    path.join(home, '.steam/steam/steamapps/common'),
    path.join(home, '.local/share/Steam/steamapps/common'),
    path.join(home, 'Library/Application Support/Steam/steamapps/common'),
  ];

  for (const dir of possibleDirs) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && entry.name.startsWith('Proton')) {
          const candidate = path.join(dir, entry.name, 'proton');
          try {
            await fs.access(candidate);
            return candidate;
          } catch {
            // continue searching
          }
        }
      }
    } catch {
      // ignore if directory doesn't exist
    }
  }

  return undefined;
}

/**
 * Ensures a Proton launcher is available.
 */
export const checkCompatLauncher = async (): Promise<{
  status: boolean;
  message: string;
  compatPath?: string;
}> => {
  if (process.platform === 'win32') {
    return { status: true, message: 'Windows does not require Proton.' };
  }

  function testCommand(cmd: string): boolean {
    const result = spawnSync(cmd, ['--version'], { stdio: 'ignore' });
    return !result.error && result.status !== null;
  }

  function pickFirstWorking(commands: string[]): string | undefined {
    for (const c of commands) {
      if (testCommand(c)) return c;
    }
    return undefined;
  }

  const envCmd = process.env.COMPAT_LAUNCHER;
  if (envCmd && testCommand(envCmd)) {
    return { status: true, message: '', compatPath: envCmd };
  }

  const candidateCommands = ['proton'];
  for (const cmd of candidateCommands) {
    if (testCommand(cmd)) {
      return { status: true, message: '', compatPath: cmd };
    }
  }

  const steamProton = await findProtonFromSteam();
  if (steamProton) {
    return { status: true, message: '', compatPath: steamProton };
  }

  return {
    status: false,
    message: 'Proton was not detected. Please install Proton and set COMPAT_LAUNCHER or ensure it is on your PATH.',
  };
};
