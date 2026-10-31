import { useState, type FormEvent } from 'react';
import { Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import type { Profile } from '../data/types';
import { logEvent } from '../utils/analytics';
import { LogoMark } from '../brand/Logo';
import { useLang } from '../i18n';

export function Contact({ profile }: { profile: Profile }) {
  const { t, ui } = useLang();
  const tx = ui.contact;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const url = import.meta.env.VITE_CONTACT_FORM_URL;
    if (!url) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      logEvent('Contact', 'Form Submit', 'Contact Form Success');
    } catch {
      setStatus('error');
    }
  };

  const details = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}`, ltr: true },
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, ltr: true },
    { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin, ltr: true },
    { icon: MapPin, label: t(profile.location), href: '', ltr: false },
  ].filter((d) => d.label);

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-paper-deep px-5 pt-20 sm:px-6 md:pt-24">
      <div className="pointer-events-none absolute -bottom-40 -end-40 h-[30rem] w-[30rem] rounded-full bg-leaf/25 blur-[120px]" />
      <div className="relative mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
        <div>
          <span className="pill bg-leaf-soft text-sky">
            <MessageCircle className="h-4 w-4" /> {tx.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl">{tx.title}</h2>
          <p className="mt-3 text-lg text-ink-soft">{tx.intro}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {details.map(({ icon: Icon, label, href, ltr }) => {
              const inner = (
                <>
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-leaf text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span dir={ltr ? 'ltr' : undefined} className="truncate font-semibold">
                    {label}
                  </span>
                </>
              );
              return (
                <li key={label} className={Icon === Mail ? 'sm:col-span-2' : ''}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-2xl border border-line bg-card p-2.5 hover:border-leaf"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-2xl border border-line bg-card p-2.5">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-line bg-card p-7 shadow-[0_0_60px_-25px_var(--color-leaf)]">
          <div>
            <label className="label" htmlFor="c-name">{tx.name}</label>
            <input id="c-name" required minLength={2} className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="c-email">{tx.email}</label>
            <input id="c-email" type="email" dir="ltr" required className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="c-msg">{tx.message}</label>
            <textarea id="c-msg" required minLength={10} rows={5} className="field resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full">
            {status === 'sending' ? tx.sending : tx.send}
          </button>
          {status === 'sent' && <p className="text-sm font-semibold text-leaf">{tx.sent}</p>}
          {status === 'error' && (
            <p className="text-sm text-danger">
              {tx.error} <bdi>{profile.email}</bdi>
            </p>
          )}
        </form>
      </div>

      <footer className="mx-auto mt-16 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t-2 border-line py-8 text-sm font-semibold text-muted">
        <span className="inline-flex items-center gap-3">
          <LogoMark size={30} />
          © {new Date().getFullYear()} {t(profile.name)}
        </span>
        <span>{ui.tagline}</span>
      </footer>
    </section>
  );
}
