import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, Code, Brain, Globe, Info } from 'lucide-react';
import { useStore } from '../store/useStore';
import useGSAPAnimations from '../hooks/useGSAPAnimations';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export const ProjectsSection = () => {
  const { projects } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web' | 'mobile' | 'ai'>('all');
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const { addToGlassCards } = useGSAPAnimations();
  
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Apply 3D hover effect to cards
    cardsRefs.current.forEach(card => {
      if (card) {
        addToGlassCards(card);
      }
    });
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [addToGlassCards]);

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
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 px-4 md:px-8 relative overflow-hidden bg-black"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <h2 className="section-heading mb-12 text-4xl md:text-5xl font-display font-bold text-center">
          Projects
        </h2>
        <p className="text-center text-light/70 max-w-3xl mx-auto mb-16 text-lg md:text-xl">
          Explore a curated selection of my work, showcasing innovative and effective solutions.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          <div className="w-full max-w-4xl flex flex-wrap justify-center gap-4 px-4 py-6 glass-card bg-black/40 backdrop-blur-lg border border-indigo-500/20 rounded-2xl relative">
            {/* Subtle glowing effect for filter container */}
            <GlowingEffect
              disabled={false}
              proximity={200}
              spread={40}
              blur={3}
              glow={true}
              className="absolute inset-0 rounded-2xl"
              movementDuration={2.5}
              borderWidth={1}
            />
            
            <div className="relative z-10 flex flex-wrap justify-center gap-4 w-full">
              {categories.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => setSelectedCategory(id as any)}
                  className={`group relative overflow-hidden rounded-xl transition-all flex items-center gap-3 px-6 py-3 ${
                    selectedCategory === id 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25' 
                      : 'glass-button bg-black/30 backdrop-blur-md hover:border-indigo-500/50 border border-white/10'
                  }`}
                  whileHover={!isMobile ? { 
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                    transition: { duration: 0.2 }
                  } : {}}
                  whileTap={!isMobile ? { scale: 0.95 } : {}}
                >
                <motion.div
                  className="absolute inset-0 bg-indigo-500/10"
                  initial={false}
                  animate={selectedCategory === id ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                  } : { opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <div className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${
                    selectedCategory === id ? 'text-white animate-pulse' : 'text-indigo-400'
                  }`} />
                  <span className="relative whitespace-nowrap">
                    {label}
                    {selectedCategory === id && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-white w-full"
                        layoutId="underline"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </span>
                </div>

                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(99,102,241,0.2) 0%, transparent 70%)'
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={el => {
                cardsRefs.current[index] = el;
              }}
              variants={itemVariants}
              className="relative h-[400px] perspective-1000 group"
              onMouseEnter={() => !isMobile && toggleCard(project.id)}
              onMouseLeave={() => !isMobile && toggleCard(project.id)}
              onClick={() => isMobile && toggleCard(project.id)}
            >
              <motion.div
                className="w-full h-full transition-all duration-500 [transform-style:preserve-3d] relative hover-3d hover:shadow-indigo"
                animate={{ 
                  rotateY: flippedCards.has(project.id) ? 180 : 0,
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
              >
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                  <motion.div 
                    className="h-full rounded-lg glass-card bg-black/30 backdrop-blur-md border border-indigo-500/20 overflow-hidden relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Glowing Effect */}
                    <GlowingEffect
                      disabled={false}
                      proximity={150}
                      spread={30}
                      blur={2}
                      glow={true}
                      className="absolute inset-0 rounded-lg"
                      movementDuration={1.5}
                      borderWidth={2}
                    />
                    
                    <div 
                      className="absolute inset-0 bg-cover bg-center z-10"
                      style={{ 
                        backgroundImage: `url(${project.image || defaultImage})`,
                        filter: 'brightness(0.4) contrast(1.2)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-[2px] z-20" />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-30">
                      <div className="mb-3 flex items-center gap-2">
                        {project.category === 'web' && <Code className="text-indigo-400 w-5 h-5" />}
                        {project.category === 'mobile' && <Star className="text-purple-400 w-5 h-5" />}
                        {project.category === 'ai' && <Brain className="text-pink-400 w-5 h-5" />}
                        <span className="text-sm font-mono text-gray-300 uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>
                      
                      <motion.h3 
                        className="text-2xl font-bold font-display text-white mb-3 relative"
                        initial={false}
                        animate={{ 
                          textShadow: flippedCards.has(project.id) ? 'none' : '0 0 10px rgba(99, 102, 241, 0.5)'
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
                            className="px-2 py-1 text-xs rounded-full glass-dark text-indigo-400 font-mono border border-indigo-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack?.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-full glass-dark text-purple-400 font-mono border border-purple-500/30">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      {isMobile && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute top-4 right-4 flex items-center gap-2 glass-dark px-3 py-1.5 rounded-full border border-indigo-500/30"
                        >
                          <Info className="w-4 h-4 text-indigo-400" />
                          <span className="text-xs text-indigo-400">Tap to view details</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Back of card */}
                <div 
                  className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] glass-frosted bg-black/50 backdrop-blur-lg border border-indigo-500/20 rounded-lg p-6 relative"
                >
                  {/* Glowing Effect for back side */}
                  <GlowingEffect
                    disabled={false}
                    proximity={150}
                    spread={25}
                    blur={1}
                    glow={true}
                    className="absolute inset-0 rounded-lg"
                    movementDuration={2}
                    borderWidth={1}
                  />
                  
                  <div className="h-full flex flex-col relative z-10">
                    <h3 className="text-xl font-bold text-indigo-400 mb-3">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 overflow-y-auto scrollable-content pr-2 flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack?.map(tech => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full glass-dark text-indigo-400 font-mono border border-indigo-500/20"
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
                          className="flex-1 glass-button bg-black/40 backdrop-blur-sm border border-indigo-500/20 flex items-center justify-center gap-2 py-2"
                          whileHover={!isMobile ? { scale: 1.02, boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)' } : {}}
                          whileTap={!isMobile ? { scale: 0.98 } : {}}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4 text-indigo-400" />
                          <span className="text-sm">Code</span>
                        </motion.a>
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 glass-button bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center gap-2 py-2"
                          whileHover={!isMobile ? { scale: 1.02, boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)' } : {}}
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
        
        {/* 3D Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-48 h-48 bg-indigo-600/10 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-3/4 left-1/2 w-36 h-36 bg-pink-600/10 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </motion.div>
      
      {/* Add subtle grid background */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      
      <style>
        {`
          .animate-blob {
            animation: blob 7s infinite alternate;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          
          @keyframes blob {
            0% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0, 0) scale(1); }
          }
          
          .bg-grid {
            background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 20px 20px;
          }
          
          .scrollable-content::-webkit-scrollbar {
            width: 4px;
          }
          
          .scrollable-content::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          
          .scrollable-content::-webkit-scrollbar-thumb {
            background: rgba(99, 102, 241, 0.5);
            border-radius: 10px;
          }
        `}
      </style>
    </section>
  );
};