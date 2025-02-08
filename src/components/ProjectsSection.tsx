import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, Code, Brain, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ProjectsSection = () => {
  const { projects } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web' | 'mobile' | 'ai'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
          {categories.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              onClick={() => setSelectedCategory(id as any)}
              className={`group px-6 py-3 rounded-lg transition-all flex items-center gap-2 relative overflow-hidden ${
                selectedCategory === id 
                  ? 'bg-[#00FF41] text-black' 
                  : 'bg-black/30 border border-[#00FF41]/20 text-[#00FF41] hover:border-[#00FF41]/60'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
              <span className="relative z-10">{label}</span>
              <div className="absolute inset-0 bg-[#00FF41]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[400px] perspective-1000"
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <motion.div
                  className="w-full h-full transition-all duration-500 [transform-style:preserve-3d] relative"
                  animate={{
                    rotateY: hoveredId === project.id ? 180 : 0
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {/* Front of card */}
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    <div className="relative h-full overflow-hidden rounded-lg border border-[#00FF41]/20 group-hover:border-[#00FF41]/40 transition-colors duration-300">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ 
                          backgroundImage: `url(${project.image || defaultImage})`,
                          filter: 'brightness(0.7) contrast(1.2)'
                        }}
                      />
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {project.title}
                        </h3>
                        
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
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-black/90 border border-[#00FF41]/20 rounded-lg p-6">
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
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Github className="w-4 h-4 relative z-10" />
                            <span className="relative z-10 text-sm">Code</span>
                            <div className="absolute inset-0 bg-[#00FF41]/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                          </motion.a>
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-glitch flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <ExternalLink className="w-4 h-4 relative z-10" />
                            <span className="relative z-10 text-sm">Demo</span>
                            <div className="absolute inset-0 bg-[#00FF41]/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};