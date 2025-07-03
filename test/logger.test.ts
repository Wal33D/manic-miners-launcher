import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

function loadLogger() {
  const loggerPath = path.resolve(__dirname, '../src/logger');
  delete require.cache[require.resolve(loggerPath)];
  return require(loggerPath);
}

test('logToFile writes to file when not in renderer', async () => {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const file = path.join(dir, 'log.txt');

  const originalType = (process as any).type;
  delete (process as any).type;
  const logger = loadLogger();
  await logger.logToFile({ message: 'hello world', filePath: file });

  assert.ok(fs.existsSync(file));
  const content = fs.readFileSync(file, 'utf-8');
  assert.match(content, /hello world/);

  fs.rmSync(dir, { recursive: true, force: true });
  if (originalType === undefined) {
    delete (process as any).type;
  } else {
    (process as any).type = originalType;
  }
});

test('logToFile falls back to console in renderer', async () => {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const file = path.join(dir, 'log.txt');

  const originalType = (process as any).type;
  (process as any).type = 'renderer';
  const logger = loadLogger();
  await logger.logToFile({ message: 'should not write', filePath: file });

  assert.ok(!fs.existsSync(file));

  fs.rmSync(dir, { recursive: true, force: true });
  if (originalType === undefined) {
    delete (process as any).type;
  } else {
    (process as any).type = originalType;
  }
});

