import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ExperienceManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.3, 1], [0, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15, 0.3, 1], ['48%', '0%', '-48%', '-48%']);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.45, 0.6, 1], [0, 1, 0, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.45, 0.6, 1], ['48%', '0%', '-48%', '-48%']);
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.75, 0.95, 1], [0, 1, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.75, 0.95, 1], ['48%', '0%', '0%', '0%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.03]);

  return (
    <section ref={containerRef} className="relative h-[180vh] overflow-hidden border-y border-white/[.05] bg-[#0a0b0b]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-5 md:px-10">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-center overflow-hidden opacity-[0.025]">
          <motion.div style={{ x: useTransform(scrollYProgress, [0, 1], ['4%', '-4%']) }} className="whitespace-nowrap font-editorial text-[18vw] leading-[.78] text-white">
            THE WEBSITE
          </motion.div>
          <motion.div style={{ x: useTransform(scrollYProgress, [0, 1], ['-4%', '4%']) }} className="whitespace-nowrap font-editorial text-[18vw] leading-[.78] text-white">
            THE EXPERIENCE
          </motion.div>
        </div>

        <motion.div style={{ scale }} className="relative z-10 w-full max-w-5xl text-center">
          <div className="mb-8 flex items-center justify-center gap-3 text-[9px] font-medium uppercase tracking-[.32em] text-white/30">
            <span className="h-px w-7 bg-aer-blue/55" />
            Experience / 005
            <span className="h-px w-7 bg-aer-blue/55" />
          </div>
          <div className="relative mx-auto h-[230px] md:h-[280px]">
            <motion.h2 style={{ opacity: opacity1, y: y1 }} className="absolute inset-x-0 top-0 font-editorial text-5xl leading-[.88] tracking-[-.04em] text-white md:text-8xl lg:text-9xl">
              The website isn't<br />the product.
            </motion.h2>
            <motion.h2 style={{ opacity: opacity2, y: y2 }} className="absolute inset-x-0 top-0 font-editorial text-5xl leading-[.88] tracking-[-.04em] text-aer-blue md:text-8xl lg:text-9xl">
              The experience<br />is.
            </motion.h2>
            <motion.p style={{ opacity: opacity3, y: y3 }} className="absolute inset-x-0 top-8 mx-auto max-w-xl text-xs leading-7 tracking-[.16em] text-white/40 md:top-12 md:text-sm">
              MINIMALISM DOES NOT MEAN EMPTY. EXPERIMENTAL DOES NOT MEAN CHAOTIC. EVERY ELEMENT SHOULD HAVE A PURPOSE.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
