import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Allows you to use @ as an alias for /src
    },
  },
  build: {
    outDir: 'dist', // Ensures the build output directory is 'dist'
  },
});