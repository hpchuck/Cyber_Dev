import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Code, Database, Brain, Cloud, Terminal, Lock, Repeat as ReactIcon, Github as Git, 
         Pocket as Docker, Code as Nodejs, Server, Globe, Shield, Cpu, Zap, Wifi, 
         Layers, Box, Command, Webhook } from 'lucide-react';

export const iconMap: Record<string, React.ReactNode> = {
  react: <ReactIcon />,
  nodejs: <Nodejs />,
  brain: <Brain />,
  container: <Docker />,
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
      const step = 1; // Smoother scrolling with smaller step

      if (currentScroll >= maxScroll) {
        // Smooth loop back to start
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        container.scrollLeft += step;
      }

      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };

    autoScrollRef.current = requestAnimationFrame(autoScroll);

    return () => {
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

  const categoryColors: Record<string, string> = {
    Frontend: 'from-[#00FF41] to-[#00FFFF]',
    Backend: 'from-[#00FFFF] to-[#FF1493]',
    'AI/ML': 'from-[#FF1493] to-[#FFD700]',
    DevOps: 'from-[#FFD700] to-[#00FF41]',
    Database: 'from-[#00FF41] to-[#FF1493]',
    Other: 'from-[#00FFFF] to-[#FFD700]'
  };

  return (
    <section id="skills" className="py-12 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.05)_0%,transparent_70%)]" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <h2 className="section-heading text-[#00FF41] mb-8">
          SYSTEM_CAPABILITIES
        </h2>

        <div className="relative">
          {/* Gradient fade on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

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
            {[...skills, ...skills].map((skill, index) => (
              <motion.div
                key={`${skill.id}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onHoverStart={() => setHoveredSkill(skill.id)}
                onHoverEnd={() => setHoveredSkill(null)}
                className={`relative group p-6 rounded-lg backdrop-blur-md bg-black/40 border border-[#00FF41]/10 hover:border-[#00FF41]/30 transition-all duration-300 overflow-hidden flex flex-col items-center justify-center gap-4 ${
                  isMobile ? 'w-40' : 'w-48'
                } flex-shrink-0 ${
                  hoveredSkill === skill.id ? 'bg-[#00FF41]/10' : ''
                }`}
              >
                <motion.div 
                  className={`text-[#00FF41] relative z-10 text-3xl ${
                    hoveredSkill === skill.id ? 'animate-bounce' : ''
                  }`}
                >
                  {iconMap[skill.icon.toLowerCase()] || <Code />}
                </motion.div>
                
                <div className="text-center">
                  <motion.span 
                    className="text-base font-mono gradient-text group-hover:text-[#00FF41] transition-colors duration-300 relative z-10 block"
                    initial={false}
                    animate={hoveredSkill === skill.id ? {
                      scale: [1, 1.1, 1],
                    } : {}}
                  >
                    {skill.name}
                  </motion.span>
                  <span className="text-xs text-[#00FF41]/60 mt-1 block">
                    {skill.category}
                  </span>
                </div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00FF41]/10 via-transparent to-[#00FF41]/10"
                  initial={{ x: '-100%' }}
                  animate={hoveredSkill === skill.id ? { x: '100%' } : {}}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                />

                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  animate={hoveredSkill === skill.id ? { opacity: 1 } : { opacity: 0 }}
                  style={{
                    background: `linear-gradient(45deg, ${categoryColors[skill.category]?.split(' ')[1] || '#00FF41'}, ${categoryColors[skill.category]?.split(' ')[3] || '#00FFFF'})`,
                    filter: 'blur(20px)',
                    zIndex: -1
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

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