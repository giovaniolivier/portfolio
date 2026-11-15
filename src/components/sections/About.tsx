import { SectionWrapper } from '../ui/SectionWrapper';
import { useApp } from '../../context/AppContext';
import { profile } from '../../constants/profile';

export function About() {
  const { t } = useApp();
  const { intro } = t.about;

  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="sticky top-24">
          <span className="section-label">{t.about.label}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-[0.95] tracking-tighter uppercase">
            {t.about.title1} <br />
            <span className="italic font-light text-fg-dim tracking-tight">{t.about.title2}</span>
          </h2>
          <div className="w-16 h-px bg-line-strong mb-5" aria-hidden="true" />
          {/* Chaque badge reste sur une ligne ; ils passent l'un sous l'autre si la place manque. */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
            <div className="whitespace-nowrap">[ {profile.stats.years} {t.about.experienceSuffix} ]</div>
            <div className="whitespace-nowrap">[ {t.about.location} ]</div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-base md:text-lg text-fg font-light leading-snug">
            {intro.before}
            <span className="text-accent italic">{intro.accent}</span>
            {intro.middle}
            <span className="text-fg font-bold">{intro.strong}</span>
          </p>

          <div className="space-y-3 text-body-muted font-light leading-relaxed text-sm">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

          <dl className="pt-5 border-t border-line-soft grid grid-cols-2 gap-8">
            <div className="flex flex-col-reverse">
              <dt className="text-[11px] uppercase font-bold tracking-[0.15em] text-body-muted">{t.about.stats1}</dt>
              <dd className="text-2xl font-display font-bold text-fg mb-1 tracking-tighter italic">{profile.stats.companies}</dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-[11px] uppercase font-bold tracking-[0.15em] text-body-muted">{t.about.stats2}</dt>
              <dd className="text-2xl font-display font-bold text-fg mb-1 tracking-tighter italic">{profile.stats.degrees}</dd>
            </div>
          </dl>
        </div>
      </div>
    </SectionWrapper>
  );
}
