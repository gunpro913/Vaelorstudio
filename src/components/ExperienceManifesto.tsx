import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ExperienceManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.3, 1], [0, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15, 0.3, 1], ['50%', '0%', '-50%', '-50%']);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.45, 0.6, 1], [0, 1, 0, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.45, 0.6, 1], ['50%', '0%', '-50%', '-50%']);
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.75, 0.95, 1], [0, 1, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.75, 0.95, 1], ['50%', '0%', '0%', '0%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <section ref={containerRef} className="relative h-[200vh] overflow-hidden">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center md:px-12">
        <motion.div style={{ scale }} className="relative z-10 flex h-[300px] w-full max-w-4xl flex-col items-center justify-center">
          <motion.h2 style={{ opacity: opacity1, y: y1 }} className="absolute font-editorial text-4xl uppercase leading-tight md:text-6xl lg:text-7xl">
            THE WEBSITE ISN'T THE PRODUCT.
          </motion.h2>
          <motion.h2 style={{ opacity: opacity2, y: y2 }} className="absolute font-editorial text-4xl uppercase italic leading-tight text-aer-blue md:text-6xl lg:text-7xl">
            THE EXPERIENCE IS.
          </motion.h2>
          <motion.p style={{ opacity: opacity3, y: y3 }} className="absolute mx-auto max-w-lg text-xs uppercase leading-relaxed tracking-[0.2em] text-white/60 md:text-sm">
            MINIMALISM DOES NOT MEAN EMPTY. EXPERIMENTAL DOES NOT MEAN CHAOTIC. EVERY ELEMENT MUST HAVE A PURPOSE.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
