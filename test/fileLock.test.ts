import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
// @ts-ignore: no types available
import mock from 'mock-require';

function loadFileLock(tempDir: string) {
  const modulePath = path.resolve(__dirname, '../src/fileUtils/fileLock');
  const os = require('os');
  mock('os', { ...os, tmpdir: () => tempDir, homedir: () => tempDir });
  delete require.cache[require.resolve(modulePath)];
  const mod = require(modulePath);
  mock.stop('os');
  return mod as typeof import('../src/fileUtils/fileLock');
}

test('acquire and release lock manage lock file correctly', async () => {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const { acquireLock, releaseLock, isLocked } = loadFileLock(dir);
  const lockFile = path.join(dir, 'ItchDownloadLock.lock');

  assert.strictEqual(await isLocked(), false);

  await acquireLock();
  assert.ok(fs.existsSync(lockFile));
  assert.strictEqual(await isLocked(), true);

  await releaseLock();
  assert.ok(!fs.existsSync(lockFile));
  assert.strictEqual(await isLocked(), false);

  fs.rmSync(dir, { recursive: true, force: true });
  delete require.cache[require.resolve('../src/fileUtils/fileLock')];
});
