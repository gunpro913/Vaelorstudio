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
    <section ref={containerRef} id="studio" className="py-24 md:py-32 px-6 md:px-12 bg-aer-black relative overflow-hidden flex items-center justify-center">
      <motion.div style={{ y }} className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6 md:gap-8">
        <p className="text-aer-blue text-[10px] tracking-[0.3em]">PHILOSOPHY</p>
        <h3 className="font-editorial text-2xl md:text-4xl lg:text-5xl leading-tight text-aer-cream/90 uppercase">
          We exist to introduce <span className="italic text-aer-blue">friction, beauty, and intentionality</span> back into digital spaces.
        </h3>
      </motion.div>
    </section>
  );
}
