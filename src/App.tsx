import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { AppProvider } from './context/AppContext';
import { CVPage } from './pages/CVPage';

function usePathname() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  return pathname;
}

function Portfolio() {
  return (
    <div className="min-h-screen bg-main selection:bg-accent/30 selection:text-accent group/app">
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

      <div className="fixed inset-0 -z-50 pointer-events-none">
        <div className="absolute inset-0 noise-bg opacity-[0.03]" />
        <div className="grid-bg" />
        <div className="absolute top-0 right-0 w-200 h-200 bg-accent/20 rounded-full blur-[150px] ambient-orb-a" />
        <div className="absolute top-[55%] left-0 w-150 h-150 bg-blue-500/12 rounded-full blur-[150px] ambient-orb-b" />
        <div className="absolute bottom-0 right-1/4 w-120 h-120 bg-accent/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}

function AppContent() {
  const pathname = usePathname();
  const isCv = pathname === '/cv' || pathname.endsWith('/cv');

  if (isCv) return <CVPage />;
  return <Portfolio />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
