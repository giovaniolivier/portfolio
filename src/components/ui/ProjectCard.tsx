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

// 40 px : zone tactile confortable (WCAG 2.5.8 demande au moins 24 px).
const iconLinkClass =
  'w-10 h-10 flex items-center justify-center rounded-full bg-tint-3 hover:bg-tint-4 text-fg-subtle hover:text-fg transition-all';

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { t, language } = useApp();
  const title = localize(project.title, language);
  const description = localize(project.description, language);
  const highlights = project.highlights?.[language] ?? [];
  const hasBothRepos = Boolean(project.githubUrl && project.githubBackendUrl);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 2) * 0.08 }}
      className="group relative flex flex-col w-full bg-surface rounded-2xl overflow-hidden border border-line-soft hover:border-line-strong transition-all duration-500 shadow-card"
    >
      <div
        className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />

      {/* Cadre 2:1, le format des captures : l'image n'est plus rognée sur les côtés. */}
      <div className="relative aspect-2/1 overflow-hidden border-b border-line-soft">
        <img
          src={project.imageUrl}
          alt={title}
          width={800}
          height={400}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-veil" aria-hidden="true" />
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="flex justify-between items-center mb-3 gap-3">
          <h3 className="text-lg font-bold font-display text-fg group-hover:text-accent transition-colors">
            {title}
          </h3>
          <div className="flex gap-2 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
                aria-label={`${title} — ${hasBothRepos ? t.a11y.sourceFrontend : t.a11y.sourceCode}`}
                title={hasBothRepos ? t.a11y.sourceFrontend : t.a11y.sourceCode}
              >
                <Github size={16} aria-hidden="true" />
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
                <Github size={16} aria-hidden="true" />
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
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <p className="text-body-muted font-light leading-relaxed text-sm mb-4 grow">{description}</p>

        {highlights.length > 0 && (
          <div className="mb-4 p-4 rounded-lg bg-tint-2 border border-line-soft">
            <h4 className="text-[11px] uppercase font-bold tracking-[0.15em] text-accent mb-2">{t.projects.impact}</h4>
            <ul className="space-y-1.5">
              {highlights.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-body font-light leading-snug">
                  <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="px-2 py-0.5 text-[11px] uppercase tracking-[0.12em] font-bold bg-tint-2 text-fg-subtle border border-line-soft rounded group-hover:border-accent/20 group-hover:text-accent transition-all duration-500"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
