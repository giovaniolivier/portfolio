import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function SectionWrapper({ children, id, className = "" }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`py-16 md:py-20 px-5 md:px-10 max-w-5xl mx-auto relative ${className}`}
    >
      {children}
    </motion.section>
  );
}
