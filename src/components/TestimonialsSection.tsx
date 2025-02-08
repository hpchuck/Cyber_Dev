import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useStore } from '../store/useStore';

export const TestimonialsSection = () => {
  const { testimonials } = useStore();
  const approvedTestimonials = testimonials.filter(t => t.approved);

  if (approvedTestimonials.length === 0) {
    return null;
  }

  const gridCols = approvedTestimonials.length === 1 ? 'md:grid-cols-1' : 
                  approvedTestimonials.length === 2 ? 'md:grid-cols-2' :
                  'md:grid-cols-3';

  return (
    <section id="testimonials" className="py-20 px-4 md:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.1)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <h2 className="section-heading text-[#00FF41] mb-16">
          CLIENT_FEEDBACK
        </h2>

        <div className={`grid grid-cols-1 ${gridCols} gap-8 max-w-5xl mx-auto`}>
          {approvedTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="backdrop-blur-md bg-black/30 border border-[#00FF41]/20 rounded-lg p-6 relative overflow-hidden"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-[#00FF41]/20" />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=000&color=00FF41`}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-[#00FF41]/30"
                    />
                    <motion.div
                      className="absolute inset-0 border-2 border-[#00FF41]/30 rounded-full"
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
                    <h3 className="text-lg font-bold text-[#00FF41]">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">
                      {testimonial.role} @ {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? 'text-[#00FF41]'
                          : 'text-[#00FF41]/20'
                      }`}
                      fill={i < testimonial.rating ? '#00FF41' : 'none'}
                    />
                  ))}
                </div>

                <p className="text-gray-300 relative z-10">
                  "{testimonial.content}"
                </p>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00FF41]/10 via-transparent to-[#00FF41]/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};