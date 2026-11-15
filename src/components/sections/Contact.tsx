import { useState, type FormEvent } from 'react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { profile } from '../../constants/profile';

/**
 * Endpoint d'envoi direct (ex. https://formspree.io/f/xxxxxxx).
 * Absent → repli sur mailto: qui ouvre la messagerie du visiteur.
 * Variable lue au build : la définir aussi dans l'environnement Render.
 */
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || '';

type Status = 'idle' | 'sending' | 'success' | 'mailto' | 'error' | 'invalid';

const inputClass =
  'w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-accent transition-colors font-light';
const labelClass = 'text-[9px] font-black uppercase tracking-[0.25em] text-white/30 ml-0.5';

function openMailto(subject: string, body: string) {
  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = `mailto:${profile.email}?${query}`;
}

export function Contact() {
  const { t } = useApp();
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    // Champ piège anti-spam : rempli uniquement par les robots.
    if (data.get('_gotcha')) return;

    if (!name || !email || !message) {
      setStatus('invalid');
      return;
    }

    const subject = `${t.contact.form.subject} ${name}`;

    if (!CONTACT_ENDPOINT) {
      openMailto(subject, `${message}\n\n${name}\n${email}`);
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message, _subject: subject, _replyto: email }),
      });
      if (!res.ok) throw new Error(`Contact endpoint responded ${res.status}`);
      form.reset();
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  const sending = status === 'sending';

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
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="contact-name" className={labelClass}>
                {t.contact.form.name}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                maxLength={120}
                autoComplete="name"
                placeholder={t.contact.form.namePlaceholder}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className={labelClass}>
                {t.contact.form.email}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                placeholder={t.contact.form.emailPlaceholder}
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-message" className={labelClass}>
              {t.contact.form.message}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={3}
              required
              maxLength={5000}
              placeholder={t.contact.form.messagePlaceholder}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Anti-spam : invisible pour les humains. */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <button
            type="submit"
            disabled={sending}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3 group text-[10px] uppercase tracking-widest disabled:opacity-60 disabled:cursor-wait"
          >
            {sending ? t.contact.form.sending : t.contact.form.submit}
            <Send
              size={12}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>

          <p role="status" aria-live="polite" className="min-h-5 text-center text-xs font-light">
            {status === 'success' && <span className="text-accent">{t.contact.form.success}</span>}
            {status === 'mailto' && <span className="text-gray-300">{t.contact.form.mailtoOpened}</span>}
            {status === 'invalid' && <span className="text-red-400">{t.contact.form.invalid}</span>}
            {status === 'error' && (
              <span className="text-red-400">
                {t.contact.form.error}{' '}
                <a href={`mailto:${profile.email}`} className="underline hover:text-accent">
                  {profile.email}
                </a>
              </span>
            )}
          </p>
        </form>
      </motion.div>
    </SectionWrapper>
  );
}
