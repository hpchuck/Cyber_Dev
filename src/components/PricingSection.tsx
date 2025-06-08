import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import NumberFlow from '@number-flow/react';
import { useMediaQuery } from '../hooks/use-media-query';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

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
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ['#6366F1', '#8B5CF6', '#EC4899', '#10B981'],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['circle'],
      });
    }
  };

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

  // Transform the pricing plans to include modern pricing features
  const enhancedPlans = pricingPlans.map((plan, index) => ({
    ...plan,
    yearlyPrice: (parseFloat(plan.price.replace(/[^0-9.-]/g, '')) * 10).toString(), // 20% discount
    period: 'month',
    description: `Perfect for ${plan.category.toLowerCase()} projects`,
    buttonText: 'Get Started',
    href: '#contact',
    isPopular: index === 1 // Make the middle plan popular
  }));

  // Group plans by category
  const groupedPlans = enhancedPlans.reduce((acc, plan) => {
    if (!acc[plan.category]) {
      acc[plan.category] = [];
    }
    acc[plan.category].push(plan);
    return acc;
  }, {} as Record<string, typeof enhancedPlans>);

  return (
    <section id="pricing" className="min-h-screen py-20 px-4 md:px-8 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">Pricing</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">Matrix</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose the plan that works for you. All plans include dedicated support and premium features.
          </p>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={cn("font-semibold transition-colors", isMonthly ? "text-white" : "text-gray-400")}>
            Monthly
          </span>
          <Label>
            <Switch
              ref={switchRef as any}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
          <span className={cn("font-semibold transition-colors", !isMonthly ? "text-white" : "text-gray-400")}>
            Annual <span className="text-indigo-400">(Save 20%)</span>
          </span>
        </div>

        {/* Pricing Cards by Category */}
        {Object.entries(groupedPlans).map(([category, plans]) => (
          <div key={category} className="mb-20">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold font-mono text-indigo-400 mb-8 text-center"
            >
              {category}
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={
                    isDesktop
                      ? {
                          y: plan.isPopular ? -20 : 0,
                          opacity: 1,
                          x: index === 2 ? -30 : index === 0 ? 30 : 0,
                          scale: index === 0 || index === 2 ? 0.94 : 1.0,
                        }
                      : { y: 0, opacity: 1 }
                  }
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                    delay: index * 0.2,
                  }}
                  className={cn(
                    "rounded-2xl border-[1px] p-6 backdrop-blur-md bg-black/30 text-center relative group hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500",
                    plan.isPopular ? "border-indigo-500 border-2" : "border-indigo-500/20",
                    "flex flex-col h-[600px]",
                    !plan.isPopular && "mt-5",
                    index === 0 || index === 2 ? "z-0" : "z-10"
                  )}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 py-1 px-4 rounded-full flex items-center gap-1">
                      <Star className="text-white h-4 w-4 fill-current" />
                      <span className="text-white font-semibold text-sm">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan Name */}
                  <div className="mb-6">
                    <h4 className="text-xl font-bold font-mono text-indigo-400 mb-4">
                      {plan.name}
                    </h4>
                    
                    {/* Price Display */}
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-white">
                        <NumberFlow
                          value={
                            isMonthly 
                              ? Number(plan.price.replace(/[^0-9.-]/g, '')) 
                              : Number(plan.yearlyPrice.replace(/[^0-9.-]/g, ''))
                          }
                          format={{
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }}
                          transformTiming={{
                            duration: 500,
                            easing: "ease-out",
                          }}
                          willChange
                          className="font-mono"
                        />
                      </span>
                      <span className="text-sm font-semibold text-gray-400">
                        / {plan.period}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                      {isMonthly ? "billed monthly" : "billed annually"}
                    </p>
                  </div>
                  
                  {/* Features List */}
                  <div className="flex-grow overflow-y-auto scrollable-content pr-2">
                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-gray-300 font-mono group/feature">
                          <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-indigo-400 group-hover/feature:scale-110 transition-transform duration-300" />
                          <span className="group-hover/feature:text-white transition-colors duration-300 text-left">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-6">
                    <hr className="border-indigo-500/20 mb-6" />
                    <Button
                      onClick={() => handleGetStarted(plan.name)}
                      className={cn(
                        "w-full py-3 font-semibold text-lg transition-all duration-300 relative overflow-hidden group/btn",
                        plan.isPopular
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0"
                          : "bg-transparent border-2 border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400"
                      )}
                    >
                      <span className="relative z-10">{plan.buttonText}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500/40 transform -skew-x-20 translate-x-[-200%] group-hover/btn:translate-x-[1000%] transition-transform duration-1000" />
                    </Button>
                    <p className="mt-4 text-xs text-gray-400">
                      {plan.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};