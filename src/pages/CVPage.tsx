import { ArrowLeft, Languages, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { profile } from '../constants/profile';
import { EXPERIENCES, PROJECTS, SKILLS } from '../constants/data';
import type { Experience as ExperienceItem } from '../types';

/** Projets perso (hors expériences pro déjà listées) */
const CV_PERSONAL_PROJECT_IDS = ['1', '9'] as const;

function goHome() {
  window.history.pushState({}, '', '/');
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function downloadCvPdf(language: 'fr' | 'en') {
  const href = language === 'en' ? '/cv-en.pdf' : '/cv-fr.pdf';
  const filename = language === 'en' ? 'CV-Olivier-Lovasoa-EN.pdf' : 'CV-Olivier-Lovasoa-FR.pdf';

  void (async () => {
    try {
      const res = await fetch(href, { cache: 'no-store' });
      if (!res.ok) throw new Error(`PDF unavailable (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      window.alert(
        language === 'en'
          ? 'PDF not found. Run npm run generate:cv then retry.'
          : 'PDF introuvable. Lancez npm run generate:cv puis réessayez.',
      );
    }
  })();
}

export function CVPage() {
  const { t, language, setLanguage } = useApp();
  const role = profile.role[language];

  const experiences: ExperienceItem[] = EXPERIENCES.filter(
    (e) => !/^Stage\b/i.test(e.role) && !/^Internship\b/i.test(e.role),
  ).map((e) => {
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

  const personalProjects = CV_PERSONAL_PROJECT_IDS.map((id) => {
    const base = PROJECTS.find((p) => p.id === id);
    if (!base) return null;
    const localized = t.projects.items.find((item: { id: string }) => item.id === id);
    return {
      id: base.id,
      title: localized?.title ?? base.title,
      description: localized?.description ?? base.description,
      technologies: base.technologies,
      liveUrl: base.liveUrl,
      githubUrl: base.githubUrl,
    };
  }).filter(Boolean) as Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
  }>;

  const skillGroups = [
    { key: 'Frontend' as const, label: t.skills.categories.frontend },
    { key: 'Backend' as const, label: t.skills.categories.backend },
    { key: 'Database' as const, label: t.skills.categories.database },
    { key: 'Tools' as const, label: t.skills.categories.tools },
  ];

  return (
    <div className="cv-page">
      <div className="cv-toolbar print:hidden">
        <button type="button" onClick={goHome} className="cv-toolbar-btn">
          <ArrowLeft size={14} aria-hidden="true" />
          {t.cv.back}
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="cv-toolbar-btn"
            aria-label="Change language"
          >
            <Languages size={14} aria-hidden="true" />
            {language.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={() => downloadCvPdf(language)}
            className="cv-toolbar-btn cv-toolbar-btn-primary"
          >
            <Download size={14} aria-hidden="true" />
            {t.cv.print}
          </button>
        </div>
      </div>

      <article className="cv-sheet">
        <header className="cv-header">
          <div>
            <h1 className="cv-name">{profile.name.full}</h1>
            <p className="cv-role">{role}</p>
          </div>
          <ul className="cv-contacts">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            </li>
            <li>{profile.location.label}</li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              {' · '}
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </header>

        <section className="cv-section">
          <h2 className="cv-section-title">{t.cv.summaryTitle}</h2>
          <p className="cv-text">{t.cv.summary}</p>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">{t.cv.experienceTitle}</h2>
          <ul className="cv-list">
            {experiences.map((exp) => (
              <li key={exp.id} className="cv-item">
                <div className="cv-item-head">
                  <div>
                    <h3 className="cv-item-title">{exp.role}</h3>
                    <p className="cv-item-meta">{exp.company}</p>
                  </div>
                  <time className="cv-item-period">{exp.period}</time>
                </div>
                <p className="cv-text">{exp.description}</p>
                {exp.technologies.length > 0 && (
                  <p className="cv-tech">{exp.technologies.join(' · ')}</p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">{t.cv.projectsTitle}</h2>
          <ul className="cv-list">
            {personalProjects.map((project) => (
              <li key={project.id} className="cv-item">
                <h3 className="cv-item-title">{project.title}</h3>
                <p className="cv-text">{project.description}</p>
                <p className="cv-tech">{project.technologies.join(' · ')}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">{t.cv.skillsTitle}</h2>
          <div className="cv-skills">
            {skillGroups.map((group) => {
              const skills = SKILLS.filter((s) => s.category === group.key).map((s) => s.name);
              if (!skills.length) return null;
              return (
                <p key={group.key} className="cv-text">
                  <span className="cv-skill-label">{group.label} — </span>
                  {skills.join(', ')}
                </p>
              );
            })}
          </div>
        </section>

        <section className="cv-section">
          <h2 className="cv-section-title">{t.cv.educationTitle}</h2>
          <p className="cv-text">{t.experience.focusDesc}</p>
        </section>
      </article>
    </div>
  );
}
