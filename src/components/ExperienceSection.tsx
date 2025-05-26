import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';
import useGSAPAnimations from '../hooks/useGSAPAnimations';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export const ExperienceSection = () => {
  const { experiences } = useStore();
  const { addToReveal, addToGlassCards } = useGSAPAnimations();
  const sectionRef = useRef<HTMLElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const defaultLogo = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80';

  // Initialize refs for GSAP animations when the component mounts
  useEffect(() => {
    // Add experience cards to glass cards for 3D effect
    experienceRefs.current.forEach(ref => {
      if (ref) addToGlassCards(ref);
    });
    
    // Add section for reveal animation
    if (sectionRef.current) {
      const title = sectionRef.current.querySelector('h2');
      if (title) addToReveal(title as HTMLElement);
    }
  }, [addToGlassCards, addToReveal]);

  return (
    <section 
      id="experience" 
      className="py-16 px-4 md:px-8 relative overflow-hidden"
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
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-center mb-4"
          style={{ 
            fontFamily: 'var(--font-primary)',
            background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 50%, #d1d5db 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(255,255,255,0.1)',
            opacity: 1,
            visibility: 'visible',
            display: 'block'
          }}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-indigo-400">Experience</span>_Log
          <div className="mt-2 mx-auto w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        </motion.h2>

        <motion.p
          className="text-gray-300 max-w-2xl mb-12 text-center mx-auto text-lg"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Professional journey and key achievements
        </motion.p>

        {/* Compact Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              ref={el => {
                experienceRefs.current[index] = el;
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative h-full rounded-xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.6) 100%)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <GlowingEffect
                  disabled={false}
                  proximity={120}
                  spread={25}
                  blur={1.5}
                  glow={true}
                  className="absolute inset-0 rounded-xl"
                  movementDuration={2}
                  borderWidth={1}
                />
                
                <div className="relative z-10 p-6">
                  {/* Company Logo and Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-indigo-500/30">
                      <img 
                        src={exp.logo || defaultLogo} 
                        alt={exp.company}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = defaultLogo;
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {exp.company}
                      </h3>
                      <p className="text-indigo-400 text-sm font-medium">{exp.role}</p>
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div className="flex items-center gap-2 mb-3 text-purple-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{exp.description}</p>
                  
                  {/* Key Achievements */}
                  <div className="space-y-2">
                    {exp.achievements.slice(0, 2).map((achievement, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-400 text-xs leading-relaxed">{achievement}</span>
                      </div>
                    ))}
                    {exp.achievements.length > 2 && (
                      <div className="text-center mt-2">
                        <span className="text-indigo-400 text-xs">+{exp.achievements.length - 2} more achievements</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};