import { SectionWrapper } from '../ui/SectionWrapper';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { profile } from '../../constants/profile';
import type { FormEvent } from 'react';

export function Contact() {
  const { t } = useApp();
  return (
    <SectionWrapper id="contact" className="!pt-24 md:!pt-32 !pb-28 md:!pb-36 border-t border-white/8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <span className="section-label">{t.contact.label}</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 leading-none uppercase">
          {t.contact.title1}{' '}
          <span className="text-white/45 italic font-light">{t.contact.title2}</span>
        </h2>
        <p className="text-sm md:text-base text-gray-300 font-light max-w-md mx-auto leading-relaxed">
          {t.contact.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/12 hover:border-accent/30 transition-colors group">
          <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
            <Mail size={16} />
          </div>
          <div className="text-[9px] uppercase font-black tracking-widest text-white/40 mb-1">
            {t.contact.direct}
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="text-sm font-medium text-white hover:text-accent transition-colors break-all"
          >
            {profile.email}
          </a>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/12 hover:border-accent/30 transition-colors group">
          <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
            <MessageSquare size={16} />
          </div>
          <div className="text-[9px] uppercase font-black tracking-widest text-white/40 mb-1">
            {t.contact.social}
          </div>
          <div className="flex gap-3 text-sm font-medium text-white">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              LI
            </a>
            <span className="text-white/20">/</span>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              GH
            </a>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/12 hover:border-accent/30 transition-colors group">
          <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
            <Send size={16} />
          </div>
          <div className="text-[9px] uppercase font-black tracking-widest text-white/40 mb-1">
            {t.contact.location}
          </div>
          <div className="text-sm font-medium text-white">{profile.location.label}</div>
          <a
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            className="text-xs text-gray-400 hover:text-accent transition-colors mt-1 inline-block"
          >
            {profile.phone}
          </a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto glass-panel p-6 md:p-8 rounded-2xl"
      >
        <form className="space-y-6" onSubmit={(e: FormEvent) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30 ml-0.5">
                {t.contact.form.name}
              </label>
              <input
                type="text"
                placeholder={t.contact.form.namePlaceholder}
                className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-accent transition-colors font-light"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30 ml-0.5">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                placeholder={t.contact.form.emailPlaceholder}
                className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-accent transition-colors font-light"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30 ml-0.5">
              {t.contact.form.message}
            </label>
            <textarea
              rows={3}
              placeholder={t.contact.form.messagePlaceholder}
              className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-accent transition-colors font-light resize-none"
            />
          </div>

          <button className="btn-primary w-full flex items-center justify-center gap-2 py-3 group text-[10px] uppercase tracking-widest">
            {t.contact.form.submit}
            <Send
              size={12}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </form>
      </motion.div>
    </SectionWrapper>
  );
}
