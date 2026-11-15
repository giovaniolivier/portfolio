import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite';

/** Pages publiques, pour le sitemap. */
const PAGES = ['/', '/cv'];

function normalizeSiteUrl(raw: string | undefined): string {
  const value = raw?.trim();
  if (!value) return '';
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
  } catch {
    throw new Error(`VITE_SITE_URL invalide : ${value}`);
  }
}

/**
 * SEO dépendant de l'URL publique (VITE_SITE_URL, lue au build) :
 * URL canonique, og:url / og:image absolus, robots.txt et sitemap.xml.
 * Sans URL, seules les balises relatives d'index.html sont conservées.
 */
function siteMeta(siteUrl: string): Plugin {
  return {
    name: 'site-meta',
    transformIndexHtml() {
      if (!siteUrl) return [];
      const tags: HtmlTagDescriptor[] = [
        { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` } },
        { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` } },
        { tag: 'meta', attrs: { property: 'og:image', content: `${siteUrl}/og-image.png` } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${siteUrl}/og-image.png` } },
      ];
      return tags.map((t) => ({ ...t, injectTo: 'head' as const }));
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /'];
      if (siteUrl) robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` });

      if (siteUrl) {
        const urls = PAGES.map((p) => `  <url><loc>${siteUrl}${p}</loc></url>`).join('\n');
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        });
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL);

  return {
    plugins: [react(), tailwindcss(), siteMeta(siteUrl)],
  };
});
