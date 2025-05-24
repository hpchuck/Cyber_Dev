import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Briefcase, Code, Award, User, MessageSquare, Mail } from 'lucide-react';

const menuItems = [
  { name: 'Home', icon: <Home className="w-5 h-5" />, href: '#home' },
  { name: 'Projects', icon: <Briefcase className="w-5 h-5" />, href: '#projects' },
  { name: 'Skills', icon: <Code className="w-5 h-5" />, href: '#skills' },
  { name: 'Experience', icon: <Award className="w-5 h-5" />, href: '#experience' },
  { name: 'Testimonials', icon: <User className="w-5 h-5" />, href: '#testimonials' },
  { name: 'Pricing', icon: <MessageSquare className="w-5 h-5" />, href: '#pricing' },
  { name: 'Contact', icon: <Mail className="w-5 h-5" />, href: '#contact' },
];

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <div className="block md:hidden fixed top-4 right-4 z-50" ref={navRef}>
      <button
        onClick={toggleMenu}
        className="w-12 h-12 bg-tertiary glass-card flex items-center justify-center rounded-full shadow-lg"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-accent1" />
        ) : (
          <Menu className="w-6 h-6 text-accent1" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 w-64 glass-card p-4 rounded-lg shadow-2xl"
          >
            <nav className="flex flex-col space-y-1">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-light/80 hover:text-accent1 hover:bg-tertiary transition-all duration-200"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-accent1">{item.icon}</span>
                  <span>{item.name}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
