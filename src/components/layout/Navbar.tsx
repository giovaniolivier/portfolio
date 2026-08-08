import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { profile } from '../../constants/profile';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, language, setLanguage, t } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.index, href: '#' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-2.5' : 'py-4'
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 md:px-8 flex justify-between items-center">
        <div
          className={`flex items-center gap-1.5 p-1.5 rounded-full transition-all duration-500 active:scale-95 ${
            scrolled
              ? 'bg-white/5 backdrop-blur-xl border border-white/10 pr-1.5 shadow-xl'
              : 'bg-transparent border-transparent'
          }`}
        >
          <motion.a
            href="#"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-black text-sm"
            whileHover={{ scale: 1.05 }}
          >
            {profile.name.initial}
          </motion.a>

          <div className="hidden md:flex items-center gap-0.5 px-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-2.5 py-1.5 text-[10px] uppercase tracking-[0.15em] font-bold text-white/50 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="h-8 px-2.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 text-white/50 hover:text-white transition-all cursor-pointer text-[9px] font-bold uppercase tracking-widest"
          >
            <Languages size={12} />
            {language}
          </button>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            className={`px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all duration-500 ${
              scrolled
                ? 'bg-white text-black'
                : 'bg-white/5 border border-white/10 text-white'
            }`}
          >
            {t.nav.cta}
          </motion.a>
        </div>

        <button
          className="md:hidden w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 h-full w-[75%] bg-main border-l border-white/10 p-8 flex flex-col justify-center gap-5"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold font-display text-white/40 hover:text-white transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
