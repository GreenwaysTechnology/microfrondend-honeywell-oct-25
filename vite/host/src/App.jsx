import React, { Suspense } from 'react'

// Dynamically load remote component
const HelloRemote = React.lazy(() => import('remote/HelloRemote'))

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🏠 Host App</h1>
      <Suspense fallback={<p>Loading Remote...</p>}>
        <HelloRemote />
      </Suspense>
    </div>
  )
}

export default App
