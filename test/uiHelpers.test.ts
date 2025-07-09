// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../global.d.ts" />
import test from 'node:test';
import assert from 'node:assert';
// @ts-ignore: no types available
import { JSDOM } from 'jsdom';

import { disableElements, enableElements } from '../src/renderer/components/uiHelpers';

function createDom() {
  const dom = new JSDOM(`<!DOCTYPE html>
    <button id="btn"></button>
    <input id="inp" />
    <select id="sel"></select>`);
  return dom.window.document;
}

test('disableElements disables all elements', () => {
  const document = createDom();
  const btn = document.getElementById('btn') as HTMLButtonElement;
  const inp = document.getElementById('inp') as HTMLInputElement;
  const sel = document.getElementById('sel') as HTMLSelectElement;

  disableElements(btn, inp, sel);

  assert.strictEqual(btn.disabled, true);
  assert.strictEqual(inp.disabled, true);
  assert.strictEqual(sel.disabled, true);
  assert.strictEqual(btn.style.cursor, 'not-allowed');
});

test('enableElements re-enables all elements', () => {
  const document = createDom();
  const btn = document.getElementById('btn') as HTMLButtonElement;

  disableElements(btn);
  enableElements(btn);

  assert.strictEqual(btn.disabled, false);
  assert.strictEqual(btn.style.cursor, '');
});
