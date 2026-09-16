import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BookOpen, BriefcaseBusiness, FlaskConical, Mail, Menu, Sparkles, UserRound, X } from 'lucide-react';

const links = [
  { name: 'Work', href: '#work', icon: BriefcaseBusiness },
  { name: 'Capabilities', href: '#capabilities', icon: BookOpen },
  { name: 'Process', href: '#process', icon: Sparkles },
  { name: 'Studio', href: '#studio', icon: UserRound },
  { name: 'Lab', href: '#lab', icon: FlaskConical },
  { name: 'AI Approach', href: '#ai-approach', icon: FlaskConical },
  { name: 'Pause', href: '#pause', icon: Sparkles },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const itemTransition = { duration: 0.38, ease: [0.16, 1, 0.3, 1] as const };
const navTransition = { duration: 0.58, ease: [0.16, 1, 0.3, 1] as const };

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

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
        layout="size"
        initial={false}
        animate={{ width: scrolled ? 'auto' : 'min(1100px, calc(100vw - 32px))', padding: '6px' }}
        transition={{ layout: navTransition, width: navTransition, padding: navTransition }}
        className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border border-white/[0.12] bg-[#071011]/45 p-1.5 text-white shadow-[0_12px_36px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl backdrop-saturate-125"
        aria-label="Primary navigation"
      >
        <motion.div layout transition={{ layout: navTransition }} className={`flex min-h-10 items-center gap-1 ${scrolled ? '' : 'justify-between'}`}>
          <a href="#top" aria-label="Home" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white text-[#0a0b0b] transition-transform duration-300 ease-out hover:scale-[1.04] focus-visible:outline focus-visible:outline-1 focus-visible:outline-aer-blue" onClick={closeMenu}>
            <span className="font-editorial text-[23px] font-semibold leading-none">A</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const Icon = link.icon;
              const showLabel = !scrolled || activeItem === link.name;
              return (
                <motion.a
                  layout
                  key={link.name}
                  href={link.href}
                  aria-label={scrolled ? link.name : undefined}
                  onHoverStart={() => setActiveItem(link.name)}
                  onHoverEnd={() => setActiveItem(null)}
                  onFocus={() => setActiveItem(link.name)}
                  onBlur={() => setActiveItem(null)}
                  className="group flex h-9 items-center overflow-hidden rounded-full border border-transparent px-2.5 text-white/70 transition-colors duration-300 ease-out hover:border-white/10 hover:bg-white/[0.065] hover:text-white focus-visible:border-white/15 focus-visible:bg-white/[0.065] focus-visible:text-white focus-visible:outline-none"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  transition={itemTransition}
                >
                  <Icon size={15} strokeWidth={1.7} className="shrink-0" aria-hidden="true" />
                  <AnimatePresence initial={false}>
                    {showLabel && <motion.span initial={{ opacity: 0, width: 0, marginLeft: 0 }} animate={{ opacity: 1, width: 'auto', marginLeft: 8 }} exit={{ opacity: 0, width: 0, marginLeft: 0 }} transition={itemTransition} className="whitespace-nowrap text-[10px] font-medium tracking-[0.02em]">{link.name}</motion.span>}
                  </AnimatePresence>
                </motion.a>
              );
            })}
          </div>

          <motion.a layout href="mailto:AlsanaAlgo@gmail.com" aria-label={scrolled ? 'Email' : undefined} onHoverStart={() => setActiveItem('Email')} onHoverEnd={() => setActiveItem(null)} onFocus={() => setActiveItem('Email')} onBlur={() => setActiveItem(null)} className="hidden h-9 items-center overflow-hidden rounded-full border border-white/10 bg-white/[0.045] px-2.5 text-white/80 transition-colors duration-300 ease-out hover:bg-white/[0.085] hover:text-white focus-visible:outline-none md:flex" whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }} transition={itemTransition}>
            <Mail size={15} strokeWidth={1.7} className="shrink-0" aria-hidden="true" />
            <AnimatePresence initial={false}>
              {(!scrolled || activeItem === 'Email') && <motion.span initial={{ opacity: 0, width: 0, marginLeft: 0 }} animate={{ opacity: 1, width: 'auto', marginLeft: 8 }} exit={{ opacity: 0, width: 0, marginLeft: 0 }} transition={itemTransition} className="whitespace-nowrap text-[10px] font-medium">Email</motion.span>}
            </AnimatePresence>
          </motion.a>

          <motion.button type="button" animate={{ scale: scrolled ? 0.96 : 1 }} transition={navTransition} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
            {menuOpen ? <X size={18} strokeWidth={1.7} aria-hidden="true" /> : <Menu size={18} strokeWidth={1.7} aria-hidden="true" />}
          </motion.button>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div id="mobile-navigation" initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }} transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 overflow-y-auto bg-[#080b0c]/92 px-6 py-24 text-white backdrop-blur-xl md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            {links.map((link, i) => {
              const Icon = link.icon;
              return <motion.a key={link.name} href={link.href} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, delay: i * 0.05 + 0.12, ease: [0.16, 1, 0.3, 1] }} onClick={closeMenu} className="flex items-center gap-3 font-editorial text-3xl transition-colors duration-300 hover:text-aer-blue focus-visible:outline focus-visible:outline-1 focus-visible:outline-aer-blue"><Icon size={23} strokeWidth={1.5} aria-hidden="true" />{link.name}</motion.a>;
            })}
            <a href="mailto:AlsanaAlgo@gmail.com" onClick={closeMenu} className="mt-2 flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[10px] font-medium text-[#0a0b0b]"><Mail size={14} aria-hidden="true" />Email</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
