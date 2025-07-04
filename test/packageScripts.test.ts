import test from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

test('package.json defines install and start scripts', () => {
  assert.ok(pkg.scripts && typeof pkg.scripts.start === 'string');
  assert.ok(pkg.scripts && typeof pkg.scripts.test === 'string');
});
