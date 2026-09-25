import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent external third-party script errors (e.g. Disqus CDN blocked cookies/requests)
// from propagating as unhandled global exceptions in the dev preview
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (event.message === 'Script error.' || !event.filename) {
      event.preventDefault();
      return true;
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason &&
      typeof event.reason === 'object' &&
      'message' in event.reason &&
      typeof event.reason.message === 'string' &&
      event.reason.message.includes('disqus')
    ) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
