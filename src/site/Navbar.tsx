import { useEffect, useState } from 'react';
import { Languages, Menu, X } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { useLang } from '../i18n';

export function Navbar({ name }: { name: string }) {
  const { lang, setLang, ui } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: '#about', label: ui.nav.about },
    { href: '#experience', label: ui.nav.experience },
    { href: '#work', label: ui.nav.work },
    { href: '#services', label: ui.nav.services },
    { href: '#contact', label: ui.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const langToggle = (
    <button
      onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      lang={lang === 'ar' ? 'en' : 'ar'}
      className="inline-flex h-10 items-center gap-1.5 rounded-full bg-sky-soft px-3.5 text-sm font-semibold text-sky hover:bg-sky hover:text-white"
    >
      <Languages className="h-4 w-4" /> {ui.switchTo}
    </button>
  );

  return (
    <nav className={`fixed inset-x-0 top-0 z-40 bg-paper/80 backdrop-blur transition-shadow ${scrolled || open ? 'shadow-[0_1px_0_var(--color-line)]' : ''}`}>
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
        <a href="#top" aria-label={ui.home}>
          <Logo name={name} tagline={ui.tagline} />
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-3.5 py-2 font-semibold text-ink-soft hover:bg-leaf-soft hover:text-leaf">
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          {langToggle}
          <a href="#contact" className="btn btn-primary h-10 px-5 text-sm">
            {ui.nav.talk}
          </a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          {langToggle}
          <button
            className="rounded-xl p-2 text-ink hover:bg-paper-deep"
            onClick={() => setOpen(!open)}
            aria-label={open ? ui.menuClose : ui.menuOpen}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="space-y-1 px-5 pb-5 pt-2 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 font-semibold text-ink hover:bg-leaf-soft hover:text-leaf"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
