import type { ReactNode } from 'react';
import { BarChart3, Compass, GraduationCap, Layers, Lightbulb, Workflow, type LucideIcon } from 'lucide-react';
import type { ServiceIcon } from '../data/types';

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  lightbulb: Lightbulb,
  workflow: Workflow,
  'bar-chart': BarChart3,
  'graduation-cap': GraduationCap,
  compass: Compass,
  layers: Layers,
};

/** Brand colors cycled across cards. Full class names so Tailwind can see them. */
export const tones = [
  { solid: 'bg-leaf', soft: 'bg-leaf-soft', text: 'text-leaf', border: 'border-leaf', shadow: 'hover:border-leaf/50' },
  { solid: 'bg-sun text-paper!', soft: 'bg-sun-soft', text: 'text-sun', border: 'border-sun', shadow: 'hover:border-leaf/50' },
  { solid: 'bg-sky', soft: 'bg-sky-soft', text: 'text-sky', border: 'border-sky', shadow: 'hover:border-leaf/50' },
  { solid: 'bg-berry', soft: 'bg-berry-soft', text: 'text-berry', border: 'border-berry', shadow: 'hover:border-leaf/50' },
] as const;
export const tone = (i: number) => tones[i % tones.length];

/** Renders text where [bracketed] parts get the marker treatment. */
export function Highlighted({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('[') && p.endsWith(']') ? (
          <span key={i} className="hl">
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

const bgs = { white: 'bg-paper', cream: 'bg-paper-deep', mint: 'bg-paper-deep', sky: 'bg-paper-deep' };

export function Section({
  id,
  icon: Icon,
  toneIndex = 0,
  eyebrow,
  title,
  intro,
  bg = 'white',
  children,
}: {
  id: string;
  icon: LucideIcon;
  toneIndex?: number;
  eyebrow: string;
  title: string;
  intro?: string;
  bg?: keyof typeof bgs;
  children: ReactNode;
}) {
  const t = tone(toneIndex);
  return (
    <section id={id} className={`px-5 py-20 sm:px-6 md:py-24 ${bgs[bg]}`}>
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <span className={`pill ${t.soft} ${t.text}`}>
            <Icon className="h-4 w-4" /> {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl text-ink sm:text-4xl">{title}</h2>
          {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
