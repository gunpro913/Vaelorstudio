import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AiApproach() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-aer-black relative flex flex-col items-center justify-center border-t border-aer-cream/5 px-6 text-center overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <h2 className="font-editorial text-[25vw] leading-none whitespace-nowrap">INTELLIGENCE</h2>
      </div>

      <motion.div style={{ y }} className="max-w-4xl mx-auto flex flex-col items-center z-10 w-full relative">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-8 h-[1px] bg-aer-blue"></div>
          <p className="text-aer-blue text-[10px] tracking-[0.4em] uppercase">THE PARADIGM</p>
          <div className="w-8 h-[1px] bg-aer-blue"></div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            <h3 className="font-editorial text-5xl md:text-7xl lg:text-8xl uppercase leading-[1] text-aer-cream/20">
              AI GENERATES
            </h3>
            <div className="absolute top-1/2 left-[-5%] w-[110%] h-[2px] bg-red-500/50 -rotate-2 mix-blend-screen"></div>
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-editorial text-5xl md:text-7xl lg:text-8xl uppercase leading-[1] text-aer-cream mt-4"
          >
            WE CURATE <span className="italic text-aer-blue">ART.</span>
          </motion.h3>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 md:mt-24 border-l border-aer-blue pl-6 md:pl-8 max-w-lg text-left"
        >
          <p className="text-[10px] md:text-xs tracking-[0.2em] text-aer-cream/60 leading-[2] uppercase">
            We do not reject computation; we subjugate it to taste. It is a precision instrument for executing complex visions, rectified entirely by profound human intent.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}