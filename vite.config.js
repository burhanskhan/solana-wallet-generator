import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/generate': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // Not needed, but good to know: rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
