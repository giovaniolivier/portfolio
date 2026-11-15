import type { Language, LocalizedText } from '../types';

/** Renvoie la version d'un texte dans la langue demandée. */
export function localize(text: LocalizedText, language: Language): string;
export function localize(text: LocalizedText | undefined, language: Language): string | undefined;
export function localize(text: LocalizedText | undefined, language: Language): string | undefined {
  if (text === undefined) return undefined;
  return typeof text === 'string' ? text : text[language];
}
