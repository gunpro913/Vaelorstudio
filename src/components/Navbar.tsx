import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BookOpen, BriefcaseBusiness, FlaskConical, Mail, UserRound } from 'lucide-react';

const links = [
  { name: 'Work', href: '#work', icon: BriefcaseBusiness },
  { name: 'About', href: '#studio', icon: UserRound },
  { name: 'Playground', href: '#process', icon: FlaskConical },
  { name: 'Resource', href: '#services', icon: BookOpen },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 72);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        layout
        className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border border-white/[0.14] bg-[#071011]/55 text-white shadow-[0_18px_55px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl backdrop-saturate-150"
        initial={false}
        animate={{
          width: scrolled ? 'auto' : 'min(760px, calc(100vw - 32px))',
          padding: scrolled ? '6px' : '6px 8px',
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Primary navigation"
      >
        <div className="flex min-h-10 items-center gap-1">
          <a
            href="#"
            aria-label="Home"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white text-[#0a0b0b] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-1 focus-visible:outline-aer-blue"
            onClick={closeMenu}
          >
            <span className="font-editorial text-[23px] font-semibold leading-none">A</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <motion.a
                  layout
                  key={link.name}
                  href={link.href}
                  title={scrolled ? link.name : undefined}
                  className="group flex h-9 items-center overflow-hidden rounded-full border border-transparent px-2.5 text-white/70 transition-colors duration-200 hover:border-white/10 hover:bg-white/[0.07] hover:text-white focus-visible:border-white/15 focus-visible:bg-white/[0.07] focus-visible:text-white focus-visible:outline-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={15} strokeWidth={1.7} className="shrink-0" aria-hidden="true" />
                  <AnimatePresence initial={false}>
                    {!scrolled && (
                      <motion.span
                        initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                        animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
                        exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="whitespace-nowrap text-[10px] font-medium tracking-[0.02em]"
                      >
                        {link.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.a>
              );
            })}
          </div>

          <motion.a
            layout
            href="mailto:AlsanaAlgo@gmail.com"
            title={scrolled ? 'Email' : undefined}
            className="hidden h-9 items-center overflow-hidden rounded-full border border-white/10 bg-white/[0.055] px-2.5 text-white/80 transition-colors duration-200 hover:bg-white/[0.1] hover:text-white md:flex"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={15} strokeWidth={1.7} className="shrink-0" aria-hidden="true" />
            <AnimatePresence initial={false}>
              {!scrolled && (
                <motion.span
                  initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                  animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
                  exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="whitespace-nowrap text-[10px] font-medium"
                >
                  AlsanaAlgo@gmail.com
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>

          <button
            type="button"
            className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[10px] font-medium text-white md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-[#080b0c]/95 text-white backdrop-blur-2xl md:hidden"
            role="dialog"
            aria-label="Mobile navigation"
          >
            {links.map((link, i) => {
              const Icon = link.icon;

              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 + 0.15 }}
                  onClick={closeMenu}
                  className="flex items-center gap-3 font-editorial text-4xl transition-colors hover:text-aer-blue focus-visible:outline focus-visible:outline-1 focus-visible:outline-aer-blue"
                >
                  <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                  {link.name}
                </motion.a>
              );
            })}
            <a
              href="mailto:AlsanaAlgo@gmail.com"
              onClick={closeMenu}
              className="mt-2 flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[10px] font-medium text-[#0a0b0b]"
            >
              <Mail size={14} aria-hidden="true" />
              AlsanaAlgo@gmail.com
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
