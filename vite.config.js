import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  base: '/seuws/',  // Make sure this matches your GitHub repository name
  plugins: [react()]
}