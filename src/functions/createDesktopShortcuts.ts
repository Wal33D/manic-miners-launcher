import * as os from 'os';
import * as path from 'path';
import { createShortcut } from '../fileUtils/createShortcut';
import { createDirectory } from '../fileUtils/createDirectory';
import { findLatestVersionPath } from '../fileUtils/findLatestVersionPath';

export const createDesktopShortcuts = async ({
  installPath,
  createExeShortcut = true,
  createDirShortcut = true,
}: {
  installPath?: string;
  createExeShortcut?: boolean;
  createDirShortcut?: boolean;
}): Promise<{ status: boolean; filePaths: string[] }> => {
  let status = true;
  const filePaths: string[] = [];

  try {
    if (!installPath) {
      installPath = await findLatestVersionPath();
    }

    const desktopPath = path.join(os.homedir(), 'Desktop');
    const startMenuPath = path.join(os.homedir(), 'AppData', 'Roaming', 'Microsoft', 'Windows', 'Start Menu', 'Programs');
    const extrasFolderPath = path.join(startMenuPath, 'Manic Miners Extras');
    await createDirectory({ directory: extrasFolderPath });

    // Shortcut creation for executable and directories
    if (createExeShortcut) {
      const result = await createShortcut({
        startPath: desktopPath,
        name: path.basename(installPath, '.exe'),
        type: 'file',
        options: { target: installPath, desc: 'Automatically Generated' },
      });
      filePaths.push(result.message);
    }

    if (createDirShortcut) {
      const dirName = path.basename(path.dirname(installPath)) + ' Install Directory';
      const result = await createShortcut({
        startPath: desktopPath,
        name: dirName,
        type: 'directory',
        options: {
          target: path.dirname(installPath),
          icon: installPath,
          workingDir: path.dirname(installPath),
          desc: 'A shortcut to your ManicMiners Installation directory',
        },
      });
      filePaths.push(result.message);
    }

    // Start Menu shortcuts
    if (createExeShortcut) {
      const startMenuExeResult = await createShortcut({
        startPath: startMenuPath,
        name: path.basename(installPath, '.exe'),
        type: 'file',
        options: { target: installPath, desc: 'Automatically Generated', icon: installPath, workingDir: path.dirname(installPath) },
      });
      filePaths.push(startMenuExeResult.message);
    }

    if (createDirShortcut) {
      const startMenuDirName = path.basename(path.dirname(installPath)) + ' Install Directory';
      const startMenuDirResult = await createShortcut({
        startPath: startMenuPath,
        name: startMenuDirName,
        type: 'directory',
        options: {
          target: path.dirname(installPath),
          icon: installPath,
          workingDir: path.dirname(installPath),
          desc: 'A shortcut to your ManicMiners Installation directory',
        },
      });
      filePaths.push(startMenuDirResult.message);
    }

    // URLs for creating web resource shortcuts
    const urls = {
      Website: 'https://manicminers.baraklava.com/',
      Discord: 'https://discord.gg/C3hH7mFsMv',
      Reddit: 'https://www.reddit.com/r/manicminers/',
      YouTube: 'https://youtu.be/1mQacGNeNVA?list=PL2_YluKFsmfIAT4G9zlUmbmRuX4Kvb75g',
      Facebook: 'https://www.facebook.com/ManicMinersGame/',
      FAQ: 'https://manicminers.baraklava.com/faq/',
      Email: 'mailto:rockraidersremake@gmail.com',
    };

    for (const [key, url] of Object.entries(urls)) {
      const result = await createShortcut({
        startPath: extrasFolderPath,
        name: `Manic Miners ${key}`,
        type: 'url',
        options: { target: url },
      });
      filePaths.push(result.message); // Adjusting to push the returned message
    }
  } catch (error: any) {
    filePaths.push(`Error creating shortcuts: ${error.message}`);
    status = false;
  }

  return { status, filePaths };
};
