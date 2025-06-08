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
    chunkSizeWarningLimit: 500, // Lower threshold to catch issues earlier
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: (id) => {
          // React core dependencies
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'react-vendor';
          }
          
          // Split large 3D libraries into smaller chunks - be more specific
          if (id.includes('@splinetool/react-spline') || id.includes('splinetool/react-spline')) {
            return 'spline-react';
          }
          if (id.includes('@splinetool/runtime') || id.includes('splinetool/runtime')) {
            return 'spline-runtime';
          }
          if (id.includes('three') && !id.includes('@react-three') && !id.includes('react-three')) {
            return 'three-core';
          }
          if (id.includes('@react-three/fiber') || id.includes('react-three/fiber')) {
            return 'r3f-fiber';
          }
          if (id.includes('@react-three/drei') || id.includes('react-three/drei')) {
            return 'r3f-drei';
          }
          
          // Animation libraries (split motion from framer-motion)
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('motion') && !id.includes('framer-motion')) {
            return 'motion-lib';
          }
          if (id.includes('gsap')) {
            return 'gsap-lib';
          }
          
          // UI component libraries
          if (id.includes('@radix-ui')) {
            return 'radix-ui';
          }
          if (id.includes('lucide-react')) {
            return 'lucide-icons';
          }
          
          // Audio and effects
          if (id.includes('howler')) {
            return 'audio-libs';
          }
          if (id.includes('canvas-confetti')) {
            return 'effects-libs';
          }
          
          // Utilities and smaller libraries
          if (id.includes('zustand') || id.includes('@number-flow/react') || 
              id.includes('class-variance-authority') || id.includes('clsx') || 
              id.includes('tailwind-merge')) {
            return 'utils-libs';
          }
          
          // Catch any remaining large node_modules and split them individually
          if (id.includes('node_modules')) {
            // Extract the package name from the path
            const chunks = id.split('node_modules/')[1]?.split('/');
            if (chunks && chunks.length > 0) {
              const packageName = chunks[0].startsWith('@') ? `${chunks[0]}/${chunks[1]}` : chunks[0];
              
              // Split particularly large packages individually
              if (['@splinetool', 'three', '@react-three', 'framer-motion', 'motion', 'gsap'].some(pkg => packageName.includes(pkg))) {
                return `vendor-${packageName.replace('@', '').replace('/', '-')}`;
              }
            }
            return 'vendor';
          }
        },
        // Optimize chunk loading
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId 
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace(/\.\w+$/, '') 
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name]-[hash].css';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
  },
});