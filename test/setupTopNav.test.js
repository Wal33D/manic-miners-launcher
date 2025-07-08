import test from 'node:test';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';
import mock from 'mock-require';

class ModalStub {
  static shown = false;
  static lastElement = null;
  static instance = null;

  constructor(elem) {
    ModalStub.lastElement = elem;
  }

  show() {
    ModalStub.shown = true;
  }

  static getOrCreateInstance(elem) {
    if (!ModalStub.instance) {
      ModalStub.instance = new ModalStub(elem);
    }
    ModalStub.lastElement = elem;
    return ModalStub.instance;
  }
}

test('setupTopNav attaches listener and opens modal', () => {
  const dom = new JSDOM(`<!DOCTYPE html><a id="navbar-main-menu-modal-btn"></a><div id="navbar-main-menu-modal"></div>`);

  const { document, Event } = dom.window;
  global.document = document;

  mock('bootstrap', { Modal: ModalStub });
  const { setupTopNav } = require('../src/renderer/components/setupTopNav');

  const btn = document.getElementById('navbar-main-menu-modal-btn');
  setupTopNav(btn);

  btn.dispatchEvent(new Event('click'));

  assert.strictEqual(ModalStub.lastElement, document.getElementById('navbar-main-menu-modal'));
  assert.ok(ModalStub.shown);

  mock.stop('bootstrap');
});
