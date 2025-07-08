import * as ws from 'windows-shortcuts';
import * as fs from 'fs/promises';
import * as path from 'path';

export const createShortcut = async ({
  startPath,
  name,
  type,
  options,
}: {
  startPath: string;
  name: string;
  type: 'file' | 'url' | 'directory';
  options: { target: string; desc?: string; icon?: string; workingDir?: string };
}): Promise<{ created: boolean; message: string }> => {
  const shortcutExtension =
    process.platform === 'darwin' && type === 'url' ? 'webloc' : type === 'url' ? 'url' : 'lnk';
  const shortcutPath = path.join(startPath, `${name}.${shortcutExtension}`);
  let created = false;
  let message = '';


  try {
    if (process.platform === 'win32') {
      if (type === 'file' || type === 'directory') {
        await new Promise<void>((resolve, reject) => {
          const shortcutOptions = { ...options };
          if (type === 'directory') {
            shortcutOptions.workingDir = shortcutOptions.workingDir || options.target;
          }
          ws.create(shortcutPath, shortcutOptions, (err: any) => {
            if (err) reject(new Error(`Failed to create ${type} shortcut: ${err.message}`));
            else resolve();
          });
        });
        message = `${type.charAt(0).toUpperCase() + type.slice(1)} shortcut created successfully at ${shortcutPath}`;
      } else if (type === 'url') {
        const shortcutContent = `[InternetShortcut]\r\nURL=${options.target}\r\n`;
        await fs.writeFile(shortcutPath, shortcutContent);
        message = `URL shortcut created successfully at ${shortcutPath}`;
      }
    } else if (process.platform === 'darwin') {
      if (type === 'url') {
        const content = `<?xml version="1.0" encoding="UTF-8"?>\n<plist version="1.0">\n<dict>\n  <key>URL</key>\n  <string>${options.target}</string>\n</dict>\n</plist>`;
        await fs.writeFile(shortcutPath, content);
        message = `URL shortcut created successfully at ${shortcutPath}`;
      } else {
        await fs.symlink(options.target, shortcutPath);
        message = `${type.charAt(0).toUpperCase() + type.slice(1)} shortcut created successfully at ${shortcutPath}`;
      }
    } else {
      await fs.symlink(options.target, shortcutPath);
      message = `${type.charAt(0).toUpperCase() + type.slice(1)} symlink created successfully at ${shortcutPath}`;
    }
    created = true;
  } catch (error: unknown) {
    const err = error as Error;
    message = `Error creating ${type} shortcut at ${shortcutPath}: ${err.message}`;
  }

  return { created, message };
};
