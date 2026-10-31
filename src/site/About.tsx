import { BookOpen, Heart, Quote, Star } from 'lucide-react';
import type { LearningItem, Profile, SkillGroup } from '../data/types';
import { useLang } from '../i18n';
import { Section, tone } from './shared';

export function About({
  profile,
  skills,
  learning,
}: {
  profile: Profile;
  skills: SkillGroup[];
  learning: LearningItem[];
}) {
  const { t, tl, ui } = useLang();
  const philosophy = t(profile.philosophy);

  return (
    <Section id="about" icon={Heart} toneIndex={3} eyebrow={ui.about.eyebrow} title={ui.about.title} bg="cream">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="card space-y-4 p-7 text-lg leading-relaxed text-ink-soft sm:p-9">
          {tl(profile.about).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {philosophy && (
            <figure className="relative rounded-2xl bg-gradient-to-br from-leaf-dark to-[#3b1a78] p-7 text-white">
              <Quote className="h-8 w-8 opacity-50" />
              <blockquote className="mt-2 font-display text-2xl font-semibold leading-snug">{philosophy}</blockquote>
            </figure>
          )}

          {learning.length > 0 && (
            <aside className="card flex-1 p-6">
              <div className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
                <BookOpen className="h-5 w-5 text-sky" /> {ui.about.learning}
              </div>
              <ul className="mt-4 space-y-3">
                {learning.map((l, i) => (
                  <li key={l.id} className={`rounded-2xl p-3.5 ${tone(i + 2).soft}`}>
                    <div className="font-semibold text-ink">{t(l.topic)}</div>
                    {t(l.note) && <div className="text-sm text-ink-soft">{t(l.note)}</div>}
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>

      {skills.length > 0 && (
        <>
          <h3 className="mt-16 flex items-center justify-center gap-2 text-center text-2xl text-ink">
            <Star className="h-6 w-6 fill-sun text-sun" /> {ui.about.skills}
          </h3>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((g, i) => {
              const c = tone(i);
              return (
                <div key={g.id} className={`card border-t-[6px] p-6 ${c.border}`}>
                  <h4 className={`text-xl ${c.text}`}>{t(g.title)}</h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tl(g.skills).map((s) => (
                      <span key={s} className={`rounded-full px-3 py-1.5 text-sm font-semibold text-ink-soft ${c.soft}`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Section>
  );
}
