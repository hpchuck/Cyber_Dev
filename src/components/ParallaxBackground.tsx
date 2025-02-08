import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 bg-gradient-to-b from-black via-deep-purple to-black opacity-50"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] gap-px opacity-20"
      >
        {Array.from({ length: 400 }).map((_, i) => (
          <div
            key={i}
            className="bg-electric-blue/10 rounded-sm"
          />
        ))}
      </motion.div>
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)]"
      />
    </div>
  );
};