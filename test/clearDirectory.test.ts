import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { createTempDir, cleanupTempDir } from './helpers/temp';
import { clearDirectory } from '../src/fileUtils/clearDirectory';

// Test that clearDirectory recursively deletes all contents

test('clearDirectory recursively removes nested contents', async () => {
  const dir = createTempDir();
  const sub = path.join(dir, 'sub');
  const deep = path.join(sub, 'deep');
  fs.mkdirSync(deep, { recursive: true });
  fs.writeFileSync(path.join(dir, 'file1.txt'), '1');
  fs.writeFileSync(path.join(sub, 'file2.txt'), '2');
  fs.writeFileSync(path.join(deep, 'file3.txt'), '3');

  const result = await clearDirectory({ directoryPath: dir });

  assert.ok(result.clean, result.message);
  const remaining = fs.readdirSync(dir);
  assert.strictEqual(remaining.length, 0);
  assert.ok(!fs.existsSync(sub));

  cleanupTempDir(dir);
});

// Test that clearDirectory creates directory if it doesn't exist

test('clearDirectory creates directory when missing', async () => {
  const dir = path.join(process.cwd(), `tmp-${Date.now()}`);
  assert.ok(!fs.existsSync(dir));

  const result = await clearDirectory({ directoryPath: dir });

  assert.ok(result.clean, result.message);
  assert.ok(fs.existsSync(dir));
  assert.strictEqual(fs.readdirSync(dir).length, 0);

  fs.rmSync(dir, { recursive: true, force: true });
});
