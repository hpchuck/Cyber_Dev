import React, { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { AudioControls } from './components/AudioControls';
import { InteractiveBackground } from './components/InteractiveBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { TransitionEffect } from './components/TransitionEffect';
import { useStore } from './store/useStore';
import { AdminPanel } from './components/AdminPanel';
import { TestimonialForm } from './components/TestimonialForm';

// Lazy load components
const HeroSection = React.lazy(() => import('./components/HeroSection').then(module => ({ default: module.HeroSection })));
const ProjectsSection = React.lazy(() => import('./components/ProjectsSection').then(module => ({ default: module.ProjectsSection })));
const SkillsSection = React.lazy(() => import('./components/SkillsSection').then(module => ({ default: module.SkillsSection })));
const ExperienceSection = React.lazy(() => import('./components/ExperienceSection').then(module => ({ default: module.ExperienceSection })));
const TestimonialsSection = React.lazy(() => import('./components/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const ContactSection = React.lazy(() => import('./components/ContactSection').then(module => ({ default: module.ContactSection })));
const PricingSection = React.lazy(() => import('./components/PricingSection').then(module => ({ default: module.PricingSection })));

export default function App() {
  const { isAudioEnabled, volume } = useStore();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let startTime = Date.now();
    const duration = 2500;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      
      setLoadingProgress(progress);
      
      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <>
      <CustomCursor />
      <InteractiveBackground />
      <AudioControls />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/testimonials/new" element={<TestimonialForm />} />
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
      </AnimatePresence>
    </>
  );
}