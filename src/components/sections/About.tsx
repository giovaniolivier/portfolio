import { SectionWrapper } from '../ui/SectionWrapper';
import { useApp } from '../../context/AppContext';
import { profile } from '../../constants/profile';

export function About() {
  const { t } = useApp();
  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="sticky top-24">
          <span className="section-label">{t.about.label}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-[0.95] tracking-tighter uppercase">
            {t.about.title1} <br />
            <span className="italic font-light text-white/30 tracking-tight">{t.about.title2}</span>
          </h2>
          <div className="w-16 h-px bg-white/20 mb-5" />
          <div className="flex gap-6 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
            <div>[ {t.about.since} ]</div>
            <div>[ {t.about.location} ]</div>
          </div>
        </div>

        <div className="space-y-6">
          <p
            className="text-base md:text-lg text-white font-light leading-snug"
            dangerouslySetInnerHTML={{ __html: t.about.intro }}
          />

          <div className="space-y-3 text-gray-400 font-light leading-relaxed text-sm">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

          <div className="pt-5 border-t border-white/5 grid grid-cols-2 gap-8">
            <div>
              <div className="text-2xl font-display font-bold text-white mb-1 tracking-tighter italic">{profile.stats.experiences}</div>
              <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-500">{t.about.stats1}</p>
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-white mb-1 tracking-tighter italic">{profile.stats.degrees}</div>
              <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-500">{t.about.stats2}</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
