import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLang } from '../i18n';

export function ServiceRequestModal({
  services,
  initialService,
  onClose,
}: {
  services: string[];
  initialService: string;
  onClose: () => void;
}) {
  const { ui } = useLang();
  const tx = ui.request;
  const [form, setForm] = useState({ fullName: '', email: '', serviceType: initialService, message: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setState('sending');
    setError('');
    const id = 'AS-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    try {
      if (!supabase) throw new Error(tx.notConfigured);
      const { error: dbError } = await supabase.from('service_requests').insert([
        {
          full_name: form.fullName,
          email: form.email,
          service_type: form.serviceType,
          message: form.message,
          tracking_id: id,
          status: 'pending',
        },
      ]);
      if (dbError) throw dbError;
      setTrackingId(id);
      setState('done');
    } catch (err) {
      console.error('Service request failed:', err);
      setError(err instanceof Error && err.message === tx.notConfigured ? tx.notConfigured : tx.failed);
      setState('idle');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-title"
        className="card relative max-h-[92vh] w-full max-w-lg overflow-y-auto p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute end-4 top-4 rounded-lg p-1.5 text-muted hover:bg-paper" aria-label={tx.close}>
          <X className="h-5 w-5" />
        </button>

        {state === 'done' ? (
          <div className="py-4 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-leaf" />
            <h2 id="request-title" className="mt-4 text-2xl font-semibold">
              {tx.doneTitle}
            </h2>
            <p className="mt-2 text-muted">{tx.doneText}</p>
            <p className="mt-6 text-xs font-semibold text-muted">{tx.reference}</p>
            <code className="mt-1 inline-block rounded-lg bg-sun-soft px-3 py-1.5 text-lg font-semibold" dir="ltr">
              {trackingId}
            </code>
            <button onClick={onClose} className="btn btn-primary mt-8 w-full">
              {tx.done}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <h2 id="request-title" className="text-2xl font-semibold">
              {tx.title}
            </h2>
            <p className="text-sm text-muted">{tx.hint}</p>
            <div>
              <label className="label" htmlFor="rq-name">{tx.name}</label>
              <input id="rq-name" required className="field" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            </div>
            <div>
              <label className="label" htmlFor="rq-email">{tx.email}</label>
              <input id="rq-email" type="email" dir="ltr" required className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="label" htmlFor="rq-service">{tx.service}</label>
              <select id="rq-service" className="field" value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })}>
                {services.map((s) => (
                  <option key={s}>{s}</option>
                ))}
                <option>{tx.other}</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="rq-msg">{tx.message}</label>
              <textarea id="rq-msg" required rows={4} className="field resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>
            {error && <p className="rounded-lg bg-berry-soft p-3 text-sm text-danger">{error}</p>}
            <button type="submit" disabled={state === 'sending'} className="btn btn-primary w-full">
              {state === 'sending' ? tx.sending : tx.send}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
