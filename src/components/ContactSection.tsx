import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import useGSAPAnimations from '../hooks/useGSAPAnimations';
import { SplashCursor } from '@/components/ui/splash-cursor';

const SocialIcon = ({ href, icon: Icon, label }: { href: string; icon: typeof Github; label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="tech-icon text-gray-300 hover:text-indigo-400 transition-colors relative group cursor-pointer"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.div
      className="absolute -inset-2 bg-indigo-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }}
    />
    <Icon className="w-8 h-8 relative z-10" />
    <motion.div
      className="absolute w-20 -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
    >
      <motion.span
        className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
        initial={{ y: -10 }}
        animate={{ y: 0 }}
      >
        {label}
      </motion.span>
    </motion.div>
  </motion.a>
);

const inputVariants = {
  focus: {
    scale: 1.02,
    boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)", // Indigo-500
    borderColor: "rgba(99, 102, 241, 0.8)" // Indigo-500
  }
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)", // Indigo-500
    transition: {
      duration: 0.3,
      yoyo: Infinity
    }
  },
  tap: { scale: 0.95 }
};

export const ContactSection = () => {
  const { addToGlassCards, addToReveal } = useGSAPAnimations();
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Initialize refs for GSAP animations when the component mounts
  useEffect(() => {
    // Add form to glass cards for 3D effect
    if (formRef.current) addToGlassCards(formRef.current);
    if (contactInfoRef.current) addToGlassCards(contactInfoRef.current);
    
    // Add section title for reveal animation
    if (sectionRef.current) {
      const title = sectionRef.current.querySelector('h2');
      if (title) addToReveal(title as HTMLElement);
    }
  }, [addToGlassCards, addToReveal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual form submission endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '01c1e520-c0ea-4be4-a409-83047f7e23c8', // Replace with your key
          ...formState
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-20 px-4 md:px-8 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Splash Cursor Animation */}
      <div className="absolute inset-0 z-0">
        <SplashCursor 
          SPLAT_RADIUS={0.3}
          SPLAT_FORCE={4000}
          DENSITY_DISSIPATION={4}
          VELOCITY_DISSIPATION={2.5}
          COLOR_UPDATE_SPEED={8}
          TRANSPARENT={true}
        />
      </div>
      
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)] z-5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.05)_0%,transparent_70%)] z-5" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.h2 
          className="section-heading gradient-text mb-4 text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ 
            position: 'sticky',
            top: 0,
            zIndex: 20,
            visibility: 'visible',
            display: 'block'
          }}
        >
          Get in Touch
        </motion.h2>

        <motion.p
          className="text-gray-400 max-w-2xl mb-16 text-center mx-auto text-lg md:text-xl"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ 
            visibility: 'visible',
            display: 'block'
          }}
        >
          Have a project idea or just want to connect? Feel free to reach out.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            ref={contactInfoRef}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card card-3d-effect p-8 space-y-8 relative overflow-hidden" 
          >
            <h3 className="text-2xl font-bold text-white mb-6">Let's Create Something Amazing</h3>
            <p className="text-gray-300 mb-8">
              Whether you have a project in mind or just want to chat about technology,
              I'm always open to new opportunities and collaborations.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <Mail className="w-5 h-5 text-gray-200 group-hover:text-indigo-400 transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-gray-200 text-sm mb-1">Email</h4>
                  <a href="mailto:contact@example.com" className="text-white hover:text-indigo-400 transition-colors duration-300">contact@example.com</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-gray-200 group-hover:text-purple-400 transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-gray-200 text-sm mb-1">Location</h4>
                  <p className="text-white">Remote / Global</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center group-hover:from-pink-500/30 group-hover:to-red-500/30 transition-all duration-300">
                  <Phone className="w-5 h-5 text-gray-200 group-hover:text-pink-400 transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-gray-200 text-sm mb-1">Phone (Optional)</h4>
                  <a href="tel:+1234567890" className="text-white hover:text-pink-400 transition-colors duration-300">+1 (234) 567-890</a>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              <SocialIcon href="https://github.com" icon={Github} label="GitHub" />
              <SocialIcon href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
              <SocialIcon href="https://twitter.com" icon={Twitter} label="Twitter" />
            </div>
          </motion.div>

          <motion.form
            ref={formRef}
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card card-3d-effect p-8 space-y-6 relative overflow-hidden"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="text"
                name="name"
                id="name"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="form-input block w-full rounded-md bg-black/30 border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white placeholder-gray-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="email"
                name="email"
                id="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="form-input block w-full rounded-md bg-black/30 border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white placeholder-gray-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
              <motion.textarea
                variants={inputVariants}
                whileFocus="focus"
                name="message"
                id="message"
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="form-textarea block w-full rounded-md bg-black/30 border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white placeholder-gray-500"
                placeholder="Your message..."
              />
            </div>
            
            <motion.button
              type="submit"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              disabled={isSubmitting}
              className="w-full shimmer-button-primary flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Send className="w-5 h-5 mr-2" />
              )}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>

            {submitStatus === 'success' && (
              <p className="text-sm text-green-400 text-center">Message sent successfully! I'll get back to you soon.</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-sm text-red-400 text-center">Something went wrong. Please try again later.</p>
            )}
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};
