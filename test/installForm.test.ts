import test from 'node:test';
import { render, fireEvent, screen } from '@testing-library/react';
import assert from 'node:assert';
import React from 'react';
import InstallForm from '../src/renderer/components/InstallForm';
import { JSDOM } from 'jsdom';
import type {} from '../global.d.ts';

test('InstallForm sends install event with selected values', () => {
  let sent: any = null;
  const dom = new JSDOM('<!DOCTYPE html><body></body>');
  global.window = dom.window as any;
  global.document = dom.window.document as any;
  global.DocumentFragment = dom.window.DocumentFragment as any;
  (global as any).window.electronAPI = { send: (ch: string, data: any) => { sent = { ch, data }; } };
  const utils = render(React.createElement(InstallForm), { container: dom.window.document.body });
  fireEvent.click(utils.getByTestId('install-btn'));
  assert.deepStrictEqual(sent, { ch: 'install', data: { version: 'v1', path: '' } });
});
