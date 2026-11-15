import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { EXPERIENCES } from '../../constants/data';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { localize } from '../../lib/localize';

const LIST_ID = 'experience-list';

export function Experience() {
  const { t, language } = useApp();
  // Mobile uniquement : les stages sont repliés pour raccourcir la page.
  const [showInternships, setShowInternships] = useState(false);
  const internshipCount = EXPERIENCES.filter((e) => e.internship).length;

  return (
    <SectionWrapper id="experience">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-[38%] sticky top-24 h-fit">
          <span className="section-label">{t.experience.label}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-[0.95] tracking-tighter uppercase">
            {t.experience.title1} <br />
            <span className="text-fg-dim italic font-light">{t.experience.title2}</span>
          </h2>
          <div className="p-5 rounded-2xl bg-tint-3 border border-line backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-fg-muted">
                {t.experience.focus}
              </h3>
            </div>
            <p className="text-xs font-light leading-relaxed text-body whitespace-pre-line">
              {t.experience.focusDesc}
            </p>
          </div>
        </div>

        <div className="md:w-[62%]">
        <ol id={LIST_ID} className="space-y-8">
          {EXPERIENCES.map((exp, idx) => (
            <motion.li
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`group relative ${exp.internship && !showInternships ? 'hidden md:block' : ''}`}
            >
              {/* L'intitulé passe à la ligne au lieu d'être tronqué (mobile). */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="text-2xl font-display font-black text-fg-faint italic shrink-0" aria-hidden="true">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold leading-snug text-fg group-hover:text-accent transition-colors text-balance">
                    {localize(exp.role, language)}
                  </h3>
                </div>
                <span className="pt-1.5 text-[11px] font-mono tracking-[0.12em] text-fg-subtle uppercase whitespace-nowrap">
                  {exp.period}
                </span>
              </div>

              <div className="text-sm font-medium text-fg-muted mb-3 font-display italic">
                {localize(exp.company, language)}
              </div>

              <p className="text-body font-light leading-relaxed text-sm max-w-md">
                {localize(exp.description, language)}
              </p>

              {exp.technologies.length > 0 && (
                <ul className="flex flex-wrap gap-1.5 mt-3 max-w-md">
                  {exp.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="px-2 py-0.5 text-[11px] uppercase tracking-widest font-black bg-tint-3 text-fg-subtle border border-line rounded"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 h-px w-full bg-line" aria-hidden="true" />
            </motion.li>
          ))}
        </ol>

        {internshipCount > 0 && (
          <button
            type="button"
            onClick={() => setShowInternships((v) => !v)}
            aria-expanded={showInternships}
            aria-controls={LIST_ID}
            className="md:hidden mt-6 w-full h-11 inline-flex items-center justify-center gap-2 rounded-full border border-line bg-tint-2 text-sm font-medium text-fg-muted hover:text-fg transition-colors"
          >
            {showInternships ? t.experience.hideInternships : `${t.experience.showInternships} (${internshipCount})`}
            <ChevronDown
              size={16}
              aria-hidden="true"
              className={`transition-transform ${showInternships ? 'rotate-180' : ''}`}
            />
          </button>
        )}
        </div>
      </div>
    </SectionWrapper>
  );
}
