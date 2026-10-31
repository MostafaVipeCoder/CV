import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { initGA, logPageView } from './utils/analytics';

// Initialize Google Analytics
initGA();
logPageView();

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
