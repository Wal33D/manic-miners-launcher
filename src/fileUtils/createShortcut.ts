import * as path from 'path';
const createDesktopShortcut = require('create-desktop-shortcuts');

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
  try {
    // For URL shortcuts, we still need platform-specific handling
    if (type === 'url') {
      return await createUrlShortcut(startPath, name, options);
    }

    // For file and directory shortcuts, use create-desktop-shortcuts
    const shortcutPath = path.join(startPath, name);

    // Prepare cross-platform shortcut configuration
    const shortcutConfig: Record<string, unknown> = {};

    if (process.platform === 'win32') {
      shortcutConfig.windows = {
        filePath: options.target,
        outputPath: startPath,
        name: name,
        comment: options.desc || name,
        icon: options.icon,
        workingDirectory: options.workingDir || path.dirname(options.target),
      };
    }

    if (process.platform === 'darwin') {
      shortcutConfig.osx = {
        filePath: options.target,
        outputPath: startPath,
        name: name,
      };
    }

    if (process.platform === 'linux') {
      shortcutConfig.linux = {
        filePath: options.target,
        outputPath: startPath,
        name: name,
        comment: options.desc || name,
        icon: options.icon || 'application-x-executable',
        type: 'Application',
        terminal: false,
        chmod: true,
      };
    }

    // Create the shortcut using create-desktop-shortcuts
    const success = createDesktopShortcut(shortcutConfig);

    if (success) {
      return {
        created: true,
        message: `${type.charAt(0).toUpperCase() + type.slice(1)} shortcut created at ${shortcutPath}`,
      };
    } else {
      return {
        created: false,
        message: `Failed to create ${type} shortcut`,
      };
    }
  } catch (error: unknown) {
    const err = error as Error;
    return { created: false, message: `Error creating ${type} shortcut: ${err.message}` };
  }
};

// URL shortcut creation (platform-specific handling still needed)
async function createUrlShortcut(
  startPath: string,
  name: string,
  options: { target: string; desc?: string; icon?: string; workingDir?: string }
): Promise<{ created: boolean; message: string }> {
  const fs = require('fs/promises');

  try {
    if (process.platform === 'win32') {
      const shortcutPath = path.join(startPath, `${name}.url`);
      const shortcutContent = `[InternetShortcut]\r\nURL=${options.target}\r\n`;
      await fs.writeFile(shortcutPath, shortcutContent);
      return { created: true, message: `URL shortcut created at ${shortcutPath}` };
    } else if (process.platform === 'darwin') {
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
    } else if (process.platform === 'linux') {
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
    } else {
      return { created: false, message: `URL shortcut creation not supported on platform: ${process.platform}` };
    }
  } catch (error: unknown) {
    const err = error as Error;
    return { created: false, message: `Error creating URL shortcut: ${err.message}` };
  }
}
