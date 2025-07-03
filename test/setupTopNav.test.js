import test from 'node:test';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';
import mock from 'mock-require';

class ModalStub {
  static toggled = false;
  static lastElement = null;
  constructor(elem) {
    ModalStub.lastElement = elem;
  }
  toggle() {
    ModalStub.toggled = true;
  }
}

test('setupTopNav attaches listener and opens modal', () => {
  const dom = new JSDOM(
    `<!DOCTYPE html><a id="navbar-main-menu-modal-btn"></a><div id="navbar-main-menu-modal"></div>`
  );

  const { document, Event } = dom.window;
  global.document = document;

  mock('bootstrap', { Modal: ModalStub });
  const { setupTopNav } = require('../src/renderer/components/setupTopNav');

  const btn = document.getElementById('navbar-main-menu-modal-btn');
  setupTopNav(btn);

  btn.dispatchEvent(new Event('click'));

  assert.strictEqual(
    ModalStub.lastElement,
    document.getElementById('navbar-main-menu-modal')
  );
  assert.ok(ModalStub.toggled);

  mock.stop('bootstrap');
});
