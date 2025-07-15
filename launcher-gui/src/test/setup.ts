import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.electronAPI for tests
global.window = Object.assign(global.window, {
  electronAPI: {
    send: vi.fn(),
    invoke: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  },
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});