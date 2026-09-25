import { preview } from 'vite';
import puppeteer from 'puppeteer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const PORT = 4179;

async function prepareCvPage(page, lang) {
  // Set language before first paint when possible
  await page.goto(`http://127.0.0.1:${PORT}/cv`, { waitUntil: 'domcontentloaded' });
  await page.evaluate((language) => {
    localStorage.setItem('lang', language);
  }, lang);
  await page.reload({ waitUntil: 'networkidle0' });

  await page.waitForSelector('.cv-sheet .cv-name', { timeout: 30000 });
  await page.waitForFunction(
    () => (document.querySelector('.cv-name')?.textContent || '').includes('LOVASOA'),
    { timeout: 15000 },
  );

  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });

  // Screen styles (not print) — CV colors are authored for screen
  await page.emulateMediaType('screen');

  await page.addStyleTag({
    content: `
      .cv-toolbar, .print\\:hidden { display: none !important; }
      .cv-page {
        background: #ffffff !important;
        padding: 0 !important;
        min-height: auto !important;
      }
      .cv-sheet {
        box-shadow: none !important;
        margin: 0 !important;
        max-width: none !important;
        width: 100% !important;
      }
      body, html {
        background: #ffffff !important;
      }
      /* A4 layout width triggers the mobile breakpoint — keep desktop header */
      .cv-header {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        justify-content: space-between !important;
        align-items: flex-start !important;
        gap: 1.5rem !important;
      }
      .cv-contacts {
        text-align: right !important;
        flex-shrink: 0 !important;
      }
    `,
  });

  await new Promise((r) => setTimeout(r, 600));
}

async function generatePdf(page, lang, outFile) {
  await prepareCvPage(page, lang);

  const nameText = await page.$eval('.cv-name', (el) => el.textContent.trim());
  console.log(`[${lang}] captured header: ${nameText}`);

  await page.pdf({
    path: outFile,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    preferCSSPageSize: false,
    margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' },
  });

  const distCopy = path.join(root, 'dist', path.basename(outFile));
  fs.copyFileSync(outFile, distCopy);
  console.log(`Wrote ${path.relative(root, outFile)} (${fs.statSync(outFile).size} bytes)`);
}

async function main() {
  fs.mkdirSync(publicDir, { recursive: true });

  const dist = path.join(root, 'dist');
  if (!fs.existsSync(dist)) {
    console.error('dist/ missing — run `npm run build` first (or use npm run generate:cv).');
    process.exit(1);
  }

  const previewServer = await preview({
    root,
    configFile: path.join(root, 'vite.config.ts'),
    preview: {
      port: PORT,
      strictPort: true,
      host: '127.0.0.1',
    },
  });
  console.log(`Preview on http://127.0.0.1:${PORT}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 1 });

    await generatePdf(page, 'fr', path.join(publicDir, 'cv-fr.pdf'));
    await generatePdf(page, 'en', path.join(publicDir, 'cv-en.pdf'));
  } finally {
    await browser.close();
    await previewServer.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
