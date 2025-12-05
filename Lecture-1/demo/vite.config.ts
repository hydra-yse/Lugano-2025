import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  publicDir: 'public', // Ensure that the `public` directory is correctly referenced.
  server: {
    fs: {
      allow: ['.', '../../../Breez-Sdk-Liquid/packages/wasm']
    }
  }
})
