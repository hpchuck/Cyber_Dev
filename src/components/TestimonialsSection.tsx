import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import useGSAPAnimations from '../hooks/useGSAPAnimations';

export const TestimonialsSection = () => {
  const { testimonials } = useStore();
  const { addToGlassCards, addToReveal } = useGSAPAnimations();
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const approvedTestimonials = testimonials.filter(t => t.approved);

  if (approvedTestimonials.length === 0) {
    return null;
  }

  const gridCols = approvedTestimonials.length === 1 ? 'md:grid-cols-1' : 
                  approvedTestimonials.length === 2 ? 'md:grid-cols-2' :
                  'md:grid-cols-3';

  // Initialize refs for GSAP animations when the component mounts
  useEffect(() => {
    // Add testimonial cards to glass cards for 3D effect
    testimonialRefs.current.forEach(ref => {
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
      id="testimonials" 
      className="py-20 px-4 md:px-8 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.05)_0%,transparent_70%)]" />
      
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
          viewport={{ once: true, amount: 0.3 }}
        >
          Client Testimonials
        </motion.h2>

        <motion.p
          className="text-gray-300 max-w-2xl mb-16 text-center mx-auto text-lg md:text-xl font-medium"
          style={{ fontFamily: 'var(--font-primary)' }}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Hear from satisfied clients about their experience working with me.
        </motion.p>

        <div className={`grid grid-cols-1 ${gridCols} gap-8 max-w-6xl mx-auto`}>
          {approvedTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              ref={el => {
                testimonialRefs.current[index] = el;
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card card-3d-effect p-6 relative overflow-hidden"
              >
                <div className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-accent1/20 to-accent3/20 backdrop-blur-md">
                  <MessageCircle className="w-5 h-5 text-accent2" />
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=111&color=ddd`}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full border-2 border-accent1/30 p-0.5"
                    />
                    <motion.div
                      className="absolute inset-0 border-2 border-accent1/30 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-accent1 transition-colors duration-300">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">
                      {testimonial.role} @ {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-indigo-400'
                          : 'text-gray-600'
                      }`}
                      fill={i < testimonial.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>

                <blockquote className="relative z-10 pl-5 border-l-2 border-indigo-400/30">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-indigo-400/30 transform -scale-x-100" />
                  <p className="text-gray-300 italic">
                    "{testimonial.content}"
                  </p>
                </blockquote>

                {/* Hover effect - shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-accent1/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                />
                
                {/* Card glow on hover */}
                <motion.div
                  className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  style={{
                    background: `linear-gradient(45deg, var(--accent1), var(--accent2))`,
                    filter: 'blur(20px)',
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};