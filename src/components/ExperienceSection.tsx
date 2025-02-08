import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ExperienceSection = () => {
  const { experiences } = useStore();
  const defaultLogo = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80';

  return (
    <section id="experience" className="min-h-screen py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-12 text-center">
          Experience_Log
        </h2>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#00FF41] via-[#00FFFF] to-[#FF1493] opacity-30" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 md:text-right">
                  <div className="relative">
                    <motion.div 
                      className="absolute top-0 -left-3 md:hidden w-6 h-6 bg-gradient-to-r from-[#00FF41] to-[#00FFFF] rounded-full"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-[#00FF41] to-[#00FFFF] rounded-full"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    
                    <motion.div 
                      className="backdrop-blur-md bg-black/30 border border-[#00FF41]/20 rounded-lg p-6 hover:border-[#00FF41]/40 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img 
                          src={exp.logo || defaultLogo} 
                          alt={exp.company}
                          className="w-12 h-12 rounded-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = defaultLogo;
                          }}
                        />
                        <div>
                          <motion.h3 
                            className="text-xl font-bold gradient-text"
                            whileHover={{ scale: 1.05 }}
                          >
                            {exp.company}
                          </motion.h3>
                          <p className="text-[#00FFFF]">{exp.role}</p>
                        </div>
                      </div>
                      
                      <p className="text-[#7FFF00] mb-2">{exp.period}</p>
                      <p className="text-gray-300 mb-4">{exp.description}</p>
                      
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start gap-2"
                            whileHover={{ x: 5 }}
                          >
                            <Award className="w-5 h-5 text-[#FF1493] flex-shrink-0 mt-1" />
                            <span className="text-gray-300">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};