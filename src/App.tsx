import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
  const { scrollYProgress } = useScroll();

  // Scroll progress for the frame
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="noise-overlay"></div>
      
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="relative w-full bg-aer-charcoal"
        >
          {/* Enhanced Editorial Scroll Frame */}
          <div className="fixed inset-6 border border-aer-cream/10 pointer-events-none z-40 mix-blend-difference hidden md:block shadow-[0_0_30px_rgba(64,224,208,0.05)]">
            {/* Center Marks */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-aer-cream/60" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-aer-cream/60" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-aer-cream/60" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-aer-cream/60" />

            {/* Glowing Corners */}
            <div className="absolute top-0 left-0 w-4 h-[2px] bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]" />
            <div className="absolute top-0 left-0 w-[2px] h-4 bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]" />
            <div className="absolute top-0 right-0 w-4 h-[2px] bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]" />
            <div className="absolute top-0 right-0 w-[2px] h-4 bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]" />
            <div className="absolute bottom-0 left-0 w-4 h-[2px] bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]" />
            <div className="absolute bottom-0 left-0 w-[2px] h-4 bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]" />
            <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]" />
            <div className="absolute bottom-0 right-0 w-[2px] h-4 bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]" />

            {/* Dynamic Scroll Progress Bar */}
            <motion.div
              style={{ height: progressHeight }}
              className="absolute top-0 right-0 w-[2px] bg-aer-blue origin-top z-10 shadow-[0_0_10px_rgba(64,224,208,0.8)]"
            />

            {/* Global Annotations tied to the frame */}
            <div className="absolute -left-8 top-1/4 -rotate-90 origin-left text-[8px] tracking-[0.4em] text-aer-cream/50 whitespace-nowrap">
              AER × VÆLOR — STUDIO
            </div>
            <div className="absolute -right-8 bottom-1/4 rotate-90 origin-right text-[8px] tracking-[0.4em] text-aer-cream/50 whitespace-nowrap">
              SYS. SCROLL // ACTIVE
            </div>
          </div>

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