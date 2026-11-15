import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },

  // Application React (navigateur).
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // useApp vit à côté de AppProvider : un edit de ce fichier recharge la page au lieu du hot reload.
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true, allowExportNames: ['useApp'] }],
    },
  },

  // Config Vite (Node, TypeScript).
  {
    files: ['vite.config.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { globals: globals.node },
  },

  // Scripts Node (serveur de prod, génération du CV).
  {
    files: ['scripts/**/*.mjs', 'eslint.config.js'],
    extends: [js.configs.recommended],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: globals.node },
  },

  // Les callbacks passés à page.evaluate() s'exécutent dans le navigateur (Puppeteer).
  {
    files: ['scripts/generate-cv-pdf.mjs'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },

  // Script chargé tel quel par le navigateur (pas de module), volontairement en ES5.
  {
    files: ['public/**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: { ecmaVersion: 5, sourceType: 'script', globals: globals.browser },
    rules: { 'no-unused-vars': ['error', { caughtErrors: 'none' }] },
  },
);
