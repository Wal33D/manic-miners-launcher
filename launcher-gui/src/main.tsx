import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Always land on the same route as the Home button ("/").
// This avoids hitting the NotFound page on first launch.
if (window.location.hash !== '#/') {
  window.location.hash = '/';
}

createRoot(document.getElementById('root')!).render(<App />);

