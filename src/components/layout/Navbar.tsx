import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useApp } from '../../context/AppContext';
import { profile } from '../../constants/profile';
import { useActiveSection } from '../../hooks/useActiveSection';

const MOBILE_MENU_ID = 'mobile-menu';
const SECTION_IDS = ['about', 'skills', 'projects', 'experience', 'contact'] as const;

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

  // Dans l'ordre de la page. « Contact » a son propre bouton sur ordinateur.
  const sectionLinks = [
    { id: 'about', name: t.nav.about },
    { id: 'skills', name: t.nav.skills },
    { id: 'projects', name: t.nav.projects },
    { id: 'experience', name: t.nav.experience },
  ];
  const mobileLinks = [...sectionLinks, { id: 'contact', name: t.nav.contact }];
  const activeSection = useActiveSection(SECTION_IDS);

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
              ? 'bg-tint-3 backdrop-blur-xl border border-line pr-1.5 shadow-card'
              : 'bg-transparent border-transparent'
          }`}
        >
          <motion.a href="#" className="brand-mark" whileHover={{ scale: 1.05 }} aria-label={t.a11y.home}>
            {profile.name.initial}
          </motion.a>

          <ul className="hidden md:flex items-center gap-0.5 px-2">
            {sectionLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block px-2.5 py-2 text-[11px] uppercase tracking-[0.15em] font-bold transition-colors ${
                      isActive ? 'text-fg' : 'text-fg-subtle hover:text-fg'
                    }`}
                  >
                    {link.name}
                    <span
                      aria-hidden="true"
                      className={`absolute left-2.5 right-2.5 bottom-0.5 h-px bg-accent transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="w-10 h-10 rounded-full bg-tint-3 border border-line flex items-center justify-center text-fg-subtle hover:text-fg transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={switchLanguage}
            aria-label={t.a11y.switchLanguage}
            title={t.a11y.switchLanguage}
            className="h-10 px-3 rounded-full bg-tint-3 border border-line flex items-center gap-1.5 text-fg-subtle hover:text-fg transition-all cursor-pointer text-[11px] font-bold uppercase tracking-widest"
          >
            <Languages size={12} aria-hidden="true" />
            {language}
          </button>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            aria-current={activeSection === 'contact' ? 'location' : undefined}
            className={`h-10 inline-flex items-center px-5 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all duration-500 ${
              scrolled ? 'btn-primary py-0! px-5!' : 'bg-tint-3 border border-line text-fg'
            }`}
          >
            {t.nav.cta}
          </motion.a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="md:hidden w-10 h-10 rounded-full bg-tint-3 border border-line flex items-center justify-center text-fg"
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
              className="absolute top-0 right-0 h-full w-[75%] bg-main border-l border-line p-8 flex flex-col justify-center gap-5"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={trapFocus}
            >
              {mobileLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={activeSection === link.id ? 'location' : undefined}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setIsOpen(false)}
                  className={`py-1 text-2xl font-bold font-display transition-colors ${
                    activeSection === link.id ? 'text-accent' : 'text-fg-subtle hover:text-fg'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}

              <div className="flex items-center gap-3 pt-6 mt-2 border-t border-line">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={themeLabel}
                  className="w-10 h-10 rounded-full bg-tint-3 border border-line flex items-center justify-center text-fg-muted hover:text-fg"
                >
                  {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
                </button>
                <button
                  type="button"
                  onClick={switchLanguage}
                  aria-label={t.a11y.switchLanguage}
                  className="h-10 px-4 rounded-full bg-tint-3 border border-line flex items-center gap-2 text-fg-muted hover:text-fg text-xs font-bold uppercase tracking-widest"
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
