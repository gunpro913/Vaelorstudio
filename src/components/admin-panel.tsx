import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutDashboard, Globe, Type, Link2, Heading, Shapes, Layers, Briefcase, ListOrdered, Wrench, Mail, LogOut, ExternalLink, RefreshCw, MonitorPlay } from 'lucide-react';
import type { SiteContent } from '../lib/types';
import { apiGet } from '../lib/api';
import AdminLogin from './admin-login';
import SettingsEditor, { BlocksEditor } from './admin-settings';
import CrudList from './admin-crud';

const TABS = [
  { key: 'dash', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'global', label: 'Global & Theme', icon: Globe },
  { key: 'sections', label: 'Page Sections', icon: Type },
  { key: 'nav', label: 'Navigation', icon: Link2 },
  { key: 'hero', label: 'Hero Lines', icon: Heading },
  { key: 'anatomy', label: 'Anatomy', icon: Shapes },
  { key: 'caps', label: 'Capabilities', icon: Layers },
  { key: 'work', label: 'Work', icon: Briefcase },
  { key: 'process', label: 'Process', icon: ListOrdered },
  { key: 'services', label: 'Services', icon: Wrench },
  { key: 'contact', label: 'Contact Options', icon: Mail },
  { key: 'preview', label: 'Preview', icon: MonitorPlay },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function AdminPanel({ content, refresh, onLogout }: { content: SiteContent; refresh: () => void; onLogout: () => void }) {
  const [tab, setTab] = useState<TabKey>('dash');
  const [authed, setAuthed] = useState(false);
  const [previewTick, setPreviewTick] = useState(0);

  useEffect(() => {
    try { if (sessionStorage.getItem('aer_admin') === '1') setAuthed(true); } catch {}
  }, []);

  useEffect(() => {
    if (tab === 'preview') setPreviewTick((t) => t + 1);
  }, [tab]);

  if (!authed) return <AdminLogin onOk={() => setAuthed(true)} />;

  const counts: Record<string, number> = {
    nav: (content.navLinks || []).length,
    hero: (content.heroLines || []).length,
    anatomy: (content.anatomy || []).length,
    caps: (content.capabilities || []).length,
    work: (content.work || []).length,
    process: (content.processSteps || []).length,
    services: (content.services || []).length,
    contact: (content.contactOptions || []).length,
  };
  const hiddenCount =
    [...(content.navLinks || []), ...(content.heroLines || []), ...(content.anatomy || []), ...(content.capabilities || []), ...(content.work || []), ...(content.processSteps || []), ...(content.services || []), ...(content.contactOptions || [])].filter((x: any) => x.visible === false).length;

  const logout = () => { try { sessionStorage.removeItem('aer_admin'); } catch {} onLogout(); };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-aer-charcoal)', color: 'var(--color-aer-cream)' }}>
      <header className="sticky top-0 z-40 border-b backdrop-blur-md" style={{ background: 'color-mix(in oklab, var(--color-aer-black) 85%, transparent)', borderColor: 'color-mix(in oklab, var(--color-aer-cream) 10%, transparent)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-aer-blue)' }}>AER × VÆLOR · CMS</p>
            <h1 className="font-editorial text-xl uppercase md:text-2xl">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={refresh} className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] tracking-[0.15em] uppercase hover:opacity-70" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 20%, transparent)' }}>
              <RefreshCw size={13} /> <span className="hidden sm:inline">Reload</span>
            </button>
            <a href="#/" className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] tracking-[0.15em] uppercase hover:opacity-70" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 20%, transparent)' }}>
              <ExternalLink size={13} /> <span className="hidden sm:inline">View site</span>
            </a>
            <button onClick={logout} className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] tracking-[0.15em] uppercase hover:opacity-70" style={{ borderColor: '#f87171', color: '#f87171' }}>
              <LogOut size={13} /> <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:flex-row md:px-8">
        <aside className="md:w-60 md:shrink-0">
          <nav className="admin-scroll flex gap-2 overflow-x-auto pb-2 md:sticky md:top-20 md:flex-col md:overflow-visible">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className="flex shrink-0 items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-left text-[11px] tracking-[0.12em] uppercase transition-all md:w-full"
                  style={active
                    ? { background: 'var(--color-aer-blue)', color: 'var(--color-aer-charcoal)', borderColor: 'var(--color-aer-blue)', fontWeight: 700 }
                    : { borderColor: 'color-mix(in oklab, var(--color-aer-cream) 12%, transparent)', color: 'var(--color-aer-cream)' }}>
                  <Icon size={15} />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              {tab === 'dash' && <Dash content={content} counts={counts} hidden={hiddenCount} go={setTab} />}
              {tab === 'global' && <SettingsEditor content={content} refresh={refresh} />}
              {tab === 'sections' && <BlocksEditor content={content} refresh={refresh} />}
              {tab === 'nav' && (
                <CrudList title="Navigation links" sub="Top menu" endpoint="/api/nav-links" items={content.navLinks} refresh={refresh} addLabel="New nav link"
                  defaults={{ label: '', href: '#' }}
                  fields={[{ key: 'label', label: 'Label', type: 'text' }, { key: 'href', label: 'Link (URL or #anchor)', type: 'text' }]} />
              )}
              {tab === 'hero' && (
                <CrudList title="Hero headline lines" sub="Big stacked headline" endpoint="/api/hero-lines" items={content.heroLines} refresh={refresh} addLabel="New headline line"
                  defaults={{ text_line: '', style: 'solid' }}
                  fields={[{ key: 'text_line', label: 'Text', type: 'text', span: true }, { key: 'style', label: 'Style', type: 'select', options: ['solid', 'italic'] }]} />
              )}
              {tab === 'anatomy' && (
                <CrudList title="Anatomy words" sub="Hover-to-decode name" endpoint="/api/anatomy-items" items={content.anatomy} refresh={refresh} addLabel="New anatomy word"
                  defaults={{ slug: '', title: '', phonetic: '', description: '' }}
                  fields={[{ key: 'title', label: 'Word', type: 'text' }, { key: 'slug', label: 'ID (unique, lowercase)', type: 'text' }, { key: 'phonetic', label: 'Phonetic / meaning', type: 'text', span: true }, { key: 'description', label: 'Description', type: 'textarea' }]} />
              )}
              {tab === 'caps' && (
                <CrudList title="Capabilities" sub="Sticky grid" endpoint="/api/capabilities" items={content.capabilities} refresh={refresh} addLabel="New capability"
                  defaults={{ code: '05', title: '', description: '' }}
                  fields={[{ key: 'code', label: 'Code (01, 02…)', type: 'text' }, { key: 'title', label: 'Title', type: 'text' }, { key: 'description', label: 'Description', type: 'textarea' }]} />
              )}
              {tab === 'work' && (
                <CrudList title="Work / design languages" sub="Showcase cards" endpoint="/api/work-items" items={content.work} refresh={refresh} addLabel="New work item"
                  defaults={{ title: '', subtitle: '', story: '', variant: 'glass', coord: '', image_url: '' }}
                  fields={[
                    { key: 'title', label: 'Title', type: 'text' }, { key: 'subtitle', label: 'Subtitle', type: 'text' },
                    { key: 'variant', label: 'Art style', type: 'select', options: ['glass', 'brutal', 'kinetic', 'editorial', 'glitch', 'spatial', 'minimal'] },
                    { key: 'coord', label: 'Corner tag (e.g. SYS: …)', type: 'text' },
                    { key: 'image_url', label: 'Image URL (optional)', type: 'text', span: true },
                    { key: 'story', label: 'Story / description', type: 'textarea' },
                  ]} />
              )}
              {tab === 'process' && (
                <CrudList title="Process steps" sub="Timeline" endpoint="/api/process-steps" items={content.processSteps} refresh={refresh} addLabel="New step"
                  defaults={{ code: '07', title: '', description: '' }}
                  fields={[{ key: 'code', label: 'Code (01, 02…)', type: 'text' }, { key: 'title', label: 'Title', type: 'text' }, { key: 'description', label: 'Description', type: 'textarea' }]} />
              )}
              {tab === 'services' && (
                <CrudList title="Services" sub="Hover accordion" endpoint="/api/services" items={content.services} refresh={refresh} addLabel="New service"
                  defaults={{ name: '', description: '' }}
                  fields={[{ key: 'name', label: 'Name', type: 'text', span: true }, { key: 'description', label: 'Description', type: 'textarea' }]} />
              )}
              {tab === 'contact' && (
                <CrudList title="Contact options" sub="Project-type picker" endpoint="/api/contact-options" items={content.contactOptions} refresh={refresh} addLabel="New option"
                  defaults={{ label: '' }}
                  fields={[{ key: 'label', label: 'Label', type: 'text', span: true }]} />
              )}
              {tab === 'preview' && (
                <div className="space-y-4">
                  <div className="rounded-xl border p-4 text-xs leading-relaxed opacity-80" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 12%, transparent)', background: 'var(--color-aer-black)' }}>
                    <p className="font-bold uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--color-aer-blue)' }}>Live preview</p>
                    <p>This embedded preview reads the same live database. After saving any tab, press “Reload preview” to see the change exactly as visitors see it.</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button type="button" onClick={() => { refresh(); setPreviewTick((t) => t + 1); }} className="rounded-lg px-4 py-2 text-[11px] font-bold tracking-[0.15em] uppercase" style={{ background: 'var(--color-aer-blue)', color: 'var(--color-aer-charcoal)' }}>Reload preview</button>
                      <a href="#/" className="rounded-lg border px-4 py-2 text-[11px] tracking-[0.15em] uppercase hover:opacity-70" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 20%, transparent)' }}>Open full site</a>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 12%, transparent)', background: '#fff' }}>
                    <iframe key={previewTick} title="Site preview" src="#/" className="h-[70vh] w-full border-0 bg-white" loading="lazy" />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function Dash({ content, counts, hidden, go }: { content: SiteContent; counts: Record<string, number>; hidden: number; go: (t: TabKey) => void }) {
  const [health, setHealth] = useState<string>('Checking…');
  useEffect(() => {
    apiGet('/api/content').then(() => setHealth('Connected · all tables live')).catch(() => setHealth('Connection issue'));
  }, []);
  const cards = [
    { k: 'global', t: 'Global & Theme', d: (content.settingsRows || []).length + ' settings · colors, fonts, email' },
    { k: 'sections', t: 'Page Sections', d: (content.blocksRows || []).length + ' headlines & paragraphs' },
    { k: 'nav', t: 'Navigation', d: counts.nav + ' links' },
    { k: 'hero', t: 'Hero Lines', d: counts.hero + ' headline lines' },
    { k: 'anatomy', t: 'Anatomy', d: counts.anatomy + ' words' },
    { k: 'caps', t: 'Capabilities', d: counts.caps + ' cards' },
    { k: 'work', t: 'Work', d: counts.work + ' showcase items' },
    { k: 'process', t: 'Process', d: counts.process + ' steps' },
    { k: 'services', t: 'Services', d: counts.services + ' services' },
    { k: 'contact', t: 'Contact Options', d: counts.contact + ' project types' },
    { k: 'preview', t: 'Preview', d: 'live embedded site' },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-5" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 12%, transparent)', background: 'var(--color-aer-black)' }}>
          <p className="text-[10px] tracking-[0.25em] uppercase opacity-50">Database</p>
          <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--color-aer-blue)' }}>{health}</p>
        </div>
        <div className="rounded-xl border p-5" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 12%, transparent)', background: 'var(--color-aer-black)' }}>
          <p className="text-[10px] tracking-[0.25em] uppercase opacity-50">Total content items</p>
          <p className="mt-1 font-editorial text-3xl">{Object.values(counts).reduce((a, b) => a + b, 0) + (content.blocksRows || []).length}</p>
        </div>
        <div className="rounded-xl border p-5" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 12%, transparent)', background: 'var(--color-aer-black)' }}>
          <p className="text-[10px] tracking-[0.25em] uppercase opacity-50">Hidden from site</p>
          <p className="mt-1 font-editorial text-3xl">{hidden}</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((c) => (
          <button key={c.k} onClick={() => go(c.k as TabKey)} className="rounded-xl border p-4 text-left transition-transform hover:-translate-y-0.5"
            style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 12%, transparent)', background: 'var(--color-aer-black)' }}>
            <p className="text-sm font-semibold uppercase tracking-[0.12em]">{c.t}</p>
            <p className="mt-1 text-xs opacity-60">{c.d}</p>
            <p className="mt-2 text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-aer-blue)' }}>Open →</p>
          </button>
        ))}
      </div>
      <div className="rounded-xl border p-5 text-xs leading-relaxed opacity-70" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 12%, transparent)' }}>
        <p className="mb-2 font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--color-aer-blue)' }}>How it works</p>
        <p>Everything you change here saves to the live database and appears on the public site immediately. Use ↑ ↓ to reorder, toggle visibility to hide without deleting, “Preview” to check inside the panel, and “View site” for the full page. Every list supports add, edit, delete and reorder — nothing on the website is hardcoded.</p>
      </div>
    </div>
  );
}
