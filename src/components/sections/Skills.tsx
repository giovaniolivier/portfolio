import { SectionWrapper } from '../ui/SectionWrapper';
import { SKILLS } from '../../constants/data';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';

export function Skills() {
  const { t } = useApp();
  const categories = [
    { key: 'Frontend', label: t.skills.categories.frontend },
    { key: 'Backend', label: t.skills.categories.backend },
    { key: 'Database', label: t.skills.categories.database },
    { key: 'Tools', label: t.skills.categories.tools },
  ] as const;

  return (
    <SectionWrapper id="skills">
      <div className="mb-12">
        <span className="section-label">{t.skills.label}</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 italic uppercase">
          {t.skills.title1} <br />
          <span className="text-white/20">{t.skills.title2}</span>
        </h2>
        <p className="max-w-xl text-gray-500 text-sm font-light leading-relaxed">
          {t.skills.description}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
          >
            <div className="group">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[9px] font-mono text-accent">0{idx + 1}</span>
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 group-hover:text-white transition-colors">
                  {cat.label}
                </h3>
              </div>
              <ul className="space-y-2">
                {SKILLS.filter((s) => s.category === cat.key).map((skill) => (
                  <li key={skill.name} className="flex items-center gap-2 group/item">
                    <div className="w-1 h-1 rounded-full bg-white/10 group-hover/item:bg-accent transition-colors" />
                    <span className="text-sm font-light text-gray-400 group-hover/item:text-white transition-colors">
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
