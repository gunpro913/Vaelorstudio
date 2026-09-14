import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { BarChart3, FileText, FolderKanban, Globe2, LayoutDashboard, LogIn, LogOut, Menu, MessageSquare, Plus, Save, Search, Settings, Trash2, X } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { supabase, supabaseConfigured } from '../lib/supabase';

type View = 'overview' | 'content' | 'work' | 'inquiries' | 'analytics' | 'settings';
type Status = 'NEW' | 'REVIEWING' | 'CONTACTED' | 'COMPLETED' | 'ARCHIVED';
type Inquiry = { id: string; name: string; email: string; project_type: string; timeline: string; details: string; status: Status; created_at: string };
type Project = { id: string; title: string; slug: string; category: string; description: string; cover_image: string | null; status: 'DRAFT' | 'PUBLISHED'; featured: boolean; created_at: string; updated_at: string };
type Hero = { eyebrow: string; title: string; subline: string };

const nav: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'content', label: 'Site content', icon: FileText },
  { id: 'work', label: 'Projects', icon: FolderKanban },
  { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const defaultHero: Hero = {
  eyebrow: 'AER × VÆLOR',
  title: 'MAKE YOUR WEBSITE HIT THE SPOTLIGHT',
  subline: 'Digital experiences with editorial precision.',
};

function Stat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5"><p className="text-[9px] uppercase tracking-[0.2em] text-white/35">{label}</p><p className="mt-3 font-editorial text-4xl text-white">{value}</p><p className="mt-2 text-[10px] tracking-[0.05em] text-[#40E0D0]">{detail}</p></div>;
}

function Login({ onSignedIn }: { onSignedIn: (user: User) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError('');
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError || !data.user) setError(signInError?.message ?? 'Unable to sign in.');
    else onSignedIn(data.user);
    setBusy(false);
  };

  return <main className="min-h-screen bg-[#0A0A0A] px-6 py-10 text-aer-cream"><div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center"><div className="mb-10"><p className="text-[9px] tracking-[0.3em] text-[#40E0D0]">AER × VÆLOR</p><h1 className="mt-3 font-editorial text-6xl leading-none">Private studio.</h1><p className="mt-5 text-[10px] leading-6 tracking-[0.08em] text-white/35">Sign in to manage content, projects and inquiries.</p></div><form onSubmit={submit} className="space-y-5 rounded-2xl border border-white/8 bg-white/[0.025] p-6"><label className="block"><span className="text-[9px] uppercase tracking-[0.16em] text-white/35">Email</span><input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#40E0D0]/50" /></label><label className="block"><span className="text-[9px] uppercase tracking-[0.16em] text-white/35">Password</span><input required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#40E0D0]/50" /></label>{error && <p role="alert" className="rounded-xl border border-red-300/20 bg-red-300/5 px-4 py-3 text-[10px] leading-5 text-red-200/80">{error}</p>}<button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#40E0D0] px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0A0A0A] disabled:opacity-40"><LogIn size={14} />{busy ? 'Signing in…' : 'Sign in'}</button></form><button onClick={() => { window.location.href = '/'; }} className="mt-6 text-left text-[9px] uppercase tracking-[0.18em] text-white/30 hover:text-white">← Return to website</button></div></main>;
}

function Overview({ inquiries, projects, setView }: { inquiries: Inquiry[]; projects: Project[]; setView: (view: View) => void }) {
  const newCount = inquiries.filter(item => item.status === 'NEW').length;
  const published = projects.filter(item => item.status === 'PUBLISHED').length;
  return <div className="space-y-6"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Site status" value="LIVE" detail="Production connected" /><Stat label="New inquiries" value={String(newCount).padStart(2, '0')} detail="Needs attention" /><Stat label="Projects" value={String(projects.length).padStart(2, '0')} detail={`${published} published`} /><Stat label="System" value="OK" detail="Supabase connected" /></div><div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]"><section className="rounded-2xl border border-white/8 bg-white/[0.025] p-6"><div className="flex items-center justify-between"><div><p className="text-[9px] tracking-[0.2em] text-[#40E0D0]">ACTIVITY</p><h2 className="mt-2 font-editorial text-3xl">Site pulse</h2></div><span className="rounded-full border border-[#40E0D0]/20 px-3 py-1 text-[8px] tracking-[0.15em] text-[#40E0D0]">LIVE</span></div><div className="mt-8 flex h-40 items-end gap-2">{[28, 42, 35, 64, 48, 76, 58, 82, 70, 91, 68, 88, 76, 96].map((height, index) => <div key={index} className="flex-1 rounded-t bg-[#40E0D0]/40" style={{ height: `${height}%` }} />)}</div><p className="mt-4 text-[8px] uppercase tracking-[0.15em] text-white/25">Traffic chart becomes live as analytics events accumulate.</p></section><section className="rounded-2xl border border-white/8 bg-white/[0.025] p-6"><p className="text-[9px] tracking-[0.2em] text-[#40E0D0]">QUICK ACTIONS</p><div className="mt-5 space-y-2">{[['Edit hero', 'content'], ['Add project', 'work'], ['Review inquiries', 'inquiries']].map(([label, target]) => <button key={label} onClick={() => setView(target as View)} className="flex w-full items-center justify-between rounded-xl border border-white/8 px-4 py-4 text-left text-[10px] uppercase tracking-[0.12em] text-white/65 hover:border-[#40E0D0]/30 hover:text-white"><span>{label}</span><span>→</span></button>)}<button onClick={() => window.open('/', '_blank')} className="flex w-full items-center justify-between rounded-xl border border-white/8 px-4 py-4 text-left text-[10px] uppercase tracking-[0.12em] text-white/65 hover:border-[#40E0D0]/30 hover:text-white"><span>Open live site</span><Globe2 size={14} /></button></div></section></div><section className="rounded-2xl border border-white/8 bg-white/[0.025] p-6"><div className="flex items-center justify-between"><div><p className="text-[9px] tracking-[0.2em] text-[#40E0D0]">INBOX</p><h2 className="mt-2 font-editorial text-3xl">Latest inquiries</h2></div><button onClick={() => setView('inquiries')} className="text-[9px] uppercase tracking-[0.15em] text-white/35 hover:text-white">View all</button></div><div className="mt-6 divide-y divide-white/8">{inquiries.slice(0, 5).map(item => <div key={item.id} className="flex items-center justify-between gap-4 py-4"><div className="min-w-0"><p className="text-[11px] text-white/80">{item.name}</p><p className="mt-1 truncate text-[9px] tracking-[0.08em] text-white/30">{item.project_type} · {new Date(item.created_at).toLocaleDateString()}</p></div><span className="rounded-full bg-white/5 px-3 py-1 text-[8px] tracking-[0.12em] text-white/45">{item.status}</span></div>)}{!inquiries.length && <p className="py-8 text-[10px] text-white/25">No inquiries yet.</p>}</div></section></div>;
}

function Content({ user, log }: { user: User; log: (action: string, entity: string, entityId?: string) => Promise<void> }) {
  const [hero, setHero] = useState<Hero>(defaultHero);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    void client.from('site_settings').select('value').eq('key', 'hero').maybeSingle().then(({ data }) => {
      if (data?.value) setHero(data.value as Hero);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    const client = supabase;
    if (!client) return;
    const { error } = await client.from('site_settings').upsert({ key: 'hero', value: hero, updated_by: user.id, updated_at: new Date().toISOString() });
    if (!error) { await log('UPDATE', 'site_settings', 'hero'); setSaved(true); window.setTimeout(() => setSaved(false), 1800); }
  };

  return <div className="max-w-4xl space-y-6"><div><p className="text-[9px] tracking-[0.2em] text-[#40E0D0]">EDITOR</p><h1 className="mt-2 font-editorial text-5xl">Site content</h1><p className="mt-2 text-[10px] tracking-[0.06em] text-white/30">Production content is stored in Supabase.</p></div><section className="rounded-2xl border border-white/8 bg-white/[0.025] p-6"><div className="flex items-center justify-between border-b border-white/8 pb-5"><div><p className="text-[9px] tracking-[0.18em] text-[#40E0D0]">01 · HERO</p><h2 className="mt-2 font-editorial text-3xl">Opening statement</h2></div><span className="text-[8px] uppercase tracking-[0.15em] text-white/25">{loading ? 'Loading' : 'Production'}</span></div><div className="mt-6 space-y-5"><label className="block"><span className="text-[9px] uppercase tracking-[0.16em] text-white/35">Eyebrow</span><input value={hero.eyebrow} onChange={e => setHero({ ...hero, eyebrow: e.target.value })} className="mt-2 w-full rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#40E0D0]/50" /></label><label className="block"><span className="text-[9px] uppercase tracking-[0.16em] text-white/35">Headline</span><textarea rows={3} value={hero.title} onChange={e => setHero({ ...hero, title: e.target.value })} className="mt-2 w-full resize-none rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#40E0D0]/50" /></label><label className="block"><span className="text-[9px] uppercase tracking-[0.16em] text-white/35">Supporting line</span><input value={hero.subline} onChange={e => setHero({ ...hero, subline: e.target.value })} className="mt-2 w-full rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#40E0D0]/50" /></label></div><div className="mt-6 flex justify-end"><button onClick={save} className="inline-flex items-center gap-2 rounded-full bg-[#40E0D0] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#0A0A0A]"><Save size={13} />{saved ? 'Saved' : 'Save changes'}</button></div></section></div>;
}

function Projects({ log, projects, setProjects }: { log: (action: string, entity: string, entityId?: string) => Promise<void>; projects: Project[]; setProjects: React.Dispatch<React.SetStateAction<Project[]>> }) {
  const [form, setForm] = useState({ title: '', category: 'DIGITAL PLATFORM', description: '' });
  const [adding, setAdding] = useState(false);
  const add = async (event: FormEvent) => {
    event.preventDefault();
    const client = supabase;
    if (!client || !form.title.trim()) return;
    const slug = `${form.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now().toString().slice(-5)}`;
    const { data, error } = await client.from('projects').insert({ title: form.title.trim(), slug, category: form.category, description: form.description.trim(), status: 'DRAFT' }).select().single();
    if (!error && data) { setProjects(current => [data as Project, ...current]); await log('CREATE', 'project', data.id); setForm({ title: '', category: 'DIGITAL PLATFORM', description: '' }); setAdding(false); }
  };
  const remove = async (id: string) => { const client = supabase; if (!client || !window.confirm('Delete this project?')) return; const { error } = await client.from('projects').delete().eq('id', id); if (!error) { setProjects(current => current.filter(project => project.id !== id)); await log('DELETE', 'project', id); } };
  const toggle = async (project: Project) => { const client = supabase; if (!client) return; const status = project.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'; const { error } = await client.from('projects').update({ status, updated_at: new Date().toISOString() }).eq('id', project.id); if (!error) { setProjects(current => current.map(item => item.id === project.id ? { ...item, status } : item)); await log('UPDATE', 'project', project.id); } };
  return <div className="space-y-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[9px] tracking-[0.2em] text-[#40E0D0]">WORKSPACE</p><h1 className="mt-2 font-editorial text-5xl">Projects</h1></div><button onClick={() => setAdding(!adding)} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#40E0D0]/40 px-5 py-3 text-[9px] uppercase tracking-[0.15em] text-[#40E0D0] hover:bg-[#40E0D0] hover:text-[#0A0A0A]"><Plus size={14} /> New project</button></div>{adding && <form onSubmit={add} className="space-y-4 rounded-2xl border border-[#40E0D0]/15 bg-white/[0.025] p-6"><input required placeholder="Project title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm outline-none" /><input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value.toUpperCase() })} className="w-full rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm outline-none" /><textarea rows={3} placeholder="Short description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full resize-none rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-sm outline-none" /><div className="flex gap-3"><button className="rounded-full bg-[#40E0D0] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#0A0A0A]">Create draft</button><button type="button" onClick={() => setAdding(false)} className="rounded-full border border-white/10 px-5 py-3 text-[9px] uppercase tracking-[0.15em] text-white/45">Cancel</button></div></form>}<div className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025]"><div className="hidden grid-cols-[1fr_180px_120px_60px] border-b border-white/8 px-5 py-3 text-[8px] uppercase tracking-[0.15em] text-white/25] md:grid"><span>Project</span><span>Category</span><span>Status</span><span /></div>{projects.map(project => <div key={project.id} className="grid gap-3 border-b border-white/8 px-5 py-5 last:border-0 md:grid-cols-[1fr_180px_120px_60px] md:items-center"><div><p className="text-[12px] text-white/80">{project.title}</p><p className="mt-1 line-clamp-1 text-[9px] text-white/25">{project.description || 'No description'}</p></div><span className="text-[9px] tracking-[0.12em] text-white/40">{project.category}</span><button onClick={() => toggle(project)} className={`w-fit rounded-full px-3 py-1 text-[8px] tracking-[0.1em] ${project.status === 'PUBLISHED' ? 'bg-[#40E0D0]/10 text-[#40E0D0]' : 'bg-white/5 text-white/35'}`}>{project.status}</button><button onClick={() => remove(project.id)} aria-label={`Delete ${project.title}`} className="text-white/25 hover:text-red-300"><Trash2 size={14} /></button></div>)}{!projects.length && <p className="p-10 text-center text-[10px] text-white/25">No projects yet.</p>}</div></div>;
}

function Inquiries({ inquiries, setInquiries, log }: { inquiries: Inquiry[]; setInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>; log: (action: string, entity: string, entityId?: string) => Promise<void> }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => inquiries.filter(item => `${item.name}${item.email}${item.project_type}${item.details}`.toLowerCase().includes(query.toLowerCase())), [inquiries, query]);
  const advance = async (inquiry: Inquiry) => { const client = supabase; if (!client) return; const order: Status[] = ['NEW', 'REVIEWING', 'CONTACTED', 'COMPLETED', 'ARCHIVED']; const next = order[Math.min(order.indexOf(inquiry.status) + 1, order.length - 1)]; const { error } = await client.from('inquiries').update({ status: next, updated_at: new Date().toISOString() }).eq('id', inquiry.id); if (!error) { setInquiries(current => current.map(item => item.id === inquiry.id ? { ...item, status: next } : item)); await log('UPDATE', 'inquiry', inquiry.id); } };
  return <div className="space-y-6"><div><p className="text-[9px] tracking-[0.2em] text-[#40E0D0]">CRM</p><h1 className="mt-2 font-editorial text-5xl">Inquiries</h1></div><div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3"><Search size={15} className="text-white/25" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search inquiries..." className="w-full bg-transparent text-xs outline-none" /></div><div className="grid gap-3">{filtered.map(item => <article key={item.id} className="rounded-2xl border border-white/8 bg-white/[0.025] p-5"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><h2 className="font-editorial text-2xl">{item.name}</h2><span className="rounded-full bg-[#40E0D0]/10 px-3 py-1 text-[8px] tracking-[0.1em] text-[#40E0D0]">{item.project_type}</span></div><p className="mt-2 text-[10px] text-white/35">{item.email} · {item.timeline} · {new Date(item.created_at).toLocaleString()}</p><p className="mt-4 max-w-2xl whitespace-pre-wrap text-[11px] leading-6 text-white/55">{item.details}</p></div><button onClick={() => advance(item)} disabled={item.status === 'ARCHIVED'} className="shrink-0 rounded-full border border-white/10 px-4 py-2 text-[8px] uppercase tracking-[0.15em] text-white/45 disabled:opacity-25">{item.status} · advance</button></div></article>)}{!filtered.length && <div className="py-16 text-center text-[10px] text-white/25">No inquiries found.</div>}</div></div>;
}

function Analytics() { return <div className="space-y-6"><div><p className="text-[9px] tracking-[0.2em] text-[#40E0D0]">OBSERVATORY</p><h1 className="mt-2 font-editorial text-5xl">Analytics</h1><p className="mt-2 text-[10px] text-white/30">Real event records are stored in Supabase. Aggregate charts can be expanded from this clean data layer.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Events" value="—" detail="Live records available" /><Stat label="Page views" value="—" detail="Live records available" /><Stat label="Project views" value="—" detail="Live records available" /><Stat label="Inquiries" value="—" detail="CRM is source of truth" /></div></div>; }

function SettingsView({ user, onSignOut }: { user: User; onSignOut: () => void }) { return <div className="max-w-3xl space-y-6"><div><p className="text-[9px] tracking-[0.2em] text-[#40E0D0]">CONTROL</p><h1 className="mt-2 font-editorial text-5xl">Settings</h1></div><section className="rounded-2xl border border-white/8 bg-white/[0.025] p-6"><p className="text-[9px] uppercase tracking-[0.18em] text-white/30">Authenticated account</p><p className="mt-3 text-sm text-white/75">{user.email}</p></section><section className="rounded-2xl border border-[#40E0D0]/15 bg-[#40E0D0]/[0.03] p-6"><p className="text-[9px] uppercase tracking-[0.18em] text-[#40E0D0]">Production security</p><p className="mt-3 text-[11px] leading-6 text-white/45">Authentication and authorization are enforced by Supabase Auth + Row Level Security. Keep only the publishable/anon key in Vite environment variables.</p></section><button onClick={onSignOut} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-[9px] uppercase tracking-[0.15em] text-white/45"><LogOut size={14} /> Sign out</button></div>; }

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [view, setView] = useState<View>('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    let active = true;
    void client.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);
      if (!sessionUser) { setAuthorized(false); return; }
      const { data: profile, error: profileError } = await client.from('profiles').select('role').eq('id', sessionUser.id).maybeSingle();
      if (active) setAuthorized(!profileError && profile?.role === 'admin');
    });
    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) setAuthorized(false);
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    const client = supabase;
    if (!client || !user || authorized !== true) return;
    let active = true;
    void Promise.all([
      client.from('inquiries').select('*').order('created_at', { ascending: false }),
      client.from('projects').select('*').order('created_at', { ascending: false }),
    ]).then(([inq, proj]) => {
      if (!active) return;
      if (inq.error || proj.error) setError('Could not load one or more admin resources.');
      setInquiries((inq.data ?? []) as Inquiry[]);
      setProjects((proj.data ?? []) as Project[]);
    });
    return () => { active = false; };
  }, [user, authorized]);

  const log = async (action: string, entity: string, entityId?: string) => {
    const client = supabase;
    if (!client || !user) return;
    await client.from('audit_logs').insert({ actor_id: user.id, action, entity, entity_id: entityId ?? null });
  };

  const signOut = async () => { const client = supabase; if (client) await client.auth.signOut(); setUser(null); setAuthorized(false); };

  if (!supabaseConfigured) return <main className="min-h-screen bg-[#0A0A0A] px-6 py-12 text-aer-cream"><div className="mx-auto max-w-2xl rounded-2xl border border-white/8 bg-white/[0.025] p-8"><p className="text-[9px] tracking-[0.25em] text-[#40E0D0]">AER ADMIN</p><h1 className="mt-3 font-editorial text-5xl">Connect Supabase first.</h1><p className="mt-5 text-[11px] leading-6 text-white/40">Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the deployment environment, then run <code className="text-white/70">supabase/schema.sql</code> in the Supabase SQL editor.</p><button onClick={() => { window.location.href = '/'; }} className="mt-8 rounded-full border border-white/10 px-5 py-3 text-[9px] uppercase tracking-[0.15em] text-white/45">← Return to website</button></div></main>;
  if (!user) return <Login onSignedIn={setUser} />;
  if (authorized === null) return <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] text-[10px] uppercase tracking-[0.2em] text-white/30">Checking access…</div>;
  if (!authorized) return <main className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-6 text-aer-cream"><div className="max-w-md text-center"><p className="text-[9px] tracking-[0.25em] text-red-200/70">ACCESS DENIED</p><h1 className="mt-3 font-editorial text-5xl">Admin role required.</h1><p className="mt-4 text-[10px] leading-6 text-white/35">This account is authenticated but is not assigned the admin role in Supabase.</p><button onClick={signOut} className="mt-7 rounded-full border border-white/10 px-5 py-3 text-[9px] uppercase tracking-[0.15em] text-white/45">Sign out</button></div></main>;

  return <div className="min-h-screen bg-[#0A0A0A] text-aer-cream"><aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/8 bg-[#0A0A0A] p-6 transition-transform md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}><div className="flex items-center justify-between"><div><p className="text-[9px] tracking-[0.28em] text-[#40E0D0]">AER × VÆLOR</p><p className="mt-2 text-[8px] uppercase tracking-[0.18em] text-white/25">Studio control</p></div><button onClick={() => setMobileOpen(false)} className="md:hidden" aria-label="Close menu"><X size={18} /></button></div><nav className="mt-10 space-y-1">{nav.map(item => { const Icon = item.icon; return <button key={item.id} onClick={() => { setView(item.id); setMobileOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[10px] uppercase tracking-[0.12em] ${view === item.id ? 'bg-white/7 text-white' : 'text-white/35 hover:bg-white/[0.03] hover:text-white'}`}><Icon size={15} />{item.label}</button>; })}</nav><div className="absolute bottom-6 left-6 right-6 space-y-2"><button onClick={() => window.open('/', '_blank')} className="flex w-full items-center gap-3 rounded-xl border border-white/8 px-4 py-3 text-[9px] uppercase tracking-[0.12em] text-white/35 hover:text-white"><Globe2 size={14} /> View website</button><button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[9px] uppercase tracking-[0.12em] text-white/25 hover:text-red-200"><LogOut size={14} /> Sign out</button></div></aside>{mobileOpen && <button aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/60 md:hidden" />}<main className="min-h-screen md:pl-72"><header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/8 bg-[#0A0A0A]/90 px-5 py-4 backdrop-blur md:px-8"><button onClick={() => setMobileOpen(true)} className="md:hidden" aria-label="Open menu"><Menu size={18} /></button><div className="hidden md:block"><p className="text-[9px] uppercase tracking-[0.2em] text-white/25">Private workspace</p><p className="mt-1 text-[10px] text-white/45">{user.email}</p></div><div className="ml-auto flex items-center gap-3"><span className="hidden rounded-full bg-[#40E0D0]/10 px-3 py-1 text-[8px] tracking-[0.15em] text-[#40E0D0] sm:inline">SECURE</span><button onClick={() => { window.location.href = '/'; }} className="text-[9px] uppercase tracking-[0.15em] text-white/30 hover:text-white">Exit panel</button></div></header><div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">{error && <div role="alert" className="mb-6 flex items-center justify-between rounded-xl border border-red-300/20 bg-red-300/5 px-4 py-3 text-[10px] text-red-200/80"><span>{error}</span><button onClick={() => setError('')} aria-label="Dismiss error"><X size={14} /></button></div>}{view === 'overview' && <Overview inquiries={inquiries} projects={projects} setView={setView} />}{view === 'content' && <Content user={user} log={log} />}{view === 'work' && <Projects log={log} projects={projects} setProjects={setProjects} />}{view === 'inquiries' && <Inquiries inquiries={inquiries} setInquiries={setInquiries} log={log} />}{view === 'analytics' && <Analytics />}{view === 'settings' && <SettingsView user={user} onSignOut={signOut} />}</div></main></div>;
}
