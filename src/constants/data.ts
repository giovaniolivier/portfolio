import { Project, Skill, Experience } from '../types';

export const PROJECTS: Project[] = [
  {
    id: '9',
    title: 'JobRadar',
    description:
      'Assistant de veille et de tri d’offres : CV → analyse scorée → pipeline → lettre de motivation, avec auth, notifs email et PWA.',
    outcome:
      'Isolation multi-utilisateur, SMTP forcé en prod, IA multi-fournisseurs (Gemini/Groq/Claude), i18n FR/EN et déploiement Docker.',
    technologies: ['React', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'Vite'],
    imageUrl:
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2426&auto=format&fit=crop',
    githubUrl: 'https://github.com/giovaniolivier/JobRadar',
  },
  {
    id: '1',
    title: 'TaskMaster',
    description: 'Application moderne de gestion de tâches avec priorités, catégorisation, filtrage avancé et calendrier intégré.',
    outcome: 'Interface clair/sombre, composants Shadcn/Radix et persistance via local storage.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2439&auto=format&fit=crop',
    githubUrl: 'https://github.com/giovaniolivier/taskmaster',
    liveUrl: 'https://taskmaster-dusky.vercel.app',
  },
  {
    id: '2',
    title: 'Business Plan Generator',
    description: 'Application web permettant aux entrepreneurs de générer des business plans professionnels avec visualisation Business Model Canvas.',
    outcome: 'Formulaire multi-étapes, export PDF et intégration API pour une expérience fluide.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    liveUrl: 'https://bp-mg.vercel.app',
  },
  {
    id: '4',
    title: 'JobPrive',
    description: 'Plateforme de recrutement premium reliant recruteurs et candidats via des entretiens en format « vente privée » — créneaux limités, réservation et paiement en ligne.',
    outcome: 'Architecture 3 modules (frontend React, API Laravel, backoffice admin), paiements Stripe/MangoPay, messagerie Socket.io et multilingue FR/EN.',
    technologies: ['React', 'TypeScript', 'Laravel', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2426&auto=format&fit=crop',
    liveUrl: 'https://dev.jobprive.fr/recruiter',
  },
];

export const SKILLS: Skill[] = [
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'HTML5 / CSS3', category: 'Frontend' },
  { name: 'React.js', category: 'Frontend' },
  { name: 'React Native', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Express', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Prisma', category: 'Backend' },
  { name: 'SQL', category: 'Backend' },
  { name: 'MySQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'SQLite', category: 'Database' },
  { name: 'Git', category: 'Tools' },
  { name: 'Figma', category: 'Tools' },
  { name: 'Adobe XD', category: 'Tools' },
];

export const EXPERIENCES: Experience[] = [
  {
    id: '8',
    role: 'Développeur Mobile — AZ Driver',
    company: 'AZ+',
    period: '2026',
    description: 'Développement de l\'application Android (APK) pour les livreurs AZ+ : courses et livraisons express, géolocalisation, notifications push, caisse et synchronisation temps réel des commandes.',
    technologies: ['React Native', 'TypeScript', 'Socket.io', 'Axios', 'Notifee'],
  },
  {
    id: '7',
    role: 'Développeur Full Stack — AZLive',
    company: 'AZ+',
    period: '2026',
    description: 'Développement front React/TypeScript et API Django pour une plateforme de live shopping : capture automatique des « JP », gestion produits/commandes, intégrations TikTok/Facebook et diffusion vidéo en direct.',
    technologies: ['React', 'TypeScript', 'Django', 'Gemini AI', 'Tailwind CSS'],
  },
  {
    id: '6',
    role: 'Développeur Frontend — JobPrive',
    company: 'Relia Consulting',
    period: '2026',
    description: 'Développement frontend React/TypeScript pour candidats et recruteurs, intégration API Laravel, réservation de créneaux d\'entretien, paiements en ligne et messagerie temps réel.',
    technologies: ['React', 'TypeScript', 'Laravel', 'Stripe', 'Socket.io'],
  },
  {
    id: '2',
    role: 'Développeur Frontend — Business Plan Generator',
    company: 'Relia Consulting',
    period: '2025',
    description: 'Interface Next.js/TypeScript, formulaire multi-étapes React Hook Form/Zod, export PDF jsPDF et intégration API Axios.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Hook Form', 'Zod'],
  },
  {
    id: '4',
    role: 'Stage — Conception Simulateur Prélèvement à la Source',
    company: 'Direction Régionale des Impôts',
    period: '2022',
    description: 'Développement d\'algorithmes de calcul fiscal, interface utilisateur React.js et formation du personnel pour la digitalisation des services fiscaux.',
    technologies: ['React.js', 'JavaScript', 'HTML5 / CSS3'],
  },
  {
    id: '5',
    role: 'Stage — Procédure Débogage Crédit SI',
    company: 'SMMEC',
    period: '2021',
    description: 'Analyse du système d\'information, outils de débogage/validation automatisés et correction d\'anomalies du système de gestion de crédits.',
    technologies: ['SQL', 'JavaScript', 'Git'],
  },
];
