import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { createFileReadOnly } from '../src/fileUtils/createFileReadOnly';

// Verify that files are created with read-only permissions

test('createFileReadOnly writes file with mode 444', async () => {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const file = path.join(dir, 'read.txt');

  const result = await createFileReadOnly({ filePath: file, content: 'hello' });

  assert.ok(fs.existsSync(file));
  const stats = fs.statSync(file);
  assert.strictEqual(stats.mode & 0o777, 0o444);
  assert.strictEqual((result as any).writable, false);

  fs.rmSync(dir, { recursive: true, force: true });
});
