import { SectionWrapper } from '../ui/SectionWrapper';
import { SKILLS } from '../../constants/data';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import type { SkillCategory } from '../../types';

const coreChip = 'border-accent/40 bg-accent/10 text-fg';
const regularChip = 'border-line bg-tint-2 text-body-muted';

export function Skills() {
  const { t } = useApp();
  const categories: { key: SkillCategory; label: string }[] = [
    { key: 'Frontend', label: t.skills.categories.frontend },
    { key: 'Backend', label: t.skills.categories.backend },
    { key: 'Database', label: t.skills.categories.database },
    { key: 'Tools', label: t.skills.categories.tools },
  ];

  return (
    <SectionWrapper id="skills">
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="section-label">{t.skills.label}</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 italic uppercase">
            {t.skills.title1} <br />
            <span className="text-fg-dim">{t.skills.title2}</span>
          </h2>
          <p className="max-w-xl text-body-muted text-sm font-light leading-relaxed">{t.skills.description}</p>
        </div>
        {/* Légende : explique la mise en avant des pastilles. */}
        <p className="flex items-center gap-2 text-xs text-body-muted shrink-0" aria-hidden="true">
          <span className={`inline-block h-3 w-3 rounded-sm border ${coreChip}`} />
          {t.skills.coreLegend}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {categories.map((cat, idx) => (
          <motion.section
            key={cat.key}
            aria-labelledby={`skills-${cat.key}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (idx % 2) * 0.06 }}
            className="p-4 sm:p-5 rounded-2xl bg-tint-1 border border-line-soft"
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-[11px] font-mono text-accent" aria-hidden="true">
                0{idx + 1}
              </span>
              <h3 id={`skills-${cat.key}`} className="text-[11px] font-bold uppercase tracking-[0.15em] text-fg-subtle">
                {cat.label}
              </h3>
            </div>
            <ul className="flex flex-wrap gap-1.5 sm:gap-2">
              {SKILLS.filter((s) => s.category === cat.key).map((skill) => (
                <li
                  key={skill.name}
                  className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border text-[13px] sm:text-sm ${skill.core ? `${coreChip} font-medium` : `${regularChip} font-light`}`}
                >
                  {skill.name}
                  {skill.core && <span className="sr-only"> ({t.skills.coreLegend})</span>}
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
    </SectionWrapper>
  );
}
