# Portfolio — LOVASOA Heriniaina Olivier

Portfolio bilingue (FR/EN) de développeur web full stack, avec une page CV imprimable et des CV PDF générés automatiquement.

**Stack :** React 19, TypeScript, Vite 6, Tailwind CSS 4, Motion. Serveur de production Express 5.

## Démarrer en local

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Build de production dans `dist/` |
| `npm start` | Sert `dist/` avec Express (en-têtes de sécurité, cache, routes `/` et `/cv`) |
| `npm run generate:cv` | Build, puis génère `public/cv-fr.pdf` et `public/cv-en.pdf` avec Puppeteer |
| `npm run lint` | Vérification TypeScript |
| `npm run clean` | Supprime `dist/` |

## Modifier le contenu

Tout le contenu est dans `src/constants/` :

- `profile.ts` : identité, coordonnées, liens et chiffres affichés (années d'expérience, projets…)
- `data.ts` : projets, compétences, expériences
- `translations.ts` : textes FR/EN

Après une modification qui touche le CV, lancez `npm run generate:cv` puis commitez les PDF mis à jour.

## Variables d'environnement

Voir `.env.example`. Elles sont lues **au build** : sur Render, les définir dans *Environment* puis redéployer.

| Variable | Effet |
|---|---|
| `VITE_SITE_URL` | URL publique (sans slash final). Active l'URL canonique, les balises Open Graph absolues et `sitemap.xml`. |
| `VITE_CONTACT_ENDPOINT` | URL d'envoi du formulaire (ex. Formspree). Sans elle, le formulaire ouvre la messagerie du visiteur. |

## Déploiement (Render)

Web Service Node :

- **Build command :** `npm install && npm run build`
- **Start command :** `npm start`
