import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#studio' },
    { name: 'Playground', href: '#process' },
    { name: 'Resource', href: '#services' },
  ];

  return (
    <>
      <nav className="fixed top-2 left-1/2 z-50 w-[calc(100%-16px)] max-w-[1440px] -translate-x-1/2 rounded-full border-2 border-white bg-white px-2 py-1.5 text-[#0a0a0a] shadow-[0_6px_20px_rgba(0,0,0,0.16)]">
        <div className="flex h-10 items-center justify-between gap-2">
          <a href="#" aria-label="Home" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] text-white" onClick={() => setMenuOpen(false)}>
            <span className="font-editorial text-[23px] font-semibold leading-none">A</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="text-[11px] font-medium tracking-[-0.01em] text-[#0a0a0a] transition-opacity duration-200 hover:opacity-55">
                {link.name}
              </a>
            ))}
          </div>

          <a href="mailto:AlsanaAlgo@gmail.com" className="hidden min-w-[128px] rounded-full bg-[#0a0a0a] px-4 py-2 text-center text-[10px] font-medium text-white transition-transform duration-200 hover:scale-[1.02] md:block">
            AlsanaAlgo@gmail.com
          </a>

          <button className="rounded-full bg-[#0a0a0a] px-4 py-2 text-[10px] font-medium text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-[#0a0a0a] text-white md:hidden">
            {links.map((link, i) => (
              <motion.a key={link.name} href={link.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 + 0.15 }} onClick={() => setMenuOpen(false)} className="font-editorial text-4xl">
                {link.name}
              </motion.a>
            ))}
            <a href="mailto:AlsanaAlgo@gmail.com" onClick={() => setMenuOpen(false)} className="mt-2 text-xs text-white/70">AlsanaAlgo@gmail.com</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
