import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { apiGet, applyTheme } from './lib/api';
import { DEFAULT_SETTINGS, type SiteContent } from './lib/types';
import { Navbar, Hero, Anatomy, Statement, Philosophy, Capabilities, Work, Process, Services, AiApproach, Manifesto, Contact, Footer, Preloader } from './components/site';
import AdminPanel from './components/admin-panel';

const EMPTY: SiteContent = {
  settings: { ...DEFAULT_SETTINGS },
  settingsRows: [],
  blocks: {},
  blocksRows: [],
  navLinks: [],
  heroLines: [],
  anatomy: [],
  capabilities: [],
  work: [],
  processSteps: [],
  services: [],
  contactOptions: [],
};

function isAdminRoute() {
  return window.location.hash.startsWith('#/admin');
}

export default function App() {
  const [content, setContent] = useState<SiteContent>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPre, setShowPre] = useState(true);
  const [route, setRoute] = useState(isAdminRoute() ? 'admin' : 'site');
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  const fetchContent = useCallback(async () => {
    try {
      const data = await apiGet('/api/content');
      const merged: SiteContent = {
        settings: { ...DEFAULT_SETTINGS, ...(data.settings || {}) },
        settingsRows: data.settingsRows || [],
        blocks: data.blocks || {},
        blocksRows: data.blocksRows || [],
        navLinks: data.navLinks || [],
        heroLines: data.heroLines || [],
        anatomy: data.anatomy || [],
        capabilities: data.capabilities || [],
        work: data.work || [],
        processSteps: data.processSteps || [],
        services: data.services || [],
        contactOptions: data.contactOptions || [],
      };
      setContent(merged);
      applyTheme(merged.settings);
      try { document.title = (merged.settings.site_name || 'AER × VÆLOR') + ' | ' + (merged.settings.site_tagline || 'Digital Design Studio'); } catch {}
      setError('');
    } catch (e: any) {
      setError(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  useEffect(() => {
    const onHash = () => setRoute(isAdminRoute() ? 'admin' : 'site');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowPre(false), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const un = scrollYProgress.on('change', (v) => setProgress(v));
    return () => un();
  }, [scrollYProgress]);

  if (route === 'admin') {
    if (loading) return <AdminLoading />;
    return <AdminPanel content={content} refresh={fetchContent} onLogout={() => { window.location.hash = '#/'; }} />;
  }

  if (loading) return <AdminLoading />;

  return (
    <>
      <div className="noise-overlay" />
      <AnimatePresence>{showPre && <Preloader key="pre" content={content} />}</AnimatePresence>
      {!showPre && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} className="relative w-full" style={{ background: 'var(--color-aer-charcoal)' }} id="top">
          <div className="fixed inset-6 border pointer-events-none z-40 mix-blend-difference hidden md:block" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 10%, transparent)' }}>
            <div className="absolute top-0 left-0 w-4 h-[2px]" style={{ background: 'color-mix(in oklab, var(--color-aer-cream) 80%, transparent)' }} />
            <div className="absolute top-0 left-0 w-[2px] h-4" style={{ background: 'color-mix(in oklab, var(--color-aer-cream) 80%, transparent)' }} />
            <div className="absolute top-0 right-0 w-4 h-[2px]" style={{ background: 'color-mix(in oklab, var(--color-aer-cream) 80%, transparent)' }} />
            <div className="absolute top-0 right-0 w-[2px] h-4" style={{ background: 'color-mix(in oklab, var(--color-aer-cream) 80%, transparent)' }} />
            <div className="absolute bottom-0 left-0 w-4 h-[2px]" style={{ background: 'color-mix(in oklab, var(--color-aer-cream) 80%, transparent)' }} />
            <div className="absolute bottom-0 left-0 w-[2px] h-4" style={{ background: 'color-mix(in oklab, var(--color-aer-cream) 80%, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-4 h-[2px]" style={{ background: 'color-mix(in oklab, var(--color-aer-cream) 80%, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-[2px] h-4" style={{ background: 'color-mix(in oklab, var(--color-aer-cream) 80%, transparent)' }} />
            <div className="absolute top-0 right-0 w-[2px] origin-top z-10" style={{ height: (progress * 100) + '%', background: 'var(--color-aer-blue)' }} />
            <div className="absolute -left-8 top-1/4 -rotate-90 origin-left text-[8px] tracking-[0.4em] whitespace-nowrap" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 50%, transparent)' }}>{(content.settings.frame_left_text || content.settings.brand_short || '').toUpperCase()}</div>
            <div className="absolute -right-8 bottom-1/4 rotate-90 origin-right text-[8px] tracking-[0.4em] whitespace-nowrap" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 50%, transparent)' }}>{content.settings.frame_right_text || ''}</div>
          </div>
          <Navbar content={content} />
          <Hero content={content} />
          <Anatomy content={content} />
          <Statement content={content} />
          <Philosophy content={content} />
          <Capabilities content={content} />
          <Work content={content} />
          <Process content={content} />
          <Services content={content} />
          <AiApproach content={content} />
          <Manifesto content={content} />
          <Contact content={content} />
          <Footer content={content} />
          {error ? (
            <div className="fixed bottom-4 left-4 z-50 rounded-lg border px-4 py-2 text-xs" style={{ background: 'var(--color-aer-black)', borderColor: '#f87171', color: '#f87171' }}>
              Offline preview — {error}
            </div>
          ) : null}
          <a href="#/admin" className="fixed bottom-4 right-4 z-50 rounded-full border px-4 py-2 text-[10px] tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity"
            style={{ background: 'var(--color-aer-black)', borderColor: 'color-mix(in oklab, var(--color-aer-cream) 30%, transparent)', color: 'var(--color-aer-cream)' }}>Admin</a>
        </motion.main>
      )}
    </>
  );
}

function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--color-aer-black)', color: 'var(--color-aer-cream)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: 'var(--color-aer-blue)' }} />
        <p className="font-editorial text-2xl uppercase tracking-widest">Loading studio…</p>
      </div>
    </div>
  );
}
