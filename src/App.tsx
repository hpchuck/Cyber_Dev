import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MinimalLoading from './components/MinimalLoading';
import { CustomCursor } from './components/CustomCursor';
import { TransitionEffect } from './components/TransitionEffect';
import { MobileNav } from './components/MobileNav';
import { ScrollToTop } from './components/ScrollToTop';
import { MetaTags } from './components/MetaTags';
import { analytics, trackPageLoad } from './utils/analytics';
import { PerformanceMonitor } from './components/PerformanceMonitor';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);

  useEffect(() => {
    // Check if on mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track page loads
  useEffect(() => {
    trackPageLoad();
  }, [location.pathname]);

  // Performance monitor keyboard shortcut (Ctrl/Cmd + Shift + P)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        setShowPerformanceMonitor(prev => !prev);
      }
    };

    // Only enable in development mode
    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  // Handle loading complete
  const handleLoadingComplete = () => {
    setLoading(false);
    
    // Track app initialization performance
    const initTime = performance.now();
    analytics['recordMetric']('app_init', initTime, window.location.href);
  };

  return (
    <div className="app relative overflow-hidden">
      <MetaTags />
      
      {/* Loading screen */}
      {loading && <MinimalLoading onLoadingComplete={handleLoadingComplete} />}
      
      {/* Custom cursor for desktop */}
      {!isMobile && <CustomCursor />}
      
      {/* Performance Monitor (Development only) */}
      {process.env.NODE_ENV === 'development' && (
        <PerformanceMonitor 
          isVisible={showPerformanceMonitor} 
          onClose={() => setShowPerformanceMonitor(false)} 
        />
      )}
      
      {/* Main content */}
      <AnimatePresence mode="wait">
        {!loading && (
          <>
            <ScrollToTop />
            <TransitionEffect />
            <MobileNav />
            
            <Suspense fallback={<div className="h-screen w-screen bg-black" />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Routes>
            </Suspense>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;