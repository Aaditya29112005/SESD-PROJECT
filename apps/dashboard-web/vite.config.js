import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/api/attendance': {
        target: 'http://localhost:4002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/attendance/, ''),
      },
      '/api/chat': {
        target: 'http://localhost:4007',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, ''),
      },
      '/api/assignments': {
        target: 'http://localhost:4003',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/assignments/, ''),
      },
      '/api/timetable': {
        target: 'http://localhost:4005',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/timetable/, ''),
      },
      '/api/brain': {
        target: 'http://localhost:4009',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/brain/, ''),
      }
    }
  }
});
