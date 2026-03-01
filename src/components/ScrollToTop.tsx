import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top coordinate to 0
  // Make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center glass-card shadow-lg hover:bg-accent1/20 group transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 text-accent1 group-hover:text-white transition-colors" />
          
          {/* Ripple effect on hover */}
          <span className="absolute w-full h-full rounded-full bg-accent1 opacity-0 group-hover:opacity-10 scale-0 group-hover:scale-100 transition-all duration-500"></span>
          
          {/* Glow effect */}
          <span className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-20 bg-accent1 blur-md group-hover:animate-pulse"></span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
