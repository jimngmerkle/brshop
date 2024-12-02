import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    sourcemap: true,
    minify: false,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://brshop-y4bl.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});