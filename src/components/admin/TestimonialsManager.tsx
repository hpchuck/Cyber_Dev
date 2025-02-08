import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star, Trash } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const TestimonialsManager = () => {
  const { testimonials, approveTestimonial, rejectTestimonial, deleteTestimonial } = useStore();

  const pendingTestimonials = testimonials.filter(t => !t.approved);
  const approvedTestimonials = testimonials.filter(t => t.approved);

  return (
    <div className="space-y-8">
      {pendingTestimonials.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-[#00FF41] mb-4">Pending Reviews</h3>
          <div className="space-y-4">
            {pendingTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="backdrop-blur-md bg-black/30 border border-[#00FF41]/20 rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-[#00FF41]">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.role} @ {testimonial.company}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => approveTestimonial(testimonial.id)}
                      className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20"
                    >
                      <Check className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => rejectTestimonial(testimonial.id)}
                      className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="flex gap-1 mb-2">
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

                <p className="text-gray-300">"{testimonial.content}"</p>
                <p className="text-sm text-gray-500 mt-2">
                  Submitted on {new Date(testimonial.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-[#00FF41] mb-4">Approved Reviews</h3>
        <div className="space-y-4">
          {approvedTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="backdrop-blur-md bg-black/30 border border-[#00FF41]/20 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-[#00FF41]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">
                    {testimonial.role} @ {testimonial.company}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteTestimonial(testimonial.id)}
                  className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
                >
                  <Trash className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="flex gap-1 mb-2">
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

              <p className="text-gray-300">"{testimonial.content}"</p>
              <p className="text-sm text-gray-500 mt-2">
                Approved on {new Date(testimonial.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};