import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Footer() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  // Dissolves at the very end
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 1, 0.2]); 
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <footer ref={containerRef} className="relative h-screen bg-aer-black overflow-hidden flex flex-col items-center justify-center px-6 text-center">
      
      <motion.div style={{ y, opacity, scale }} className="relative z-10 flex flex-col items-center gap-12">
        <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl uppercase leading-tight max-w-4xl">
          MAKE SOMETHING WORTH <span className="italic text-aer-blue">EXPERIENCING</span>
        </h2>
        
        <a href="#contact" className="text-xs md:text-sm tracking-[0.3em] hover:text-aer-blue transition-colors duration-300 pb-2 border-b border-current opacity-100">
          START A PROJECT →
        </a>
      </motion.div>

      <div className="absolute bottom-8 md:bottom-12 w-full flex justify-between items-center px-6 md:px-12 text-[10px] tracking-[0.2em] text-aer-cream/40">
        <p>© {new Date().getFullYear()}</p>
        <p>AER × VÆLOR</p>
        <p>ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
}