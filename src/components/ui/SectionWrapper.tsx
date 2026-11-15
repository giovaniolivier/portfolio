import type { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  /** Contenu centré : marges internes, largeur max. */
  className?: string;
  /** Bande pleine largeur : fond, bordures (ex. "bg-tint-1", "border-t border-line"). */
  outerClassName?: string;
}

/**
 * Section de page : une bande pleine largeur (fond éventuel) qui contient une colonne centrée.
 * Pas d'animation d'apparition au niveau de la section : le texte reste lisible même en
 * défilant vite ; les éléments (cartes, listes) gèrent leurs propres animations.
 */
export function SectionWrapper({ children, id, className = '', outerClassName = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative scroll-mt-16 ${outerClassName}`}>
      <div className={`py-16 md:py-24 px-5 md:px-10 max-w-5xl mx-auto ${className}`}>{children}</div>
    </section>
  );
}
