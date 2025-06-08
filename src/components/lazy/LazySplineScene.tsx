import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Lazy load the SplineScene component
const SplineScene = lazy(() => import('../ui/splite').then(module => ({ 
  default: module.SplineScene 
})));

interface LazySplineSceneProps {
  scene: string;
  className?: string;
  fallbackClassName?: string;
}

// Fallback component while SplineScene is loading
const SplineFallback = ({ className }: { className?: string }) => (
  <div className={`${className} flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800`}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-4"
    >
      {/* 3D-style loading animation */}
      <motion.div
        className="w-16 h-16 relative"
        animate={{ rotateY: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-lg"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg transform rotate-45 opacity-60"></div>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-white/70 text-sm font-medium"
      >
        Loading 3D Scene...
      </motion.p>
    </motion.div>
  </div>
);

export const LazySplineScene: React.FC<LazySplineSceneProps> = ({ 
  scene, 
  className = "", 
  fallbackClassName 
}) => {
  return (
    <Suspense fallback={<SplineFallback className={fallbackClassName || className} />}>
      <SplineScene scene={scene} className={className} />
    </Suspense>
  );
};

export default LazySplineScene;
