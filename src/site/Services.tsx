import { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, HandHeart, MessageCircleHeart, Users } from 'lucide-react';
import type { Service, Testimonial } from '../data/types';
import { useLang } from '../i18n';
import { Section, serviceIcons, tone } from './shared';
import { ServiceRequestModal } from './ServiceRequestModal';

export function Services({ services, testimonials }: { services: Service[]; testimonials: Testimonial[] }) {
  const { t, tl, ui } = useLang();
  const [requested, setRequested] = useState<string | null>(null);

  return (
    <Section id="services" icon={HandHeart} toneIndex={0} eyebrow={ui.services.eyebrow} title={ui.services.title} intro={ui.services.intro}>
      <div className="grid gap-8 md:grid-cols-2">
        {services.map((s, i) => {
          const Icon = serviceIcons[s.icon] ?? serviceIcons.lightbulb;
          const c = tone(i);
          const forWho = t(s.forWho);
          const duration = t(s.duration);
          const deliverables = tl(s.deliverables);
          return (
            <article key={s.id} className={`card flex flex-col overflow-hidden ${c.shadow}`}>
              <div className={`flex items-center gap-4 p-6 ${c.soft}`}>
                <span className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-white ${c.solid}`}>
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="text-2xl text-ink">{t(s.title)}</h3>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-lg leading-relaxed text-ink-soft">{t(s.summary)}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold text-ink-soft">
                  {forWho && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-deep px-3 py-1.5">
                      <Users className="h-4 w-4" /> {forWho}
                    </span>
                  )}
                  {duration && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-deep px-3 py-1.5">
                      <Clock className="h-4 w-4" /> {duration}
                    </span>
                  )}
                </div>
                {deliverables.length > 0 && (
                  <ul className="mt-5 flex-1 space-y-2">
                    {deliverables.map((d) => (
                      <li key={d} className="flex gap-2 font-semibold text-ink-soft">
                        <CheckCircle2 className={`mt-0.5 h-5 w-5 flex-none ${c.text}`} /> {d}
                      </li>
                    ))}
                  </ul>
                )}
                <button onClick={() => setRequested(t(s.title))} className="btn btn-ghost mt-6 self-start">
                  {ui.services.request} <ArrowRight className="h-5 w-5 rtl:-scale-x-100" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {testimonials.length > 0 && (
        <div className="mt-20">
          <h3 className="flex items-center justify-center gap-2 text-center text-2xl text-ink">
            <MessageCircleHeart className="h-6 w-6 text-berry" /> {ui.services.testimonials}
          </h3>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {testimonials.map((tm, i) => {
              const c = tone(i + 2);
              return (
                <figure key={tm.id}>
                  {/* Speech bubble */}
                  <blockquote className={`relative rounded-2xl border border-line bg-card p-7 text-lg leading-relaxed text-ink`}>
                    “{t(tm.quote)}”
                    <span className={`absolute -bottom-[7px] start-10 h-3.5 w-3.5 rotate-45 border-b border-e border-line bg-card`} />
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 ps-6">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full font-display text-lg font-semibold text-white ${c.solid}`}>
                      {t(tm.name).charAt(0)}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{t(tm.name)}</span>
                      <span className="block text-sm text-muted">{t(tm.role)}</span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      )}

      {requested !== null && (
        <ServiceRequestModal services={services.map((s) => t(s.title))} initialService={requested} onClose={() => setRequested(null)} />
      )}
    </Section>
  );
}
