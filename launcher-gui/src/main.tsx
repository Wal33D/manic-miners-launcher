import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure the first launch always lands on the Home page.
if (!window.location.hash || window.location.hash === '#') {
  window.location.hash = '#/';
}

createRoot(document.getElementById('root')!).render(<App />);
