import { motion } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';
import { Project } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useApp();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-card-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-500 shadow-xl dark-card"
    >
      <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="p-5 flex flex-col grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-base font-bold font-display text-white group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-1.5 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
                aria-label="GitHub frontend"
                title="Frontend"
              >
                <Github size={14} />
              </a>
            )}
            {project.githubBackendUrl && (
              <a
                href={project.githubBackendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
                aria-label="GitHub backend"
                title="Backend"
              >
                <Github size={14} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
                aria-label="Live demo"
              >
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-400 font-light leading-relaxed text-xs mb-3 grow">
          {project.description}
        </p>

        {project.outcome && (
          <div className="mb-3 p-3 rounded-lg bg-white/3 border border-white/5">
            <div className="text-[8px] uppercase font-bold tracking-widest text-accent mb-0.5">
              {t.projects.impact}
            </div>
            <p className="text-xs text-gray-300 font-light italic">"{project.outcome}"</p>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[8px] uppercase tracking-widest font-black bg-white/3 text-white/40 border border-white/5 rounded group-hover:border-accent/20 group-hover:text-accent/60 transition-all duration-500"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
