import { motion } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '../../types';
import { useApp } from '../../context/AppContext';
import { localize } from '../../lib/localize';

interface ProjectCardProps {
  project: Project;
  /** Position dans la grille, pour décaler l'apparition. */
  index?: number;
}

const iconLinkClass =
  'p-1.5 rounded-full bg-tint-3 hover:bg-tint-4 text-fg-subtle hover:text-fg transition-all';

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { t, language } = useApp();
  const title = localize(project.title, language);
  const description = localize(project.description, language);
  const outcome = localize(project.outcome, language);
  const hasBothRepos = Boolean(project.githubUrl && project.githubBackendUrl);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative flex flex-col w-full bg-surface rounded-2xl overflow-hidden border border-line-soft hover:border-line-strong transition-all duration-500 shadow-card"
    >
      <div
        className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-veil" aria-hidden="true" />
      </div>

      <div className="p-5 flex flex-col grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-base font-bold font-display text-fg group-hover:text-accent transition-colors">
            {title}
          </h3>
          <div className="flex gap-1.5 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
                aria-label={`${title} — ${hasBothRepos ? t.a11y.sourceFrontend : t.a11y.sourceCode}`}
                title={hasBothRepos ? t.a11y.sourceFrontend : t.a11y.sourceCode}
              >
                <Github size={14} aria-hidden="true" />
              </a>
            )}
            {project.githubBackendUrl && (
              <a
                href={project.githubBackendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
                aria-label={`${title} — ${t.a11y.sourceBackend}`}
                title={t.a11y.sourceBackend}
              >
                <Github size={14} aria-hidden="true" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
                aria-label={`${title} — ${t.a11y.liveDemo}`}
                title={t.a11y.liveDemo}
              >
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <p className="text-body-muted font-light leading-relaxed text-xs mb-3 grow">{description}</p>

        {outcome && (
          <div className="mb-3 p-3 rounded-lg bg-tint-2 border border-line-soft">
            <div className="text-[10px] uppercase font-bold tracking-widest text-accent mb-0.5">
              {t.projects.impact}
            </div>
            <p className="text-xs text-body font-light italic">"{outcome}"</p>
          </div>
        )}

        <ul className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="px-2 py-0.5 text-[10px] uppercase tracking-widest font-black bg-tint-2 text-fg-subtle border border-line-soft rounded group-hover:border-accent/20 group-hover:text-accent transition-all duration-500"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
