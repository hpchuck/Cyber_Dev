import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Cyber_Dev/',
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          // React and core dependencies
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Animation libraries
          'animation': ['framer-motion', 'motion', 'gsap'],
          
          // 3D and Spline components (largest chunks)
          'spline-3d': ['@splinetool/react-spline', '@splinetool/runtime'],
          'three-js': ['three', '@react-three/fiber', '@react-three/drei'],
          
          // UI components and utilities
          'ui-libs': [
            'lucide-react', 
            '@radix-ui/react-checkbox',
            '@radix-ui/react-label',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            'class-variance-authority',
            'clsx',
            'tailwind-merge'
          ],
          
          // Audio and effects
          'effects': ['howler', 'canvas-confetti'],
          
          // State management and utilities
          'utils': ['zustand', '@number-flow/react']
        },
      },
    },
  },
});