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
            <span className="italic font-light text-white/50 tracking-tight">{t.about.title2}</span>
          </h2>
          <div className="w-16 h-px bg-white/20 mb-5" aria-hidden="true" />
          <div className="flex gap-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
            <div>[ {profile.stats.years} {t.about.experienceSuffix} ]</div>
            <div>[ {t.about.location} ]</div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-base md:text-lg text-white font-light leading-snug">
            {intro.before}
            <span className="text-accent italic">{intro.accent}</span>
            {intro.middle}
            <span className="text-white font-bold">{intro.strong}</span>
          </p>

          <div className="space-y-3 text-gray-400 font-light leading-relaxed text-sm">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

          <dl className="pt-5 border-t border-white/5 grid grid-cols-2 gap-8">
            <div className="flex flex-col-reverse">
              <dt className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">{t.about.stats1}</dt>
              <dd className="text-2xl font-display font-bold text-white mb-1 tracking-tighter italic">{profile.stats.companies}</dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">{t.about.stats2}</dt>
              <dd className="text-2xl font-display font-bold text-white mb-1 tracking-tighter italic">{profile.stats.degrees}</dd>
            </div>
          </dl>
        </div>
      </div>
    </SectionWrapper>
  );
}
