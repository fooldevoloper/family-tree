import '@xyflow/react/dist/style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Define browser if not defined (for preload scripts)
declare const browser: Window | undefined;
if (typeof browser === 'undefined') {
  (window as any).browser = window;
}

// Ensure we're in a browser environment
if (typeof window !== 'undefined') {
  try {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Error rendering app:', error);
  }
}
