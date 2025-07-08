import test from 'node:test';
import assert from 'node:assert';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { downloadFile } from '../src/functions/downloadFile';

function startServer(content: string): Promise<{ url: string; close: () => void }> {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Length': Buffer.byteLength(content) });
      res.end(content);
    });
    server.listen(0, () => {
      const { port } = server.address() as any;
      resolve({ url: `http://127.0.0.1:${port}/file.txt`, close: () => server.close() });
    });
  });
}

function startServerNoLength(content: string): Promise<{ url: string; close: () => void }> {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      res.writeHead(200);
      res.end(content);
    });
    server.listen(0, () => {
      const { port } = server.address() as any;
      resolve({ url: `http://127.0.0.1:${port}/file.txt`, close: () => server.close() });
    });
  });
}

test('downloadFile succeeds with correct checksum', async () => {
  const content = 'hello world';
  const hash = createHash('md5').update(content).digest('hex');
  const { url, close } = await startServer(content);
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const file = path.join(dir, 'file.txt');

  const result = await downloadFile({
    downloadUrl: url,
    filePath: file,
    expectedSize: Buffer.byteLength(content),
    expectedMd5: hash,
  });

  assert.ok(result.status, result.message);
  assert.ok(fs.existsSync(file));

  close();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('downloadFile fails on checksum mismatch', async () => {
  const content = 'goodbye';
  const { url, close } = await startServer(content);
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const file = path.join(dir, 'file.txt');

  const result = await downloadFile({
    downloadUrl: url,
    filePath: file,
    expectedSize: Buffer.byteLength(content),
    expectedMd5: 'wronghash',
  });

  assert.strictEqual(result.status, false);
  assert.ok(!fs.existsSync(file));

  close();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('downloadFile handles missing Content-Length', async () => {
  const content = 'no length header';
  const hash = createHash('md5').update(content).digest('hex');
  const { url, close } = await startServerNoLength(content);
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const file = path.join(dir, 'file.txt');

  const progressValues: number[] = [];

  const result = await downloadFile({
    downloadUrl: url,
    filePath: file,
    expectedSize: Buffer.byteLength(content),
    expectedMd5: hash,
    updateStatus: status => {
      if ('progress' in status) {
        progressValues.push(status.progress);
      }
    },
  });

  assert.ok(result.status, result.message);
  assert.ok(progressValues.length > 0);
  progressValues.forEach(p => assert.ok(Number.isFinite(p)));

  close();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('downloadFile handles missing Content-Length without expected size', async () => {
  const content = 'no length or size';
  const hash = createHash('md5').update(content).digest('hex');
  const { url, close } = await startServerNoLength(content);
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const file = path.join(dir, 'file.txt');

  const progressValues: number[] = [];

  const result = await downloadFile({
    downloadUrl: url,
    filePath: file,
    expectedMd5: hash,
    updateStatus: status => {
      if ('progress' in status) {
        progressValues.push(status.progress);
      }
    },
  });

  assert.ok(result.status, result.message);
  assert.ok(progressValues.length > 0);
  progressValues.forEach(p => assert.ok(p >= 0 && p <= 100));

  close();
  fs.rmSync(dir, { recursive: true, force: true });
});
