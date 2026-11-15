/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL d'envoi du formulaire de contact (ex. Formspree). Optionnelle. */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
