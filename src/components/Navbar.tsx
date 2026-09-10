import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "WORK", href: "#work" },
    { name: "STUDIO", href: "#studio" },
    { name: "PROCESS", href: "#process" },
    { name: "SERVICES", href: "#services" },
    { name: "CONTACT", href: "#contact" }
  ];

  return (
    <>
      <nav
        className="sticky top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-5 flex justify-between items-center transition-all duration-500 backdrop-blur-lg bg-aer-charcoal/60 border-b border-aer-cream/10 text-aer-cream"
      >
        <a href="#" className="text-xs tracking-[0.2em] font-medium z-50" onClick={() => setMenuOpen(false)}>
          AER × VÆLOR
        </a>
        
        <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] font-medium">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-aer-blue transition-colors duration-300">
              {link.name}
            </a>
          ))}
        </div>

        <button 
          className="md:hidden text-[10px] tracking-[0.2em] z-50 uppercase"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-aer-black flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                onClick={() => setMenuOpen(false)}
                className="font-editorial text-4xl uppercase tracking-widest text-aer-cream hover:text-aer-blue transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}