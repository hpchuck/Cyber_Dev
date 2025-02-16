import React, { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { AudioControls } from './components/AudioControls';
import { InteractiveBackground } from './components/InteractiveBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { TransitionEffect } from './components/TransitionEffect';
import { useStore } from './store/useStore';

// Lazy load components
const HeroSection = React.lazy(() => import('./components/HeroSection').then(module => ({ default: module.HeroSection })));
const ProjectsSection = React.lazy(() => import('./components/ProjectsSection').then(module => ({ default: module.ProjectsSection })));
const SkillsSection = React.lazy(() => import('./components/SkillsSection').then(module => ({ default: module.SkillsSection })));
const ExperienceSection = React.lazy(() => import('./components/ExperienceSection').then(module => ({ default: module.ExperienceSection })));
const TestimonialsSection = React.lazy(() => import('./components/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const ContactSection = React.lazy(() => import('./components/ContactSection').then(module => ({ default: module.ContactSection })));
const PricingSection = React.lazy(() => import('./components/PricingSection').then(module => ({ default: module.PricingSection })));
const AdminPanel = React.lazy(() => import('./components/AdminPanel').then(module => ({ default: module.AdminPanel })));
const TestimonialForm = React.lazy(() => import('./components/TestimonialForm').then(module => ({ default: module.TestimonialForm })));

export default function App() {
  const { isAudioEnabled, volume } = useStore();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let startTime = Date.now();
    const duration = 2500;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      
      setLoadingProgress(progress);
      
      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  return (
    <>
      {!isMobile && <CustomCursor />}
      <InteractiveBackground />
      <AudioControls />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen 
            progress={loadingProgress} 
            onComplete={() => setIsLoading(false)}
          />
        ) : (
          <Routes location={location} key={location.pathname}>
            <Route path="/admin/*" element={
              <Suspense fallback={<LoadingScreen progress={loadingProgress} />}>
                <AdminPanel />
              </Suspense>
            } />
            <Route path="/testimonials/new" element={
              <Suspense fallback={<LoadingScreen progress={loadingProgress} />}>
                <TestimonialForm />
              </Suspense>
            } />
            <Route path="/" element={
              <Suspense fallback={<LoadingScreen progress={loadingProgress} />}>
                <main className="relative">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HeroSection isAudioEnabled={isAudioEnabled} />
                    <TransitionEffect />
                    <ProjectsSection />
                    <SkillsSection />
                    <ExperienceSection />
                    <TestimonialsSection />
                    <PricingSection />
                    <ContactSection />
                  </motion.div>
                </main>
              </Suspense>
            } />
          </Routes>
        )}
      </AnimatePresence>
    </>
  );
}