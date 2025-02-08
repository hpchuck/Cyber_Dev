import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const InteractiveBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundRef.current && particlesRef.current && gridRef.current) {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) * 100;
        const y = (clientY / window.innerHeight) * 100;
        
        // Update radial gradient position
        backgroundRef.current.style.setProperty('--x', `${x}%`);
        backgroundRef.current.style.setProperty('--y', `${y}%`);

        // Update grid perspective
        const rect = gridRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = (centerY - clientY) * 0.01;
        const rotateY = (clientX - centerX) * 0.01;
        
        gridRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Create particle effect at cursor position
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${clientX}px`;
        particle.style.top = `${clientY}px`;
        particlesRef.current.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div 
        ref={backgroundRef}
        className="fixed inset-0 -z-10 bg-black"
      >
        <div 
          ref={gridRef}
          className="absolute inset-0 opacity-30 transition-transform duration-300 ease-out"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.2)1px,transparent1px),linear-gradient(90deg,rgba(0,255,65,0.2)1px,transparent1px)]" 
               style={{ backgroundSize: '40px 40px', transformStyle: 'preserve-3d' }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.1)10px,transparent10px),linear-gradient(90deg,rgba(0,255,65,0.1)10px,transparent10px)]" 
               style={{ backgroundSize: '100px 100px', transform: 'translateZ(20px)' }} />
        </div>
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(0,255,65,0.2) 0%, transparent 50%)`
          }}
        />
      </div>
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00FF41]/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              y: [0, -100],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      <style>{`
        .particle {
          position: absolute;
          pointer-events: none;
          background: radial-gradient(circle, rgba(0,255,65,0.3) 0%, transparent 70%);
          width: 100px;
          height: 100px;
          margin-left: -50px;
          margin-top: -50px;
          animation: particleFade 1s ease-out forwards;
        }

        @keyframes particleFade {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export const CircuitBackground = () => (
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0" style={{
      backgroundImage: `
        radial-gradient(circle at 2% 5%, rgba(0,255,65,0.2) 0.5px, transparent 1px),
        radial-gradient(circle at 98% 95%, rgba(0,255,65,0.2) 0.5px, transparent 1px),
        linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px, 50px 50px, 25px 25px, 25px 25px',
      backgroundPosition: '0 0, 0 0, -0.5px -0.5px, -0.5px -0.5px'
    }} />
  </div>
);

export const HexagonBackground = () => (
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0" style={{
      backgroundImage: `
        linear-gradient(60deg, rgba(0,255,65,0.1) 25%, transparent 25.5%, transparent 75%, rgba(0,255,65,0.1) 75.5%),
        linear-gradient(-60deg, rgba(0,255,65,0.1) 25%, transparent 25.5%, transparent 75%, rgba(0,255,65,0.1) 75.5%)
      `,
      backgroundSize: '60px 103.92px',
      backgroundPosition: '0 0, 0 0'
    }} />
  </div>
);

export const DataStreamBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const streams: number[] = Array(Math.floor(canvas.width / 20))
      .fill(0)
      .map(() => Math.random() * canvas.height);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41';
      streams.forEach((y, i) => {
        const x = i * 20;
        const height = Math.random() * 10 + 2;
        ctx.fillRect(x, y, 2, height);
        streams[i] = y >= canvas.height ? 0 : y + 5;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};