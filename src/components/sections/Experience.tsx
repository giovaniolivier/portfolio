import { SectionWrapper } from '../ui/SectionWrapper';
import { EXPERIENCES } from '../../constants/data';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import type { Experience as ExperienceItem } from '../../types';

export function Experience() {
  const { t } = useApp();

  const experiences: ExperienceItem[] = EXPERIENCES.map((e) => {
    const localized = t.experience.items.find((item: { id: string }) => item.id === e.id);
    return {
      id: e.id,
      role: localized?.role ?? e.role,
      company: localized?.company ?? e.company,
      period: localized?.period ?? e.period,
      description: localized?.description ?? e.description,
      technologies: e.technologies,
    };
  });

  return (
    <SectionWrapper id="experience" className="!pt-24 md:!pt-32">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-[38%] sticky top-24 h-fit">
          <span className="section-label">{t.experience.label}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-[0.95] tracking-tighter uppercase">
            {t.experience.title1} <br />
            <span className="text-white/45 italic font-light">{t.experience.title2}</span>
          </h2>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/12 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">
                {t.experience.focus}
              </span>
            </div>
            <p className="text-xs font-light leading-relaxed text-gray-300">
              {t.experience.focusDesc}
            </p>
          </div>
        </div>

        <div className="md:w-[62%]">
          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0.35, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.06 }}
                className="group relative"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl font-display font-black text-white/15 italic shrink-0">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors truncate">
                      {exp.role}
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-white/45 uppercase whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <div className="text-sm font-medium text-white/75 mb-3 font-display italic">
                  {exp.company}
                </div>

                <p className="text-gray-300 font-light leading-relaxed text-sm max-w-md">
                  {exp.description}
                </p>

                {exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 max-w-md">
                    {exp.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[8px] uppercase tracking-widest font-black bg-white/5 text-white/55 border border-white/10 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-10 h-px w-full bg-white/10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
