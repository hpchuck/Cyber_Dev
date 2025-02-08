import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, Database, Cpu, Cloud } from 'lucide-react';

export const LoadingScreen = ({ progress = 0 }: { progress: number }) => {
  const steps = [
    { text: 'INITIALIZING SYSTEM', icon: <Shield className="w-5 h-5 text-[#00FF41]" /> },
    { text: 'LOADING MODULES', icon: <Server className="w-5 h-5 text-[#00FF41]" /> },
    { text: 'ESTABLISHING CONNECTION', icon: <Database className="w-5 h-5 text-[#00FF41]" /> },
    { text: 'VERIFYING IDENTITY', icon: <Lock className="w-5 h-5 text-[#00FF41]" /> }
  ];

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center font-mono">
      <div className="absolute inset-0 grid-background opacity-20" />
      
      <div className="terminal-window w-96 z-10">
        <div className="terminal-header">
          <div className="flex gap-2">
            <div className="terminal-circle bg-red-500" />
            <div className="terminal-circle bg-yellow-500" />
            <div className="terminal-circle bg-green-500" />
          </div>
          <h2 className="terminal-text text-lg flex items-center gap-2">
            <Cpu className="w-5 h-5 animate-pulse" />
            SYSTEM BOOT
          </h2>
          <div className="w-4" />
        </div>
        
        <div className="p-8">
          <div className="mb-6">
            <div className="text-[#00FF41] font-mono text-lg mb-2 text-center flex items-center justify-center gap-2">
              <Cloud className="w-5 h-5 animate-bounce" />
              {Math.round(progress)}%
            </div>
            
            <div className="h-2 bg-black border border-[#00FF41] relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#00FF41]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.text}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: progress > (index * 25) ? 1 : 0.3,
                }}
                className="flex items-center gap-3"
              >
                <motion.div
                  animate={progress > (index * 25) ? {
                    opacity: [0.3, 1]
                  } : {}}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {step.icon}
                </motion.div>
                <span className="text-[#00FF41] font-mono text-sm flex-1">
                  {step.text}
                </span>
                <motion.div
                  animate={progress > (index * 25) ? {
                    opacity: [0.3, 1]
                  } : {}}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 bg-[#00FF41] rounded-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};