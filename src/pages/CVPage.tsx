import { useState } from 'react';
import { ArrowLeft, Languages, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { profile } from '../constants/profile';
import { EXPERIENCES, PROJECTS, SKILLS } from '../constants/data';
import { localize } from '../lib/localize';
import type { Language, Project, SkillCategory } from '../types';

/** Projets perso du CV, dans l'ordre d'affichage (ids de PROJECTS). */
const CV_PROJECT_IDS = ['taskmaster', 'jobradar'];

function goHome() {
  window.history.pushState({}, '', '/');
  window.dispatchEvent(new PopStateEvent('popstate'));
}

/** Télécharge le PDF pré-généré (npm run generate:cv). Renvoie false s'il est introuvable. */
async function downloadCvPdf(language: Language): Promise<boolean> {
  const href = language === 'en' ? '/cv-en.pdf' : '/cv-fr.pdf';
  const filename = language === 'en' ? 'CV-Olivier-Lovasoa-EN.pdf' : 'CV-Olivier-Lovasoa-FR.pdf';
  try {
    const res = await fetch(href, { cache: 'no-store' });
    if (!res.ok) throw new Error(`PDF unavailable (${res.status})`);
    const url = URL.createObjectURL(await res.blob());
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function CVPage() {
  const { t, language, setLanguage } = useApp();
  const [pdfMissing, setPdfMissing] = useState(false);
  const role = profile.role[language];

  const experiences = EXPERIENCES.filter((e) => !e.internship);
  const personalProjects = CV_PROJECT_IDS.map((id) => PROJECTS.find((p) => p.id === id)).filter(
    (p): p is Project => Boolean(p),
  );

  const skillGroups: { key: SkillCategory; label: string }[] = [
    { key: 'Frontend', label: t.skills.categories.frontend },
    { key: 'Backend', label: t.skills.categories.backend },
    { key: 'Database', label: t.skills.categories.database },
    { key: 'Tools', label: t.skills.categories.tools },
  ];

  async function handleDownload() {
    setPdfMissing(false);
    const ok = await downloadCvPdf(language);
    if (!ok) setPdfMissing(true);
  }

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
            aria-label={t.a11y.switchLanguage}
          >
            <Languages size={14} aria-hidden="true" />
            {language.toUpperCase()}
          </button>
          <button type="button" onClick={handleDownload} className="cv-toolbar-btn cv-toolbar-btn-primary">
            <Download size={14} aria-hidden="true" />
            {t.cv.print}
          </button>
        </div>
      </div>
      {pdfMissing && (
        <p role="alert" className="cv-toolbar print:hidden text-xs">
          {t.cv.pdfMissing}
        </p>
      )}

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
                    <h3 className="cv-item-title">{localize(exp.role, language)}</h3>
                    <p className="cv-item-meta">{localize(exp.company, language)}</p>
                  </div>
                  <time className="cv-item-period">{exp.period}</time>
                </div>
                <p className="cv-text">{localize(exp.description, language)}</p>
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
                <h3 className="cv-item-title">{localize(project.title, language)}</h3>
                <p className="cv-text">{localize(project.description, language)}</p>
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
          <p className="cv-text" style={{ whiteSpace: 'pre-line' }}>{t.experience.focusDesc}</p>
        </section>
      </article>
    </div>
  );
}
