import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { verifyFile } from '../src/fileUtils/verifyFile';

// helper to create temporary directory and file
function createTempFile(content: string): { dir: string; file: string; size: number } {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const file = path.join(dir, 'file.txt');
  fs.writeFileSync(file, content);
  const size = fs.statSync(file).size;
  return { dir, file, size };
}

test('verifyFile detects existing file with matching size', async () => {
  const { dir, file, size } = createTempFile('hello');

  const info = await verifyFile({ filePath: file, expectedSize: size });

  assert.strictEqual(info.exists, true);
  assert.strictEqual(info.size, size);
  assert.strictEqual(info.sizeMatches, true);
  assert.strictEqual(info.isFile, true);
  assert.strictEqual(info.isDirectory, false);
  assert.strictEqual(info.name, 'file.txt');

  fs.rmSync(dir, { recursive: true, force: true });
});

test('verifyFile identifies size mismatch', async () => {
  const { dir, file } = createTempFile('abc');

  const info = await verifyFile({ filePath: file, expectedSize: 10 });

  assert.strictEqual(info.exists, true);
  assert.strictEqual(info.sizeMatches, false);

  fs.rmSync(dir, { recursive: true, force: true });
});

test('verifyFile handles missing file', async () => {
  const missing = path.join(process.cwd(), 'nonexistent-file.txt');

  const info = await verifyFile({ filePath: missing });

  assert.strictEqual(info.exists, false);
  assert.strictEqual(info.isFile, false);
});
