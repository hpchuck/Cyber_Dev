import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, Code, Brain, Globe, Info } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ProjectsSection = () => {
  const { projects } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web' | 'mobile' | 'ai'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects', icon: Globe },
    { id: 'web', label: 'Web Apps', icon: Code },
    { id: 'mobile', label: 'Mobile Apps', icon: Star },
    { id: 'ai', label: 'AI/ML Projects', icon: Brain }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const defaultImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';

  const toggleCard = (projectId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="projects" className="py-20 px-4 md:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <h2 className="section-heading text-[#00FF41] mb-12">
          PROJECTS_SHOWCASE
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="w-full max-w-4xl flex flex-wrap justify-center gap-4 px-4 py-6 bg-black/80 backdrop-blur-lg rounded-2xl border border-[#00FF41]/20 shadow-lg shadow-[#00FF41]/10">
            {categories.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setSelectedCategory(id as any)}
                className={`group relative overflow-hidden rounded-xl transition-all flex items-center gap-3 px-6 py-3 ${
                  selectedCategory === id 
                    ? 'bg-gradient-to-r from-[#00FF41] to-[#00FFFF] text-black' 
                    : 'bg-black/30 border border-[#00FF41]/20 text-[#00FF41] hover:border-[#00FF41]/60'
                }`}
                whileHover={!isMobile ? { 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                } : {}}
                whileTap={!isMobile ? { scale: 0.95 } : {}}
              >
                <motion.div
                  className="absolute inset-0 bg-[#00FF41]/10"
                  initial={false}
                  animate={selectedCategory === id ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                  } : { opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <div className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${
                    selectedCategory === id ? 'animate-pulse' : ''
                  }`} />
                  <span className="relative whitespace-nowrap">
                    {label}
                    {selectedCategory === id && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black w-full"
                        layoutId="underline"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </span>
                </div>

                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(0,255,65,0.2) 0%, transparent 70%)'
                  }}
                />
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="relative h-[400px] perspective-1000 group"
              onMouseEnter={() => !isMobile && toggleCard(project.id)}
              onMouseLeave={() => !isMobile && toggleCard(project.id)}
              onClick={() => isMobile && toggleCard(project.id)}
            >
              <motion.div
                className="w-full h-full transition-all duration-500 [transform-style:preserve-3d] relative group-hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                animate={{ 
                  rotateY: flippedCards.has(project.id) ? 180 : 0,
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
              >
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                  <motion.div 
                    className="h-full rounded-lg border border-[#00FF41]/20 group-hover:border-[#00FF41]/40 transition-all duration-300 overflow-hidden bg-black/40 backdrop-blur-sm relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${project.image || defaultImage})`,
                        filter: 'brightness(0.7) contrast(1.2)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 backdrop-blur-[2px]" />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-3 relative"
                        initial={false}
                        animate={{ 
                          textShadow: flippedCards.has(project.id) ? 'none' : '0 0 10px rgba(0,255,65,0.5)'
                        }}
                      >
                        {project.title}
                      </motion.h3>
                      
                      <p className="text-gray-200 text-sm mb-3 line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.techStack?.slice(0, 3).map(tech => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-[#00FF41]/20 text-[#00FF41] font-mono border border-[#00FF41]/30 backdrop-blur-sm"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack?.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-[#00FF41]/20 text-[#00FF41] font-mono border border-[#00FF41]/30 backdrop-blur-sm">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      {isMobile && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#00FF41]/30"
                        >
                          <Info className="w-4 h-4 text-[#00FF41]" />
                          <span className="text-xs text-[#00FF41]">Tap to view details</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Back of card */}
                <div 
                  className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-black/90 border border-[#00FF41]/20 rounded-lg p-6 backdrop-blur-md"
                >
                  <div className="h-full flex flex-col">
                    <h3 className="text-xl font-bold gradient-text mb-3">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 overflow-y-auto scrollable-content pr-2 flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack?.map(tech => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-[#00FF41]/10 text-[#00FF41] font-mono border border-[#00FF41]/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-3">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 btn-glitch flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                          whileHover={!isMobile ? { scale: 1.02 } : {}}
                          whileTap={!isMobile ? { scale: 0.98 } : {}}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4 relative z-10" />
                          <span className="relative z-10 text-sm">Code</span>
                        </motion.a>
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 btn-glitch flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                          whileHover={!isMobile ? { scale: 1.02 } : {}}
                          whileTap={!isMobile ? { scale: 0.98 } : {}}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4 relative z-10" />
                          <span className="relative z-10 text-sm">Demo</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};