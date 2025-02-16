import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Server, Database, Cpu, Cloud, Volume2, VolumeX, Terminal } from 'lucide-react';
import { useStore } from '../store/useStore';

const steps = [
  { text: 'Initializing system...', icon: <Cpu className="w-4 h-4 text-[#00FF41]" /> },
  { text: 'Loading assets...', icon: <Server className="w-4 h-4 text-[#00FF41]" /> },
  { text: 'Establishing secure connection...', icon: <Lock className="w-4 h-4 text-[#00FF41]" /> },
  { text: 'System ready', icon: <Shield className="w-4 h-4 text-[#00FF41]" /> }
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
        className="fixed inset-0 bg-black z-50 flex items-center justify-center font-mono"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.8)_50%,transparent)]" />
        
        {/* Matrix-like rain effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 text-[#00FF41] text-xs"
              initial={{ y: -100 }}
              animate={{ y: '100vh' }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
              style={{ left: `${i * 10}%` }}
            >
              {Array.from({ length: 10 }).map((_, j) => (
                <div key={j} className="my-2">
                  {Math.random().toString(36).charAt(2)}
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
          <div className="terminal-window backdrop-blur-md bg-black/80 border border-[#00FF41]/30 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.2)]">
            {/* Terminal Header */}
            <div className="bg-black/90 px-4 py-2 flex items-center justify-between border-b border-[#00FF41]/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2 text-[#00FF41]">
                <Terminal className="w-4 h-4" />
                <span className="text-sm">SYSTEM_INITIALIZATION</span>
              </div>
              <div className="w-12" /> {/* Spacer for symmetry */}
            </div>

            {/* Terminal Content */}
            <div className="p-6 space-y-6">
              {/* Progress Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-[#00FF41]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Cloud className="w-5 h-5" />
                  </motion.div>
                  <span className="text-lg font-bold">{Math.round(progress)}%</span>
                </div>
                
                <div className="h-2 bg-black/50 rounded-full border border-[#00FF41]/30 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00FF41] via-[#00FFFF] to-[#00FF41]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Steps Section */}
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: progress > (index * 25) ? 1 : 0.3,
                      x: progress > (index * 25) ? 0 : -20
                    }}
                    className="flex items-center gap-3 bg-black/30 rounded-lg p-3 border border-[#00FF41]/10"
                  >
                    <motion.div
                      animate={progress > (index * 25) ? {
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
                    <span className="text-[#00FF41] text-sm flex-1">
                      {step.text}
                    </span>
                    {progress > (index * 25) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-[#00FF41] rounded-full"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Audio Prompt */}
              <AnimatePresence>
                {showAudioPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4 pt-4 border-t border-[#00FF41]/20"
                  >
                    <div className="text-center space-y-2">
                      <h3 className="text-[#00FF41] text-lg font-bold">Audio Experience</h3>
                      <p className="text-[#00FF41]/70 text-sm">
                        Enable immersive sound effects?
                      </p>
                      <p className="text-[#00FF41]/50 text-xs">
                        Auto-enabling in {skipTimer} seconds...
                      </p>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAudioChoice(true)}
                        className="flex items-center gap-2 px-6 py-2 bg-[#00FF41] text-black rounded-lg font-medium transition-colors hover:bg-[#00FF41]/90"
                      >
                        <Volume2 className="w-4 h-4" />
                        Enable
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAudioChoice(false)}
                        className="flex items-center gap-2 px-6 py-2 bg-black/50 text-[#00FF41] border border-[#00FF41]/30 rounded-lg font-medium transition-colors hover:bg-black/70"
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