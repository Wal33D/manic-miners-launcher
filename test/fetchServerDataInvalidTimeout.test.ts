import test from 'node:test';
import assert from 'node:assert';
import http from 'http';
// @ts-ignore: no types available
import mock from 'mock-require';

function startHangingServer(): Promise<{ url: string; close: () => void }> {
  return new Promise(resolve => {
    const server = http.createServer((_req, _res) => {
      // Intentionally do not respond to simulate a hang
    });
    server.listen(0, () => {
      const { port } = server.address() as any;
      resolve({ url: `http://127.0.0.1:${port}`, close: () => server.close() });
    });
  });
}

test('invalid FETCH_TIMEOUT_MS falls back to default', async () => {
  const { url, close } = await startHangingServer();
  process.env.SERVER_BASE_URL = url;
  process.env.FETCH_TIMEOUT_MS = 'abc';

  const capturedTimeouts: number[] = [];
  const originalSetTimeout = global.setTimeout;
  global.setTimeout = ((fn: (...args: any[]) => void, ms?: number, ...args: any[]) => {
    capturedTimeouts.push(ms as number);
    // Trigger immediately to avoid long waits
    return originalSetTimeout(fn as any, 0, ...args) as any;
  }) as any;

  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (msg?: any, ...rest: any[]) => {
    warnings.push(String(msg));
  };

  mock('../src/api/fetchServerEndpoints', {
    fetchServerEndpoints: async () => ({
      status: true,
      message: 'ok',
      data: { name: 'test', endpoint: '/' },
    }),
  });

  const { fetchServerData } = require('../src/api/fetchServerData');
  const result = await fetchServerData({ routeName: 'test' });

  assert.strictEqual(result.status, false);
  assert.ok(capturedTimeouts[0] === 30000);
  assert.ok(warnings.some(w => w.includes('FETCH_TIMEOUT_MS')));

  close();
  mock.stop('../src/api/fetchServerEndpoints');
  global.setTimeout = originalSetTimeout;
  console.warn = originalWarn;
  delete process.env.SERVER_BASE_URL;
  delete process.env.FETCH_TIMEOUT_MS;
});
