import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useApp } from '../../context/AppContext';
import { profile } from '../../constants/profile';

const MOBILE_MENU_ID = 'mobile-menu';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, language, setLanguage, t } = useApp();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu mobile : focus sur le premier lien à l'ouverture, retour au bouton à la fermeture,
  // fermeture avec Échap, défilement de la page bloqué pendant l'ouverture.
  useEffect(() => {
    if (isOpen) {
      wasOpen.current = true;
      panelRef.current?.querySelector<HTMLElement>('a')?.focus();
      const onKey = (e: globalThis.KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = previousOverflow;
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      menuButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Garde le focus clavier dans le menu ouvert (Tab / Maj+Tab bouclent).
  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const items = panelRef.current.querySelectorAll<HTMLElement>('a, button');
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const navLinks = [
    { name: t.nav.index, href: '#' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const themeLabel = theme === 'dark' ? t.a11y.themeToLight : t.a11y.themeToDark;
  const switchLanguage = () => setLanguage(language === 'fr' ? 'en' : 'fr');

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-2.5' : 'py-4'
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 md:px-8 flex justify-between items-center">
        <nav
          aria-label={t.a11y.menu}
          className={`flex items-center gap-1.5 p-1.5 rounded-full transition-all duration-500 active:scale-95 ${
            scrolled
              ? 'bg-white/5 backdrop-blur-xl border border-white/10 pr-1.5 shadow-xl'
              : 'bg-transparent border-transparent'
          }`}
        >
          <motion.a href="#" className="brand-mark" whileHover={{ scale: 1.05 }} aria-label={t.a11y.home}>
            {profile.name.initial}
          </motion.a>

          <ul className="hidden md:flex items-center gap-0.5 px-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-2.5 py-1.5 text-[10px] uppercase tracking-[0.15em] font-bold text-white/60 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={switchLanguage}
            aria-label={t.a11y.switchLanguage}
            title={t.a11y.switchLanguage}
            className="h-8 px-2.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 text-white/60 hover:text-white transition-all cursor-pointer text-[10px] font-bold uppercase tracking-widest"
          >
            <Languages size={12} aria-hidden="true" />
            {language}
          </button>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            className={`px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all duration-500 ${
              scrolled ? 'btn-primary py-1.5! px-4!' : 'bg-white/5 border border-white/10 text-white'
            }`}
          >
            {t.nav.cta}
          </motion.a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="md:hidden w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? t.a11y.closeMenu : t.a11y.openMenu}
          aria-expanded={isOpen}
          aria-controls={MOBILE_MENU_ID}
        >
          {isOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-40 theme-overlay md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              ref={panelRef}
              id={MOBILE_MENU_ID}
              role="dialog"
              aria-modal="true"
              aria-label={t.a11y.menu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 h-full w-[75%] bg-main border-l border-white/10 p-8 flex flex-col justify-center gap-5"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={trapFocus}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold font-display text-white/60 hover:text-white transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <div className="flex items-center gap-3 pt-6 mt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={themeLabel}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white"
                >
                  {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
                </button>
                <button
                  type="button"
                  onClick={switchLanguage}
                  aria-label={t.a11y.switchLanguage}
                  className="h-10 px-4 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest"
                >
                  <Languages size={14} aria-hidden="true" />
                  {language}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
