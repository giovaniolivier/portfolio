// Serveur de production : sert dist/ avec en-têtes de sécurité et de cache.
// Remplace `vite preview`, qui n'est pas conçu pour la production.
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const indexHtml = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtml)) {
  console.error('dist/index.html introuvable : lancez `npm run build` avant `npm start`.');
  process.exit(1);
}

const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid PORT value: ${process.env.PORT}`);
}

/** Routes gérées côté client (voir src/App.tsx). */
const APP_ROUTES = new Set(['/', '/cv', '/cv/']);

/** Origine du service de formulaire (ex. Formspree), autorisée dans connect-src. */
function contactOrigin() {
  const raw = process.env.VITE_CONTACT_ENDPOINT?.trim();
  if (!raw) return '';
  try {
    return new URL(raw).origin;
  } catch {
    console.warn(`VITE_CONTACT_ENDPOINT invalide, ignoré : ${raw}`);
    return '';
  }
}

const csp = [
  "default-src 'self'",
  "script-src 'self'",
  // 'unsafe-inline' : les animations (motion) écrivent des attributs style.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  `connect-src 'self' ${contactOrigin()}`.trim(),
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const app = express();
app.disable('x-powered-by');

app.use((_req, res, next) => {
  res.set({
    'Content-Security-Policy': csp,
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  });
  next();
});

app.use(
  express.static(distDir, {
    index: false,
    setHeaders(res, filePath) {
      const rel = path.relative(distDir, filePath).split(path.sep).join('/');
      if (rel.startsWith('assets/')) {
        // Fichiers nommés avec un hash par Vite : cache permanent.
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (rel.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
    },
  }),
);

app.use((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.sendStatus(405);
    return;
  }
  // Fichier absent (extension présente) : vraie 404, pas la page HTML.
  if (path.extname(req.path)) {
    res.sendStatus(404);
    return;
  }
  res.status(APP_ROUTES.has(req.path) ? 200 : 404);
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(indexHtml);
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio servi sur http://0.0.0.0:${port}`);
});

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
