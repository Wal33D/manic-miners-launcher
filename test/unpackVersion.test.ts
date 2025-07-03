import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { unpackVersion } from '../src/functions/unpackVersion';
import * as fetchVersionsModule from '../src/api/fetchVersions';

async function createMaliciousZip(dir: string) {
  const outside = path.join(dir, 'evil.txt');
  const zipPath = path.join(dir, 'mal.zip');

  fs.writeFileSync(outside, 'evil');

  const zip = new JSZip();
  zip.file('../evil.txt', fs.readFileSync(outside));
  const content = await zip.generateAsync({ type: 'nodebuffer' });
  fs.writeFileSync(zipPath, content);
}

test('unpackVersion rejects archives with path traversal entries', async () => {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  await createMaliciousZip(dir);

  const original = fetchVersionsModule.fetchVersions;
  (fetchVersionsModule as any).fetchVersions = async () => ({
    versions: [{ identifier: 'mal', filename: 'mal.zip', title: 'malicious' }],
  });

  await assert.rejects(() => unpackVersion({ versionIdentifier: 'mal', installationDirectory: dir, overwriteExisting: true }));

  (fetchVersionsModule as any).fetchVersions = original;
  fs.rmSync(dir, { recursive: true, force: true });
});
