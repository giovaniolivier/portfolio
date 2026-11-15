import type { Experience, Project, Skill } from '../types';

/**
 * Contenu du portfolio. Chaque élément porte ses textes FR et EN :
 * c'est la seule source, utilisée par le site et par la page CV.
 * L'ordre des tableaux est l'ordre d'affichage.
 */

export const PROJECTS: Project[] = [
  {
    id: 'jobradar',
    title: 'JobRadar',
    description: {
      fr: 'Assistant de veille et de tri d’offres : CV → analyse scorée → pipeline → lettre de motivation, avec auth, notifs email et PWA.',
      en: 'Job-search assistant: CV → scored analysis → pipeline → cover letter, with auth, email alerts, and PWA.',
    },
    outcome: {
      fr: 'Isolation multi-utilisateur, SMTP forcé en prod, IA multi-fournisseurs (Gemini/Groq/Claude), i18n FR/EN et déploiement Docker.',
      en: 'Per-user data isolation, SMTP required in production, multi-provider AI (Gemini/Groq/Claude), FR/EN i18n, and Docker deploy.',
    },
    technologies: ['React', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'Vite'],
    imageUrl: '/projects/jobradar.png',
    githubUrl: 'https://github.com/giovaniolivier/JobRadar',
    liveUrl: 'https://jobradar-web-ewb5.onrender.com/',
  },
  {
    id: 'taskmaster',
    title: 'TaskMaster',
    description: {
      fr: 'Application moderne de gestion de tâches avec priorités, catégorisation, filtrage avancé et calendrier intégré.',
      en: 'Modern task management app with priorities, categorization, advanced filtering, and an integrated calendar.',
    },
    outcome: {
      fr: 'Interface clair/sombre, composants Shadcn/Radix et persistance via local storage.',
      en: 'Light/dark UI, Shadcn/Radix components, and local storage persistence.',
    },
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    imageUrl: '/projects/taskmaster.png',
    githubUrl: 'https://github.com/giovaniolivier/taskmaster',
    liveUrl: 'https://taskmaster-dusky.vercel.app',
  },
  {
    id: 'business-plan-generator',
    title: 'Business Plan Generator',
    description: {
      fr: 'Application web permettant aux entrepreneurs de générer des business plans professionnels avec visualisation Business Model Canvas.',
      en: 'Web app helping entrepreneurs generate professional business plans with Business Model Canvas visualization.',
    },
    outcome: {
      fr: 'Formulaire multi-étapes, export PDF et intégration API pour une expérience fluide.',
      en: 'Multi-step form, PDF export, and API integration for a smooth workflow.',
    },
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI'],
    imageUrl: '/projects/bpg.png',
    liveUrl: 'https://bp-mg.vercel.app',
  },
  {
    id: 'jobprive',
    title: 'JobPrive',
    description: {
      fr: 'Plateforme de recrutement premium reliant recruteurs et candidats via des entretiens en format « vente privée » — créneaux limités, réservation et paiement en ligne.',
      en: 'Premium recruitment platform connecting recruiters and candidates through private-sale-style interview slots — limited availability, booking, and online payment.',
    },
    outcome: {
      fr: 'Architecture 3 modules (frontend React, API Laravel, backoffice admin), paiements Stripe/MangoPay, messagerie Socket.io et multilingue FR/EN.',
      en: '3-module architecture (React frontend, Laravel API, admin backoffice), Stripe/MangoPay payments, Socket.io messaging, and FR/EN i18n.',
    },
    technologies: ['React', 'TypeScript', 'Laravel', 'Stripe'],
    imageUrl: '/projects/jobprive.png',
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
    id: 'az-driver',
    role: { fr: 'Développeur Mobile — AZ Driver', en: 'Mobile Developer — AZ Driver' },
    company: 'AZ+',
    period: '2026',
    description: {
      fr: 'Développement de l\'application Android (APK) pour les livreurs AZ+ : courses et livraisons express, géolocalisation, notifications push, caisse et synchronisation temps réel des commandes.',
      en: 'Built the Android APK for AZ+ delivery drivers: routes and express deliveries, geolocation, push notifications, cash register, and real-time order sync.',
    },
    technologies: ['React Native', 'TypeScript', 'Socket.io', 'Axios', 'Notifee'],
  },
  {
    id: 'jobprive',
    role: { fr: 'Développeur Frontend — JobPrive', en: 'Frontend Developer — JobPrive' },
    company: 'Relia Consulting',
    period: '2026',
    description: {
      fr: 'Développement frontend React/TypeScript pour candidats et recruteurs, intégration API Laravel, réservation de créneaux d\'entretien, paiements en ligne et messagerie temps réel.',
      en: 'React/TypeScript frontend for candidates and recruiters, Laravel API integration, interview slot booking, online payments, and real-time messaging.',
    },
    technologies: ['React', 'TypeScript', 'Laravel', 'Stripe', 'Socket.io'],
  },
  {
    id: 'business-plan-generator',
    role: {
      fr: 'Développeur Frontend — Business Plan Generator',
      en: 'Frontend Developer — Business Plan Generator',
    },
    company: 'Relia Consulting',
    period: '2025',
    description: {
      fr: 'Interface Next.js/TypeScript, formulaire multi-étapes React Hook Form/Zod, export PDF jsPDF et intégration API Axios.',
      en: 'Next.js/TypeScript interface, multi-step React Hook Form/Zod form, jsPDF export, and Axios API integration.',
    },
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Hook Form', 'Zod'],
  },
  {
    id: 'tax-simulator',
    role: {
      fr: 'Stage — Conception Simulateur Prélèvement à la Source',
      en: 'Internship — Withholding Tax Simulator',
    },
    company: { fr: 'Direction Régionale des Impôts', en: 'Regional Tax Directorate' },
    period: '2022',
    description: {
      fr: 'Développement d\'algorithmes de calcul fiscal, interface utilisateur React.js et formation du personnel pour la digitalisation des services fiscaux.',
      en: 'Tax calculation algorithms, React.js user interface, and staff training for digital tax services.',
    },
    technologies: ['React.js', 'JavaScript', 'HTML5 / CSS3'],
    internship: true,
  },
  {
    id: 'smmec-credit',
    role: {
      fr: 'Stage — Procédure Débogage Crédit SI',
      en: 'Internship — Credit System Debugging Procedure',
    },
    company: 'SMMEC',
    period: '2021',
    description: {
      fr: 'Analyse du système d\'information, outils de débogage/validation automatisés et correction d\'anomalies du système de gestion de crédits.',
      en: 'Information system analysis, automated debugging/validation tools, and microfinance credit system fixes.',
    },
    technologies: ['SQL', 'JavaScript', 'Git'],
    internship: true,
  },
];
