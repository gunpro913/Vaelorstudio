import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './components/Preloader';
import LandingPage from './components/LandingPage';
import Admin from './components/Admin';
import { supabase } from './lib/supabase';

function PublicSite() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    void supabase.from('analytics_events').insert({
      event_name: 'page_view',
      path: window.location.pathname,
    });
  }, []);

  return (
    <>
      <div className="noise-overlay" />
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>
      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full"
        >
          <div className="fixed inset-4 z-40 pointer-events-none hidden border border-aer-cream/10 md:block">
            <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-aer-blue/30 to-transparent" />
            <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-aer-cream/50" />
            <div className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-aer-cream/50" />
          </div>
          <LandingPage />
        </motion.main>
      )}
    </>
  );
}

function App() {
  if (window.location.pathname.startsWith('/admin')) return <Admin />;
  return <PublicSite />;
}

export default App;
