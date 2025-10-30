import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';

const RemoteWidget = lazy(() => import('remoteApp/Widget'));

const App = () => (
  <div>
    <h1>Host App</h1>
    <Suspense fallback={<div>Loading Remote Widget...</div>}>
      <RemoteWidget />
    </Suspense>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
