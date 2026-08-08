import { SectionWrapper } from '../ui/SectionWrapper';
import { EXPERIENCES } from '../../constants/data';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';

export function Experience() {
  const { t } = useApp();

  const experiences = EXPERIENCES.map((e) => ({
    ...e,
    ...t.experience.items.find((item: { id: string }) => item.id === e.id),
  }));

  return (
    <SectionWrapper id="experience">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-[38%] sticky top-24 h-fit">
          <span className="section-label">{t.experience.label}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-[0.95] tracking-tighter uppercase">
            {t.experience.title1} <br />
            <span className="text-white/20 italic font-light">{t.experience.title2}</span>
          </h2>
          <div className="p-5 rounded-2xl bg-white/3 border border-white/8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">
                {t.experience.focus}
              </span>
            </div>
            <p className="text-xs font-light leading-relaxed text-gray-400">
              {t.experience.focusDesc}
            </p>
          </div>
        </div>

        <div className="md:w-[62%]">
          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group relative"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl font-display font-black text-white/5 italic shrink-0">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors truncate">
                      {exp.role}
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-white/20 uppercase whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <div className="text-sm font-medium text-white/60 mb-3 font-display italic">
                  {exp.company}
                </div>

                <p className="text-gray-500 font-light leading-relaxed text-sm max-w-md">
                  {exp.description}
                </p>

                <div className="mt-10 h-px w-full bg-white/5" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
