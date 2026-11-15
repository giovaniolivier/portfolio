import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, FileText, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { profile } from '../../constants/profile';

export function Hero() {
  const { scrollY } = useScroll();
  const { t } = useApp();
  const reduceMotion = useReducedMotion();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const metrics = [
    { value: `${profile.stats.years} ${t.hero.metrics.yearsUnit}`, label: t.hero.metrics.experience },
    { value: profile.stats.projects, label: t.hero.metrics.projectsLabel },
    { value: t.hero.metrics.stack, label: t.hero.metrics.stackLabel },
    { value: t.hero.metrics.platforms, label: t.hero.metrics.platformsLabel },
  ];

  return (
    <section className="min-h-screen relative flex items-center justify-center pt-16 overflow-hidden bg-main">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen aspect-square hero-glow blur-[100px]" />
      </div>

      <motion.div
        style={reduceMotion ? undefined : { y, opacity, scale }}
        className="max-w-3xl mx-auto px-5 text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">{t.hero.status}</span>

          <h1 className="text-4xl md:text-6xl font-bold leading-[0.9] tracking-tighter text-fg mb-6 text-gradient uppercase">
            {t.hero.title1} <br />
            <span className="italic font-light text-fg-subtle">{t.hero.title2}</span> <br />
            {t.hero.title3}
          </h1>

          <p className="text-sm md:text-base text-body max-w-xl mx-auto mb-8 leading-relaxed font-light">
            {t.hero.description}
          </p>

          {/* Projets d'abord ; le CV juste après, c'est l'action n°2 d'un recruteur. */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <a href="#projects" className="btn-primary flex items-center gap-2">
              {t.hero.ctaProjects}
              <ArrowRight size={14} aria-hidden="true" />
            </a>
            <a href={profile.links.cv} className="btn-secondary flex items-center gap-2">
              <FileText size={14} aria-hidden="true" />
              {t.hero.ctaResume}
            </a>
            <a href="#contact" className="btn-secondary flex items-center gap-2">
              <Mail size={14} aria-hidden="true" />
              {t.hero.ctaContact}
            </a>
          </div>

          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 border-y border-line">
            {metrics.map((m) => (
              <div key={m.label} className="text-center flex flex-col-reverse">
                <dt className="text-[11px] uppercase tracking-widest font-mono text-body-muted">{m.label}</dt>
                <dd className="text-base font-display font-bold text-fg mb-0.5">{m.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>

      <div className="noise-bg absolute inset-0 mix-blend-soft-light opacity-50" aria-hidden="true" />
    </section>
  );
}
