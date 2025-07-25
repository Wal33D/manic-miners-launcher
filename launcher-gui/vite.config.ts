import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: '::',
    port: 8080,
    proxy: {
      // Proxy API requests to avoid CORS issues in development
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '/api'),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
