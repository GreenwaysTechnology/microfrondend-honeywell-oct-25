import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

async function loadRemoteModule(remoteUrl, scope, module) {
  // Fetch remote manifest for current remoteEntry filename
  const manifest = await fetch(`${remoteUrl}/remoteEntry-manifest.json`).then(res => res.json());
  const remoteEntryUrl = `${remoteUrl}/${manifest.remoteEntry}`;

  // Dynamically load remoteEntry script
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = remoteEntryUrl;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${remoteEntryUrl}`));
    document.head.appendChild(script);
  });

  // Initialize shared scope
  await __webpack_init_sharing__('default');
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);

  const factory = await container.get(module);
  return factory();
}

const App = () => {
  const [Widget, setWidget] = useState(null);

  useEffect(() => {
    loadRemoteModule('http://localhost:3001', 'remoteApp', './Widget')
      .then(Module => setWidget(() => Module.default))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Host App</h1>
      {Widget ? <Widget /> : <p>Loading remote widget...</p>}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
