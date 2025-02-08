import React from 'react';
import { motion } from 'framer-motion';

export const TransitionEffect = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ 
          scaleY: [0, 1, 1, 0],
          transformOrigin: ["0% 0%", "0% 0%", "0% 100%", "0% 100%"]
        }}
        transition={{ duration: 1.5, times: [0, 0.4, 0.6, 1] }}
        className="absolute inset-0 bg-gradient-to-b from-[#00FF41] via-[#00FFFF] to-[#FF1493] opacity-30"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8],
          y: [20, 0, -20]
        }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.3)_0%,transparent_70%)]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-[#00FF41] rounded-full"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              rgba(0, 255, 65, 0.1) 2px,
              transparent 4px
            )
          `,
          backgroundSize: '100% 4px',
          animation: 'scan 1.5s linear'
        }}
      />
    </div>
  );
};