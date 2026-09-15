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

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className="fixed left-1/2 top-3 z-50 w-[calc(100%-32px)] max-w-[760px] -translate-x-1/2 rounded-full border border-white/15 bg-[#0d1112]/95 px-2 py-2 text-white shadow-[0_10px_35px_rgba(0,0,0,0.3)] backdrop-blur-xl"
        aria-label="Primary navigation"
      >
        <div className="flex min-h-10 items-center justify-between gap-2">
          <a
            href="#"
            aria-label="Home"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0a0b0b] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-1 focus-visible:outline-aer-blue"
            onClick={closeMenu}
          >
            <span className="font-editorial text-[23px] font-semibold leading-none">A</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="rounded-full px-4 py-2 text-[10px] font-medium tracking-[0.02em] text-white/75 transition-all duration-200 hover:bg-white/8 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-aer-blue"
              >
                {link.name}
              </a>
            ))}
          </div>

          <a
            href="mailto:AlsanaAlgo@gmail.com"
            className="hidden rounded-full bg-[#050708] px-4 py-2 text-[10px] font-medium text-white/90 transition-all duration-200 hover:bg-white hover:text-[#0a0b0b] md:block"
          >
            AlsanaAlgo@gmail.com
          </a>

          <button
            type="button"
            className="rounded-full bg-[#050708] px-4 py-2 text-[10px] font-medium text-white md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-[#080b0c] text-white md:hidden"
            role="dialog"
            aria-label="Mobile navigation"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 + 0.15 }}
                onClick={closeMenu}
                className="font-editorial text-4xl transition-colors hover:text-aer-blue focus-visible:outline focus-visible:outline-1 focus-visible:outline-aer-blue"
              >
                {link.name}
              </motion.a>
            ))}
            <a
              href="mailto:AlsanaAlgo@gmail.com"
              onClick={closeMenu}
              className="mt-2 rounded-full bg-white px-5 py-2 text-[10px] font-medium text-[#0a0b0b]"
            >
              AlsanaAlgo@gmail.com
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
