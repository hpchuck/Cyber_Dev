import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Brain, Code, Server, Shield, Zap } from 'lucide-react';

interface HeroSectionProps {
  isAudioEnabled: boolean;
}

const TypewriterText = ({ text, delay = 100, className = '' }: { text: string; delay?: number; className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    setIsComplete(false);

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <span className={`typewriter ${className} ${isComplete ? 'completed' : ''}`}>
      {displayText}
    </span>
  );
};

const GlitchText = ({ text, className = '' }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const originalText = useRef(text);
  
  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    let intervalId: NodeJS.Timeout;
    
    const glitch = () => {
      const shouldGlitch = Math.random() < 0.3;
      
      if (shouldGlitch) {
        const textArray = originalText.current.split('');
        const randomIndex = Math.floor(Math.random() * textArray.length);
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        textArray[randomIndex] = randomChar;
        setDisplayText(textArray.join(''));
        
        // Reset back to original text after a short delay
        setTimeout(() => {
          setDisplayText(originalText.current);
        }, 100);
      }
    };
    
    intervalId = setInterval(glitch, 150);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <span className={`glitch-text ${className}`} data-text={displayText}>
      {displayText}
    </span>
  );
};

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);
    const glitchChance = 0.03;
    const glitchDrops = new Set<number>();

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const isGlitch = Math.random() < glitchChance;
        if (isGlitch) glitchDrops.add(i);
        if (!isGlitch && glitchDrops.has(i)) glitchDrops.delete(i);

        const text = chars[Math.floor(Math.random() * chars.length)];
        
        if (glitchDrops.has(i)) {
          // Glitch effect
          ctx.fillStyle = '#FF1493';
          ctx.fillText(text, i * fontSize, (drops[i] * fontSize) + 2);
          ctx.fillStyle = '#00FFFF';
          ctx.fillText(text, i * fontSize - 2, (drops[i] * fontSize));
        } else {
          ctx.fillStyle = '#00FF41';
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

const CyberRain = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const drops: HTMLDivElement[] = [];
    const numDrops = 50;
    
    for (let i = 0; i < numDrops; i++) {
      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${Math.random() * 1 + 1}s`;
      drop.style.animationDelay = `${Math.random() * 2}s`;
      drops.push(drop);
      container.appendChild(drop);
    }
    
    return () => {
      drops.forEach(drop => drop.remove());
    };
  }, []);
  
  return <div ref={containerRef} className="cyber-rain" />;
};

export const HeroSection: React.FC<HeroSectionProps> = ({ isAudioEnabled }) => {
  const [activeRole, setActiveRole] = useState(0);
  const roles = [
    "Full Stack Developer",
    "ML Engineer",
    "Software Architect"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buttonVariants: { [key: string]: any } = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    },
    tap: { scale: 0.95 }
  };

  const titleVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: [1, 0.8, 1],
      x: [0, 2, -2, 0],
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "linear"
      }
    }
  };

  return (
    <motion.section 
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MatrixRain />
      <CyberRain />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.1)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center relative z-10 px-4"
      >
        <motion.h1 
          className="text-4xl md:text-8xl font-bold font-mono mb-8 tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            variants={titleVariants}
            initial="initial"
            animate="animate"
            className="inline-block"
          >
            <GlitchText 
              text="CYBER_"
              className="gradient-animate inline-block mr-2"
            />
            <GlitchText 
              text="DEV"
              className="gradient-animate inline-block"
            />
          </motion.div>
        </motion.h1>

        <div className="h-12 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl font-mono"
            >
              <TypewriterText 
                text={roles[activeRole]}
                className="gradient-animate"
                delay={50}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-lg md:text-xl font-mono mb-12"
        >
          <TypewriterText 
            text="Building the future with code and AI"
            className="gradient-animate"
            delay={30}
          />
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="btn-glitch px-8 py-3 bg-gradient-to-r from-[#00FF41]/10 via-[#00FFFF]/10 to-[#FF1493]/10 backdrop-blur-sm border border-[#00FF41]/30 rounded-lg font-mono text-[#00FF41] relative overflow-hidden group"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            <span className="relative z-10">View Projects</span>
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('contact')}
            className="btn-glitch px-8 py-3 bg-gradient-to-r from-[#00FF41] via-[#00FFFF] to-[#FF1493] rounded-lg font-mono text-black relative overflow-hidden group"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            <span className="relative z-10">Connect</span>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-[#00FF41]/60"
      >
        <div className="w-6 h-6 border-2 border-[#00FF41]/60 rounded-full flex items-center justify-center">
          ▼
        </div>
      </motion.div>
    </motion.section>
  );
};