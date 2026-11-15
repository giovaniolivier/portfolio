export type Language = 'fr' | 'en';

/** Texte identique dans toutes les langues, ou décliné par langue. */
export type LocalizedText = string | Record<Language, string>;

/** Liste de puces déclinée par langue. */
export type LocalizedList = Record<Language, string[]>;

export interface Project {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  /** Points clés, affichés en liste à puces. */
  highlights?: LocalizedList;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  githubBackendUrl?: string;
  liveUrl?: string;
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Tools';

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface Experience {
  id: string;
  role: LocalizedText;
  company: LocalizedText;
  period: string;
  description: LocalizedText;
  technologies: string[];
  /** Les stages sont exclus du CV. */
  internship?: boolean;
}
