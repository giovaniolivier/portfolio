import { useEffect, useState } from 'react';

/**
 * Renvoie l'id de la section qui traverse le milieu de l'écran (ou null, ex. dans le hero).
 * Sert à mettre en évidence le lien correspondant dans la navigation.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length || typeof IntersectionObserver === 'undefined') return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Dans l'ordre de la page : la première section présente dans la bande centrale.
        setActive(elements.find((el) => visible.has(el.id))?.id ?? null);
      },
      // Bande fine au milieu de l'écran : une seule section à la fois.
      { rootMargin: '-45% 0px -50% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
