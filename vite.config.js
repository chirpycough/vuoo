import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default function config({ mode }) {
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5000,
      host: '0.0.0.0',
      allowedHosts: [
        'd850b104-010f-4063-b8bd-81a1ff1f17cb-00-2vtssejozqfch.spock.replit.dev',
        '.replit.dev',
        '.replit.app'
      ]
    },
  });
}
