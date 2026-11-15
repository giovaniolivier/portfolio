import { SectionWrapper } from '../ui/SectionWrapper';
import { EXPERIENCES } from '../../constants/data';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { localize } from '../../lib/localize';

export function Experience() {
  const { t, language } = useApp();

  return (
    <SectionWrapper id="experience" className="pt-24! md:pt-32!">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-[38%] sticky top-24 h-fit">
          <span className="section-label">{t.experience.label}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-[0.95] tracking-tighter uppercase">
            {t.experience.title1} <br />
            <span className="text-white/50 italic font-light">{t.experience.title2}</span>
          </h2>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/12 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                {t.experience.focus}
              </h3>
            </div>
            <p className="text-xs font-light leading-relaxed text-gray-300 whitespace-pre-line">
              {t.experience.focusDesc}
            </p>
          </div>
        </div>

        <ol className="md:w-[62%] space-y-10">
          {EXPERIENCES.map((exp, idx) => (
            <motion.li
              key={exp.id}
              initial={{ opacity: 0.35, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.06 }}
              className="group relative"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl font-display font-black text-white/15 italic shrink-0" aria-hidden="true">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors truncate">
                    {localize(exp.role, language)}
                  </h3>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase whitespace-nowrap">
                  {exp.period}
                </span>
              </div>

              <div className="text-sm font-medium text-white/75 mb-3 font-display italic">
                {localize(exp.company, language)}
              </div>

              <p className="text-gray-300 font-light leading-relaxed text-sm max-w-md">
                {localize(exp.description, language)}
              </p>

              {exp.technologies.length > 0 && (
                <ul className="flex flex-wrap gap-1.5 mt-3 max-w-md">
                  {exp.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="px-2 py-0.5 text-[10px] uppercase tracking-widest font-black bg-white/5 text-white/60 border border-white/10 rounded"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-10 h-px w-full bg-white/10" aria-hidden="true" />
            </motion.li>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  );
}
