import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AiApproach() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-aer-black relative overflow-hidden border-t border-aer-cream/5 flex items-center justify-center min-h-[80vh]">
      
      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex flex-col justify-center items-center opacity-[0.03] pointer-events-none overflow-hidden">
        <motion.h2 style={{ x: x1 }} className="font-editorial text-[15vw] whitespace-nowrap leading-none">ARTIFICIAL INTELLIGENCE</motion.h2>
        <motion.h2 style={{ x: x2 }} className="font-editorial text-[15vw] whitespace-nowrap leading-none">HUMAN CURATION</motion.h2>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center gap-12">
        <p className="text-aer-blue text-[10px] tracking-[0.3em] uppercase">THE PARADIGM</p>
        
        <h3 className="font-editorial text-4xl md:text-6xl lg:text-7xl uppercase leading-[1.1]">
          AI generates the <span className="italic text-aer-cream/40 line-through decoration-aer-blue">slop</span>.<br />
          We curate the <span className="italic text-aer-blue">masterpiece</span>.
        </h3>
        
        <div className="w-12 h-[1px] bg-aer-cream/20 my-4" />
        
        <p className="text-[10px] md:text-xs tracking-[0.2em] text-aer-cream/60 max-w-lg leading-relaxed uppercase">
          We do not reject AI; we subjugate it to taste. It is a precision instrument for executing complex visions, rectified entirely by profound human intent.
        </p>
      </div>
    </section>
  );
}