import React from 'react';
import { createRoot } from 'react-dom/client';
import Button from './Button';

const App = () => (
  <div style={{ padding: 20 }}>
    <h2>Remote App (exposes Button)</h2>
    <Button onClick={() => alert('Hello from remote Button!')}>Click me</Button>
  </div>
);
createRoot(document.getElementById('root')).render(<App />);
