import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Briefcase, Code, Award, User, MessageSquare, Mail } from 'lucide-react';

const menuItems = [
  { name: 'Home', icon: <Home className="w-5 h-5" />, href: '#home' },
  { name: 'Projects', icon: <Briefcase className="w-5 h-5" />, href: '#projects' },
  { name: 'Skills', icon: <Code className="w-5 h-5" />, href: '#skills' },
  { name: 'Experience', icon: <Award className="w-5 h-5" />, href: '#experience' },
  { name: 'Testimonials', icon: <User className="w-5 h-5" />, href: '#testimonials' },
  { name: 'Share Review', icon: <MessageSquare className="w-5 h-5" />, href: '/testimonial' },
  { name: 'Pricing', icon: <MessageSquare className="w-5 h-5" />, href: '#pricing' },
  { name: 'Contact', icon: <Mail className="w-5 h-5" />, href: '#contact' },
];

// Creative hamburger animation component
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <motion.div className="absolute w-6 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -6,
          scaleX: isOpen ? 1.2 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.div className="absolute w-6 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
      <motion.div className="absolute w-6 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 6,
          scaleX: isOpen ? 1.2 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );
};

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    
    if (href.startsWith('/')) {
      // Route navigation
      navigate(href);
    } else {
      // Hash navigation (scroll to section)
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Close menu when scrolling
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Menu container variants
  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  // Individual menu item variants
  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="block md:hidden fixed top-4 right-4 z-50" ref={navRef}>
      {/* Hamburger Button */}
      <motion.button
        onClick={toggleMenu}
        className="relative w-12 h-12 flex items-center justify-center rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(18, 18, 18, 0.8)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
        whileHover={{ 
          scale: 1.05,
          borderColor: 'rgba(99, 102, 241, 0.4)',
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {/* Hamburger Icon */}
        <HamburgerIcon isOpen={isOpen} />
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
          />
        )}
      </AnimatePresence>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute top-16 right-0 w-72 max-w-[90vw] rounded-xl overflow-hidden"
            style={{
              background: 'rgba(18, 18, 18, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(99, 102, 241, 0.15)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Navigation Items */}
            <nav className="p-3">
              <motion.div 
                className="space-y-1"
                variants={menuVariants}
              >
                {menuItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    variants={itemVariants}
                    className="group relative flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 overflow-hidden w-full text-left"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Icon container */}
                    <motion.div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'rgba(99, 102, 241, 0.1)',
                      }}
                      whileHover={{
                        scale: 1.1,
                      }}
                    >
                      <span className="text-indigo-300 group-hover:text-white transition-colors duration-200">
                        {item.icon}
                      </span>
                    </motion.div>
                    
                    {/* Text content */}
                    <div className="flex-1">
                      <span className="text-white/90 group-hover:text-white font-medium text-sm transition-colors duration-200">
                        {item.name}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
