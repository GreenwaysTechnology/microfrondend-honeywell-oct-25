import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

// dynamic import of a federated module
const RemoteButton = React.lazy(() => import('remote_app/Button'));

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Host App</h1>
      <p>This app consumes <strong>Button</strong> exported by remote_app.</p>

      <Suspense fallback={<div>Loading remote component...</div>}>
        <RemoteButton onClick={() => alert('Hello from remote Button inside Host!')}>
          Federated Button
        </RemoteButton>
      </Suspense>
    </div>
  );
};

createRoot(document.getElementById('root')).render(<App />);
