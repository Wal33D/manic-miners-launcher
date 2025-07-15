import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { updateFavicon } from './utils/favicon';

// Update favicon from assets endpoint
updateFavicon();

createRoot(document.getElementById('root')!).render(<App />);
