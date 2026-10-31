import { ArrowUpRight, FolderOpen, Search, Trophy, Wrench } from 'lucide-react';
import type { Project } from '../data/types';
import { useLang } from '../i18n';
import { asset } from '../lib/asset';
import { Section, tone } from './shared';

export function Work({ projects }: { projects: Project[] }) {
  const { t, tl, ui } = useLang();

  return (
    <Section id="work" icon={FolderOpen} toneIndex={1} eyebrow={ui.work.eyebrow} title={ui.work.title} intro={ui.work.intro} bg="mint">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const c = tone(i);
          const steps = [
            { key: 'problem', icon: Search, label: ui.work.problem, value: t(p.problem), cls: 'bg-berry-soft text-berry' },
            { key: 'solution', icon: Wrench, label: ui.work.solution, value: t(p.solution), cls: 'bg-sky-soft text-sky' },
            { key: 'result', icon: Trophy, label: ui.work.result, value: t(p.result), cls: 'bg-sun-soft text-sun' },
          ].filter((s) => s.value);
          return (
            <article key={p.id} className={`card group flex flex-col overflow-hidden transition-transform hover:-translate-y-1 ${c.shadow}`}>
              {p.image && (
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={asset(p.image)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-2xl text-ink">{t(p.title)}</h3>
                <ol className="mt-4 flex-1 space-y-3">
                  {steps.map((s) => (
                    <li key={s.key} className="flex gap-3">
                      <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-xl ${s.cls}`}>
                        <s.icon className="h-4 w-4" />
                      </span>
                      <div className="text-[15px] leading-relaxed">
                        <div className="text-xs font-semibold uppercase tracking-wide text-muted">{s.label}</div>
                        <div className={s.key === 'result' ? 'font-semibold text-ink' : 'text-ink-soft'}>{s.value}</div>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {tl(p.tags).map((tag) => (
                      <span key={tag} className={`rounded-full px-3 py-1 text-xs font-semibold ${c.soft} ${c.text}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-sky hover:underline">
                      {ui.work.view} <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
