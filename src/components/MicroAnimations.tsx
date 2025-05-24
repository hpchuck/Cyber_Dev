import React from 'react';
import { motion } from 'framer-motion';

interface MicroAnimationProps {
  className?: string;
  children: React.ReactNode;
}

export const MicroAnimation: React.FC<MicroAnimationProps> = ({ className = '', children }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0], // custom easing
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={`micro-animation ${className}`}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  duration = 0.5,
}) => {
  const getDirectionValues = () => {
    switch (direction) {
      case 'up':
        return { y: 20 };
      case 'down':
        return { y: -20 };
      case 'left':
        return { x: 20 };
      case 'right':
        return { x: -20 };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...getDirectionValues() }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: { 
          duration: duration, 
          delay: delay, 
          ease: [0.25, 0.1, 0.25, 1.0] 
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
};

export const GlassCard: React.FC<MicroAnimationProps> = ({ className = '', children }) => {
  return (
    <motion.div
      className={`glass-card card-3d-effect ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {children}
    </motion.div>
  );
};

export const ShimmerButton: React.FC<{ 
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  primary?: boolean;
}> = ({ children, onClick, className = '', primary = false }) => {
  const baseClass = primary
    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
    : 'bg-black/50 border border-indigo-500/20 text-indigo-400';

  return (
    <motion.button
      onClick={onClick}
      className={`shimmer-effect relative overflow-hidden px-6 py-3 rounded-lg font-medium ${baseClass} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export const TextGradient: React.FC<{ 
  children: React.ReactNode;
  className?: string; 
}> = ({ children, className = '' }) => {
  return (
    <span className={`text-gradient-shift inline-block ${className}`}>
      {children}
    </span>
  );
};

export const MicroAnimations = {
  MicroAnimation,
  FadeInWhenVisible,
  GlassCard,
  ShimmerButton,
  TextGradient,
};
