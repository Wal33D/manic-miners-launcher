import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

function loadLogger() {
  const loggerPath = path.resolve(__dirname, '../src/logger');
  delete require.cache[require.resolve(loggerPath)];
  return require(loggerPath);
}

test('info writes to runtime log in specified directory', async () => {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const file = path.join(dir, 'runtime-log.txt');

  const originalType = (process as any).type;
  delete (process as any).type;
  const logger = loadLogger();
  logger.setLogDirectory(dir);
  await logger.info('hello world');

  assert.ok(fs.existsSync(file));
  const content = fs.readFileSync(file, 'utf-8');
  assert.match(content, /\[INFO\].*hello world/);

  fs.rmSync(dir, { recursive: true, force: true });
  if (originalType === undefined) {
    delete (process as any).type;
  } else {
    (process as any).type = originalType;
  }
});

test('debug logs only when VERBOSE=true', async () => {
  const dir = fs.mkdtempSync(path.join(process.cwd(), 'tmp-'));
  const file = path.join(dir, 'runtime-log.txt');

  const originalType = (process as any).type;
  const originalVerbose = process.env.VERBOSE;
  delete (process as any).type;
  process.env.VERBOSE = 'true';
  const logger = loadLogger();
  logger.setLogDirectory(dir);
  await logger.debug('verbose message');

  assert.ok(fs.existsSync(file));
  const content = fs.readFileSync(file, 'utf-8');
  assert.match(content, /\[DEBUG\].*verbose message/);

  fs.rmSync(dir, { recursive: true, force: true });
  if (originalType === undefined) {
    delete (process as any).type;
  } else {
    (process as any).type = originalType;
  }
  if (originalVerbose === undefined) {
    delete process.env.VERBOSE;
  } else {
    process.env.VERBOSE = originalVerbose;
  }
});
