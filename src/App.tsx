import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { AppProvider, useApp } from './context/AppContext';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const { t } = useApp();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-main selection:bg-accent/30 selection:text-accent group/app">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-main flex items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-0.5 bg-accent mb-4"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="loader-text font-display font-bold tracking-[0.5em] text-sm uppercase italic"
              >
                {t.loader}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar />
            <main className="relative">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
            </main>
            <Footer />
            
            {/* Background elements */}
            <div className="fixed inset-0 -z-50 pointer-events-none">
              <div className="absolute inset-0 noise-bg opacity-[0.03]" />
              <div className="grid-bg" />
              <div className="absolute top-0 right-0 w-200 h-200 bg-accent/20 rounded-full blur-[150px] ambient-orb-a" />
              <div className="absolute bottom-0 left-0 w-150 h-150 bg-blue-500/15 rounded-full blur-[150px] ambient-orb-b" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
