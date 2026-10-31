import { ArrowRight, BookOpen, Download, GraduationCap, Hammer, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Profile, Stat } from '../data/types';
import { LogoMark } from '../brand/Logo';
import { useLang } from '../i18n';
import { asset } from '../lib/asset';
import { Highlighted, tone } from './shared';

const pillarIcons = [BookOpen, Hammer, Sparkles];

export function Hero({ profile, stats }: { profile: Profile; stats: Stat[] }) {
  const { t, ui } = useLang();
  const name = t(profile.name);
  const availability = t(profile.availability);
  const [statA] = stats;

  return (
    <section id="top" className="relative overflow-hidden bg-paper px-5 pb-16 pt-28 sm:px-6 md:pt-36">
      {/* Cover-style backdrop: dot grid, violet glow, a glowing arc */}
      <div className="dots pointer-events-none absolute inset-y-0 start-0 w-1/2 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="pointer-events-none absolute -end-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-leaf/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-72 -start-72 h-[36rem] w-[36rem] rounded-full border-2 border-leaf/40 shadow-[0_0_80px_-10px_var(--color-leaf)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.35fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {availability && (
            <span className="pill border border-line bg-card/80 text-ink-soft">
              <span className="h-2 w-2 rounded-full bg-sun shadow-[0_0_10px_var(--color-sun)]" />
              {availability}
            </span>
          )}
          <p className="mt-7 font-display text-xl font-extrabold uppercase tracking-wide text-ink sm:text-2xl">{name}</p>
          <span className="mt-3 block h-0.5 w-40 bg-gradient-to-r from-leaf to-transparent rtl:bg-gradient-to-l" />
          <h1 className="mt-5 text-4xl leading-[1.15] text-ink sm:text-5xl lg:text-[3.2rem]">
            <Highlighted text={t(profile.headline)} />
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{t(profile.intro)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#services" className="btn btn-primary">
              {ui.hero.cta} <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </a>
            {profile.cvUrl && (
              <a href={asset(profile.cvUrl)} download className="btn btn-ghost">
                <Download className="h-4 w-4" /> {ui.hero.cv}
              </a>
            )}
          </div>
          <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4" /> {t(profile.location)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mx-auto w-full max-w-sm"
        >
          {/* Violet ring + thin white ring, like the talk thumbnails */}
          <div className="aspect-square rounded-full bg-gradient-to-br from-leaf to-[#4c1d95] p-5 shadow-[0_0_90px_-20px_var(--color-leaf)]">
            <div className="h-full w-full overflow-hidden rounded-full border-4 border-white bg-card">
              {profile.photo ? (
                <img src={asset(profile.photo)} alt={name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <LogoMark size={120} />
                </div>
              )}
            </div>
          </div>

          <div className="absolute -start-4 bottom-4 flex items-center gap-3 rounded-2xl border border-line bg-card/95 px-4 py-3 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sun-soft text-sun">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display font-semibold text-ink">{ui.hero.teacher}</span>
              {statA && (
                <span className="block text-sm text-muted">
                  <bdi className="font-semibold text-sun">{t(statA.value)}</bdi> {t(statA.label)}
                </span>
              )}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Learn · Build · Clarify */}
      <div className="relative mx-auto mt-20 grid max-w-6xl gap-5 md:grid-cols-3">
        {ui.hero.pillars.map((p, i) => {
          const Icon = pillarIcons[i];
          const c = tone(i);
          return (
            <div key={p.title} className="card flex gap-4 p-6">
              <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-line ${c.text}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-lg font-semibold text-ink">
                  <span className="text-leaf">0{i + 1}</span> {p.title}
                </div>
                <p className="mt-1 text-ink-soft">{p.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {stats.length > 1 && (
        <dl className="relative mx-auto mt-5 grid max-w-6xl grid-cols-2 divide-line rounded-2xl border border-line bg-card md:grid-cols-4 md:divide-x rtl:md:divide-x-reverse">
          {stats.map((s, i) => (
            <div key={s.id} className="px-5 py-5 text-center">
              <dt className="sr-only">{t(s.label)}</dt>
              <dd className={`font-display text-3xl font-extrabold ${i % 2 ? 'text-berry' : 'text-sun'}`}>
                <bdi>{t(s.value)}</bdi>
              </dd>
              <dd className="mt-1 text-sm text-muted">{t(s.label)}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
