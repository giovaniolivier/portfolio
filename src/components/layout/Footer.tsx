import { Github, Linkedin, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { profile } from '../../constants/profile';

export function Footer() {
  const { t } = useApp();
  const socialLinks = [
    { icon: <Github size={16} />, href: profile.links.github, label: 'GitHub' },
    { icon: <Linkedin size={16} />, href: profile.links.linkedin, label: 'LinkedIn' },
    { icon: <Mail size={16} />, href: `mailto:${profile.email}`, label: 'Email' },
  ];

  return (
    <footer className="py-8 border-t border-white/5 bg-main">
      <div className="max-w-5xl mx-auto px-5 md:px-8 flex flex-col md:flex-row justify-between items-center gap-5">
        <div>
          <a href="#" className="text-sm font-bold font-display text-white">
            {profile.name.brand}
          </a>
          <p className="mt-1 text-xs text-gray-500">
            © {new Date().getFullYear()} {profile.name.short}. {t.footer.rights}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-gray-500 hover:text-white transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
