import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CyberLoadingScreenProps {
  onLoadingComplete: () => void;
}

const CyberLoadingScreen: React.FC<CyberLoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('Initializing');
  const [isComplete, setIsComplete] = useState(false);

  const loadingTexts = [
    'Initializing Systems',
    'Loading Components',
    'Preparing Interface',
    'Optimizing Experience',
    'Almost Ready',
    'Complete'
  ];

  useEffect(() => {
    let textIndex = 0;
    
    // Text cycling effect
    const textInterval = setInterval(() => {
      if (textIndex < loadingTexts.length - 1) {
        textIndex++;
        setCurrentText(loadingTexts[textIndex]);
      }
    }, 1000);

    // Progress simulation - slightly longer duration
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 8 + 5; // Slower, more realistic progress
        const newProgress = Math.min(100, prev + increment);
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setCurrentText('Complete');
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onLoadingComplete, 1000);
          }, 1200);
        }
        
        return newProgress;
      });
    }, 150);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onLoadingComplete]);

  // Floating geometric shapes exactly matching HeroSection's ElegantShape
  const FloatingShape = ({ 
    delay, 
    className, 
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]"
  }: { 
    delay: number; 
    className: string; 
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
  }) => (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r to-transparent ${gradient} backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]`}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-[#030303] flex items-center justify-center overflow-hidden"
        >
          {/* Background gradients exactly matching HeroSection */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
          
          {/* Floating shapes exactly matching HeroSection */}
          <FloatingShape 
            delay={0.3} 
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" 
            width={600} 
            height={140} 
            rotate={12}
            gradient="from-indigo-500/[0.15]" 
          />
          <FloatingShape 
            delay={0.5} 
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" 
            width={500} 
            height={120} 
            rotate={-15}
            gradient="from-rose-500/[0.15]" 
          />
          <FloatingShape 
            delay={0.4} 
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" 
            width={300} 
            height={80} 
            rotate={-8}
            gradient="from-violet-500/[0.15]" 
          />
          <FloatingShape 
            delay={0.6} 
            className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" 
            width={200} 
            height={60} 
            rotate={20}
            gradient="from-amber-500/[0.15]" 
          />
          <FloatingShape 
            delay={0.7} 
            className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" 
            width={150} 
            height={40} 
            rotate={-25}
            gradient="from-cyan-500/[0.15]" 
          />

          {/* Animated code snippets floating in background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              'const portfolio = await load();',
              'import { skills } from "./experience";',
              'export default CyberDev;',
              'render(<Portfolio />);'
            ].map((code, i) => (
              <motion.div
                key={i}
                className="absolute text-indigo-500/20 text-xs font-mono"
                style={{
                  left: `${15 + i * 20}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  maxWidth: '200px',
                }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  x: [0, 50, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.5,
                }}
              >
                {code}
              </motion.div>
            ))}
          </div>

          {/* Glowing particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${
                    i % 3 === 0 ? 'rgba(99,102,241,0.8)' : 
                    i % 3 === 1 ? 'rgba(139,92,246,0.8)' : 
                    'rgba(236,72,153,0.8)'
                  } 0%, transparent 70%)`,
                  boxShadow: `0 0 10px ${
                    i % 3 === 0 ? 'rgba(99,102,241,0.6)' : 
                    i % 3 === 1 ? 'rgba(139,92,246,0.6)' : 
                    'rgba(236,72,153,0.6)'
                  }`,
                  left: `${10 + i * 12}%`,
                  top: `${15 + (i % 4) * 20}%`,
                }}
                animate={{
                  x: [0, i % 2 === 0 ? 100 : -100, 0],
                  y: [0, i % 2 === 0 ? 50 : -50, 0],
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 12 + i * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              />
            ))}
          </div>

          {/* Main loading interface */}
          <div className="relative z-10 text-center max-w-md mx-auto px-8">
            
            {/* Brand/Logo matching HeroSection badge style */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
                <div className="h-2 w-2 rounded-full bg-rose-500/80" />
                <span className="text-sm text-white/60 tracking-wide">
                  Cyber Dev
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white/90 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                  Loading
                </span>
                {' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                  Portfolio
                </span>
              </h1>
            </motion.div>

            {/* Loading text with enhanced animations */}
            <motion.div
              key={currentText}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8"
            >
              <h2 className="text-xl text-white/80 mb-3 font-medium">
                {currentText}
              </h2>
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-white/60 rounded-full"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Enhanced progress bar */}
            <div className="w-full max-w-xs mx-auto">
              <div className="flex justify-between text-xs text-white/50 mb-3">
                <span>Loading</span>
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
              
              <div className="relative">
                {/* Background bar with subtle glow */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                
                {/* Progress fill with enhanced effects */}
                <motion.div
                  className="absolute top-0 left-0 h-1 rounded-full overflow-hidden"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
                    {/* Enhanced shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-sm opacity-50" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-12 text-xs text-white/40"
            >
              Crafting exceptional digital experiences...
            </motion.div>
          </div>

          {/* Enhanced corner decorative elements */}
          <motion.div 
            className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-white/10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-white/10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div 
            className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-white/10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div 
            className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-white/10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CyberLoadingScreen;
