export interface Project {
  id: string;
  title: string;
  description: string;
  outcome?: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  githubBackendUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}
