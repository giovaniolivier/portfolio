
export type Language = 'fr' | 'en';

export const translations = {
  fr: {
    nav: {
      index: 'Index',
      about: 'Profil',
      projects: 'Projets',
      skills: 'Expertise',
      contact: 'Contact',
      cta: 'Contact',
    },
    hero: {
      status: 'Disponible pour de nouveaux projets',
      title1: 'CONCEVOIR',
      title2: 'DEMAIN',
      title3: 'PAR LE CODE.',
      description:
        'Développeur full-stack — j’imagine et je livre des apps web et mobiles (React, Node, API) jusqu’au déploiement.',
      ctaProjects: 'Découvrir mes projets',
      ctaContact: 'Me contacter',
      ctaResume: 'Télécharger CV',
      metrics: {
        senior: 'Full Stack',
        expertise: 'Spécialité',
        years: '3 Ans',
        experience: 'Expérience',
        projects: '08+',
        projectsLabel: 'Projets réalisés',
        available: 'Disponible',
        availability: 'Disponibilité',
      }
    },
    about: {
      label: 'Profil',
      title1: "L'EXCELLENCE",
      title2: 'DIGITALE.',
      since: 'Depuis 2021',
      location: 'Antananarivo, Madagascar',
      intro: "Développeur Web Full Stack, je conçois des <span class=\"text-accent italic\">applications web et mobiles</span> claires, <span class=\"text-white font-bold\">performantes et orientées utilisateur.</span>",
      p1: "Formé à l'EMIT (Master II & Licence en Informatique), je maîtrise React, Next.js, React Native et Node.js pour livrer des produits de bout en bout.",
      p2: "J'ai travaillé avec Relia Consulting, AZ+ et des institutions locales — en passant par des outils métiers sur mesure.",
      stats1: 'Expériences pro',
      stats2: 'Diplômes',
    },
    skills: {
      label: 'Technologies',
      title1: "L'ÉCOSYSTÈME",
      title2: 'TECHNIQUE.',
      description: 'Langages, frameworks et outils que j\'utilise au quotidien pour concevoir des applications web, mobiles et des solutions sur mesure.',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Bases de données',
        tools: 'CMS & Outils',
      }
    },
    projects: {
      label: 'Portfolio',
      title1: 'PROJETS',
      title2: 'SÉLECTIONNÉS.',
      description: 'Une sélection de projets personnels et professionnels, du mobile au web, avec une attention particulière à l\'expérience utilisateur.',
      impact: 'Points clés',
      viewMore: 'Voir plus sur GitHub',
      items: [
        {
          id: '9',
          title: 'JobRadar',
          description:
            'Assistant de veille et de tri d’offres : CV → analyse scorée → pipeline → lettre de motivation, avec auth, notifs email et PWA.',
          outcome:
            'Isolation multi-utilisateur, SMTP forcé en prod, IA multi-fournisseurs (Gemini/Groq/Claude), i18n FR/EN et déploiement Docker.',
        },
        {
          id: '1',
          title: 'TaskMaster',
          description: 'Application moderne de gestion de tâches avec priorités, catégorisation, filtrage avancé et calendrier intégré.',
          outcome: 'Interface clair/sombre, composants Shadcn/Radix et persistance via local storage.',
        },
        {
          id: '2',
          title: 'Business Plan Generator',
          description: 'Application web permettant aux entrepreneurs de générer des business plans professionnels avec visualisation Business Model Canvas.',
          outcome: 'Formulaire multi-étapes, export PDF et intégration API pour une expérience fluide.',
        },
        {
          id: '3',
          title: 'Planity',
          description: 'Application mobile de planification d\'événements connectant utilisateurs et prestataires professionnels.',
          outcome: 'Navigation optimisée, chat intégré et notifications push pour mariages, fêtes et célébrations.',
        },
        {
          id: '4',
          title: 'JobPrive',
          description: 'Plateforme de recrutement premium reliant recruteurs et candidats via des entretiens en format « vente privée » — créneaux limités, réservation et paiement en ligne.',
          outcome: 'Architecture 3 modules (frontend React, API Laravel, backoffice admin), paiements Stripe/MangoPay, messagerie Socket.io et multilingue FR/EN.',
        },
      ]
    },
    experience: {
      label: 'Parcours',
      title1: 'CHRONOLOGIE',
      title2: 'CARRIÈRE.',
      focus: 'Formation',
      focusDesc: 'Master II en Informatique — EMIT, Université de Fianarantsoa (2023-2024). Licence en Informatique — EMIT (2021-2022).',
      items: [
        {
          id: '8',
          role: 'Développeur Mobile — AZ Driver',
          company: 'AZ+',
          period: '2026',
          description: 'Développement de l\'application Android (APK) pour les livreurs AZ+ : courses et livraisons express, géolocalisation, notifications push, caisse et synchronisation temps réel des commandes.',
        },
        {
          id: '7',
          role: 'Développeur Full Stack — AZLive',
          company: 'AZ+',
          period: '2026',
          description: 'Développement front React/TypeScript et API Django pour une plateforme de live shopping : capture automatique des « JP », gestion produits/commandes, intégrations TikTok/Facebook et diffusion vidéo en direct.',
        },
        {
          id: '6',
          role: 'Développeur Frontend — JobPrive',
          company: 'Relia Consulting',
          period: '2026',
          description: 'Développement frontend React/TypeScript pour candidats et recruteurs, intégration API Laravel, réservation de créneaux d\'entretien, paiements en ligne et messagerie temps réel.',
        },
        {
          id: '2',
          role: 'Développeur Frontend — Business Plan Generator',
          company: 'Relia Consulting',
          period: '2025',
          description: 'Interface Next.js/TypeScript, formulaire multi-étapes React Hook Form/Zod, export PDF jsPDF et intégration API Axios.',
        },
        {
          id: '4',
          role: 'Stage — Conception Simulateur Prélèvement à la Source',
          company: 'Direction Régionale des Impôts',
          period: '2022',
          description: 'Développement d\'algorithmes de calcul fiscal, interface utilisateur React.js et formation du personnel pour la digitalisation des services fiscaux.',
        },
        {
          id: '5',
          role: 'Stage — Procédure Débogage Crédit SI',
          company: 'SMMEC',
          period: '2021',
          description: 'Analyse du système d\'information, outils de débogage/validation automatisés et correction d\'anomalies du système de gestion de crédits.',
        },
      ]
    },
    contact: {
      label: 'Contact',
      title1: 'PARLONS',
      title2: 'PROJET.',
      description: 'Que vous ayez une idée innovante ou un défi technique complexe, je suis prêt à lui donner vie.',
      direct: 'Message Direct',
      social: 'Réseaux Sociaux',
      location: 'Localisation',
      form: {
        name: 'Nom Complet',
        namePlaceholder: 'Indispensable',
        email: 'Adresse Email',
        emailPlaceholder: 'Indispensable',
        message: 'Votre Message',
        messagePlaceholder: 'Décrivez votre vision...',
        submit: 'Démarrer la collaboration',
      }
    },
    common: {
      scroll: 'Défiler pour explorer',
    },
    footer: {
      rights: 'Tous droits réservés.',
    },
    loader: 'Initialisation de l\'expérience',
    cv: {
      back: 'Retour au portfolio',
      print: 'Imprimer / PDF',
      summaryTitle: 'Profil',
      experienceTitle: 'Expériences Professionnelles',
      projectsTitle: 'Projets personnels',
      skillsTitle: 'Compétences',
      educationTitle: 'Formation',
      summary:
        'Développeur Web Full Stack basé à Antananarivo. Je conçois des applications web et mobiles claires, performantes et orientées utilisateur avec React, Next.js, React Native et Node.js.',
    },
  },
  en: {
    nav: {
      index: 'Index',
      about: 'Profile',
      projects: 'Projects',
      skills: 'Expertise',
      contact: 'Contact',
      cta: 'Contact',
    },
    hero: {
      status: 'Available for new projects',
      title1: 'DESIGNING',
      title2: 'TOMORROW',
      title3: 'THROUGH CODE.',
      description:
        'Full-stack developer — I design and ship web & mobile apps (React, Node, APIs) through to deployment.',
      ctaProjects: 'Explore projects',
      ctaContact: 'Contact me',
      ctaResume: 'Download CV',
      metrics: {
        senior: 'Full Stack',
        expertise: 'Specialty',
        years: '4+ Yrs',
        experience: 'Experience',
        projects: '08+',
        projectsLabel: 'Projects built',
        available: 'Available',
        availability: 'Availability',
      }
    },
    about: {
      label: 'Profile',
      title1: 'DIGITAL',
      title2: 'EXCELLENCE.',
      since: 'Since 2021',
      location: 'Antananarivo, Madagascar',
      intro: "As a Full Stack Web Developer, I build <span class=\"text-accent italic\">web and mobile applications</span> that are <span class=\"text-white font-bold\">clear, performant, and user-focused.</span>",
      p1: "Graduated from EMIT (Master's II & Bachelor's in Computer Science), I work with React, Next.js, React Native, and Node.js to deliver end-to-end products.",
      p2: "I've collaborated with Relia Consulting, Odace France, and local institutions — from mobile apps to WordPress and custom business tools.",
      stats1: 'Professional roles',
      stats2: 'Degrees',
    },
    skills: {
      label: 'Technologies',
      title1: 'TECHNICAL',
      title2: 'ECOSYSTEM.',
      description: 'Languages, frameworks, and tools I use daily to build web, mobile, and custom software solutions.',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Databases',
        tools: 'CMS & Tools',
      }
    },
    projects: {
      label: 'Portfolio',
      title1: 'SELECTED',
      title2: 'PROJECTS.',
      description: 'A selection of personal and professional projects, from mobile to web, with a strong focus on user experience.',
      impact: 'Highlights',
      viewMore: 'View more on GitHub',
      items: [
        {
          id: '9',
          title: 'JobRadar',
          description:
            'Job-search assistant: CV → scored analysis → pipeline → cover letter, with auth, email alerts, and PWA.',
          outcome:
            'Per-user data isolation, SMTP required in production, multi-provider AI (Gemini/Groq/Claude), FR/EN i18n, and Docker deploy.',
        },
        {
          id: '1',
          title: 'TaskMaster',
          description: 'Modern task management app with priorities, categorization, advanced filtering, and an integrated calendar.',
          outcome: 'Light/dark UI, Shadcn/Radix components, and local storage persistence.',
        },
        {
          id: '2',
          title: 'Business Plan Generator',
          description: 'Web app helping entrepreneurs generate professional business plans with Business Model Canvas visualization.',
          outcome: 'Multi-step form, PDF export, and API integration for a smooth workflow.',
        },
        {
          id: '3',
          title: 'Planity',
          description: 'Mobile event planning app connecting users with professional service providers.',
          outcome: 'Optimized navigation, integrated chat, and push notifications for weddings and celebrations.',
        },
        {
          id: '4',
          title: 'JobPrive',
          description: 'Premium recruitment platform connecting recruiters and candidates through private-sale-style interview slots — limited availability, booking, and online payment.',
          outcome: '3-module architecture (React frontend, Laravel API, admin backoffice), Stripe/MangoPay payments, Socket.io messaging, and FR/EN i18n.',
        },
      ]
    },
    experience: {
      label: 'Journey',
      title1: 'CAREER',
      title2: 'TIMELINE.',
      focus: 'Education',
      focusDesc: "Master's II in Computer Science — EMIT, University of Fianarantsoa (2023-2024). Bachelor's in Computer Science — EMIT (2021-2022).",
      items: [
        {
          id: '8',
          role: 'Mobile Developer — AZ Driver',
          company: 'AZ+',
          period: '2026',
          description: 'Built the Android APK for AZ+ delivery drivers: routes and express deliveries, geolocation, push notifications, cash register, and real-time order sync.',
        },
        {
          id: '7',
          role: 'Full Stack Developer — AZLive',
          company: 'AZ+',
          period: '2026',
          description: 'React/TypeScript frontend and Django API for a live shopping platform: automatic “JP” capture, product/order management, TikTok/Facebook integrations, and live video streaming.',
        },
        {
          id: '6',
          role: 'Frontend Developer — JobPrive',
          company: 'Relia Consulting',
          period: '2026',
          description: 'React/TypeScript frontend for candidates and recruiters, Laravel API integration, interview slot booking, online payments, and real-time messaging.',
        },
        {
          id: '2',
          role: 'Frontend Developer — Business Plan Generator',
          company: 'Relia Consulting',
          period: '2025',
          description: 'Next.js/TypeScript interface, multi-step React Hook Form/Zod form, jsPDF export, and Axios API integration.',
        },
        {
          id: '4',
          role: 'Internship — Withholding Tax Simulator',
          company: 'Regional Tax Directorate',
          period: '2022',
          description: 'Tax calculation algorithms, React.js user interface, and staff training for digital tax services.',
        },
        {
          id: '5',
          role: 'Internship — Credit System Debugging Procedure',
          company: 'SMMEC',
          period: '2021',
          description: 'Information system analysis, automated debugging/validation tools, and microfinance credit system fixes.',
        },
      ]
    },
    contact: {
      label: 'Contact',
      title1: "LET'S TALK",
      title2: 'PROJECT.',
      description: 'Whether you have an innovative idea or a complex technical challenge, I am ready to bring it to life.',
      direct: 'Direct Message',
      social: 'Social Networks',
      location: 'Location',
      form: {
        name: 'Full Name',
        namePlaceholder: 'Required',
        email: 'Email Address',
        emailPlaceholder: 'Required',
        message: 'Your Message',
        messagePlaceholder: 'Describe your vision...',
        submit: 'Start Collaboration',
      }
    },
    common: {
      scroll: 'Scroll to explore',
    },
    footer: {
      rights: 'All rights reserved.',
    },
    loader: 'Initializing experience',
    cv: {
      back: 'Back to portfolio',
      print: 'Print / PDF',
      summaryTitle: 'Profile',
      experienceTitle: 'Professional Experience',
      projectsTitle: 'Personal projects',
      skillsTitle: 'Skills',
      educationTitle: 'Education',
      summary:
        'Full Stack Web Developer based in Antananarivo. I build clear, performant, user-focused web and mobile applications with React, Next.js, React Native, and Node.js.',
    },
  }
};
