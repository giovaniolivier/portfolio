import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { profile } from '../../constants/profile';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { t } = useApp();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center pt-16 overflow-hidden bg-main"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen aspect-square hero-glow blur-[100px]" />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="max-w-3xl mx-auto px-5 text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">{t.hero.status}</span>

          <h1 className="text-4xl md:text-6xl font-bold leading-[0.9] tracking-tighter text-white mb-6 text-gradient uppercase">
            {t.hero.title1} <br />
            <span className="italic font-light text-white/40">{t.hero.title2}</span> <br />
            {t.hero.title3}
          </h1>

          <p className="text-sm md:text-base text-gray-400 max-w-lg mx-auto mb-8 leading-relaxed font-light">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <motion.a href="#projects" className="btn-primary flex items-center gap-2">
              {t.hero.ctaProjects}
              <ArrowRight size={14} />
            </motion.a>
            <motion.a href={profile.links.cv} className="btn-secondary flex items-center gap-2">
              <Download size={14} />
              {t.hero.ctaResume}
            </motion.a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 border-y border-white/5 opacity-60 hover:opacity-100 transition-opacity">
            <div className="text-center">
              <div className="text-base font-display font-bold text-white mb-0.5">{t.hero.metrics.senior}</div>
              <div className="text-[8px] uppercase tracking-widest font-mono text-gray-500">{t.hero.metrics.expertise}</div>
            </div>
            <div className="text-center">
              <div className="text-base font-display font-bold text-white mb-0.5">{t.hero.metrics.years}</div>
              <div className="text-[8px] uppercase tracking-widest font-mono text-gray-500">{t.hero.metrics.experience}</div>
            </div>
            <div className="text-center">
              <div className="text-base font-display font-bold text-white mb-0.5">{t.hero.metrics.projects}</div>
              <div className="text-[8px] uppercase tracking-widest font-mono text-gray-500">{t.hero.metrics.projectsLabel}</div>
            </div>
            <div className="text-center">
              <div className="text-base font-display font-bold text-white mb-0.5">{t.hero.metrics.available}</div>
              <div className="text-[8px] uppercase tracking-widest font-mono text-gray-500">{t.hero.metrics.availability}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-8 hidden lg:block">
        <div className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.3em] text-white/20">
          <div className="w-6 h-px bg-white/20" />
          {t.common.scroll}
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="text-[9px] font-mono tracking-widest text-white/40">
          [ {profile.location.coords} ]
        </div>
      </div>

      <div className="noise-bg absolute inset-0 mix-blend-soft-light opacity-50" />
    </section>
  );
}
