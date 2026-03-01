import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import gsap from 'gsap';

export const CustomCursor = () => {
  // Check if it's a touch device or mobile viewport
  const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0));
  };

  const isSmallViewport = () => {
    return window.innerWidth <= 768;
  };

  // Don't render on touch devices or small viewports
  if (typeof window !== 'undefined' && (isTouchDevice() || isSmallViewport())) {
    return null;
  }

  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorPosition = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);
  const { isAudioEnabled, volume, audioFiles } = useStore();
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const cursorOuter = cursorOuterRef.current;
    const cursorInner = cursorInnerRef.current;
    const cursorDot = cursorDotRef.current;
    
    // Initialize cursor in the center
    if (cursorOuter && cursorInner && cursorDot) {
      gsap.set(cursorOuter, { x: window.innerWidth / 2 - 16, y: window.innerHeight / 2 - 16 });
      gsap.set(cursorInner, { x: window.innerWidth / 2 - 8, y: window.innerHeight / 2 - 8 });
      gsap.set(cursorDot, { x: window.innerWidth / 2 - 2, y: window.innerHeight / 2 - 2 });
    }

    // Initialize hover sound
    hoverSoundRef.current = new Audio(audioFiles.buttonClick);
    if (hoverSoundRef.current) {
      hoverSoundRef.current.volume = volume;
    }
    
    const moveCursor = (e: MouseEvent) => {
      cursorPosition.current = { x: e.clientX, y: e.clientY };
      
      if (cursorDot) {
        gsap.to(cursorDot, { 
          x: e.clientX - 2, 
          y: e.clientY - 2, 
          duration: 0.1, 
          ease: "power1.out" 
        });
      }

      if (cursorInner) {
        gsap.to(cursorInner, { 
          x: e.clientX - 8, 
          y: e.clientY - 8, 
          duration: 0.15, 
          ease: "power2.out" 
        });
      }

      if (cursorOuter) {
        gsap.to(cursorOuter, { 
          x: e.clientX - 16, 
          y: e.clientY - 16, 
          duration: 0.2, 
          ease: "power3.out" 
        });
      }
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
      
      if (cursorOuter && cursorInner) {
        gsap.to(cursorOuter, { 
          scale: 1.5, 
          opacity: 0.7, 
          borderColor: "rgba(139, 92, 246, 0.7)", 
          duration: 0.3 
        });
        
        gsap.to(cursorInner, { 
          scale: 0.5, 
          backgroundColor: "rgba(236, 72, 153, 0.7)", 
          duration: 0.3 
        });
      }
      
      // Play hover sound only after user interaction
      if (isAudioEnabled && hoverSoundRef.current) {
        document.addEventListener('click', () => {
          if (hoverSoundRef.current) {
            hoverSoundRef.current.currentTime = 0;
            hoverSoundRef.current.play().catch(() => {});
          }
        }, { once: true });
      }
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      
      if (cursorOuter && cursorInner) {
        gsap.to(cursorOuter, { 
          scale: 1, 
          opacity: 1, 
          borderColor: "rgba(99, 102, 241, 0.7)", 
          duration: 0.3 
        });
        
        gsap.to(cursorInner, { 
          scale: 1, 
          backgroundColor: "rgba(99, 102, 241, 0.7)", 
          duration: 0.3 
        });
      }
    };

    const handleMouseDown = () => {
      isClicking.current = true;
      
      if (cursorOuter && cursorInner) {
        gsap.to(cursorOuter, { 
          scale: 0.8, 
          duration: 0.2 
        });
        
        gsap.to(cursorInner, { 
          scale: 1.2, 
          duration: 0.2 
        });
      }
    };

    const handleMouseUp = () => {
      isClicking.current = false;
      
      if (cursorOuter && cursorInner) {
        if (isHovering.current) {
          gsap.to(cursorOuter, { 
            scale: 1.5, 
            duration: 0.2 
          });
          
          gsap.to(cursorInner, { 
            scale: 0.5, 
            duration: 0.2 
          });
        } else {
          gsap.to(cursorOuter, { 
            scale: 1, 
            duration: 0.2 
          });
          
          gsap.to(cursorInner, { 
            scale: 1, 
            duration: 0.2 
          });
        }
      }
    };

    const addHoverEffects = () => {
      const elements = document.querySelectorAll('a, button, input[type="range"], [role="button"], .btn, .card-3d-effect, .glass-card, .hover-3d');
      elements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    addHoverEffects();

    const observer = new MutationObserver(addHoverEffects);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
      
      const elements = document.querySelectorAll('a, button, input[type="range"], [role="button"], .btn, .card-3d-effect, .glass-card, .hover-3d');
      elements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      if (hoverSoundRef.current) {
        hoverSoundRef.current = null;
      }
    };
  }, [isAudioEnabled, volume, audioFiles.buttonClick]);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorOuterRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{ 
          width: '32px', 
          height: '32px'
        }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-accent1/70" />
      </div>
      
      {/* Inner ring */}
      <div
        ref={cursorInnerRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{ 
          width: '16px', 
          height: '16px'
        }}
      >
        <div className="absolute inset-0 rounded-full bg-accent1/70" />
      </div>
      
      {/* Dot */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference will-change-transform"
      >
        <div className="w-1 h-1 rounded-full bg-white" />
      </div>
    </>
  );
};