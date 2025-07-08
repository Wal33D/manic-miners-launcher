import test from 'node:test';
import assert from 'node:assert';
import path from 'path';
// @ts-ignore: no types available
import mock from 'mock-require';

function makeDirStat() {
  return { isDirectory: () => true, size: 0 } as any;
}

function makeFileStat(size: number) {
  return { isDirectory: () => false, size } as any;
}

test('fetchInstalledVersions reports installed version metadata', async () => {
  const root = '/tmp/install';
  const versionDir = path.join(root, 'v1');

  const fsStub = {
    readdir: async (dir: string): Promise<string[]> => {
      if (dir === root) return ['v1'];
      if (dir === versionDir) return ['game.exe', 'data.dat'];
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    },
    stat: async (target: string): Promise<any> => {
      if (target === versionDir) return makeDirStat();
      if (target === path.join(versionDir, 'game.exe')) return makeFileStat(100);
      if (target === path.join(versionDir, 'data.dat')) return makeFileStat(50);
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    },
  };

  const versions = [
    { identifier: 'v1', title: 'Version 1' } as any,
    { identifier: 'v2', title: 'Version 2' } as any,
  ];

  mock('fs/promises', fsStub);
  mock('../src/functions/fetchDirectories', {
    getDirectories: async () => ({
      status: true,
      message: 'ok',
      directories: { launcherInstallPath: root },
    }),
  });
  mock('../src/api/fetchVersions', {
    fetchVersions: async () => ({ versions }),
  });

  const { fetchInstalledVersions } = mock.reRequire('../src/functions/fetchInstalledVersions');
  const result = await fetchInstalledVersions();

  assert.ok(result.status, result.message);
  assert.deepStrictEqual(result.installedVersions, [
    {
      ...versions[0],
      directory: versionDir,
      executablePath: path.join(versionDir, 'game.exe'),
      installationSize: 150,
    },
  ]);

  mock.stopAll();
});

test('fetchInstalledVersions returns empty list when no directories found', async () => {
  const root = '/tmp/empty';

  const fsStub = {
    readdir: async (dir: string): Promise<string[]> => {
      if (dir === root) return [];
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    },
    stat: async (): Promise<any> => {
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    },
  };

  const versions = [
    { identifier: 'v1', title: 'Version 1' } as any,
  ];

  mock('fs/promises', fsStub);
  mock('../src/functions/fetchDirectories', {
    getDirectories: async () => ({
      status: true,
      message: 'ok',
      directories: { launcherInstallPath: root },
    }),
  });
  mock('../src/api/fetchVersions', {
    fetchVersions: async () => ({ versions }),
  });

  const { fetchInstalledVersions } = mock.reRequire('../src/functions/fetchInstalledVersions');
  const result = await fetchInstalledVersions();

  assert.ok(result.status, result.message);
  assert.deepStrictEqual(result.installedVersions, []);

  mock.stopAll();
});
