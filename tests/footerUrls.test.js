import assert from 'assert';
import test from 'node:test';
import { FOOTER_URLS } from '../launcher-gui/src/lib/footerUrls.js';

const expectedKeys = [
  'Website',
  'Discord',
  'Reddit',
  'YouTube',
  'Facebook',
  'FAQ',
  'Email',
];

test('FOOTER_URLS contains all expected links', () => {
  for (const key of expectedKeys) {
    assert.ok(key in FOOTER_URLS, `missing key: ${key}`);
    const url = FOOTER_URLS[key];
    assert.match(url, /^(https?:\/\/|mailto:)/, `invalid url for ${key}`);
  }
});
