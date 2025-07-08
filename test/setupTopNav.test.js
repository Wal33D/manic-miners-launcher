import test from 'node:test';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';

test('setupTopNav toggles sidebar visibility', () => {
  const dom = new JSDOM(`<!DOCTYPE html><a id="navbar-main-menu-modal-btn"></a><div id="side-pane" class="collapsed"></div>`);

  const { document, Event } = dom.window;
  global.document = document;
  const { setupTopNav } = require('../src/renderer/components/setupTopNav');

  const btn = document.getElementById('navbar-main-menu-modal-btn');
  const sidePane = document.getElementById('side-pane');
  setupTopNav(btn);

  assert.ok(sidePane.classList.contains('collapsed'));

  btn.dispatchEvent(new Event('click'));
  assert.ok(!sidePane.classList.contains('collapsed'));

  btn.dispatchEvent(new Event('click'));
  assert.ok(sidePane.classList.contains('collapsed'));
});
