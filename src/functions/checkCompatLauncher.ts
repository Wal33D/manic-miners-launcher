import { spawnSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import StreamZip from 'node-stream-zip';
import { getDirectories } from './fetchDirectories';
import { downloadFile } from './downloadFile';
import { extractZipEntries, flattenSingleSubdirectory } from './unpackHelpers';

const DEFAULT_WINE_URL = process.env.WINE_DOWNLOAD_URL || 'https://manic-launcher.vercel.app/wine/wine-portable.zip';

/**
 * Ensures a compatibility launcher (Wine or custom) is available.
 * If not found, attempts to download a portable Wine distribution.
 */
export const checkCompatLauncher = async (): Promise<{
  status: boolean;
  message: string;
  compatPath?: string;
}> => {
  if (process.platform === 'win32') {
    return { status: true, message: 'Windows does not require Wine.' };
  }

  // On macOS first try user-provided or system Wine. If none exists, attempt to
  // install Wine via Homebrew for a smoother out-of-box experience.
  if (process.platform === 'darwin') {
    const envCmd = process.env.COMPAT_LAUNCHER;
    const candidateCommands = envCmd ? [envCmd, 'wine64', 'wine'] : ['wine64', 'wine'];
    let compatCmd = pickFirstWorking(candidateCommands);
    if (compatCmd) {
      return { status: true, message: '', compatPath: compatCmd };
    }

    const brewCheck = spawnSync('brew', ['--version'], { stdio: 'ignore' });
    if (brewCheck.status === 0) {
      const brewInstall = spawnSync('brew', ['install', '--cask', 'wine-stable'], { stdio: 'ignore' });
      if (brewInstall.status === 0) {
        compatCmd = pickFirstWorking(candidateCommands);
        if (compatCmd) {
          return { status: true, message: 'Wine installed via Homebrew.', compatPath: compatCmd };
        }
      }
      return {
        status: false,
        message: 'Attempted to install Wine via Homebrew but it was not detected afterwards.',
      };
    }

    return {
      status: false,
      message:
        'Wine is required on macOS. Homebrew was not found for automatic install. Please install Wine manually or set COMPAT_LAUNCHER.',
    };
  }

  function testCommand(cmd: string): boolean {
    const result = spawnSync(cmd, ['--version'], { stdio: 'ignore' });
    return !result.error && result.status === 0;
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

  const candidateCommands = ['wine', 'wine64'];
  for (const cmd of candidateCommands) {
    if (testCommand(cmd)) {
      return { status: true, message: '', compatPath: cmd };
    }
  }

  try {
    const { directories } = await getDirectories();
    const wineDir = path.join(directories.launcherInstallPath, 'wine');
    const wineExe = path.join(wineDir, 'wine');
    try {
      await fs.access(wineExe);
      if (testCommand(wineExe)) {
        return { status: true, message: '', compatPath: wineExe };
      }
    } catch {
      // Ignore errors if the bundled Wine executable is not present
    }

    const wineZip = path.join(directories.launcherInstallPath, 'wine.zip');
    const downloadResult = await downloadFile({
      downloadUrl: DEFAULT_WINE_URL,
      filePath: wineZip,
    });
    if (!downloadResult.status) {
      return { status: false, message: downloadResult.message };
    }

    const zip = new StreamZip.async({ file: wineZip });
    await extractZipEntries({ zip, targetPath: wineDir });
    await zip.close();
    await flattenSingleSubdirectory(wineDir);
    await fs.unlink(wineZip);
    await fs.chmod(wineExe, 0o755);

    if (testCommand(wineExe)) {
      return { status: true, message: 'Wine downloaded.', compatPath: wineExe };
    }

    return { status: false, message: 'Wine download failed to run.' };
  } catch (err) {
    const error = err as Error;
    return { status: false, message: `Wine setup failed: ${error.message}` };
  }
};
