import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import ExperienceManifesto from './components/ExperienceManifesto';
import AiApproachRefined from './components/AiApproachRefined';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <div key="preloader" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080d0e] text-aer-cream">Loading</div>}
      </AnimatePresence>
      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full"
        >
          <Navbar />
          <LandingPage />
          <ExperienceManifesto />
          <AiApproachRefined />
          <Footer />
        </motion.main>
      )}
    </>
  );
}

export default App;
