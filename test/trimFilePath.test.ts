// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../global.d.ts" />
import test from 'node:test';
import assert from 'node:assert';
import { trimFilePath } from '../src/renderer/components/domUtils';

test('trimFilePath handles Windows paths', () => {
  const result = trimFilePath('C:\\foo\\bar\\file.txt');
  assert.strictEqual(result, 'C:\\foo\\bar');
});

test('trimFilePath handles POSIX paths', () => {
  const result = trimFilePath('/usr/local/bin/file.txt');
  assert.strictEqual(result, '/usr/local/bin');
});
