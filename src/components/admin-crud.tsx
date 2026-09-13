import { useState } from 'react';
import { apiDelete, apiPost, apiPut } from '../lib/api';
import { Card, SectionTitle, TextField, TextArea, SelectField, Toggle, RowActions, EmptyNote } from './admin-ui';

export interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
  span?: boolean;
}

interface Props {
  title: string;
  sub: string;
  endpoint: string;
  items: any[];
  fields: FieldDef[];
  addLabel: string;
  defaults: Record<string, any>;
  refresh: () => void;
}

export default function CrudList({ title, sub, endpoint, items, fields, addLabel, defaults, refresh }: Props) {
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState<any>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<any>({ ...defaults });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const sorted = [...(items || [])].sort((a: any, b: any) => {
    const ao = a.sort_order ?? 0, bo = b.sort_order ?? 0;
    if (ao !== bo) return ao - bo;
    return (a.id ?? 0) - (b.id ?? 0);
  });

  const startEdit = (r: any) => { setEditing(r.id); setDraft({ ...r }); setMsg(''); };
  const cancel = () => { setEditing(null); setDraft(null); };

  const saveEdit = async () => {
    if (!draft) return;
    setBusy(true);
    try {
      const payload: any = { id: draft.id };
      for (const f of fields) payload[f.key] = draft[f.key];
      payload.visible = draft.visible;
      await apiPut(endpoint, payload);
      setMsg('Saved.');
      cancel();
      refresh();
    } catch (e: any) { setMsg('Error: ' + e.message); }
    finally { setBusy(false); }
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    try {
      const maxOrder = sorted.reduce((m: number, r: any) => Math.max(m, r.sort_order ?? 0), -1);
      await apiPost(endpoint, { ...form, sort_order: maxOrder + 1, visible: true });
      setForm({ ...defaults });
      setAdding(false);
      setMsg('Added.');
      refresh();
    } catch (err: any) { setMsg('Error: ' + err.message); }
    finally { setBusy(false); }
  };

  const del = async (id: number) => {
    try { await apiDelete(endpoint, { id }); setMsg('Deleted.'); refresh(); }
    catch (e: any) { setMsg('Error: ' + e.message); }
  };

  const move = async (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= sorted.length) return;
    setBusy(true);
    try {
      const a = sorted[idx], b = sorted[j];
      const aOrder = a.sort_order ?? idx;
      const bOrder = b.sort_order ?? j;
      const nextA = aOrder === bOrder ? j : bOrder;
      const nextB = aOrder === bOrder ? idx : aOrder;
      await apiPut(endpoint, { id: a.id, sort_order: nextA });
      await apiPut(endpoint, { id: b.id, sort_order: nextB });
      refresh();
    } catch (e: any) { setMsg('Error: ' + e.message); }
    finally { setBusy(false); }
  };

  const toggleVis = async (r: any) => {
    try { await apiPut(endpoint, { id: r.id, visible: !r.visible }); refresh(); }
    catch (e: any) { setMsg('Error: ' + (e as Error).message); }
  };

  const renderField = (f: FieldDef, val: any, set: (v: any) => void) => {
    if (f.type === 'textarea') return <div key={f.key} className={f.span === false ? '' : 'md:col-span-2'}><TextArea label={f.label} value={val ?? ''} onChange={set} /></div>;
    if (f.type === 'select') return <div key={f.key}><SelectField label={f.label} value={val ?? (f.options?.[0] || '')} options={f.options || []} onChange={set} /></div>;
    return <div key={f.key} className={f.span ? 'md:col-span-2' : ''}><TextField label={f.label} value={val ?? ''} onChange={set} /></div>;
  };

  const summary = (r: any) => fields.slice(0, 2).map((f) => r[f.key]).filter(Boolean).join(' — ') || ('#' + r.id);

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <SectionTitle title={title} sub={sub + ' · ' + sorted.length + ' items'} />
        <button type="button" onClick={() => setAdding(!adding)}
          className="shrink-0 rounded-lg px-4 py-2 text-[11px] font-bold tracking-[0.15em] uppercase"
          style={{ background: 'var(--color-aer-cream)', color: 'var(--color-aer-charcoal)' }}>
          {adding ? 'CLOSE' : '+ ADD'}
        </button>
      </div>

      {adding && (
        <form onSubmit={add} className="mb-5 rounded-xl border p-4" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-blue) 40%, transparent)', background: 'color-mix(in oklab, var(--color-aer-blue) 5%, transparent)' }}>
          <p className="mb-3 text-[11px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-aer-blue)' }}>{addLabel}</p>
          <div className="grid gap-3 md:grid-cols-2">
            {fields.map((f) => renderField(f, form[f.key], (v) => setForm({ ...form, [f.key]: v })))}
          </div>
          <button type="submit" disabled={busy} className="mt-3 rounded-lg px-5 py-2 text-[11px] font-bold tracking-[0.2em] uppercase disabled:opacity-50" style={{ background: 'var(--color-aer-blue)', color: 'var(--color-aer-charcoal)' }}>
            {busy ? 'ADDING…' : 'ADD ITEM'}
          </button>
        </form>
      )}

      {sorted.length === 0 && <EmptyNote text="No items yet — add the first one above." />}

      <div className="space-y-2">
        {sorted.map((r: any, i: number) => (
          <div key={r.id} className="rounded-lg border p-3" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 10%, transparent)', opacity: r.visible === false ? 0.55 : 1 }}>
            <div className="flex items-center justify-between gap-3">
              <button type="button" onClick={() => (editing === r.id ? cancel() : startEdit(r))} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                <span className="shrink-0 font-mono text-[11px] opacity-50">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1 truncate text-sm">{summary(r)}</span>
                <span className="shrink-0 text-[10px] tracking-widest uppercase" style={{ color: r.visible === false ? '#f87171' : 'var(--color-aer-blue)' }}>{r.visible === false ? 'HIDDEN' : 'LIVE'}</span>
              </button>
              <div className="hidden sm:block"><RowActions first={i === 0} last={i === sorted.length - 1} onUp={() => move(i, -1)} onDown={() => move(i, 1)} onDelete={() => del(r.id)} /></div>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 sm:hidden">
              <RowActions first={i === 0} last={i === sorted.length - 1} onUp={() => move(i, -1)} onDown={() => move(i, 1)} onDelete={() => del(r.id)} />
              <Toggle label="Visible" value={!!r.visible} onChange={() => toggleVis(r)} />
            </div>
            {editing === r.id && draft && draft.id === r.id && (
              <div className="mt-3 grid gap-3 border-t pt-3 md:grid-cols-2" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 10%, transparent)' }}>
                {fields.map((f) => renderField(f, draft[f.key], (v) => setDraft({ ...draft, [f.key]: v })))}
                <div className="flex items-center gap-4 md:col-span-2">
                  <Toggle label="Visible on site" value={!!draft.visible} onChange={(v) => setDraft({ ...draft, visible: v })} />
                </div>
                <div className="flex items-center gap-3 md:col-span-2">
                  <button type="button" onClick={saveEdit} disabled={busy} className="rounded-lg px-5 py-2 text-[11px] font-bold tracking-[0.2em] uppercase disabled:opacity-50" style={{ background: 'var(--color-aer-blue)', color: 'var(--color-aer-charcoal)' }}>
                    {busy ? 'SAVING…' : 'SAVE'}
                  </button>
                  <button type="button" onClick={cancel} className="text-xs uppercase tracking-widest opacity-60">Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {msg ? <p className="mt-3 text-xs tracking-widest uppercase opacity-70">{msg}</p> : null}
    </Card>
  );
}
