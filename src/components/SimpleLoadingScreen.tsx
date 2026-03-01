import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2 } from 'lucide-react';

interface SimpleLoadingScreenProps {
  progress: number;
  onComplete?: () => void;
}

export const SimpleLoadingScreen: React.FC<SimpleLoadingScreenProps> = ({ 
  progress, 
  onComplete 
}) => {
  const [isComplete, setIsComplete] = useState(false);

  // Auto-complete after progress is 100%
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        if (onComplete) onComplete();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  // Force exit after 8 seconds regardless of progress
  useEffect(() => {
    const forceTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 8000);
    
    return () => clearTimeout(forceTimer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="text-indigo-400">Cyber</span>
            <span className="text-purple-400">Dev</span>
          </h1>
          <p className="text-gray-300 text-lg">Portfolio loading</p>
        </motion.div>
        
        {/* Progress bar */}
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        
        {/* Loading status */}
        <div className="flex items-center justify-center space-x-2 text-white">
          {isComplete ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span>Ready! Launching now...</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <Cpu className="w-5 h-5 text-indigo-400 animate-pulse" />
              <span className="relative">
                Loading
                <span className="loading-dots"></span>
              </span>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Loading dots CSS */}
      <style>
        {`
        @keyframes dots {
          0%, 20% {
            content: '.';
          }
          40% {
            content: '..';
          }
          60%, 100% {
            content: '...';
          }
        }
        
        .loading-dots::after {
          content: '';
          animation: dots 1.5s infinite;
        }
        
        .bg-grid {
          background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        `}
      </style>
    </div>
  );
};
