import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Check,
  Download,
  ExternalLink,
  FolderKanban,
  HardDrive,
  Inbox,
  LogOut,
  MessageSquareQuote,
  Sparkles,
  Upload,
  User,
  Wrench,
} from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { clearLocalDraft, loadContent, normalize, saveContent, type ContentSource } from '../data/store';
import { defaultContent } from '../data/defaultContent';
import { SERVICE_ICONS, type SiteContent } from '../data/types';
import { Logo } from '../brand/Logo';
import { FieldGrid, ListEditor, type FieldDef } from './fields';
import { Requests } from './Requests';

type Tab =
  | 'profile'
  | 'stats'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'services'
  | 'testimonials'
  | 'learning'
  | 'requests'
  | 'backup';

const tabs: { id: Tab; label: string; icon: typeof User; group: string }[] = [
  { id: 'profile', label: 'Profile', icon: User, group: 'CV' },
  { id: 'stats', label: 'Key numbers', icon: BarChart3, group: 'CV' },
  { id: 'experience', label: 'Experience', icon: Briefcase, group: 'CV' },
  { id: 'education', label: 'Education', icon: Award, group: 'CV' },
  { id: 'skills', label: 'Skills', icon: Wrench, group: 'CV' },
  { id: 'learning', label: 'Currently learning', icon: BookOpen, group: 'CV' },
  { id: 'projects', label: 'Portfolio', icon: FolderKanban, group: 'Showcase' },
  { id: 'services', label: 'Services', icon: Sparkles, group: 'Showcase' },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, group: 'Showcase' },
  { id: 'requests', label: 'Service requests', icon: Inbox, group: 'Inbox' },
  { id: 'backup', label: 'Backup & restore', icon: HardDrive, group: 'Settings' },
];

const profileFields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', localized: true },
  { key: 'role', label: 'Role / title', type: 'text', localized: true },
  { key: 'headline', label: 'Headline', type: 'textarea', localized: true, help: 'Wrap the key phrase in [square brackets] to highlight it.' },
  { key: 'intro', label: 'Short intro', type: 'textarea', localized: true },
  { key: 'about', label: 'About paragraphs', type: 'list', localized: true, help: 'One paragraph per line.' },
  { key: 'philosophy', label: 'Personal motto', type: 'text', localized: true },
  { key: 'availability', label: 'Availability', type: 'text', localized: true },
  { key: 'photo', label: 'Photo', type: 'image' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'location', label: 'Location', type: 'text', localized: true },
  { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
  { key: 'cvUrl', label: 'CV PDF link', type: 'text', help: 'Path in /public (e.g. /assets/cv.pdf) or any URL.' },
];

function SectionCard({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">{title}</h1>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Login({ onSkip }: { onSkip: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError(authError.message);
    setBusy(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper p-5">
      <div className="card w-full max-w-sm p-8">
        <Logo name="Dashboard" />
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="label" htmlFor="l-email">Email</label>
            <input id="l-email" type="email" required autoComplete="username" className="field" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="l-pass">Password</label>
            <input id="l-pass" type="password" required autoComplete="current-password" className="field" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm text-danger">{error}</p>}
          <button disabled={busy} className="btn btn-primary w-full">
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <button onClick={onSkip} className="mt-4 w-full text-center text-xs text-muted hover:text-ink">
          Continue offline (changes stay in this browser)
        </button>
      </div>
    </div>
  );
}

export function Dashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [authChecked, setAuthChecked] = useState(!supabase);
  const [offline, setOffline] = useState(!supabase);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [source, setSource] = useState<ContentSource>('default');
  const [tab, setTab] = useState<Tab>('profile');
  const [dirty, setDirty] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [saving, setSaving] = useState(false);

  // The dashboard is always left-to-right; the public site switches direction per language
  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthChecked(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    loadContent().then((r) => {
      setContent(r.content);
      setSource(r.source);
    });
  }, []);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  if (!authChecked || !content) return <div className="p-10 text-muted">Loading…</div>;
  if (!session && !offline) return <Login onSkip={() => setOffline(true)} />;

  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setContent({ ...content, [key]: value });
    setDirty(true);
    setSaveMsg('');
  };

  const save = async () => {
    setSaving(true);
    try {
      const where = await saveContent(content);
      setSource(where);
      setDirty(false);
      setSaveMsg(where === 'supabase' ? 'Published to the live site' : 'Saved in this browser only');
    } catch (err) {
      setSaveMsg(`Save failed: ${err instanceof Error ? err.message : 'unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `site-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importJson = (file: File) => {
    file.text().then((txt) => {
      try {
        const data = normalize(JSON.parse(txt));
        if (!data) throw new Error('Not a site content file for this version');
        setContent(data);
        setDirty(true);
        setSaveMsg('Imported — press Save to keep it');
      } catch (err) {
        setSaveMsg(`Import failed: ${err instanceof Error ? err.message : ''}`);
      }
    });
  };

  const groups = [...new Set(tabs.map((t) => t.group))];

  return (
    <div className="min-h-screen bg-paper lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-line bg-card lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between p-5">
          <Logo name="Dashboard" />
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-5 lg:overflow-visible">
          {groups.map((g) => (
            <div key={g} className="contents lg:block">
              <div className="hidden px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted lg:block">{g}</div>
              {tabs
                .filter((t) => t.group === g)
                .map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex flex-none items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold lg:w-full ${
                      tab === t.id ? 'bg-leaf-soft text-leaf' : 'text-ink-soft hover:bg-paper-deep'
                    }`}
                  >
                    <t.icon className="h-4 w-4" /> {t.label}
                  </button>
                ))}
            </div>
          ))}
        </nav>
      </aside>

      <main className="min-w-0">
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper/95 px-5 py-3 backdrop-blur sm:px-8">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className={`h-2 w-2 rounded-full ${session ? 'bg-leaf' : 'bg-sun'}`} />
            {session ? `Signed in as ${session.user.email}` : 'Offline mode — saves to this browser'}
            {source === 'local' && session && ' · showing a local draft'}
          </div>
          <div className="flex items-center gap-2">
            {saveMsg && (
              <span className="hidden items-center gap-1 text-xs text-muted sm:inline-flex">
                {!saveMsg.includes('failed') && <Check className="h-3.5 w-3.5 text-leaf" />} {saveMsg}
              </span>
            )}
            <a href="#/" className="btn btn-ghost h-9 px-3">
              <ExternalLink className="h-4 w-4" /> View site
            </a>
            <button onClick={save} disabled={!dirty || saving} className="btn btn-accent h-9 px-4">
              {saving ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
            </button>
            {session && (
              <button onClick={() => supabase?.auth.signOut()} className="rounded-lg p-2 text-muted hover:bg-paper-deep" aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
          {tab === 'profile' && (
            <SectionCard title="Profile" hint="The basics visitors see first. Fill English and Arabic — if one is empty, the site shows the other.">
              <div className="card p-6">
                <FieldGrid fields={profileFields} value={content.profile} onChange={(v) => set('profile', v)} />
              </div>
            </SectionCard>
          )}

          {tab === 'stats' && (
            <SectionCard title="Key numbers" hint="Short, provable results shown under the hero. Four works best.">
              <ListEditor
                items={content.stats}
                titleKey="value"
                subtitleKey="label"
                blank={{ value: { en: '', ar: '' }, label: { en: '', ar: '' } }}
                addLabel="Add number"
                fields={[
                  { key: 'value', label: 'Value', type: 'text', localized: true, placeholder: '40%' },
                  { key: 'label', label: 'Label', type: 'text', localized: true, placeholder: 'less manual work' },
                ]}
                onChange={(v) => set('stats', v)}
              />
            </SectionCard>
          )}

          {tab === 'experience' && (
            <SectionCard title="Experience" hint="Newest first. Each bullet = one concrete result.">
              <ListEditor
                items={content.experience}
                titleKey="role"
                subtitleKey="org"
                blank={{ role: { en: '', ar: '' }, org: { en: '', ar: '' }, period: { en: '', ar: '' }, points: { en: [], ar: [] }, tags: { en: [], ar: [] } }}
                addLabel="Add position"
                fields={[
                  { key: 'role', label: 'Role', type: 'text', localized: true },
                  { key: 'org', label: 'Organization', type: 'text', localized: true },
                  { key: 'period', label: 'Period', type: 'text', localized: true, placeholder: 'Jan 2025 – Present' },
                  { key: 'points', label: 'Achievements', type: 'list', localized: true, help: 'One per line.' },
                  { key: 'tags', label: 'Tags', type: 'list', localized: true, help: 'One per line.' },
                ]}
                onChange={(v) => set('experience', v)}
              />
            </SectionCard>
          )}

          {tab === 'education' && (
            <SectionCard title="Education & certificates" hint="Degrees, courses and certificates.">
              <ListEditor
                items={content.education}
                titleKey="title"
                subtitleKey="org"
                blank={{ kind: 'course', title: { en: '', ar: '' }, org: { en: '', ar: '' }, period: { en: '', ar: '' }, note: { en: '', ar: '' }, url: '' }}
                addLabel="Add education"
                fields={[
                  { key: 'kind', label: 'Type', type: 'select', options: ['degree', 'course', 'certificate'] },
                  { key: 'period', label: 'Year / period', type: 'text', localized: true },
                  { key: 'title', label: 'Title', type: 'text', localized: true },
                  { key: 'org', label: 'Institution', type: 'text', localized: true },
                  { key: 'note', label: 'Note', type: 'textarea', localized: true },
                  { key: 'url', label: 'Credential link', type: 'text' },
                ]}
                onChange={(v) => set('education', v)}
              />
            </SectionCard>
          )}

          {tab === 'skills' && (
            <SectionCard title="Skills" hint="Group skills into a few clear categories.">
              <ListEditor
                items={content.skills}
                titleKey="title"
                blank={{ title: { en: '', ar: '' }, skills: { en: [], ar: [] } }}
                addLabel="Add skill group"
                fields={[
                  { key: 'title', label: 'Group name', type: 'text', localized: true },
                  { key: 'skills', label: 'Skills', type: 'list', localized: true, help: 'One per line.' },
                ]}
                onChange={(v) => set('skills', v)}
              />
            </SectionCard>
          )}

          {tab === 'learning' && (
            <SectionCard title="Currently learning" hint="Shows your love of learning on the About section.">
              <ListEditor
                items={content.learning}
                titleKey="topic"
                subtitleKey="note"
                blank={{ topic: { en: '', ar: '' }, note: { en: '', ar: '' } }}
                addLabel="Add topic"
                fields={[
                  { key: 'topic', label: 'Topic', type: 'text', localized: true },
                  { key: 'note', label: 'Why / what', type: 'text', localized: true },
                ]}
                onChange={(v) => set('learning', v)}
              />
            </SectionCard>
          )}

          {tab === 'projects' && (
            <SectionCard title="Portfolio" hint="Explain each project as problem → solution → result.">
              <ListEditor
                items={content.projects}
                titleKey="title"
                subtitleKey="result"
                blank={{ title: { en: '', ar: '' }, problem: { en: '', ar: '' }, solution: { en: '', ar: '' }, result: { en: '', ar: '' }, image: '', tags: { en: [], ar: [] }, url: '' }}
                addLabel="Add project"
                fields={[
                  { key: 'title', label: 'Title', type: 'text', localized: true },
                  { key: 'url', label: 'Project link', type: 'text' },
                  { key: 'problem', label: 'Problem', type: 'textarea', localized: true },
                  { key: 'solution', label: 'Solution', type: 'textarea', localized: true },
                  { key: 'result', label: 'Result', type: 'textarea', localized: true, help: 'Gets highlighted — make it measurable.' },
                  { key: 'image', label: 'Cover image', type: 'image' },
                  { key: 'tags', label: 'Tags', type: 'list', localized: true },
                ]}
                onChange={(v) => set('projects', v)}
              />
            </SectionCard>
          )}

          {tab === 'services' && (
            <SectionCard title="Services" hint="What you offer, for whom, and what they get.">
              <ListEditor
                items={content.services}
                titleKey="title"
                subtitleKey="summary"
                blank={{ icon: 'lightbulb', title: { en: '', ar: '' }, summary: { en: '', ar: '' }, forWho: { en: '', ar: '' }, deliverables: { en: [], ar: [] }, duration: { en: '', ar: '' } }}
                addLabel="Add service"
                fields={[
                  { key: 'title', label: 'Title', type: 'text', localized: true },
                  { key: 'icon', label: 'Icon', type: 'select', options: SERVICE_ICONS },
                  { key: 'summary', label: 'Summary', type: 'textarea', localized: true },
                  { key: 'forWho', label: 'Who it’s for', type: 'text', localized: true },
                  { key: 'duration', label: 'Typical duration', type: 'text', localized: true },
                  { key: 'deliverables', label: 'Deliverables', type: 'list', localized: true, help: 'One per line.' },
                ]}
                onChange={(v) => set('services', v)}
              />
            </SectionCard>
          )}

          {tab === 'testimonials' && (
            <SectionCard title="Testimonials">
              <ListEditor
                items={content.testimonials}
                titleKey="name"
                subtitleKey="role"
                blank={{ quote: { en: '', ar: '' }, name: { en: '', ar: '' }, role: { en: '', ar: '' } }}
                addLabel="Add testimonial"
                fields={[
                  { key: 'name', label: 'Name', type: 'text', localized: true },
                  { key: 'role', label: 'Role / company', type: 'text', localized: true },
                  { key: 'quote', label: 'Quote', type: 'textarea', localized: true },
                ]}
                onChange={(v) => set('testimonials', v)}
              />
            </SectionCard>
          )}

          {tab === 'requests' && (
            <SectionCard title="Service requests" hint="Requests visitors sent from the Services section.">
              <Requests signedIn={!!session} />
            </SectionCard>
          )}

          {tab === 'backup' && (
            <SectionCard title="Backup & restore" hint="Download all content as a file, or load one back.">
              <div className="card space-y-4 p-6">
                <div className="flex flex-wrap gap-3">
                  <button onClick={exportJson} className="btn btn-primary">
                    <Download className="h-4 w-4" /> Download backup (.json)
                  </button>
                  <label className="btn btn-ghost">
                    <Upload className="h-4 w-4" /> Load backup
                    <input type="file" accept="application/json" className="sr-only" onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
                  </label>
                </div>
                <hr className="border-line" />
                <button
                  onClick={() => {
                    if (!confirm('Replace everything with the built-in starter content?')) return;
                    clearLocalDraft();
                    setContent(defaultContent);
                    setDirty(true);
                  }}
                  className="text-sm font-medium text-danger hover:underline"
                >
                  Reset to starter content
                </button>
              </div>
            </SectionCard>
          )}
        </div>
      </main>
    </div>
  );
}
