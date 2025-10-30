import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './HelloRemote': './src/HelloRemote.jsx',
      },
      shared: ['react', 'react-dom'],
      dev:true
    }),
  ],
  build: {
    target: 'esnext',
  },
  server: {
    port: 5001,
  },
})
