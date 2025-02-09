import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteObfuscator } from 'vite-plugin-obfuscator';

export default defineConfig({
  plugins: [
    react(),
    ViteObfuscator({
        global: true, // Configure your settings here
    })
],
});