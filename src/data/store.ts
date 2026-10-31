import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { defaultContent } from './defaultContent';
import type { SiteContent } from './types';

const LOCAL_KEY = 'site-content-draft';
const ROW_ID = 'main';

export type ContentSource = 'supabase' | 'local' | 'default';

/** Accepts saved content only if it matches the current shape; fills new sections with defaults. */
export function normalize(data: unknown): SiteContent | null {
  const d = data as Partial<SiteContent> | null;
  if (!d || d.version !== defaultContent.version || !d.profile) return null;
  return { ...defaultContent, ...d, profile: { ...defaultContent.profile, ...d.profile } };
}

function readLocal(): SiteContent | null {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? normalize(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export async function loadContent(): Promise<{ content: SiteContent; source: ContentSource }> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('site_content').select('data').eq('id', ROW_ID).maybeSingle();
      const content = !error && normalize(data?.data);
      if (content) return { content, source: 'supabase' };
    } catch {
      // Network or missing table — fall through to local content
    }
  }
  const local = readLocal();
  if (local) return { content: local, source: 'local' };
  return { content: defaultContent, source: 'default' };
}

/** Saves to Supabase when signed in; always keeps a local copy. */
export async function saveContent(content: SiteContent): Promise<ContentSource> {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(content));
  } catch {
    // Storage blocked — Supabase result below decides the outcome
  }
  if (supabase) {
    const { data: session } = await supabase.auth.getSession();
    if (session.session) {
      const { error } = await supabase
        .from('site_content')
        .upsert({ id: ROW_ID, data: content, updated_at: new Date().toISOString() });
      if (error) throw error;
      return 'supabase';
    }
  }
  return 'local';
}

export function clearLocalDraft() {
  try {
    localStorage.removeItem(LOCAL_KEY);
  } catch {
    // ignore
  }
}

export function useSiteContent() {
  const [state, setState] = useState<{ content: SiteContent; source: ContentSource; loading: boolean }>({
    content: defaultContent,
    source: 'default',
    loading: true,
  });

  useEffect(() => {
    let alive = true;
    loadContent().then((r) => alive && setState({ ...r, loading: false }));
    return () => {
      alive = false;
    };
  }, []);

  return state;
}

export const newId = () => Math.random().toString(36).slice(2, 10);
