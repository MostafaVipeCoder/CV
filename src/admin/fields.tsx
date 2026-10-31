import { useId, useState } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { newId } from '../data/store';
import { supabase } from '../lib/supabase';
import { asset } from '../lib/asset';
import { LANGS, type Lang } from '../data/types';

export type FieldDef = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'list' | 'select' | 'image';
  /** Value is { en, ar } and gets one input per language */
  localized?: boolean;
  options?: readonly string[];
  placeholder?: string;
  help?: string;
};

type Item = { id: string };
const get = (o: object, k: string) => (o as Record<string, unknown>)[k];

const langLabel: Record<Lang, string> = { en: 'English', ar: 'العربية' };

/** Readable one-line preview of a plain or localized value */
function preview(v: unknown): string {
  if (!v) return '';
  if (typeof v === 'string') return v;
  const loc = v as Record<Lang, string | string[]>;
  const pick = loc.en || loc.ar;
  return Array.isArray(pick) ? pick.join(', ') : (pick ?? '');
}

const MAX_INLINE_BYTES = 600 * 1024;
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Uploads to the Supabase "media" bucket when signed in; otherwise embeds a small data URL. */
async function storeImage(file: File): Promise<string> {
  const { data } = supabase ? await supabase.auth.getSession() : { data: { session: null } };
  if (supabase && data.session) {
    if (file.size > MAX_UPLOAD_BYTES) throw new Error('Image is larger than 5 MB — compress it first.');
    const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
    const path = `${newId()}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('media').upload(path, file, { contentType: file.type });
    if (error) throw error;
    return supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
  }
  if (file.size > MAX_INLINE_BYTES) throw new Error('Offline mode: image must be under 600 KB (sign in to upload larger ones).');
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.readAsDataURL(file);
  });
}

function TextInput({
  id,
  type,
  value,
  onChange,
  dir,
  placeholder,
}: {
  id: string;
  type: FieldDef['type'];
  value: unknown;
  onChange: (v: unknown) => void;
  dir?: 'ltr' | 'rtl';
  placeholder?: string;
}) {
  if (type === 'textarea') {
    return <textarea id={id} dir={dir} rows={3} className="field" placeholder={placeholder} value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} />;
  }
  if (type === 'list') {
    const list = (value as string[]) ?? [];
    return (
      <textarea
        id={id}
        dir={dir}
        rows={Math.max(3, list.length + 1)}
        className="field"
        placeholder={placeholder ?? (dir === 'rtl' ? 'عنصر في كل سطر' : 'One item per line')}
        value={list.join('\n')}
        onChange={(e) => onChange(e.target.value.split('\n'))}
        onBlur={(e) => onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
      />
    );
  }
  return <input id={id} dir={dir} className="field" placeholder={placeholder} value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} />;
}

function ImageInput({ id, value, onChange }: { id: string; value: unknown; onChange: (v: unknown) => void }) {
  const [imageError, setImageError] = useState('');
  const [uploading, setUploading] = useState(false);
  const src = (value as string) ?? '';
  return (
    <div className="flex gap-3">
      <div className="h-16 w-16 flex-none overflow-hidden rounded-xl border border-line bg-paper">
        {src && <img src={asset(src)} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <input id={id} className="field" placeholder="Paste an image URL…" value={src.startsWith('data:') ? '(uploaded image)' : src} onChange={(e) => onChange(e.target.value)} />
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <label className="btn btn-ghost h-8 px-3 text-xs">
            {uploading ? 'Uploading…' : 'Upload'}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={uploading}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = '';
                if (!file) return;
                setImageError('');
                setUploading(true);
                try {
                  onChange(await storeImage(file));
                } catch (err) {
                  setImageError(err instanceof Error ? err.message : 'Upload failed.');
                } finally {
                  setUploading(false);
                }
              }}
            />
          </label>
          {src && (
            <button type="button" className="text-muted hover:text-danger" onClick={() => onChange('')}>
              Remove
            </button>
          )}
          {imageError && <span className="text-danger">{imageError}</span>}
        </div>
      </div>
    </div>
  );
}

export function Field({ def, value, onChange }: { def: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  const id = useId();

  if (def.localized) {
    const loc = (value ?? {}) as Record<Lang, unknown>;
    return (
      <fieldset>
        <legend className="label">{def.label}</legend>
        <div className="grid gap-3 md:grid-cols-2">
          {LANGS.map((lang) => (
            <div key={lang}>
              <label htmlFor={`${id}-${lang}`} className="mb-1 block text-[11px] font-medium text-muted">
                {langLabel[lang]}
              </label>
              <TextInput
                id={`${id}-${lang}`}
                type={def.type}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                value={loc[lang]}
                placeholder={lang === 'en' ? def.placeholder : undefined}
                onChange={(v) => onChange({ ...loc, [lang]: v })}
              />
            </div>
          ))}
        </div>
        {def.help && <p className="mt-1 text-xs text-muted">{def.help}</p>}
      </fieldset>
    );
  }

  let input;
  if (def.type === 'select') {
    input = (
      <select id={id} className="field" value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)}>
        {def.options?.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    );
  } else if (def.type === 'image') {
    input = <ImageInput id={id} value={value} onChange={onChange} />;
  } else {
    input = <TextInput id={id} type={def.type} value={value} placeholder={def.placeholder} onChange={onChange} />;
  }

  return (
    <div>
      <label htmlFor={id} className="label">
        {def.label}
      </label>
      {input}
      {def.help && <p className="mt-1 text-xs text-muted">{def.help}</p>}
    </div>
  );
}

export function FieldGrid<T extends object>({
  fields,
  value,
  onChange,
}: {
  fields: FieldDef[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.key} className={!f.localized && (f.type === 'text' || f.type === 'select') ? '' : 'sm:col-span-2'}>
          <Field def={f} value={get(value, f.key)} onChange={(v) => onChange({ ...value, [f.key]: v })} />
        </div>
      ))}
    </div>
  );
}

export function ListEditor<T extends Item>({
  items,
  fields,
  titleKey,
  subtitleKey,
  blank,
  addLabel,
  onChange,
}: {
  items: T[];
  fields: FieldDef[];
  titleKey: keyof T & string;
  subtitleKey?: keyof T & string;
  blank: Omit<T, 'id'>;
  addLabel: string;
  onChange: (items: T[]) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const update = (i: number, v: T) => onChange(items.map((it, idx) => (idx === i ? v : it)));
  const move = (i: number, dir: -1 | 1) => {
    const next = [...items];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    onChange(next);
  };
  const remove = (i: number) => {
    if (confirm(`Delete “${preview(get(items[i], titleKey)) || 'this item'}”?`)) onChange(items.filter((_, idx) => idx !== i));
  };
  const add = () => {
    const item = { ...structuredClone(blank), id: newId() } as T;
    onChange([...items, item]);
    setOpenId(item.id);
  };

  return (
    <div className="space-y-3">
      {items.length === 0 && <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted">Nothing here yet.</p>}
      {items.map((item, i) => {
        const open = openId === item.id;
        const subtitle = subtitleKey ? preview(get(item, subtitleKey)) : '';
        return (
          <div key={item.id} className="card overflow-hidden">
            <div className="flex items-center gap-2 p-3 pl-4">
              <button type="button" onClick={() => setOpenId(open ? null : item.id)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                <ChevronDown className={`h-4 w-4 flex-none text-muted transition-transform ${open ? '' : '-rotate-90'}`} />
                <span className="min-w-0">
                  <span className="block truncate font-medium text-ink">{preview(get(item, titleKey)) || 'Untitled'}</span>
                  {subtitle && <span className="block truncate text-xs text-muted">{subtitle}</span>}
                </span>
              </button>
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="rounded-lg p-1.5 text-muted hover:bg-paper disabled:opacity-30" aria-label="Move up">
                <ArrowUp className="h-4 w-4" />
              </button>
              <button type="button" disabled={i === items.length - 1} onClick={() => move(i, 1)} className="rounded-lg p-1.5 text-muted hover:bg-paper disabled:opacity-30" aria-label="Move down">
                <ArrowDown className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => remove(i)} className="rounded-lg p-1.5 text-muted hover:bg-berry-soft hover:text-danger" aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {open && (
              <div className="border-t border-line bg-paper/50 p-4">
                <FieldGrid fields={fields} value={item} onChange={(v) => update(i, v)} />
              </div>
            )}
          </div>
        );
      })}
      <button type="button" onClick={add} className="btn btn-ghost w-full border-dashed">
        <Plus className="h-4 w-4" /> {addLabel}
      </button>
    </div>
  );
}
