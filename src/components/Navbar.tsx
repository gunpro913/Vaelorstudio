import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: 'WORK', href: '#work' },
    { name: 'STUDIO', href: '#studio' },
    { name: 'PROCESS', href: '#process' },
    { name: 'SERVICES', href: '#services' },
    { name: 'CONTACT', href: '#contact' }
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-aer-cream/10 bg-aer-charcoal/80 px-6 py-4 text-aer-cream backdrop-blur-md transition-all duration-500 md:px-12 md:py-5"
        aria-label="Primary navigation"
      >
        <a href="#" className="z-50 text-xs font-medium tracking-[0.2em] focus-visible:outline focus-visible:outline-1 focus-visible:outline-aer-blue" onClick={closeMenu}>
          AER × VÆLOR
        </a>

        <div className="hidden items-center gap-7 text-[10px] font-medium tracking-[0.2em] md:flex">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="transition-colors duration-300 hover:text-aer-blue focus-visible:outline focus-visible:outline-1 focus-visible:outline-aer-blue">
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-aer-cream/20 px-4 py-2 transition-colors duration-300 hover:border-aer-blue hover:bg-aer-blue hover:text-aer-charcoal focus-visible:outline focus-visible:outline-1 focus-visible:outline-aer-blue"
          >
            START A PROJECT
          </a>
        </div>

        <button
          type="button"
          className="z-50 rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.2em] focus-visible:outline focus-visible:outline-1 focus-visible:outline-aer-blue md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-aer-black px-6 md:hidden"
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
                className="font-editorial text-4xl uppercase tracking-widest text-aer-cream transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-aer-blue hover:text-aer-blue"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              onClick={closeMenu}
              className="mt-3 rounded-full border border-aer-cream/20 px-6 py-3 text-[9px] font-medium tracking-[0.2em] text-aer-cream transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-aer-blue hover:border-aer-blue hover:bg-aer-blue hover:text-aer-charcoal"
            >
              START A PROJECT
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
