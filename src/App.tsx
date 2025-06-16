import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './providers/ThemeProvider';
import ErrorBoundary from './components/ui/ErrorBoundary';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/Home/Hero';

// Lazy load components for better performance
const About = lazy(() => import('./components/About/About'));
const Journey = lazy(() => import('./components/Journey/Journey'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const AIStack = lazy(() => import('./components/AIStack/AIStack'));
const Architecture = lazy(() => import('./components/Architecture/Architecture'));
const Services = lazy(() => import('./components/Services/Services'));
const Blog = lazy(() => import('./components/Blog/Blog'));
const Contact = lazy(() => import('./components/Contact/Contact'));

// Loading component for lazy-loaded sections
const SectionLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" className="mb-4 mx-auto" />
      <p className="text-gray-600 dark:text-gray-400">Loading section...</p>
    </div>
  </div>
);

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed header
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
    setActiveSection(sectionId);
  };

  // Handle scroll to update active section with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ['home', 'about', 'journey', 'projects', 'ai-stack', 'architecture', 'services', 'blog', 'contact'];
          const scrollPosition = window.scrollY + 100;

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const element = section === 'home' ? { offsetTop: 0 } : document.getElementById(section);
            
            if (element && scrollPosition >= element.offsetTop) {
              setActiveSection(section);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced loading screen with progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          className="text-center max-w-md mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
          </motion.div>
          
          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            kirangarudofficial
          </motion.h1>
          
          <motion.p
            className="text-gray-400 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Initializing next-generation infrastructure...
          </motion.p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <p className="text-gray-500 text-sm">
            {Math.round(loadingProgress)}% Complete
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header activeSection={activeSection} onNavigate={handleNavigate} />
        
        <main role="main">
          <Hero onNavigate={handleNavigate} />
          
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <About />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <Journey />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <AIStack />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <Architecture />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <Services />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <Blog />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;