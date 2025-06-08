import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { SkillsSection } from '../components/SkillsSection';

// Lazy load ALL heavy components for better performance  
const HeroSection = React.lazy(() => import('../components/HeroSection').then(module => ({ default: module.HeroSection })));
const ExperienceSection = React.lazy(() => import('../components/ExperienceSection').then(module => ({ default: module.ExperienceSection })));
const ProjectsSection = React.lazy(() => import('../components/ProjectsSection').then(module => ({ default: module.ProjectsSection })));
const PricingSection = React.lazy(() => import('../components/PricingSection').then(module => ({ default: module.PricingSection })));
const TestimonialsSection = React.lazy(() => import('../components/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const ContactSection = React.lazy(() => import('../components/ContactSection').then(module => ({ default: module.ContactSection })));
const FooterSection = React.lazy(() => import('../components/FooterSection').then(module => ({ default: module.FooterSection })));

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
  </div>
);

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
      staggerChildren: 0.1,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const HomePage = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="bg-black text-white overflow-hidden"
    >
      <Suspense fallback={<SectionLoader />}>
        <HeroSection />
      </Suspense>
      <SkillsSection />
      
      <Suspense fallback={<SectionLoader />}>
        <ProjectsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ExperienceSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <PricingSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <FooterSection />
      </Suspense>
    </motion.div>
  );
};

export default HomePage;
