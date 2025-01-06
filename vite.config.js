import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/seuws/', // Base URL, should match your GitHub Pages repository name
  plugins: [react()],
});
