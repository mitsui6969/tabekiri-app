import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.js
export default {
  build: {
    rollupOptions: {
      external: ["react-dom/client"]
    }
  }
};

