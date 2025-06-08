import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ExternalLink, Code, Heart } from 'lucide-react';
import useGSAPAnimations from '../hooks/useGSAPAnimations';
import { LazySplashCursor } from '@/components/lazy/LazySplashCursor';

const socialLinks = [
  { name: 'Github', icon: <Github className="w-5 h-5" />, url: 'https://github.com' },
  { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com' },
  { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, url: 'https://twitter.com' },
  { name: 'Email', icon: <Mail className="w-5 h-5" />, url: 'mailto:contact@example.com' },
];

const footerLinks = [
  { name: 'Home', url: '#home' },
  { name: 'Projects', url: '#projects' },
  { name: 'Skills', url: '#skills' },
  { name: 'Experience', url: '#experience' },
  { name: 'Contact', url: '#contact' },
];

export const FooterSection = () => {
  const { addToReveal, addToGlassCards } = useGSAPAnimations();
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  // Initialize refs for GSAP animations when the component mounts
  useEffect(() => {
    if (footerRef.current) {
      const title = footerRef.current.querySelector('h2');
      if (title) addToReveal(title as HTMLElement);
    }
  }, [addToGlassCards, addToReveal]);

  return (
    <footer 
      className="py-16 px-4 md:px-8 relative overflow-hidden"
      ref={footerRef}
    >
      {/* Splash Cursor Animation */}
      <div className="absolute inset-0 z-0">
        <LazySplashCursor 
          SPLAT_RADIUS={0.25}
          SPLAT_FORCE={3000}
          DENSITY_DISSIPATION={5}
          VELOCITY_DISSIPATION={3}
          COLOR_UPDATE_SPEED={6}
          TRANSPARENT={true}
        />
      </div>
      
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1)_0%,transparent_70%)] z-5" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-left mb-6 tracking-tight"
              style={{ 
                fontFamily: 'var(--font-primary)',
              }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Let's
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                Connect
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-400 mb-6"
            >
              Let's build something amazing together. Whether you need a website, application, or digital experience, I'm here to help turn your vision into reality.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-4"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-indigo-500/30 text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </div>
          
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg font-bold text-indigo-400 mb-4"
            >
              Navigation
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2"
            >
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-indigo-400 group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>
          
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg font-bold text-purple-400 mb-4"
            >
              Resources
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2"
            >
              {[
                { name: 'Resume', url: '#', icon: <ExternalLink className="w-4 h-4" /> },
                { name: 'GitHub Repos', url: 'https://github.com', icon: <Code className="w-4 h-4" /> }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      {link.icon}
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
        
        {/* Call to action card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card card-3d-effect p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/5 rounded-full blur-3xl"></div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to <span className="gradient-text">collaborate?</span></h3>
              <p className="text-gray-400 mb-0 md:mb-4">Let's discuss your project and create something exceptional together.</p>
            </div>
            <div className="flex justify-start md:justify-end">
              <a 
                href="#contact" 
                className="shimmer-button-primary flex items-center justify-center px-8 py-3 border border-transparent rounded-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get In Touch
                  <Mail className="w-5 h-5" />
                </span>
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Your Name / Company Name. All rights reserved.
          </p>
          
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Crafted with <Heart className="w-4 h-4 text-pink-500" /> and modern technology
          </p>
        </div>
      </div>
    </footer>
  );
};
