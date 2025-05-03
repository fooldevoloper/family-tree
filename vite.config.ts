import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  define: {
    'process.env': {},
    global: 'globalThis',
    browser: 'globalThis',
  },
  optimizeDeps: {
    include: ['@xyflow/react'],
  },
  server: {
    fs: {
      strict: false,
    },
  },
});
