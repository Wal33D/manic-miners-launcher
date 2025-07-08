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

test('fetchServerData times out', async () => {
  const { url, close } = await startHangingServer();
  process.env.SERVER_BASE_URL = url;
  process.env.FETCH_TIMEOUT_MS = '100';

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
  assert.match(result.message, /timed out/i);

  close();
  mock.stop('../src/api/fetchServerEndpoints');
  delete process.env.SERVER_BASE_URL;
  delete process.env.FETCH_TIMEOUT_MS;
});
