// renderer.ts
import './index.css';
import '../ui/styles/mainMenuModal.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../ui/App';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root') || (() => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    return div;
  })();

  const root = createRoot(container);
  root.render(<App />);
});
