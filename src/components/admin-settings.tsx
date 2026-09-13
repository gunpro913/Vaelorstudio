import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SiteContent } from '../lib/types';
import { apiPut } from '../lib/api';
import { Card, SectionTitle, TextField, TextArea, ColorField, Toggle, SaveButton } from './admin-ui';

const GROUPS: { key: string; title: string; hint: string }[] = [
  { key: 'brand', title: 'Brand', hint: 'Site name, tagline, contact email' },
  { key: 'theme', title: 'Theme & Fonts', hint: 'Colors and typography used everywhere' },
  { key: 'hero', title: 'Hero extras', hint: 'Preloader, scroll hint, corner readouts' },
  { key: 'labels', title: 'Micro-labels', hint: 'Frame text, SYS tags, admin link, hints' },
  { key: 'contact', title: 'Contact wording', hint: 'Select / selected / proceed / CTA labels' },
  { key: 'footer', title: 'Footer', hint: 'Rights line + CTA button' },
  { key: 'admin', title: 'Admin access', hint: 'Password for this panel' },
];

export default function SettingsEditor({ content, refresh }: { content: SiteContent; refresh: () => void }) {
  const [vals, setVals] = useState<Record<string, string>>({ ...(content.settings || {}) });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const rows = content.settingsRows || [];

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      const changed = rows.filter((r: any) => (vals[r.setting_key] ?? '') !== (r.setting_value ?? ''));
      for (const r of changed) {
        await apiPut('/api/site-settings', { id: r.id, setting_value: vals[r.setting_key] ?? '' });
      }
      setMsg('Saved ' + changed.length + ' setting' + (changed.length === 1 ? '' : 's') + '.');
      refresh();
    } catch (err: any) {
      setMsg('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-6">
      {GROUPS.map((g) => {
        const items = rows.filter((r: any) => (r.group_name || 'brand') === g.key);
        if (!items.length) return null;
        return (
          <Card key={g.key}>
            <SectionTitle title={g.title} sub={g.hint} />
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((r: any) => {
                const v = vals[r.setting_key] ?? '';
                const set = (nv: string) => setVals((p) => ({ ...p, [r.setting_key]: nv }));
                if (r.field_type === 'color') return <ColorField key={r.id} label={r.label || r.setting_key} value={v} onChange={set} />;
                if (r.field_type === 'password') return <TextField key={r.id} label={(r.label || r.setting_key) + ' (keep secret)'} value={v} onChange={set} />;
                if ((v || '').length > 80) return <div key={r.id} className="md:col-span-2"><TextArea label={r.label || r.setting_key} value={v} onChange={set} /></div>;
                return <TextField key={r.id} label={r.label || r.setting_key} value={v} onChange={set} />;
              })}
            </div>
          </Card>
        );
      })}
      <div className="flex items-center gap-4">
        <SaveButton saving={saving} />
        {msg ? <span className="text-xs tracking-widest uppercase opacity-70">{msg}</span> : null}
      </div>
      <p className="text-[11px] opacity-50 tracking-wider">Theme colors apply instantly to the whole public site. Fonts: use any Google Font name (e.g. “Playfair Display”, “Space Grotesk”).</p>
    </form>
  );
}

export function BlocksEditor({ content, refresh }: { content: SiteContent; refresh: () => void }) {
  const rows = [...(content.blocksRows || [])].sort((a: any, b: any) => {
    const ao = a.sort_order ?? 0, bo = b.sort_order ?? 0;
    if (ao !== bo) return ao - bo;
    return (a.id ?? 0) - (b.id ?? 0);
  });
  const [open, setOpen] = useState<number | null>(null);
  const [draft, setDraft] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const start = (r: any) => { setOpen(r.id); setDraft({ ...r }); setMsg(''); };
  const save = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!draft) return;
    setSaving(true);
    setMsg('');
    try {
      await apiPut('/api/content-blocks', { id: draft.id, eyebrow: draft.eyebrow, title: draft.title, title_accent: draft.title_accent, body: draft.body, visible: draft.visible });
      setMsg('Section saved.');
      setOpen(null);
      refresh();
    } catch (e: any) { setMsg('Error: ' + e.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-4">
      <Card>
        <SectionTitle title="Page sections" sub="Edit every headline, eyebrow and paragraph · toggle visibility" />
        <div className="divide-y" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 10%, transparent)' }}>
          {rows.map((r: any) => (
            <div key={r.id} className="py-3">
              <button type="button" onClick={() => (open === r.id ? setOpen(null) : start(r))} className="flex w-full items-center justify-between gap-3 text-left">
                <span>
                  <span className="block text-[10px] tracking-[0.25em] uppercase opacity-50">{r.section} · {r.label}</span>
                  <span className="block text-sm mt-0.5 truncate max-w-[420px]">{r.title || r.body || r.block_key}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase" style={{ color: r.visible ? 'var(--color-aer-blue)' : '#f87171' }}>{r.visible ? 'VISIBLE' : 'HIDDEN'}</span>
                  <span className="text-xs opacity-60">{open === r.id ? '▲' : '▼'}</span>
                </span>
              </button>
              <AnimatePresence>
                {open === r.id && draft && draft.id === r.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <form onSubmit={save} className="grid gap-4 pt-4 md:grid-cols-2">
                      <TextField label="Eyebrow (small label)" value={draft.eyebrow || ''} onChange={(v) => setDraft({ ...draft, eyebrow: v })} />
                      <TextField label="Accent word (highlighted)" value={draft.title_accent || ''} onChange={(v) => setDraft({ ...draft, title_accent: v })} />
                      <div className="md:col-span-2"><TextField label="Title / headline" value={draft.title || ''} onChange={(v) => setDraft({ ...draft, title: v })} /></div>
                      <div className="md:col-span-2"><TextArea label="Body / paragraph" value={draft.body || ''} onChange={(v) => setDraft({ ...draft, body: v })} rows={4} /></div>
                      <div className="md:col-span-2"><Toggle label="Visible on site" value={!!draft.visible} onChange={(v) => setDraft({ ...draft, visible: v })} /></div>
                      <div className="md:col-span-2 flex items-center gap-3">
                        <SaveButton saving={saving} label="Save section" />
                        <button type="button" onClick={() => setOpen(null)} className="text-xs uppercase tracking-widest opacity-60">Cancel</button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        {msg ? <p className="mt-3 text-xs tracking-widest uppercase opacity-70">{msg}</p> : null}
      </Card>
      <p className="text-[11px] opacity-50 tracking-wider">Tip: click a row to expand. “Accent word” is rendered in the turquoise italic style wherever the title contains it.</p>
    </div>
  );
}
