import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP animations
 */
export const useGSAPAnimations = () => {
  const animationRefs = {
    heroSection: useRef<HTMLElement | null>(null),
    staggerItems: useRef<HTMLElement[]>([]),
    fadeInElements: useRef<HTMLElement[]>([]),
    revealElements: useRef<HTMLElement[]>([]),
    parallaxElements: useRef<HTMLElement[]>([]),
    text3DElements: useRef<HTMLElement[]>([]),
    glassCards: useRef<HTMLElement[]>([]),
  };

  // Initialize stagger items
  const addToStaggerItems = (el: HTMLElement | null) => {
    if (el && !animationRefs.staggerItems.current.includes(el)) {
      animationRefs.staggerItems.current.push(el);
    }
  };

  // Initialize fade in elements
  const addToFadeIn = (el: HTMLElement | null) => {
    if (el && !animationRefs.fadeInElements.current.includes(el)) {
      animationRefs.fadeInElements.current.push(el);
    }
  };

  // Initialize reveal elements
  const addToReveal = (el: HTMLElement | null) => {
    if (el && !animationRefs.revealElements.current.includes(el)) {
      animationRefs.revealElements.current.push(el);
    }
  };

  // Initialize parallax elements
  const addToParallax = (el: HTMLElement | null) => {
    if (el && !animationRefs.parallaxElements.current.includes(el)) {
      animationRefs.parallaxElements.current.push(el);
    }
  };

  // Initialize 3D text elements
  const addToText3D = (el: HTMLElement | null) => {
    if (el && !animationRefs.text3DElements.current.includes(el)) {
      animationRefs.text3DElements.current.push(el);
    }
  };

  // Initialize glass cards for hover effects
  const addToGlassCards = (el: HTMLElement | null) => {
    if (el && !animationRefs.glassCards.current.includes(el)) {
      animationRefs.glassCards.current.push(el);
    }
  };

  // Setup 3D hover effect on cards
  const setup3DHoverEffect = (cards: HTMLElement[]) => {
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const bounds = card.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const cardWidth = bounds.width;
        const cardHeight = bounds.height;
        
        const centerX = bounds.left + cardWidth / 2;
        const centerY = bounds.top + cardHeight / 2;
        
        const mouseXRelativeToCenterX = mouseX - centerX;
        const mouseYRelativeToCenterY = mouseY - centerY;
        
        const rotationX = 15 * mouseYRelativeToCenterY / (cardHeight / 2);
        const rotationY = -15 * mouseXRelativeToCenterX / (cardWidth / 2);

        gsap.to(card, {
          rotationX,
          rotationY,
          transformPerspective: 1000,
          ease: 'power1.out',
          duration: 0.2
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          transformPerspective: 1000,
          scale: 1,
          ease: 'power1.out',
          duration: 0.5
        });
      });
    });
  };

  // Hero section animations
  const animateHeroSection = (heroSection: HTMLElement | null) => {
    if (!heroSection) return;

    const headings = heroSection.querySelectorAll('h1, h2');
    const paragraphs = heroSection.querySelectorAll('p');
    const buttons = heroSection.querySelectorAll('button, .button');
    const heroImage = heroSection.querySelector('.hero-image');

    // Timeline for hero section
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate headings
    tl.from(headings, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
    });

    // Animate paragraphs
    tl.from(paragraphs, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
    }, '-=0.4');

    // Animate buttons
    tl.from(buttons, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
    }, '-=0.2');

    // Animate hero image
    if (heroImage) {
      tl.from(heroImage, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5');
    }
  };

  // Stagger animations for lists and grids
  const animateStaggerItems = (elements: HTMLElement[]) => {
    gsap.from(elements, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: elements[0]?.parentElement || elements[0],
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });
  };

  // Fade in animations
  const animateFadeIn = (elements: HTMLElement[]) => {
    elements.forEach(element => {
      gsap.from(element, {
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });
    });
  };

  // Reveal animations
  const animateReveal = (elements: HTMLElement[]) => {
    elements.forEach(element => {
      const direction = element.dataset.direction || 'bottom';
      let fromVars = {};
      
      switch(direction) {
        case 'left':
          fromVars = { x: -50, opacity: 0 };
          break;
        case 'right':
          fromVars = { x: 50, opacity: 0 };
          break;
        case 'top':
          fromVars = { y: -50, opacity: 0 };
          break;
        default:
          fromVars = { y: 50, opacity: 0 };
      }
      
      gsap.from(element, {
        ...fromVars,
        duration: 0.8,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });
    });
  };

  // Parallax animations
  const animateParallax = (elements: HTMLElement[]) => {
    elements.forEach(element => {
      const speed = element.dataset.speed || '0.2';
      
      gsap.to(element, {
        y: `${-100 * parseFloat(speed)}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: element.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  };

  // 3D Text animations
  const animate3DText = (elements: HTMLElement[]) => {
    elements.forEach(element => {
      // Animate the text element directly without splitting
      gsap.from(element, {
        duration: 0.8,
        opacity: 0,
        scale: 0.5,
        y: 20,
        transformOrigin: '0% 50% -50',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  };

  // Run all animations
  useEffect(() => {
    // Setup ScrollTrigger refresh on page load
    ScrollTrigger.refresh();
    
    // Run animations
    animateHeroSection(animationRefs.heroSection.current);
    
    if (animationRefs.staggerItems.current.length > 0) {
      animateStaggerItems(animationRefs.staggerItems.current);
    }
    
    if (animationRefs.fadeInElements.current.length > 0) {
      animateFadeIn(animationRefs.fadeInElements.current);
    }
    
    if (animationRefs.revealElements.current.length > 0) {
      animateReveal(animationRefs.revealElements.current);
    }
    
    if (animationRefs.parallaxElements.current.length > 0) {
      animateParallax(animationRefs.parallaxElements.current);
    }
    
    if (animationRefs.text3DElements.current.length > 0) {
      animate3DText(animationRefs.text3DElements.current);
    }
    
    if (animationRefs.glassCards.current.length > 0) {
      setup3DHoverEffect(animationRefs.glassCards.current);
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return {
    refs: animationRefs,
    addToStaggerItems,
    addToFadeIn,
    addToReveal,
    addToParallax,
    addToText3D,
    addToGlassCards,
  };
};

export default useGSAPAnimations;