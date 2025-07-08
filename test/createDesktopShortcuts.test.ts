import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
// @ts-ignore: no types available
import mock from 'mock-require';

const skip = process.platform !== 'win32';

test('createDesktopShortcuts creates expected shortcuts', { skip }, async () => {
  const home = fs.mkdtempSync(path.join(process.cwd(), 'tmp-home-'));
  process.env.HOME = home;
  process.env.USERPROFILE = home;

  const createdDirs: string[] = [];
  const shortcutArgs: any[] = [];

  mock('../src/fileUtils/createDirectory', {
    createDirectory: async ({ directory }: { directory: string }) => {
      createdDirs.push(directory);
      return { created: true, existed: false };
    },
  });

  mock('../src/fileUtils/createShortcut', {
    createShortcut: async (args: any) => {
      shortcutArgs.push(args);
      const ext = args.type === 'url' ? 'url' : 'lnk';
      return { created: true, message: path.join(args.startPath, `${args.name}.${ext}`) };
    },
  });

  const { createDesktopShortcuts } = require('../src/functions/createDesktopShortcuts');

  const installPath = path.join(home, 'game', 'ManicMiners.exe');
  fs.mkdirSync(path.dirname(installPath), { recursive: true });
  fs.writeFileSync(installPath, '');

  const result = await createDesktopShortcuts({ installPath });

  const startMenu = path.join(home, 'AppData', 'Roaming', 'Microsoft', 'Windows', 'Start Menu', 'Programs');
  const extrasPath = path.join(startMenu, 'Manic Miners Extras');

  assert.ok(result.status, result.filePaths.join('\n'));
  assert.strictEqual(createdDirs[0], extrasPath);
  assert.strictEqual(shortcutArgs.length, 11);

  mock.stop('../src/fileUtils/createDirectory');
  mock.stop('../src/fileUtils/createShortcut');
  fs.rmSync(home, { recursive: true, force: true });
});
