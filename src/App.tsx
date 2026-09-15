import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Anatomy from './components/Anatomy';
import Statement from './components/Statement';
import Philosophy from './components/Philosophy';
import Capabilities from './components/Capabilities';
import Work from './components/Work';
import Process from './components/Process';
import Services from './components/Services';
import AiApproach from './components/AiApproach';
import Manifesto from './components/Manifesto';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
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
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="relative min-h-screen w-full"
        >
          <Navbar />
          <Hero />
          <Anatomy />
          <Statement />
          <Philosophy />
          <Capabilities />
          <Work />
          <Process />
          <Services />
          <AiApproach />
          <Manifesto />
          <Contact />
          <Footer />
        </motion.main>
      )}
    </>
  );
}

export default App;
