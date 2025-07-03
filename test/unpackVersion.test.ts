import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { unpackVersion } from '../src/functions/unpackVersion';
import * as fetchVersionsModule from '../src/api/fetchVersions';

function createMaliciousZip(dir: string) {
  const zipDir = path.join(dir, 'zip');
  fs.mkdirSync(zipDir);
  const outside = path.join(dir, 'evil.txt');
  fs.writeFileSync(outside, 'evil');
  execSync('zip mal.zip ../evil.txt', { cwd: zipDir });
  fs.renameSync(path.join(zipDir, 'mal.zip'), path.join(dir, 'mal.zip'));
  fs.rmSync(zipDir, { recursive: true, force: true });
}

test('unpackVersion rejects archives with path traversal entries', async () => {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  createMaliciousZip(dir);

  const original = fetchVersionsModule.fetchVersions;
  (fetchVersionsModule as any).fetchVersions = async () => ({
    versions: [{ identifier: 'mal', filename: 'mal.zip', title: 'malicious' }],
  });

  await assert.rejects(() => unpackVersion({ versionIdentifier: 'mal', installationDirectory: dir, overwriteExisting: true }));

  (fetchVersionsModule as any).fetchVersions = original;
  fs.rmSync(dir, { recursive: true, force: true });
});
