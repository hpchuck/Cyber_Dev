import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MinimalLoadingProps {
  onLoadingComplete: () => void;
}

const MinimalLoading: React.FC<MinimalLoadingProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        // Slow down progress as it approaches 100%
        const increment = Math.max(1, 10 * (1 - prev / 100));
        const newProgress = Math.min(100, prev + increment);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onLoadingComplete, 800); // Wait for exit animation
          }, 500);
        }
        
        return newProgress;
      });
    }, 100);
    
    // Safety timeout - ensure loading completes even if something goes wrong
    const safetyTimeout = setTimeout(() => {
      setProgress(100);
      setIsComplete(true);
      onLoadingComplete();
    }, 8000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, [onLoadingComplete]);
  
  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="max-w-md w-full px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="text-indigo-400">Cyber</span>Dev
              </h1>
              <p className="text-gray-400 text-lg">Full Stack Developer & ML Engineer</p>
            </motion.div>
            
            <div className="w-full h-0.5 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            
            <motion.div 
              className="mt-4 text-gray-500 text-sm flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span>Loading experience</span>
              <span>{Math.round(progress)}%</span>
            </motion.div>
          </div>
          
          {/* Abstract shapes floating in background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 40 - 20],
                  y: [0, Math.random() * 40 - 20],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 5 + Math.random() * 5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MinimalLoading;
