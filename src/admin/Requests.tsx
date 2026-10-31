import { useEffect, useState } from 'react';
import { Mail, RefreshCw, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Request = {
  id: number;
  full_name: string;
  email: string;
  service_type: string;
  message: string;
  tracking_id: string;
  status: Status;
  created_at: string;
};

const STATUSES = ['pending', 'in_progress', 'done', 'archived'] as const;
type Status = (typeof STATUSES)[number];

const statusLabel: Record<Status, string> = { pending: 'New', in_progress: 'In progress', done: 'Done', archived: 'Archived' };
const statusClass: Record<Status, string> = {
  pending: 'bg-sun-soft text-sun-dark',
  in_progress: 'bg-sky-soft text-sky-dark',
  done: 'bg-leaf-soft text-leaf-dark',
  archived: 'bg-paper-deep text-muted',
};

/** Service requests sent from the public site (owner-only via RLS). */
export function Requests({ signedIn }: { signedIn: boolean }) {
  const [rows, setRows] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    if (!supabase || !signedIn) return setLoading(false);
    setLoading(true);
    const { data, error: dbError } = await supabase.from('service_requests').select('*').order('created_at', { ascending: false });
    setError(dbError?.message ?? '');
    setRows((data as Request[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedIn]);

  const setStatus = async (id: number, status: Status) => {
    const { error: dbError } = await supabase!.from('service_requests').update({ status }).eq('id', id);
    if (dbError) return setError(dbError.message);
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this request permanently?')) return;
    const { error: dbError } = await supabase!.from('service_requests').delete().eq('id', id);
    if (dbError) return setError(dbError.message);
    setRows((r) => r.filter((x) => x.id !== id));
  };

  if (!signedIn) return <div className="card p-6 text-muted">Sign in to see the requests sent from your site.</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={load} className="btn btn-ghost h-9 px-3">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>
      {error && <p className="rounded-xl bg-berry-soft p-3 text-sm text-danger">{error}</p>}
      {!loading && rows.length === 0 && <div className="card p-6 text-muted">No requests yet.</div>}
      {rows.map((r) => (
        <article key={r.id} className="card space-y-3 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="font-display text-lg font-bold text-ink">{r.full_name}</div>
              <div className="text-sm text-muted">
                {r.service_type} · {new Date(r.created_at).toLocaleString()} · <code>{r.tracking_id}</code>
              </div>
            </div>
            <select
              value={r.status}
              onChange={(e) => setStatus(r.id, e.target.value as Status)}
              className={`rounded-full px-3 py-1 text-sm font-bold ${statusClass[r.status]}`}
              aria-label="Status"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {statusLabel[s]}
                </option>
              ))}
            </select>
          </div>
          <p className="whitespace-pre-wrap text-ink-soft" dir="auto">
            {r.message}
          </p>
          <div className="flex items-center gap-4 text-sm font-bold">
            <a href={`mailto:${r.email}?subject=${encodeURIComponent(`Re: ${r.service_type} (${r.tracking_id})`)}`} className="inline-flex items-center gap-1.5 text-sky hover:underline">
              <Mail className="h-4 w-4" /> {r.email}
            </a>
            <button onClick={() => remove(r.id)} className="ms-auto inline-flex items-center gap-1 text-muted hover:text-danger">
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
