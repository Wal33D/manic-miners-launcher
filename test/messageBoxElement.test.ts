import test from 'node:test';
import assert from 'node:assert';
import { messageBoxElement } from '../src/ui/partials/messageBoxElement';

test('messageBoxElement markup has matching div tags', () => {
  const openDivs = [...messageBoxElement.matchAll(/<div\b[^>]*>/g)].length;
  const closeDivs = [...messageBoxElement.matchAll(/<\/div>/g)].length;
  assert.strictEqual(openDivs, closeDivs);
});
