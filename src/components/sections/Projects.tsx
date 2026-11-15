import { SectionWrapper } from '../ui/SectionWrapper';
import { ProjectCard } from '../ui/ProjectCard';
import { PROJECTS } from '../../constants/data';
import { useApp } from '../../context/AppContext';
import { profile } from '../../constants/profile';

export function Projects() {
  const { t } = useApp();

  return (
    <SectionWrapper id="projects" className="bg-white/2">
      <div className="text-center mb-10">
        <span className="section-label">{t.projects.label}</span>
        <h2 className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight mb-3 uppercase">
          {t.projects.title1}{' '}
          <span className="text-white/50 italic font-light">{t.projects.title2}</span>
        </h2>
        <p className="max-w-lg mx-auto text-gray-300 text-sm font-light">{t.projects.description}</p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((project, i) => (
          <li key={project.id} className="flex">
            <ProjectCard project={project} index={i} />
          </li>
        ))}
      </ul>

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
