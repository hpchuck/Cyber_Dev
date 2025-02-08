import React from 'react';
import { motion } from 'framer-motion';
import { useButtonSound } from '../hooks/useSound';

interface SoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const SoundButton: React.FC<SoundButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const soundProps = useButtonSound();

  const baseStyles = 'px-6 py-2 rounded-lg transition-all duration-200 font-medium';
  const variantStyles = {
    primary: 'bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30 hover:bg-[#00FF41]/20',
    secondary: 'bg-[#00FF41] text-black hover:bg-[#00FF41]/90',
    ghost: 'bg-transparent text-[#00FF41] hover:bg-[#00FF41]/10'
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...soundProps}
      {...props}
    >
      {children}
    </motion.button>
  );
};