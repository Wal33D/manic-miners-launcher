import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { execSync } from 'child_process';
import { downloadLevel } from '../src/functions/downloadLevel';

function createZip(dir: string, filename: string, content: string) {
  const file = path.join(dir, 'file.txt');
  fs.writeFileSync(file, content);
  execSync(`zip ${filename} file.txt`, { cwd: dir });
}

function startServer(filePath: string): Promise<{ url: string; close: () => void }> {
  return new Promise(resolve => {
    const server = http.createServer((_req, res) => {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Length': data.length });
      res.end(data);
    });
    server.listen(0, () => {
      const { port } = server.address() as any;
      resolve({ url: `http://127.0.0.1:${port}/file.zip`, close: () => server.close() });
    });
  });
}

test('downloadLevel downloads and unpacks zip', async () => {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  createZip(dir, 'level.zip', 'hello');
  const { url, close } = await startServer(path.join(dir, 'level.zip'));

  const out = path.join(dir, 'levels');
  fs.mkdirSync(out);

  const result = await downloadLevel({
    downloadUrl: url,
    levelIdentifier: 'level',
    levelsPath: out,
  });

  assert.ok(result.status, result.message);
  assert.ok(fs.existsSync(path.join(out, 'file.txt')));

  close();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('downloadLevel rejects zip with traversal paths', async () => {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const zipDir = path.join(dir, 'zip');
  fs.mkdirSync(zipDir);
  const outside = path.join(dir, 'evil.txt');
  fs.writeFileSync(outside, 'evil');
  execSync('zip bad.zip ../evil.txt', { cwd: zipDir });
  const zipPath = path.join(zipDir, 'bad.zip');
  const { url, close } = await startServer(zipPath);

  const out = path.join(dir, 'levels');
  fs.mkdirSync(out);

  const result = await downloadLevel({
    downloadUrl: url,
    levelIdentifier: 'bad',
    levelsPath: out,
  });

  assert.strictEqual(result.status, false);
  assert.ok(!fs.existsSync(path.join(out, 'evil.txt')));

  close();
  fs.rmSync(dir, { recursive: true, force: true });
});
