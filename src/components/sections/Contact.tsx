import { useState, type FormEvent, type ReactNode } from 'react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { Linkedin, Mail, MapPin, Send } from 'lucide-react';
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
  'w-full bg-transparent border-b border-line py-2.5 text-sm text-fg placeholder:text-placeholder focus:outline-none focus:border-accent transition-colors font-light';
const labelClass = 'text-[11px] font-bold uppercase tracking-[0.15em] text-fg-subtle ml-0.5';
const rowLabelClass = 'text-[11px] uppercase font-bold tracking-[0.15em] text-fg-subtle mb-0.5';
const linkClass = 'text-sm font-medium text-fg hover:text-accent transition-colors';

/** Une ligne de coordonnées : pastille d'icône, libellé, valeur(s). */
function ContactRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span
        className="w-10 h-10 shrink-0 rounded-xl bg-tint-3 border border-line flex items-center justify-center text-accent"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0 pt-0.5">
        <div className={rowLabelClass}>{label}</div>
        {children}
      </div>
    </li>
  );
}

/** Astérisque visuel ; l'attribut `required` informe déjà les lecteurs d'écran. */
function RequiredMark() {
  return (
    <span className="text-accent" aria-hidden="true">
      {' '}*
    </span>
  );
}

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
    <SectionWrapper id="contact" outerClassName="border-t border-line">
      {/* Deux colonnes : présentation et coordonnées à gauche, formulaire à droite. */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-start">
        <div className="md:col-span-2">
          <span className="section-label">{t.contact.label}</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 leading-[0.95] uppercase">
            {t.contact.title1} <br />
            <span className="text-fg-dim italic font-light">{t.contact.title2}</span>
          </h2>
          <p className="text-sm md:text-base text-body font-light leading-relaxed">{t.contact.description}</p>

          <ul className="mt-8 space-y-5">
            <ContactRow icon={<Mail size={16} />} label={t.contact.direct}>
              <a href={`mailto:${profile.email}`} className={`${linkClass} break-all`}>
                {profile.email}
              </a>
            </ContactRow>
            <ContactRow icon={<Linkedin size={16} />} label={t.contact.social}>
              <span className="flex flex-wrap gap-x-3">
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  LinkedIn
                </a>
                <span className="text-fg-faint" aria-hidden="true">/</span>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  GitHub
                </a>
              </span>
            </ContactRow>
            <ContactRow icon={<MapPin size={16} />} label={t.contact.location}>
              <span className="block text-sm font-medium text-fg">{profile.location.label}</span>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="text-sm text-body-muted hover:text-accent transition-colors">
                {profile.phone}
              </a>
            </ContactRow>
          </ul>
        </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="md:col-span-3 glass-panel p-6 md:p-8 rounded-2xl"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="contact-name" className={labelClass}>
                {t.contact.form.name}
                <RequiredMark />
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
                <RequiredMark />
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
              <RequiredMark />
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

          <div className="space-y-3">
            <p className="text-xs text-body-muted">
              <span className="text-accent" aria-hidden="true">* </span>
              {t.contact.form.requiredNote}
            </p>
            <button
              type="submit"
              disabled={sending}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 group text-[11px] uppercase tracking-[0.15em] disabled:opacity-60 disabled:cursor-wait"
            >
              {sending ? t.contact.form.sending : t.contact.form.submit}
              <Send
                size={12}
                aria-hidden="true"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </form>

        {/* Hors du flux du formulaire : n'occupe aucune place tant qu'il est vide. */}
        <p role="status" aria-live="polite" className="text-center text-xs font-light not-empty:mt-4">
          {status === 'success' && <span className="text-accent">{t.contact.form.success}</span>}
          {status === 'mailto' && <span className="text-body">{t.contact.form.mailtoOpened}</span>}
          {status === 'invalid' && <span className="text-danger">{t.contact.form.invalid}</span>}
          {status === 'error' && (
            <span className="text-danger">
              {t.contact.form.error}{' '}
              <a href={`mailto:${profile.email}`} className="underline hover:text-accent">
                {profile.email}
              </a>
            </span>
          )}
        </p>
      </motion.div>
      </div>
    </SectionWrapper>
  );
}
