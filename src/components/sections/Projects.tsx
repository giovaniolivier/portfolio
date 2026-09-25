import { SectionWrapper } from '../ui/SectionWrapper';
import { ProjectCard } from '../ui/ProjectCard';
import { PROJECTS } from '../../constants/data';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { profile } from '../../constants/profile';

export function Projects() {
  const { t } = useApp();

  const projects = PROJECTS.map((p) => ({
    ...p,
    ...t.projects.items.find((item: { id: string }) => item.id === p.id),
  })).filter((p) => Boolean(p.title?.trim()) && Boolean(p.description?.trim()));

  return (
    <SectionWrapper id="projects" className="bg-white/2">
      <div className="text-center mb-10">
        <span className="section-label">{t.projects.label}</span>
        <h2 className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight mb-3 uppercase">
          {t.projects.title1}{' '}
          <span className="text-white/45 italic font-light">{t.projects.title2}</span>
        </h2>
        <p className="max-w-lg mx-auto text-gray-300 text-sm font-light">
          {t.projects.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary uppercase tracking-widest text-[10px] inline-block"
        >
          {t.projects.viewMore}
        </a>
      </div>
    </SectionWrapper>
  );
}
