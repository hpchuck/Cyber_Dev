import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Lazy load the SplashCursor component
const SplashCursor = lazy(() => import('../ui/splash-cursor').then(module => ({ 
  default: module.SplashCursor 
})));

interface LazySplashCursorProps {
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  COLOR_UPDATE_SPEED?: number;
  TRANSPARENT?: boolean;
}

// Fallback component while SplashCursor is loading
const SplashFallback = () => (
  <div className="absolute inset-0 pointer-events-none">
    {/* Subtle animated background as fallback */}
    <motion.div
      className="absolute inset-0 opacity-20"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 70%)'
      }}
      animate={{
        background: [
          'radial-gradient(circle at 30% 40%, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
          'radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
          'radial-gradient(circle at 30% 40%, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </div>
);

export const LazySplashCursor: React.FC<LazySplashCursorProps> = (props) => {
  return (
    <Suspense fallback={<SplashFallback />}>
      <SplashCursor {...props} />
    </Suspense>
  );
};

export default LazySplashCursor;
