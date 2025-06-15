import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SimpleRobot } from './simple-robot';
import { LazySplineScene } from '../lazy/LazySplineScene';
import { Play, Square } from 'lucide-react';

interface InteractiveRobotProps {
  className?: string;
}

export function InteractiveRobot({ className = "" }: InteractiveRobotProps) {
  const [robotMode, setRobotMode] = useState<'simple' | 'spline'>('simple');
  const [, setSplineLoaded] = useState(false); // Variable kept for future use
  const [showControls, setShowControls] = useState(false);

  // Auto-try Spline after 2 seconds, fallback to simple if it fails
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplineLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Robot Display */}
      <div className="w-full h-full relative">
        {robotMode === 'simple' ? (
          <SimpleRobot className="w-full h-full" />
        ) : (
          <div className="w-full h-full">
            <LazySplineScene 
              scene="https://prod.spline.design/6Iq1hzMCPlKMhS6o/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        )}
      </div>

      {/* Robot Mode Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 10 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2"
      >
        <button
          onClick={() => setRobotMode('simple')}
          className={`p-2 rounded-md transition-colors ${
            robotMode === 'simple' 
              ? 'bg-indigo-500 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          title="Simple Robot"
        >
          <Square size={16} />
        </button>
        
        <button
          onClick={() => setRobotMode('spline')}
          className={`p-2 rounded-md transition-colors ${
            robotMode === 'spline' 
              ? 'bg-indigo-500 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          title="3D Spline Robot"
        >
          <Play size={16} />
        </button>
        
        <span className="text-xs text-gray-400 ml-2">
          {robotMode === 'simple' ? 'CSS Robot' : '3D Robot'}
        </span>
      </motion.div>
    </div>
  );
}
