import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

import { getDirectories } from '../src/functions/fetchDirectories';

// Smoke test that the getDirectories function creates expected folders
// in a custom temporary HOME directory to avoid touching real user paths.

test('getDirectories creates directories in a temporary environment', async () => {
  const tmpRoot = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  process.env.HOME = tmpRoot;
  process.env.LOCALAPPDATA = path.join(tmpRoot, 'AppData', 'Local');

  const result = await getDirectories();
  assert.ok(result.status, result.message);
  assert.ok(result.directories);

  for (const dir of Object.values(result.directories!)) {
    assert.ok(fs.existsSync(dir), `directory missing: ${dir}`);
  }
});
