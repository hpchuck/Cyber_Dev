import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Cpu, Volume2, VolumeX, Terminal, DownloadCloud, Loader, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';

const steps = [
  { text: 'Initializing system...', icon: <Cpu className="w-4 h-4" /> },
  { text: 'Loading assets...', icon: <DownloadCloud className="w-4 h-4" /> },
  { text: 'Establishing secure connection...', icon: <Lock className="w-4 h-4" /> },
  { text: 'System ready', icon: <CheckCircle2 className="w-4 h-4" /> }
];

interface LoadingScreenProps {
  progress: number;
  onComplete?: () => void;
}

export const LoadingScreen = ({ progress = 0, onComplete }: LoadingScreenProps) => {
  const { setAudioEnabled } = useStore();
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasUserChoice, setHasUserChoice] = useState(false);
  const [skipTimer, setSkipTimer] = useState(5);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsComplete(true);
        setShowAudioPrompt(true);
      }, 500);
    }
  }, [progress]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAudioPrompt && skipTimer > 0) {
      timer = setInterval(() => {
        setSkipTimer((prev) => prev - 1);
      }, 1000);
    } else if (skipTimer === 0 && !hasUserChoice) {
      handleAudioChoice(true); // Auto-enable audio when timer reaches 0
    }
    return () => clearInterval(timer);
  }, [showAudioPrompt, skipTimer, hasUserChoice]);

  const handleAudioChoice = (enabled: boolean) => {
    setAudioEnabled(enabled);
    setShowAudioPrompt(false);
    setHasUserChoice(true);
    setTimeout(() => {
      onComplete?.();
    }, 300);
  };

  if (!isComplete || (isComplete && !hasUserChoice)) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-primary z-50 flex items-center justify-center font-mono"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.05)_0%,transparent_70%)]" />
        
        {/* Particle effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-accent1 text-opacity-30 text-xs"
              initial={{ 
                y: -20,
                x: Math.random() * window.innerWidth,
                opacity: 0 
              }}
              animate={{ 
                y: window.innerHeight + 20,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2,
                opacity: {
                  duration: 3 + Math.random() * 5,
                  times: [0, 0.1, 1]
                }
              }}
            >
              {Array.from({ length: 1 }).map((_, j) => (
                <div key={j} className="text-base md:text-xl opacity-30">
                  {["0", "1", "+", "-", "*", "/", "&", "|", "<", ">"][Math.floor(Math.random() * 10)]}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Main Terminal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-lg mx-4"
        >
          <div className="glass-card rounded-lg overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            {/* Terminal Header */}
            <div className="bg-secondary/90 px-4 py-2 flex items-center justify-between border-b border-accent1/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2 text-accent1">
                <Terminal className="w-4 h-4" />
                <span className="text-sm">SYSTEM_INITIALIZATION</span>
              </div>
              <div className="w-12" /> {/* Spacer for symmetry */}
            </div>

            {/* Terminal Content */}
            <div className="p-6 space-y-6">
              {/* Progress Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-accent2"
                  >
                    <Loader className="w-5 h-5" />
                  </motion.div>
                  <span className="text-lg font-bold gradient-text">{Math.round(progress)}%</span>
                </div>
                
                <div className="h-2 bg-tertiary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent1 via-accent2 to-accent3 background-animate"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Steps Section */}
              <div className="space-y-3">
                {steps.map((step, index) => {
                  const isActive = progress > (index * 25);
                  return (
                    <motion.div
                      key={step.text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0.3,
                        x: isActive ? 0 : -20
                      }}
                      className={`flex items-center gap-3 ${isActive ? 'glass-card' : 'bg-tertiary/30'} rounded-lg p-3`}
                    >
                      <motion.div
                        className={isActive ? 'text-accent2' : 'text-light/30'}
                        animate={isActive ? {
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {step.icon}
                      </motion.div>
                      <span className={`${isActive ? 'text-light' : 'text-light/30'} text-sm flex-1`}>
                        {step.text}
                      </span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-accent1 rounded-full"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Audio Prompt */}
              <AnimatePresence>
                {showAudioPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4 pt-4 border-t border-accent1/20"
                  >
                    <div className="text-center space-y-2">
                      <h3 className="text-accent1 text-lg font-bold">Audio Experience</h3>
                      <p className="text-light/70 text-sm">
                        Enable immersive sound effects?
                      </p>
                      <p className="text-light/50 text-xs">
                        Auto-enabling in {skipTimer} seconds...
                      </p>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAudioChoice(true)}
                        className="glass-button flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-accent1 to-accent2 text-light rounded-lg font-medium"
                      >
                        <Volume2 className="w-4 h-4" />
                        Enable
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAudioChoice(false)}
                        className="flex items-center gap-2 px-6 py-2 bg-tertiary text-light border border-accent1/30 rounded-lg font-medium transition-colors hover:bg-tertiary/70"
                      >
                        <VolumeX className="w-4 h-4" />
                        Skip
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return null;
};