import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './components/Preloader';
import LandingPage from './components/LandingPage';
import LandingParticles from './components/LandingParticles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Admin from './components/Admin';
import ImageAdmin from './components/ImageAdmin';
import PortfolioImageHydrator from './components/PortfolioImageHydrator';
import ExperienceManifesto from './components/ExperienceManifesto';
import AiApproachRefined from './components/AiApproachRefined';
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
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>
      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }
          className="relative w-full"
        >
          <Navbar />
          <LandingPage />
          <ExperienceManifesto />
          <AiApproachRefined />
          <Footer />
          <LandingParticles />
          <PortfolioImageHydrator />
        </motion.main>
      )}
    </>
  );
}

function App() {
  if (window.location.pathname.startsWith('/admin/images')) return <ImageAdmin />;
  if (window.location.pathname.startsWith('/admin')) return <Admin />;
  return <PublicSite />;
}

export default App;
