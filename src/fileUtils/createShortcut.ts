import * as ws from 'windows-shortcuts';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

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
  const created = false;
  const message = '';

  try {
    if (process.platform === 'win32') {
      return await createWindowsShortcut(startPath, name, type, options);
    } else if (process.platform === 'darwin') {
      return await createMacShortcut(startPath, name, type, options);
    } else if (process.platform === 'linux') {
      return await createLinuxShortcut(startPath, name, type, options);
    } else {
      return { created: false, message: `Shortcut creation not supported on platform: ${process.platform}` };
    }
  } catch (error: unknown) {
    const err = error as Error;
    return { created: false, message: `Error creating ${type} shortcut: ${err.message}` };
  }
};

// Windows shortcut creation (existing logic)
async function createWindowsShortcut(
  startPath: string,
  name: string,
  type: 'file' | 'url' | 'directory',
  options: { target: string; desc?: string; icon?: string; workingDir?: string }
): Promise<{ created: boolean; message: string }> {
  const shortcutExtension = type === 'url' ? 'url' : 'lnk';
  const shortcutPath = path.join(startPath, `${name}.${shortcutExtension}`);

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
  } else if (type === 'url') {
    const shortcutContent = `[InternetShortcut]\r\nURL=${options.target}\r\n`;
    await fs.writeFile(shortcutPath, shortcutContent);
  }

  return {
    created: true,
    message: `${type.charAt(0).toUpperCase() + type.slice(1)} shortcut created at ${shortcutPath}`,
  };
}

// macOS shortcut creation
async function createMacShortcut(
  startPath: string,
  name: string,
  type: 'file' | 'url' | 'directory',
  options: { target: string; desc?: string; icon?: string; workingDir?: string }
): Promise<{ created: boolean; message: string }> {
  if (type === 'url') {
    // Create .webloc file for URLs
    const shortcutPath = path.join(startPath, `${name}.webloc`);
    const weblocContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>URL</key>
	<string>${options.target}</string>
</dict>
</plist>`;
    await fs.writeFile(shortcutPath, weblocContent);
    return { created: true, message: `URL shortcut created at ${shortcutPath}` };
  } else {
    // Create symbolic link for files and directories
    const shortcutPath = path.join(startPath, name);
    await fs.symlink(options.target, shortcutPath);
    return { created: true, message: `${type} shortcut created at ${shortcutPath}` };
  }
}

// Linux shortcut creation
async function createLinuxShortcut(
  startPath: string,
  name: string,
  type: 'file' | 'url' | 'directory',
  options: { target: string; desc?: string; icon?: string; workingDir?: string }
): Promise<{ created: boolean; message: string }> {
  if (type === 'url') {
    // Create .desktop file for URLs
    const shortcutPath = path.join(startPath, `${name}.desktop`);
    const desktopContent = `[Desktop Entry]
Version=1.0
Type=Link
Name=${name}
Comment=${options.desc || name}
URL=${options.target}
Icon=text-html`;
    await fs.writeFile(shortcutPath, desktopContent);

    // Make it executable
    try {
      await fs.chmod(shortcutPath, 0o755);
    } catch (error) {
      // Ignore chmod errors on some filesystems
    }

    return { created: true, message: `URL shortcut created at ${shortcutPath}` };
  } else if (type === 'file') {
    // Create .desktop file for executable
    const shortcutPath = path.join(startPath, `${name}.desktop`);
    const desktopContent = `[Desktop Entry]
Version=1.0
Type=Application
Name=${name}
Comment=${options.desc || name}
Exec="${options.target}"
Icon=${options.icon || 'application-x-executable'}
Path=${options.workingDir || path.dirname(options.target)}
Terminal=false
Categories=Game;`;
    await fs.writeFile(shortcutPath, desktopContent);

    // Make it executable
    try {
      await fs.chmod(shortcutPath, 0o755);
    } catch (error) {
      // Ignore chmod errors on some filesystems
    }

    return { created: true, message: `Application shortcut created at ${shortcutPath}` };
  } else {
    // Create symbolic link for directories
    const shortcutPath = path.join(startPath, name);
    await fs.symlink(options.target, shortcutPath);
    return { created: true, message: `Directory shortcut created at ${shortcutPath}` };
  }
}
