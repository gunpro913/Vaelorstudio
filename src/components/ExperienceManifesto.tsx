import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ExperienceManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.27, 1], [0, 1, 0, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.38, 0.55, 1], [0, 1, 0, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.68, 0.88, 1], [0, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.02]);

  return (
    <section ref={containerRef} className="relative h-[140vh] overflow-hidden">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 text-center md:px-12">
        <motion.div style={{ scale }} className="relative z-10 flex h-[300px] w-full max-w-4xl items-center justify-center">
          <motion.h2 style={{ opacity: opacity1 }} className="absolute inset-x-0 font-editorial text-4xl uppercase leading-tight md:text-6xl lg:text-7xl">
            THE WEBSITE ISN'T THE PRODUCT.
          </motion.h2>
          <motion.h2 style={{ opacity: opacity2 }} className="absolute inset-x-0 font-editorial text-4xl uppercase italic leading-tight text-aer-blue md:text-6xl lg:text-7xl">
            THE EXPERIENCE IS.
          </motion.h2>
          <motion.p style={{ opacity: opacity3 }} className="absolute inset-x-0 mx-auto max-w-lg text-xs uppercase leading-relaxed tracking-[0.2em] text-white/60 md:text-sm">
            MINIMALISM DOES NOT MEAN EMPTY. EXPERIMENTAL DOES NOT MEAN CHAOTIC. EVERY ELEMENT MUST HAVE A PURPOSE.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
