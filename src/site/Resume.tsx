import { Award, BookMarked, ExternalLink, GraduationCap, Map } from 'lucide-react';
import type { Education, Experience } from '../data/types';
import { useLang } from '../i18n';
import { Section, tone } from './shared';

const educationIcon = { degree: GraduationCap, course: BookMarked, certificate: Award };

export function Resume({ experience, education }: { experience: Experience[]; education: Education[] }) {
  const { t, tl, ui } = useLang();

  return (
    <Section id="experience" icon={Map} toneIndex={2} eyebrow={ui.resume.eyebrow} title={ui.resume.title} intro={ui.resume.intro}>
      {/* Learning-path roadmap: numbered stops, cards alternate sides on large screens */}
      <ol className="relative">
        <span className="absolute bottom-6 start-6 top-6 border-s-4 border-dashed border-line lg:start-1/2 lg:-ms-0.5" />
        {experience.map((e, i) => {
          const c = tone(i);
          const left = i % 2 === 0;
          const card = (
            <article className={`card p-6 sm:p-7 ${c.shadow}`}>
              <span className={`pill ${c.soft} ${c.text}`}>{t(e.period)}</span>
              <h3 className="mt-3 text-2xl text-ink">{t(e.role)}</h3>
              <div className={`font-semibold ${c.text}`}>{t(e.org)}</div>
              <ul className="mt-4 space-y-2">
                {tl(e.points).map((p, j) => (
                  <li key={j} className="flex gap-2.5 leading-relaxed text-ink-soft">
                    <span className={`mt-2.5 h-2 w-2 flex-none rounded-full ${c.solid}`} />
                    {p}
                  </li>
                ))}
              </ul>
              {tl(e.tags).length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {tl(e.tags).map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          );
          return (
            <li key={e.id} className="relative mb-10 grid grid-cols-[3rem_1fr] gap-5 last:mb-0 lg:grid-cols-[1fr_3.5rem_1fr] lg:gap-8">
              <div className={`hidden lg:block ${left ? '' : 'lg:order-3'}`}>{card}</div>
              <span
                className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-paper font-display text-lg font-semibold text-white lg:order-2 lg:mt-6 lg:h-14 lg:w-14 ${c.solid}`}
              >
                {experience.length - i}
              </span>
              <div className="lg:hidden">{card}</div>
              <div className={`hidden lg:block ${left ? 'lg:order-3' : ''}`} />
            </li>
          );
        })}
      </ol>

      {education.length > 0 && (
        <div className="mt-20">
          <h3 className="text-center text-2xl text-ink">{ui.resume.education}</h3>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {education.map((ed, i) => {
              const Icon = educationIcon[ed.kind];
              const c = tone(i + 1);
              const period = t(ed.period);
              return (
                <li key={ed.id} className={`card p-6`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-2xl text-white ${c.solid}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-semibold text-ink-soft">
                      {ui.resume.kinds[ed.kind]}
                      {period && ` · ${period}`}
                    </span>
                  </div>
                  <div className="mt-4 font-display text-xl font-semibold text-ink">{t(ed.title)}</div>
                  <div className="font-semibold text-ink-soft">{t(ed.org)}</div>
                  {t(ed.note) && <p className="mt-1 text-sm text-muted">{t(ed.note)}</p>}
                  {ed.url && (
                    <a
                      href={ed.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:underline ${c.text}`}
                    >
                      {ui.resume.credential} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Section>
  );
}
