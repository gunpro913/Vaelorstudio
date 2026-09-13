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
import Admin from './components/Admin';

function PublicSite() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return <>
    <div className="noise-overlay" />
    <AnimatePresence mode="wait">{loading && <Preloader key="preloader" />}</AnimatePresence>
    {!loading && <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} className="relative w-full bg-aer-charcoal">
      <div className="fixed inset-6 z-40 hidden pointer-events-none border border-aer-cream/10 mix-blend-difference shadow-[0_0_30px_rgba(64,224,208,0.05)] md:block">
        <div className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-aer-cream/60"/><div className="absolute bottom-0 left-1/2 h-4 w-px -translate-x-1/2 bg-aer-cream/60"/><div className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-aer-cream/60"/><div className="absolute right-0 top-1/2 h-px w-4 -translate-y-1/2 bg-aer-cream/60"/>
        <div className="absolute top-0 left-0 h-[2px] w-4 bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]"/><div className="absolute top-0 left-0 h-4 w-[2px] bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]"/><div className="absolute top-0 right-0 h-[2px] w-4 bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]"/><div className="absolute top-0 right-0 h-4 w-[2px] bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]"/><div className="absolute bottom-0 left-0 h-[2px] w-4 bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]"/><div className="absolute bottom-0 left-0 h-4 w-[2px] bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]"/><div className="absolute bottom-0 right-0 h-[2px] w-4 bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]"/><div className="absolute bottom-0 right-0 h-4 w-[2px] bg-aer-cream/80 shadow-[0_0_8px_rgba(64,224,208,0.5)]"/>
        <motion.div style={{ height: progressHeight }} className="absolute right-0 top-0 z-10 w-[2px] origin-top bg-aer-blue shadow-[0_0_10px_rgba(64,224,208,0.8)]"/>
        <div className="absolute -left-8 top-1/4 -rotate-90 origin-left whitespace-nowrap text-[8px] tracking-[0.4em] text-aer-cream/50">AER × VÆLOR — STUDIO</div><div className="absolute -right-8 bottom-1/4 rotate-90 origin-right whitespace-nowrap text-[8px] tracking-[0.4em] text-aer-cream/50">SYS. SCROLL // ACTIVE</div>
      </div>
      <Navbar/><Hero/><Anatomy/><Statement/><Philosophy/><Capabilities/><Work/><Process/><Services/><AiApproach/><Manifesto/><Contact/><Footer/>
    </motion.main>}
  </>;
}

function App() {
  if (window.location.pathname.startsWith('/admin')) return <Admin />;
  return <PublicSite />;
}

export default App;
