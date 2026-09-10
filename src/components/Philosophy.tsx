import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Philosophy() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  
  return (
    <section ref={containerRef} id="studio" className="py-32 md:py-48 px-6 md:px-12 bg-aer-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start">
        
        <div className="w-full md:w-1/3 relative h-full">
          <div className="sticky top-32 flex flex-col gap-4">
            <p className="text-aer-blue text-xs tracking-[0.2em]">PHILOSOPHY</p>
            <p className="text-[9px] tracking-[0.3em] text-aer-cream/30 uppercase">SYS_LOG: INTENTIONAL_FRICTION</p>
          </div>
        </div>

        <motion.div style={{ y }} className="w-full md:w-2/3 flex flex-col gap-12">
          <h3 className="font-editorial text-3xl md:text-5xl lg:text-6xl leading-tight text-aer-cream/90 uppercase">
            We believe the web has become too predictable. We exist to introduce <span className="italic text-aer-blue">friction, beauty, and intentionality</span> back into digital spaces.
          </h3>
          
          <p className="text-xs md:text-sm tracking-[0.2em] text-aer-cream/50 leading-relaxed max-w-lg">
            EVERY PROJECT IS TREATED AS A DIGITAL EXHIBITION. WE DISCARD TEMPLATES AND CONVENTIONAL FRAMEWORKS IN FAVOR OF BESPOKE, CINEMATIC EXPERIENCES THAT DEMAND ATTENTION AND REWARD CURIOSITY.
          </p>
          
          <div className="flex flex-col gap-6 mt-12 pt-12 border-t border-aer-cream/10">
            <div className="group flex justify-between items-center text-[10px] tracking-[0.3em] text-aer-cream/40 hover:text-aer-cream transition-colors duration-500 cursor-default">
              <span className="group-hover:translate-x-4 transition-transform duration-500">01 / AESTHETICS</span>
              <span className="group-hover:-translate-x-4 transition-transform duration-500">UNCOMPROMISING</span>
            </div>
            <div className="group flex justify-between items-center text-[10px] tracking-[0.3em] text-aer-cream/40 hover:text-aer-cream transition-colors duration-500 cursor-default">
              <span className="group-hover:translate-x-4 transition-transform duration-500">02 / MOTION</span>
              <span className="group-hover:-translate-x-4 transition-transform duration-500">PURPOSEFUL</span>
            </div>
            <div className="group flex justify-between items-center text-[10px] tracking-[0.3em] text-aer-cream/40 hover:text-aer-cream transition-colors duration-500 cursor-default">
              <span className="group-hover:translate-x-4 transition-transform duration-500">03 / CODE</span>
              <span className="group-hover:-translate-x-4 transition-transform duration-500">EXPERIMENTAL</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
