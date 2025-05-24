import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Code, Database, Brain, Cloud, Terminal, Lock, Repeat as ReactIcon, Github as Git, 
         Pocket as Docker, Code as Nodejs, Server, Globe, Shield, Cpu, Zap, Wifi, 
         Layers, Box, Command, Webhook } from 'lucide-react';
import useGSAPAnimations from '../hooks/useGSAPAnimations';

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
  const { addToStaggerItems, addToGlassCards } = useGSAPAnimations();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const autoScrollRef = useRef<number>();
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const skillCardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      const step = 0.5; // Slower, smoother scrolling

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
    Frontend: 'from-accent1 to-accent2',
    Backend: 'from-accent2 to-accent3',
    'AI/ML': 'from-accent3 to-accent1',
    DevOps: 'from-accent1 to-accent3',
    Database: 'from-accent2 to-accent1',
    Other: 'from-accent3 to-accent2'
  };

  // Initialize refs for GSAP animations when the component mounts
  useEffect(() => {
    // Add skill cards to glass cards for 3D effect
    skillCardRefs.current.forEach(ref => {
      if (ref) addToGlassCards(ref);
    });
    
    // Add section ref for staggered animations
    if (sectionRef.current) {
      const items = sectionRef.current.querySelectorAll('.skill-card');
      items.forEach(item => addToStaggerItems(item as HTMLElement));
    }
  }, [addToGlassCards, addToStaggerItems]);

  return (
    <section 
      id="skills" 
      className="py-16 px-4 md:px-8 relative overflow-hidden"
      ref={sectionRef}
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
        <h2 className="section-heading mb-4 text-center">
          Skills & Toolkit
        </h2>
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
          {[...skills, ...skills].map((skill, index) => (
            <motion.div
              key={`${skill.id}-${index}`}
              ref={el => {
                skillCardRefs.current[index] = el;
              }}
              className={`skill-card relative group p-6 rounded-lg glass-card card-3d-effect ${
                isMobile ? 'w-40 h-48' : 'w-48 h-56'
              } flex-shrink-0 flex flex-col items-center justify-center gap-4 overflow-hidden`}
              onHoverStart={() => setHoveredSkill(skill.id)}
              onHoverEnd={() => setHoveredSkill(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 % 1 }} // Modulo to not delay duplicates too much
            >
              <div 
                className={`text-white relative z-10 text-3xl mb-2 ${
                  hoveredSkill === skill.id ? 'animate-bounce' : ''
                }`}
              >
                <div className="bg-gradient-to-br from-accent1/80 to-accent2/80 p-3 rounded-full">
                  {iconMap[skill.icon.toLowerCase()] || <Code />}
                </div>
              </div>
              
              <div className="text-center">
                <span 
                  className="text-base font-mono text-white font-medium relative z-10 block"
                >
                  {skill.name}
                </span>
                <span className="text-xs text-light/60 mt-1 block">
                  {skill.category}
                </span>
              </div>

              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent1/10 via-transparent to-accent2/10"
                initial={{ x: '-100%' }}
                animate={hoveredSkill === skill.id ? { x: '100%' } : {}}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />

              {/* Background glow */}
              <motion.div
                className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                initial={{ opacity: 0 }}
                animate={hoveredSkill === skill.id ? { opacity: 0.2 } : { opacity: 0 }}
                style={{
                  background: `linear-gradient(45deg, var(--${categoryColors[skill.category]?.split('-')[1] || 'accent1'}), var(--${categoryColors[skill.category]?.split('-')[3] || 'accent2'}))`,
                  filter: 'blur(20px)',
                }}
              />

              {/* Gradient border */}
              <motion.div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 z-0"
                initial={{ opacity: 0 }}
                animate={hoveredSkill === skill.id ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 glass-gradient-border rounded-lg"></div>
              </motion.div>
            </motion.div>
          ))}
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