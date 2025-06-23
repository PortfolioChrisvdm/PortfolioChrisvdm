// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';

// Ensure <div id="root"></div> exists in public/index.html
const container = document.getElementById('root');
if (!container) {
  throw new Error(
    'Root container not found. Make sure public/index.html has a <div id="root"></div>.'
  );
}
const root = createRoot(container);
root.render(<App />);
