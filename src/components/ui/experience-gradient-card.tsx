import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface ExperienceGradientCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ExperienceGradientCard: React.FC<ExperienceGradientCardProps> = ({ 
  children, 
  className = "",
  delay = 0 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();

      // Calculate mouse position relative to card center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Calculate rotation (limited range for subtle effect)
      const rotateX = -(y / rect.height) * 3; // Max 3 degrees rotation
      const rotateY = (x / rect.width) * 3; // Max 3 degrees rotation

      setRotation({ x: rotateX, y: rotateY });
    }
  };

  // Reset rotation when not hovering
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-lg overflow-hidden ${className}`}
      style={{
        transformStyle: "preserve-3d",
        backgroundColor: "#0e131f",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.6, 
          delay,
          ease: "easeOut"
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      animate={{
        y: isHovered ? -3 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Subtle glass reflection overlay */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.03) 100%)",
          backdropFilter: "blur(1px)",
        }}
        animate={{
          opacity: isHovered ? 0.8 : 0.4,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />

      {/* Dark background with gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(145deg, #0a0f1c 0%, #111827 50%, #0f172a 100%)",
        }}
      />

      {/* Purple/blue glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-3/4 z-10"
        style={{
          background: `
            radial-gradient(ellipse at bottom right, rgba(99, 102, 241, 0.3) -10%, rgba(79, 70, 229, 0) 60%),
            radial-gradient(ellipse at bottom left, rgba(139, 92, 246, 0.3) -10%, rgba(79, 70, 229, 0) 60%)
          `,
          filter: "blur(30px)",
        }}
        animate={{
          opacity: isHovered ? 0.7 : 0.5,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />

      {/* Central purple glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-15"
        style={{
          background: `
            radial-gradient(circle at bottom center, rgba(147, 51, 234, 0.4) -20%, rgba(79, 70, 229, 0) 50%)
          `,
          filter: "blur(25px)",
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0.4,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />

      {/* Enhanced border glow */}
      <motion.div
        className="absolute inset-0 z-20 rounded-lg"
        style={{
          background: "transparent",
          border: "1px solid transparent",
          backgroundClip: "padding-box",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 30px 2px rgba(99, 102, 241, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.1)"
            : "0 0 20px 1px rgba(99, 102, 241, 0.2), inset 0 0 10px rgba(139, 92, 246, 0.05)",
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />

      {/* Content container */}
      <motion.div
        className="relative z-40 h-full"
        animate={{
          rotateX: isHovered ? -rotation.x * 0.2 : 0,
          rotateY: isHovered ? -rotation.y * 0.2 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent z-25"
        initial={{ x: '-100%', skewX: -15 }}
        animate={isHovered ? { 
          x: '100%',
          transition: { 
            duration: 0.8, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1
          }
        } : { x: '-100%' }}
      />
    </motion.div>
  );
};
