import { spawnSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { getDirectories } from './fetchDirectories';
import { downloadFile } from './downloadFile';
import { extractTarGz, flattenSingleSubdirectory } from './unpackHelpers';

const PROTON_GE_RELEASE_API = 'https://api.github.com/repos/GloriousEggroll/proton-ge-custom/releases/latest';

async function fetchLatestProtonUrl(): Promise<string | undefined> {
  try {
    const response = await fetch(PROTON_GE_RELEASE_API, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) return undefined;
    const data = (await response.json()) as any;
    const asset = (data.assets as any[]).find(a => typeof a.name === 'string' && a.name.endsWith('.tar.gz'));
    return asset?.browser_download_url;
  } catch {
    return undefined;
  }
}

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

  if (process.platform === 'linux') {
    try {
      const { directories } = await getDirectories();
      const protonDir = path.join(directories.launcherInstallPath, 'proton');
      const protonExe = path.join(protonDir, 'proton');

      try {
        await fs.access(protonExe);
        if (testCommand(protonExe)) {
          return { status: true, message: '', compatPath: protonExe };
        }
      } catch {
        // no bundled Proton yet
      }

      const downloadUrl = process.env.PROTON_DOWNLOAD_URL || (await fetchLatestProtonUrl());
      if (!downloadUrl) {
        return { status: false, message: 'Failed to determine Proton download URL.' };
      }

      const archivePath = path.join(directories.launcherInstallPath, 'proton.tar.gz');
      const downloadResult = await downloadFile({ downloadUrl, filePath: archivePath });
      if (!downloadResult.status) {
        return { status: false, message: downloadResult.message };
      }

      await extractTarGz({ filePath: archivePath, targetPath: protonDir });
      await flattenSingleSubdirectory(protonDir);
      await fs.unlink(archivePath);
      await fs.chmod(protonExe, 0o755);

      if (testCommand(protonExe)) {
        return { status: true, message: 'Proton downloaded.', compatPath: protonExe };
      }

      return { status: false, message: 'Proton download failed to run.' };
    } catch (err) {
      const error = err as Error;
      return { status: false, message: `Proton setup failed: ${error.message}` };
    }
  }

  return {
    status: false,
    message: 'Proton was not detected. Please install Proton and set COMPAT_LAUNCHER or ensure it is on your PATH.',
  };
};
