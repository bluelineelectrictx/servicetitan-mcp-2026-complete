import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Get all app directories
const appsDir = path.resolve(__dirname, 'src/apps');
const apps = fs.readdirSync(appsDir).filter(file => {
  return fs.statSync(path.join(appsDir, file)).isDirectory();
});

// Build configuration for all apps
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: apps.reduce((acc, app) => {
        acc[app] = path.resolve(appsDir, app, 'index.html');
        return acc;
      }, {} as Record<string, string>),
    },
    outDir: path.resolve(__dirname, '../../dist/apps'),
    emptyOutDir: true,
  },
});
