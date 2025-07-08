import test from 'node:test';
import { render, fireEvent, screen } from '@testing-library/react';
import assert from 'node:assert';
import React from 'react';
import { JSDOM } from 'jsdom';
import NavigationMenu from '../src/renderer/components/NavigationMenu';
import type {} from '../global.d.ts';

test('NavigationMenu calls onNavigate when link clicked', () => {
  const dom = new JSDOM('<!DOCTYPE html><body></body>');
  global.window = dom.window as any;
  global.document = dom.window.document as any;
  global.DocumentFragment = dom.window.DocumentFragment as any;

  let target = '';
  const utils = render(React.createElement(NavigationMenu, { open: true, onClose: () => {}, onNavigate: t => (target = t) }), {
    container: dom.window.document.body,
  });
  fireEvent.click(utils.getByTestId('nav-levels'));
  assert.strictEqual(target, 'levels');
});
