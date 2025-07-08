import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { deleteDirectoryOrFile } from '../src/fileUtils/deleteDirectoryOrFile';

// Ensure that files are removed

test('deleteDirectoryOrFile removes a file', async () => {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const file = path.join(dir, 'temp.txt');
  fs.writeFileSync(file, 'data');

  const result = await deleteDirectoryOrFile({ directoryPath: file });

  assert.ok(result.deleted, result.message);
  assert.ok(!fs.existsSync(file));

  fs.rmSync(dir, { recursive: true, force: true });
});

// Ensure that directories with contents are removed

test('deleteDirectoryOrFile removes a directory recursively', async () => {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const sub = path.join(dir, 'sub');
  fs.mkdirSync(sub);
  fs.writeFileSync(path.join(sub, 'file.txt'), 'content');

  const result = await deleteDirectoryOrFile({ directoryPath: sub });

  assert.ok(result.deleted, result.message);
  assert.ok(!fs.existsSync(sub));

  fs.rmSync(dir, { recursive: true, force: true });
});
