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
  const dragStartRef = useRef<{ x: number; scrollLeft: number } | null>(null);
  const animationFrameRef = useRef<number>();
  const scrollSpeedRef = useRef(1);
  const directionRef = useRef(1);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto scroll effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastTimestamp = 0;
    const animate = (timestamp: number) => {
      if (!container || isDragging) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Calculate delta time for smooth animation
      const deltaTime = lastTimestamp ? (timestamp - lastTimestamp) / 16 : 1;
      lastTimestamp = timestamp;

      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft += scrollSpeedRef.current * directionRef.current * deltaTime;

      // Smooth direction reversal at boundaries
      if (container.scrollLeft >= maxScroll - 1) {
        directionRef.current = -1;
      } else if (container.scrollLeft <= 1) {
        directionRef.current = 1;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.pageX - containerRef.current.offsetLeft,
      scrollLeft: containerRef.current.scrollLeft
    };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current || !dragStartRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - dragStartRef.current.x) * 2;
    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.touches[0].pageX - containerRef.current.offsetLeft,
      scrollLeft: containerRef.current.scrollLeft
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current || !dragStartRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - dragStartRef.current.x) * 2;
    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    dragStartRef.current = null;
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
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          <div 
            ref={containerRef}
            className="flex gap-6 py-4 overflow-x-auto scrollbar-hide select-none"
            style={{ 
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none'
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.id}
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
                  className="absolute inset-0 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={hoveredSkill === skill.id ? { opacity: 1 } : { opacity: 0 }}
                  style={{
                    background: `linear-gradient(45deg, ${categoryColors[skill.category]?.split(' ')[1] || '#00FF41'}, ${categoryColors[skill.category]?.split(' ')[3] || '#00FFFF'})`,
                    filter: 'blur(8px)',
                    zIndex: -1
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};