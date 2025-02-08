import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const messageTemplates = {
  'Basic': `Hi, I'm interested in the Basic Web Development package. I'd like to discuss creating a single-page website with the following requirements:

- Responsive design implementation
- Basic SEO optimization
- Contact form integration
- 5 content sections

Please let me know the next steps and timeline for this project.`,

  'Professional': `Hi, I'm interested in the Professional Web Development package. I'd like to discuss creating a multi-page website with:

- Advanced SEO implementation
- CMS integration
- E-commerce features
- Custom animations
- Performance optimization

Could you provide more details about the development process and timeline?`,

  'Enterprise': `Hi, I'm interested in the Enterprise Web Development solution. I'd like to discuss:

- Custom web application development
- AI integration possibilities
- Load balancing implementation
- Security requirements
- API development needs

Please provide information about your enterprise development process and available consultation times.`,

  'Starter': `Hi, I'm interested in the Starter Mobile Development package. I'd like to discuss:

- Native mobile app development
- Basic feature implementation
- Push notification system
- User authentication
- Analytics integration

Could you share more details about your mobile development process?`,

  'Advanced': `Hi, I'm interested in the Advanced Mobile Development package. I'd like to discuss:

- Cross-platform app development
- Advanced feature implementation
- Offline support
- Custom API integration
- Social media integration

Please provide information about your development timeline and process.`
};

export const PricingSection = () => {
  const { pricingPlans, setContactMessage } = useStore();
  const navigate = useNavigate();

  const handleGetStarted = (planName: string) => {
    const template = messageTemplates[planName as keyof typeof messageTemplates] || '';
    
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Add a small delay to start the typewriter effect after scrolling
    setTimeout(() => {
      setContactMessage(template);
    }, 800);
  };

  const groupedPlans = pricingPlans.reduce((acc, plan) => {
    if (!acc[plan.category]) {
      acc[plan.category] = [];
    }
    acc[plan.category].push(plan);
    return acc;
  }, {} as Record<string, typeof pricingPlans>);

  return (
    <section id="pricing" className="min-h-screen py-20 px-4 md:px-8 relative">
      <>
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <h2 className="section-heading text-[#00FF41] mb-16">
            PRICING_MATRIX
          </h2>

          {Object.entries(groupedPlans).map(([category, plans], categoryIndex) => (
            <div key={category} className="mb-20">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold font-mono text-[#00FF41] mb-8 text-center"
              >
                {category}
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -10 }}
                    className="relative group h-[600px]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    
                    <div className="backdrop-blur-md bg-black/30 border border-[#00FF41]/20 rounded-lg p-6 relative h-full flex flex-col">
                      <div className="mb-6">
                        <h4 className="text-xl font-bold font-mono text-[#00FF41] mb-2 glitch" data-text={plan.name}>
                          {plan.name}
                        </h4>
                        <p className="text-3xl font-bold font-mono gradient-text mb-4">{plan.price}</p>
                      </div>
                      
                      <div className="flex-grow overflow-y-auto scrollable-content pr-2">
                        <ul className="space-y-4">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-[#00FF41]/80 font-mono group/feature">
                              <Check className="w-5 h-5 flex-shrink-0 mt-1 group-hover/feature:scale-110 transition-transform duration-300" />
                              <span className="group-hover/feature:text-[#00FF41] transition-colors duration-300">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGetStarted(plan.name)}
                        className="relative group/btn w-full px-6 py-3 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded-lg font-mono text-[#00FF41] hover:bg-[#00FF41]/20 transition-all duration-300 mt-6 overflow-hidden"
                      >
                        <span className="relative z-10">Get Started</span>
                        <div className="absolute inset-0 bg-grid-pattern opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41]/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-0 left-0 w-2 h-full bg-[#00FF41]/40 transform -skew-x-20 translate-x-[-200%] group-hover/btn:translate-x-[1000%] transition-transform duration-1000" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </>
    </section>
  );
};