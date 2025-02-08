import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorPosition = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const isHovering = useRef(false);
  const { isAudioEnabled, volume, audioFiles } = useStore();
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    // Initialize cursor in the center
    if (cursor && cursorDot) {
      cursor.style.transform = `translate3d(${window.innerWidth / 2 - 16}px, ${window.innerHeight / 2 - 16}px, 0)`;
      cursorDot.style.transform = `translate3d(${window.innerWidth / 2 - 2}px, ${window.innerHeight / 2 - 2}px, 0)`;
    }

    // Initialize hover sound
    hoverSoundRef.current = new Audio(audioFiles.buttonClick);
    if (hoverSoundRef.current) {
      hoverSoundRef.current.volume = volume;
    }
    
    const moveCursor = (e: MouseEvent) => {
      cursorPosition.current = { x: e.clientX, y: e.clientY };
      
      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
      }

      if (cursor) {
        const scale = isHovering.current ? 1.5 : 1;
        cursor.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0) scale(${scale})`;
      }
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
      if (cursor) {
        cursor.style.transform = `translate3d(${cursorPosition.current.x - 16}px, ${cursorPosition.current.y - 16}px, 0) scale(1.5)`;
      }
      // Play hover sound
      if (isAudioEnabled && hoverSoundRef.current) {
        hoverSoundRef.current.currentTime = 0;
        hoverSoundRef.current.play().catch(console.error);
      }
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      if (cursor) {
        cursor.style.transform = `translate3d(${cursorPosition.current.x - 16}px, ${cursorPosition.current.y - 16}px, 0) scale(1)`;
      }
    };

    const addHoverEffects = () => {
      const elements = document.querySelectorAll('a, button, input[type="range"], [role="button"], .btn, .btn-glitch');
      elements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    window.addEventListener('mousemove', moveCursor);
    addHoverEffects();

    const observer = new MutationObserver(addHoverEffects);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
      const elements = document.querySelectorAll('a, button, input[type="range"], [role="button"], .btn, .btn-glitch');
      elements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (hoverSoundRef.current) {
        hoverSoundRef.current = null;
      }
    };
  }, [isAudioEnabled, volume]);

  // Update hover sound volume when global volume changes
  useEffect(() => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{ 
          width: '32px', 
          height: '32px',
          transition: 'transform 0.15s ease-out'
        }}
      >
        <div className="absolute inset-0 rounded-full bg-[#00FF41]" />
        <div
          className="absolute inset-0 rounded-full border border-[#00FF41]"
          style={{ 
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
      </div>
      
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference will-change-transform"
      >
        <div className="w-1 h-1 rounded-full bg-[#00FF41]" />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </>
  );
};