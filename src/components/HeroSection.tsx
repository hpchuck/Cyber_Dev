import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HeroGeometric } from './ui/shape-landing-hero';
import { FadeInWhenVisible, ShimmerButton } from './MicroAnimations';

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Handle scroll detection for the call-to-action fade-in
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50 && !hasScrolled) {
        setHasScrolled(true);
      } else if (scrollTop <= 50 && hasScrolled) {
        setHasScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <HeroGeometric
        badge="Available for new projects"
        title1="Cyber"
        title2="Dev"
      />
      
      {/* Custom buttons overlay */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20">
        <FadeInWhenVisible delay={0.7}>
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="#projects">
              <ShimmerButton primary>
                View Projects
              </ShimmerButton>
            </a>
            
            <a href="#contact">
              <ShimmerButton>
                Contact Me
              </ShimmerButton>
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
      
      {/* Ambient floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Tech code fragments */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`code-${i}`}
            className="absolute text-indigo-500/20 text-xs md:text-sm font-mono"
            style={{
              left: `${15 + i * 25}%`,
              top: `${20 + i * 15}%`,
              maxWidth: '150px',
              userSelect: 'none',
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {`const create${i === 0 ? 'Future' : i === 1 ? 'Innovation' : 'Vision'} = () => {
  return transform(ideas)
    .with(technology)
    .into(reality);
}`}
          </motion.div>
        ))}
        
        {/* Glowing orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? 'rgba(99,102,241,0.6)' : 
                i % 3 === 1 ? 'rgba(139,92,246,0.6)' : 
                'rgba(236,72,153,0.6)'
              } 0%, transparent 70%)`,
              boxShadow: `0 0 15px ${
                i % 3 === 0 ? 'rgba(99,102,241,0.8)' : 
                i % 3 === 1 ? 'rgba(139,92,246,0.8)' : 
                'rgba(236,72,153,0.8)'
              }`,
              left: `${10 + i * 20}%`,
              top: `${15 + (i % 3) * 20}%`,
            }}
            animate={{
              x: [0, i % 2 === 0 ? 50 : -50, 0],
              y: [0, i % 2 === 0 ? 30 : -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
      >
        <p className="text-gray-400 text-sm mb-2">Scroll to explore</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="bg-black/30 backdrop-blur-md p-2 rounded-full border border-indigo-500/20"
        >
          <ChevronDown className="w-5 h-5 text-indigo-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};