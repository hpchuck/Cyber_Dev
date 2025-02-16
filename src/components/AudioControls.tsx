import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useStore } from '../store/useStore';

export const AudioControls = () => {
  const { isAudioEnabled, volume, audioFiles, setAudioEnabled, setVolume } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const soundEffectRef = useRef<HTMLAudioElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileControls, setShowMobileControls] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Initialize audio elements
    audioRef.current = new Audio(audioFiles.intro);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    soundEffectRef.current = new Audio(audioFiles.soundToggle);
    soundEffectRef.current.volume = volume;

    // Add interaction listener
    const handleInteraction = () => {
      setHasInteracted(true);
      if (isAudioEnabled && audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
      // Remove listener after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (soundEffectRef.current) {
        soundEffectRef.current = null;
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (!hasInteracted) return;

    if (audioRef.current) {
      if (isAudioEnabled) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isAudioEnabled, hasInteracted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    if (soundEffectRef.current) {
      soundEffectRef.current.volume = volume;
    }
  }, [volume]);

  const handleToggleAudio = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    if (soundEffectRef.current) {
      soundEffectRef.current.currentTime = 0;
      soundEffectRef.current.play().catch(() => {});
    }
    setAudioEnabled(!isAudioEnabled);
  };

  // Mobile version
  if (isMobile) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          onClick={() => setShowMobileControls(true)}
          className="w-12 h-12 rounded-full bg-black/80 border border-[#00FF41]/30 backdrop-blur-lg flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
        >
          {isAudioEnabled ? (
            <Volume2 className="w-6 h-6 text-[#00FF41]" />
          ) : (
            <VolumeX className="w-6 h-6 text-gray-400" />
          )}
        </motion.button>

        <AnimatePresence>
          {showMobileControls && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-sm bg-black/90 border border-[#00FF41]/30 rounded-lg p-6 space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-[#00FF41] text-lg font-bold">Audio Settings</h3>
                  <p className="text-[#00FF41]/70 text-sm">
                    Control sound effects and volume
                  </p>
                </div>

                <div className="space-y-6">
                  <button
                    onClick={handleToggleAudio}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded-lg"
                  >
                    {isAudioEnabled ? (
                      <>
                        <Volume2 className="w-5 h-5 text-[#00FF41]" />
                        <span className="text-[#00FF41]">Sound Enabled</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-400">Sound Disabled</span>
                      </>
                    )}
                  </button>

                  {isAudioEnabled && (
                    <div className="space-y-2">
                      <label className="text-[#00FF41] text-sm flex items-center gap-2">
                        <Music className="w-4 h-4" />
                        Volume
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-full accent-[#00FF41]"
                      />
                      <div className="text-right text-[#00FF41] text-xs">
                        {Math.round(volume * 100)}%
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowMobileControls(false)}
                  className="w-full px-4 py-3 bg-black/50 border border-[#00FF41]/30 rounded-lg text-[#00FF41]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop version
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-4 right-4 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative flex items-center gap-4"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
      >
        {/* Audio Visualizer */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="absolute -left-24 flex items-center gap-1"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-0.5 h-4 bg-[#00FF41] rounded-full"
                  animate={{
                    height: [4, 16, 4],
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Control Button */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.button
            onClick={handleToggleAudio}
            className="relative w-12 h-12 rounded-full bg-black/80 border border-[#00FF41]/30 backdrop-blur-lg flex items-center justify-center overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-[#00FF41]/10 transform origin-left"
              initial={false}
              animate={{
                scale: isAudioEnabled ? [1, 1.2, 1] : 1,
                opacity: isAudioEnabled ? [0.5, 0.8, 0.5] : 0.2
              }}
              transition={{
                duration: 2,
                repeat: isAudioEnabled ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={isAudioEnabled ? 'on' : 'off'}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {isAudioEnabled ? (
                  <Volume2 className="w-6 h-6 text-[#00FF41]" />
                ) : (
                  <VolumeX className="w-6 h-6 text-gray-400" />
                )}
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#00FF41]/30"
              animate={isAudioEnabled ? {
                scale: [1, 1.2, 1],
                opacity: [1, 0, 1]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.button>
        </motion.div>

        {/* Volume Slider */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute right-16 bg-black/80 backdrop-blur-lg border border-[#00FF41]/30 rounded-full py-2 px-4 flex items-center gap-3"
            >
              <Music className="w-4 h-4 text-[#00FF41]" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 accent-[#00FF41]"
                style={{
                  background: `linear-gradient(to right, #00FF41 0%, #00FF41 ${volume * 100}%, #1a1a1a ${volume * 100}%, #1a1a1a 100%)`
                }}
              />
              <span className="text-[#00FF41] text-xs font-mono min-w-[2.5rem]">
                {Math.round(volume * 100)}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};