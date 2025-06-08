import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Code, Database, Brain, Cloud, Terminal, Lock, Github as Git, 
         Server, Globe, Shield, Cpu, Zap, Wifi, 
         Layers, Box, Command, Webhook } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export const iconMap: Record<string, React.ReactNode> = {
  react: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89-1.87-.84-1.87-1.89.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z"/>
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46.85 0 1.41-.52 1.41-1.4V9.47c0-.16-.13-.28-.28-.28H7.5c-.15 0-.28.12-.28.28v7.36c0 .4-.43.72-.43.72-.5 0-.87-.31-.87-.7V7.21c0-.28.15-.54.39-.68l7.44-4.3c.24-.14.52-.14.76 0l7.44 4.3c.24.14.39.4.39.68v9.58c0 .28-.15.54-.39.68l-7.44 4.3c-.24.14-.52.14-.76 0l-1.89-1.12c-.17-.1-.32-.04-.49.04-.18.08-.15.13-.15.13.1.06.21.16.26.18l1.85 1.08c.24.14.50.21.78.21s.54-.07.78-.21l7.44-4.3c.48-.28.78-.8.78-1.36V7.21c0-.56-.3-1.08-.78-1.36L12.78 2.05c-.23-.13-.51-.2-.78-.2z"/>
    </svg>
  ),
  brain: <Brain />,
  container: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M20 9V7c0-1.1-.9-2-2-2h-3l-2-2H9L7 5H4c-1.1 0-2 .9-2 2v2c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zM4 7h16v2H4V7z"/>
    </svg>
  ),
  database: <Database />,
  code: <Code />,
  server: <Server />,
  globe: <Globe />,
  shield: <Shield />,
  cpu: <Cpu />,
  zap: <Zap />,
  wifi: <Wifi />,
  layers: <Layers />,
  box: <Box />,
  command: <Command />,
  webhook: <Webhook />,
  git: <Git />,
  terminal: <Terminal />,
  lock: <Lock />,
  cloud: <Cloud />
};

export const SkillsSection = () => {
  const { skills } = useStore();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const autoScrollRef = useRef<number>();
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const autoScroll = () => {
      if (isAutoScrollPaused || isDragging) {
        autoScrollRef.current = requestAnimationFrame(autoScroll);
        return;
      }

      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      const step = 0.5;

      if (currentScroll >= maxScroll - 1) {
        setTimeout(() => {
          container.scrollLeft = 0;
        }, 100);
      } else {
        container.scrollLeft += step;
      }

      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };

    const timeoutId = setTimeout(() => {
      autoScrollRef.current = requestAnimationFrame(autoScroll);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, [isAutoScrollPaused, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoScrollPaused(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoScrollPaused(false), 1000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoScrollPaused(false), 1000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoScrollPaused(true);
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const x = e.touches[0].pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoScrollPaused(false), 1000);
  };

  return (
    <section 
      id="skills" 
      className="py-16 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.05)_0%,transparent_50%)]" />
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-4 tracking-tight"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
            Skills
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            Toolkit
          </span>
        </motion.h2>
        <p className="text-light/70 max-w-2xl mb-12 text-center mx-auto">
          My diverse technical skills and the tools I use to build cutting-edge solutions.
        </p>
      </motion.div>

      <div className="relative">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

        <div 
          ref={containerRef}
          className="flex gap-6 py-4 overflow-x-auto hide-scrollbar"
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Duplicate skills for infinite scroll effect */}
          {[...skills, ...skills].map((skill, index) => {
            const isHovered = hoveredSkill === skill.id;
            return (
              <motion.div
                key={`${skill.id}-${index}`}
                className={`relative rounded-2xl ${
                  isMobile ? 'w-40 h-48' : 'w-48 h-56'
                } flex-shrink-0 flex flex-col items-center justify-center gap-4 overflow-hidden bg-slate-900/50 backdrop-blur-sm border border-slate-800/50`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: index * 0.05 % 1 
                }}
                onHoverStart={() => {
                  setHoveredSkill(skill.id);
                  setIsAutoScrollPaused(true);
                }}
                onHoverEnd={() => {
                  setHoveredSkill(null);
                  setTimeout(() => setIsAutoScrollPaused(false), 100);
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.05,
                  transition: { 
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    duration: 0.2
                  }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* GlowingEffect Integration */}
                <GlowingEffect
                  variant="default"
                  disabled={!isHovered}
                  proximity={100}
                  spread={80}
                  blur={20}
                  glow={true}
                  movementDuration={0.8}
                  borderWidth={2}
                  className="opacity-75"
                />

                {/* Content container */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 p-6">
                  {/* Icon circle */}
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-slate-800/80 border border-slate-700/50"
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                      backgroundColor: isHovered ? "#1e293b" : "#1e293b80",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-white text-xl">
                      {iconMap[skill.icon.toLowerCase()] || <Code />}
                    </div>
                  </motion.div>
                  
                  {/* Text content */}
                  <div className="text-center">
                    <motion.div 
                      className="text-base font-semibold text-white block mb-1"
                      animate={{
                        color: isHovered ? "#ffffff" : "#e5e7eb",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {skill.name}
                    </motion.div>
                    <motion.span 
                      className="text-xs font-medium text-slate-400"
                      animate={{
                        color: isHovered ? "#a78bfa" : "#9ca3af"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {skill.category}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};