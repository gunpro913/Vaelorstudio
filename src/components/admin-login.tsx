import { useState } from 'react';
import { apiPost } from '../lib/api';
import { Card } from './admin-ui';

export default function AdminLogin({ onOk }: { onOk: () => void }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      const r = await apiPost('/api/admin-auth', { password: pw });
      if (r.ok) {
        try { sessionStorage.setItem('aer_admin', '1'); } catch {}
        onOk();
      } else setErr('Invalid password');
    } catch {
      setErr('Invalid password');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6" style={{ background: 'var(--color-aer-black)' }}>
      <Card className="w-full max-w-sm">
        <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-aer-blue)' }}>Restricted</p>
        <h2 className="font-editorial mt-2 text-3xl uppercase">Admin Panel</h2>
        <p className="mt-2 text-xs tracking-[0.15em] uppercase opacity-50">Enter the admin password to edit everything on the site.</p>
        <form onSubmit={submit} className="mt-5 space-y-3">
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
            style={{ background: 'var(--color-aer-charcoal)', borderColor: 'color-mix(in oklab, var(--color-aer-cream) 15%, transparent)', color: 'var(--color-aer-cream)' }} />
          {err ? <p className="text-xs tracking-widest uppercase" style={{ color: '#f87171' }}>{err}</p> : null}
          <button type="submit" disabled={busy} className="w-full rounded-lg px-5 py-2.5 text-[11px] font-bold tracking-[0.2em] uppercase disabled:opacity-50"
            style={{ background: 'var(--color-aer-blue)', color: 'var(--color-aer-charcoal)' }}>
            {busy ? 'CHECKING…' : 'UNLOCK PANEL'}
          </button>
        </form>
        <a href="#/" className="mt-4 block text-center text-[11px] tracking-[0.2em] uppercase opacity-60 hover:opacity-100">← Back to site</a>
        <p className="mt-3 text-center text-[10px] opacity-40">Default password: admin123 (change it in Global → Admin access)</p>
      </Card>
    </div>
  );
}
