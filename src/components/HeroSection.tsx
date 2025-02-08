import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Brain, Code, Server, Shield, Zap } from 'lucide-react';

const AMBIENT_SOUND_URL = 'https://freesound.org/data/previews/412/412014_5121236-lq.mp3';

const glitchVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    textShadow: [
      "0 0 0px rgba(255,20,147,0)",
      "2px 2px 10px rgba(255,20,147,0.5)",
      "-2px -2px 10px rgba(0,255,255,0.5)",
      "0 0 0px rgba(255,20,147,0)"
    ],
    transition: {
      duration: 0.3
    }
  }
};

const CyberRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

const TypeWriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span className="font-mono">
      {displayText}
      <span className="animate-pulse">_</span>
    </span>
  );
};

const HackerText = ({ text }: { text: string }) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+';
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number>();

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        prev
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1/3;
    }, 30) as unknown as number;
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <motion.span
      onHoverStart={scramble}
      onHoverEnd={() => setDisplayText(text)}
      className="inline-block"
    >
      {displayText}
    </motion.span>
  );
};

const FloatingIcon = ({ icon: Icon, delay, duration, x, y }: any) => (
  <motion.div
    initial={{ x: 0, y: 0 }}
    animate={{
      x: [0, x, 0],
      y: [0, y, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute text-[#00FF41] opacity-20"
    style={{
      left: `${50 + x/2}%`,
      top: `${50 + y/2}%`,
      transform: 'translate(-50%, -50%)'
    }}
  >
    <Icon size={24} />
  </motion.div>
);

interface HeroSectionProps {
  isAudioEnabled: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isAudioEnabled }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const roles = ["Full Stack Developer", "ML Engineer", "Software Architect"];
  const text = "Building the future with code and AI";

  useEffect(() => {
    const sound = new Audio(AMBIENT_SOUND_URL);
    sound.loop = true;
    sound.volume = 0.3;

    if (isAudioEnabled) {
      sound.play().catch(console.error);
    }

    return () => {
      sound.pause();
      sound.src = '';
    };
  }, [isAudioEnabled]);

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }),
    hover: {
      scale: 1.05,
      textShadow: "0 0 8px rgba(0,255,65,0.8)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      style={{ y, opacity }}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <CyberRain />
      <div className="absolute inset-0 overflow-hidden">
        <FloatingIcon icon={Terminal} delay={0} duration={4} x={50} y={-30} />
        <FloatingIcon icon={Brain} delay={1} duration={5} x={-40} y={40} />
        <FloatingIcon icon={Code} delay={2} duration={6} x={30} y={50} />
        <FloatingIcon icon={Server} delay={3} duration={4} x={-50} y={-40} />
        <FloatingIcon icon={Shield} delay={4} duration={5} x={40} y={-50} />
        <FloatingIcon icon={Zap} delay={5} duration={6} x={-30} y={30} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <motion.div 
          className="mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold font-mono mb-4 tracking-tighter"
            variants={glitchVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <motion.span 
              className="gradient-text inline-block relative"
              whileHover={{
                textShadow: [
                  "0 0 20px rgba(0,255,65,0.5)",
                  "2px 2px 10px rgba(255,20,147,0.5)",
                  "-2px -2px 10px rgba(0,255,255,0.5)",
                  "0 0 20px rgba(0,255,65,0.5)"
                ],
                scale: 1.1
              }}
              transition={{ duration: 0.3 }}
            >
              CYBER_
            </motion.span>
            <motion.span 
              className="text-[#00FF41] inline-block"
              whileHover={{
                scale: 1.1,
                textShadow: "0 0 20px rgba(0,255,65,0.8)",
                transition: { duration: 0.3 }
              }}
            >
              DEV
            </motion.span>
          </motion.h1>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {roles.map((role, index) => (
              <motion.span
                key={role}
                custom={index}
                variants={textVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="text-xl md:text-2xl font-mono gradient-text"
              >
                {index > 0 ? ' | ' : ''}
                <HackerText text={role} />
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={textVariants}
          custom={roles.length}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="text-lg md:text-xl font-mono gradient-text mb-12 tracking-wider"
        >
          <TypeWriter text="Building the future with code and AI" delay={70} />
        </motion.p>

        <motion.div 
          className="flex justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="#projects"
            whileHover={{ 
              scale: 1.05,
              textShadow: [
                "0 0 0px rgba(255,20,147,0)",
                "2px 2px 10px rgba(255,20,147,0.5)",
                "-2px -2px 10px rgba(0,255,255,0.5)",
                "0 0 0px rgba(255,20,147,0)"
              ]
            }}
            whileTap={{ scale: 0.95 }}
            className="btn-glitch px-8 py-3 bg-black/30 backdrop-blur-sm border border-[#00FF41]/30 rounded-lg font-mono text-[#00FF41] hover:bg-[#00FF41]/10 transition-all duration-300"
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ 
              scale: 1.05,
              textShadow: [
                "0 0 0px rgba(0,0,0,0)",
                "2px 2px 10px rgba(0,0,0,0.5)",
                "-2px -2px 10px rgba(0,0,0,0.5)",
                "0 0 0px rgba(0,0,0,0)"
              ]
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#00FF41] rounded-lg font-mono text-black hover:bg-[#00FF41]/90 transition-all duration-300"
          >
            Connect
          </motion.a>
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