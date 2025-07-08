import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { createTraversalZip } from './helpers/archive';
import { unpackVersion } from '../src/functions/unpackVersion';
import * as fetchVersionsModule from '../src/api/fetchVersions';

test('unpackVersion rejects archives with path traversal entries', async () => {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  await createTraversalZip(dir, 'mal.zip');

  const original = fetchVersionsModule.fetchVersions;
  (fetchVersionsModule as any).fetchVersions = async () => ({
    versions: [{ identifier: 'mal', filename: 'mal.zip', title: 'malicious' }],
  });

  await assert.rejects(() => unpackVersion({ versionIdentifier: 'mal', installationDirectory: dir, overwriteExisting: true }));

  (fetchVersionsModule as any).fetchVersions = original;
  fs.rmSync(dir, { recursive: true, force: true });
});
