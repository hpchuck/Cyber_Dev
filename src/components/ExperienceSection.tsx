import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';
import useGSAPAnimations from '../hooks/useGSAPAnimations';
import { ExperienceGradientCard } from '@/components/ui/experience-gradient-card';

export const ExperienceSection = () => {
  const { experiences } = useStore();
  const { addToReveal, addToGlassCards } = useGSAPAnimations();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const defaultLogo = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80';

  // Initialize refs for GSAP animations when the component mounts
  useEffect(() => {
    // Add experience cards to glass cards for 3D effect
    experienceRefs.current.forEach(ref => {
      if (ref) addToGlassCards(ref);
    });
    
    // Add timeline for reveal animation
    if (timelineRef.current) {
      addToReveal(timelineRef.current);
    }
  }, [addToGlassCards, addToReveal]);

  return (
    <section 
      id="experience" 
      className="py-20 px-4 md:px-8 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.05)_0%,transparent_70%)]" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.h2 
          className="section-heading text-white text-center text-4xl font-bold mb-4"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-indigo-400">Experience</span>_Log
          <div className="mt-2 mx-auto w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        </motion.h2>

        <motion.p
          className="text-gray-300 max-w-2xl mb-16 text-center mx-auto"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          A chronological record of professional engagements and technological achievements.
        </motion.p>

        <div className="relative" ref={timelineRef}>
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-500/40 via-purple-500/40 to-pink-500/40" />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                ref={el => {
                  experienceRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 md:text-right">
                  <div className="relative">
                    {/* Timeline node */}
                    <motion.div 
                      className="absolute top-0 -left-3 md:hidden w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg shadow-indigo-500/20 z-10"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.div 
                      className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg shadow-indigo-500/20 z-10"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    
                    <ExperienceGradientCard 
                      className="p-6 glass-card backdrop-blur-md bg-black/30 border border-indigo-500/20 shadow-lg shadow-indigo-500/5"
                      delay={index * 0.1}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500/20 p-1">
                          <img 
                            src={exp.logo || defaultLogo} 
                            alt={exp.company}
                            className="w-full h-full rounded-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = defaultLogo;
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-indigo-400 mb-1">
                            {exp.company}
                          </h3>
                          <p className="text-white font-medium">{exp.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4 text-purple-400">
                        <Calendar className="w-4 h-4" />
                        <p>{exp.period}</p>
                      </div>
                      
                      <p className="text-gray-300 mb-6">{exp.description}</p>
                      
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start gap-3 group"
                            whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                          >
                            <Award className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5 group-hover:text-indigo-400 transition-colors duration-300" />
                            <span className="text-gray-400 group-hover:text-white transition-colors duration-300">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </ExperienceGradientCard>
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