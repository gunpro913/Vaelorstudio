import { useState } from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={'rounded-xl border p-5 ' + className} style={{ background: 'var(--color-aer-black)', borderColor: 'color-mix(in oklab, var(--color-aer-cream) 12%, transparent)' }}>
      {children}
    </div>
  );
}

export function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-4">
      <h3 className="font-editorial text-2xl uppercase" style={{ color: 'var(--color-aer-cream)' }}>{title}</h3>
      {sub ? <p className="text-[11px] tracking-[0.2em] uppercase mt-1 opacity-50">{sub}</p> : null}
    </div>
  );
}

export function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.2em] uppercase opacity-60">{label}</span>
      <input value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
        style={{ background: 'var(--color-aer-charcoal)', borderColor: 'color-mix(in oklab, var(--color-aer-cream) 15%, transparent)', color: 'var(--color-aer-cream)' }} />
    </label>
  );
}

export function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.2em] uppercase opacity-60">{label}</span>
      <textarea value={value ?? ''} onChange={(e) => onChange(e.target.value)} rows={rows}
        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
        style={{ background: 'var(--color-aer-charcoal)', borderColor: 'color-mix(in oklab, var(--color-aer-cream) 15%, transparent)', color: 'var(--color-aer-cream)' }} />
    </label>
  );
}

export function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.2em] uppercase opacity-60">{label}</span>
      <select value={value ?? ''} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none"
        style={{ background: 'var(--color-aer-charcoal)', borderColor: 'color-mix(in oklab, var(--color-aer-cream) 15%, transparent)', color: 'var(--color-aer-cream)' }}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

export function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.2em] uppercase opacity-60">{label}</span>
      <div className="mt-1 flex items-center gap-3">
        <input type="color" value={/^#[0-9a-fA-F]{6}$/.test(value || '') ? value : '#40E0D0'} onChange={(e) => onChange(e.target.value)} className="h-10 w-14 rounded-lg" />
        <input value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="#000000"
          className="flex-1 rounded-lg border px-3 py-2 text-sm font-mono outline-none"
          style={{ background: 'var(--color-aer-charcoal)', borderColor: 'color-mix(in oklab, var(--color-aer-cream) 15%, transparent)', color: 'var(--color-aer-cream)' }} />
      </div>
    </label>
  );
}

export function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)} className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase">
      <span className="inline-flex h-5 w-10 items-center rounded-full px-0.5 transition-colors" style={{ background: value ? 'var(--color-aer-blue)' : 'color-mix(in oklab, var(--color-aer-cream) 20%, transparent)' }}>
        <span className={'h-4 w-4 rounded-full transition-transform ' + (value ? 'translate-x-5' : '')} style={{ background: 'var(--color-aer-charcoal)' }} />
      </span>
      <span className="opacity-70">{label}: {value ? 'ON' : 'OFF'}</span>
    </button>
  );
}

export function SaveButton({ saving, label = 'Save changes' }: { saving: boolean; label?: string }) {
  return (
    <button type="submit" disabled={saving}
      className="rounded-lg px-5 py-2.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-opacity disabled:opacity-50"
      style={{ background: 'var(--color-aer-blue)', color: 'var(--color-aer-charcoal)' }}>
      {saving ? 'SAVING…' : label}
    </button>
  );
}

export function RowActions({ onUp, onDown, onDelete, first, last }: { onUp: () => void; onDown: () => void; onDelete: () => void; first: boolean; last: boolean }) {
  const btn = 'rounded-md border px-2 py-1 text-xs transition-opacity hover:opacity-70 disabled:opacity-30';
  const style = { borderColor: 'color-mix(in oklab, var(--color-aer-cream) 20%, transparent)', color: 'var(--color-aer-cream)' } as const;
  return (
    <div className="flex items-center gap-1.5">
      <button type="button" className={btn} style={style} disabled={first} onClick={onUp} title="Move up">↑</button>
      <button type="button" className={btn} style={style} disabled={last} onClick={onDown} title="Move down">↓</button>
      <button type="button" className={btn} style={{ ...style, borderColor: '#f87171', color: '#f87171' }} onClick={() => { if (window.confirm('Delete this item?')) onDelete(); }} title="Delete">✕</button>
    </div>
  );
}

export function EmptyNote({ text }: { text: string }) {
  return <p className="text-xs tracking-[0.15em] uppercase opacity-40 py-4 text-center">{text}</p>;
}
