import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Contact() {
  const containerRef = useRef(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const inquiries = [
    "DIGITAL PLATFORM",
    "E-COMMERCE",
    "BRAND IDENTITY",
    "CREATIVE DEVELOPMENT"
  ];

  const handleSelect = (i: number) => {
    setSelectedIndex(i);
    setTimeout(() => {
      if (ctaRef.current) {
        ctaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  return (
    <section id="contact" ref={containerRef} className="pt-24 pb-32 md:pt-32 md:pb-48 px-6 md:px-12 bg-aer-charcoal flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div style={{ y, opacity }} className="w-full max-w-4xl mx-auto flex flex-col items-center text-center z-10">
        <p className="text-aer-blue text-[10px] tracking-[0.3em] mb-6">INITIATE</p>
        <h2 className="font-editorial text-3xl md:text-5xl uppercase leading-[1] mb-12">
          Start A <span className="italic text-aer-cream/70">Project</span>
        </h2>

        <div className="w-full flex flex-col gap-2">
          {inquiries.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative w-full py-4 px-6 border rounded-sm flex justify-between items-center overflow-hidden cursor-pointer text-left transition-all duration-500 ${selectedIndex === i ? 'border-aer-blue bg-aer-blue/5' : 'border-aer-cream/10 hover:border-aer-blue/30'}`}
            >
              <span className={`relative z-10 font-editorial text-base md:text-lg uppercase transition-all duration-500 ${selectedIndex === i ? 'text-aer-blue italic' : 'group-hover:text-aer-blue group-hover:italic'}`}>
                {item}
              </span>
              <span className={`relative z-10 text-[9px] tracking-[0.2em] transition-all duration-500 ${selectedIndex === i ? 'text-aer-blue' : 'text-aer-cream/20 group-hover:text-aer-blue'}`}>
                {selectedIndex === i ? 'SELECTED' : 'SELECT ↗'}
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ 
            opacity: selectedIndex !== null ? 1 : 0, 
            height: selectedIndex !== null ? 'auto' : 0,
            marginTop: selectedIndex !== null ? 32 : 0
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden flex flex-col items-center w-full"
        >
          <div className="w-full p-8 border border-aer-blue/20 bg-aer-blue/5 flex flex-col items-center gap-6 rounded-sm mt-4">
            <p className="text-[10px] tracking-[0.2em] text-aer-cream/50 uppercase">
              PROCEED WITH: {selectedIndex !== null ? inquiries[selectedIndex] : ''}
            </p>
            <a 
              ref={ctaRef}
              href={`mailto:yunusfawzan9@gmail.com?subject=Project Inquiry: ${selectedIndex !== null ? inquiries[selectedIndex] : ''}`}
              className="px-10 py-4 bg-aer-cream text-aer-charcoal font-bold tracking-[0.2em] text-[10px] hover:bg-aer-blue hover:text-aer-charcoal transition-colors duration-500 uppercase rounded-sm"
            >
              CONTINUE TO INQUIRY →
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}