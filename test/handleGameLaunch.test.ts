import test from 'node:test';
import assert from 'node:assert';
import { EventEmitter } from 'events';
// @ts-ignore: no types
import mock from 'mock-require';

let spawnExitCode = 0;
function fakeSpawn() {
  const proc: any = new EventEmitter();
  proc.stdout = new EventEmitter();
  proc.stderr = new EventEmitter();
  proc.unref = () => {};
  process.nextTick(() => {
    proc.emit('exit', spawnExitCode);
  });
  return proc;
}

function setupMocks(exitCode: number, exePath = '/fake/game.exe') {
  spawnExitCode = exitCode;
  mock('child_process', { spawn: fakeSpawn });
  mock('../src/functions/fetchInstalledVersions', {
    fetchInstalledVersions: async () => ({
      status: true,
      message: 'ok',
      installedVersions: [{ identifier: 'v1', executablePath: exePath }],
    }),
  });
}

test('handleGameLaunch resolves true on successful spawn', async () => {
  const originalType = (process as any).type;
  (process as any).type = 'renderer';
  setupMocks(0);

  const { handleGameLaunch } = require('../src/functions/handleGameLaunch');
  const result = await handleGameLaunch({ versionIdentifier: 'v1' });
  assert.strictEqual(result, true);

  mock.stop('../src/functions/fetchInstalledVersions');
  mock.stop('child_process');
  delete require.cache[require.resolve('../src/functions/handleGameLaunch')];
  delete require.cache[require.resolve('../src/functions/launchExecutable')];
  if (originalType === undefined) {
    delete (process as any).type;
  } else {
    (process as any).type = originalType;
  }
});

test('handleGameLaunch resolves false on spawn failure', async () => {
  const originalType = (process as any).type;
  (process as any).type = 'renderer';
  setupMocks(1);

  const { handleGameLaunch } = require('../src/functions/handleGameLaunch');
  const result = await handleGameLaunch({ versionIdentifier: 'v1' });
  assert.strictEqual(result, false);

  mock.stop('../src/functions/fetchInstalledVersions');
  mock.stop('child_process');
  delete require.cache[require.resolve('../src/functions/handleGameLaunch')];
  delete require.cache[require.resolve('../src/functions/launchExecutable')];
  if (originalType === undefined) {
    delete (process as any).type;
  } else {
    (process as any).type = originalType;
  }
});
