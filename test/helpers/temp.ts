import fs from 'fs';
import path from 'path';

export function createTempDir(prefix = 'tmp-'): string {
  return fs.mkdtempSync(path.join(process.cwd(), prefix));
}

export function cleanupTempDir(dir: string): void {
  fs.rmSync(dir, { recursive: true, force: true });
}
