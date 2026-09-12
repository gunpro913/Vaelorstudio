import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-aer-black px-6 py-24 md:px-12"
    >
      <div className="absolute left-6 top-28 hidden flex-col gap-1 text-[9px] tracking-[0.3em] text-aer-cream/30 md:left-12 md:flex">
        <span>IDX: 001</span>
        <span>VÆLOR / AER</span>
        <span>DIGITAL STUDIO</span>
      </div>

      <div className="absolute bottom-12 right-6 hidden flex-col gap-1 text-right text-[9px] tracking-[0.3em] text-aer-cream/30 md:right-12 md:flex">
        <span>EST. 2026</span>
        <span>INDEPENDENT STUDIO</span>
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 mx-auto w-full max-w-[1500px]"
      >
        <motion.div style={{ y }} className="max-w-6xl">
          <p className="mb-7 text-[10px] uppercase tracking-[0.35em] text-aer-blue md:text-xs">
            AER × VÆLOR — Web Design Studio
          </p>

          <h1 className="font-editorial text-[18vw] font-normal leading-[0.78] tracking-[-0.055em] text-aer-cream md:text-[11vw]">
            Digital
            <br />
            <span className="italic text-aer-cream/80">presence.</span>
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:ml-[28%] md:mt-12 md:max-w-xl md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-6 text-aer-cream/55 md:text-base">
              We design high-impact digital experiences for brands that want to be remembered, not merely seen.
            </p>

            <a
              href="#contact"
              className="group inline-flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-aer-cream transition-colors hover:text-aer-blue"
            >
              <span>Start a project</span>
              <span className="h-px w-12 bg-aer-cream/40 transition-all duration-500 group-hover:w-20 group-hover:bg-aer-blue" />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-10 left-6 flex items-center gap-4 text-[9px] uppercase tracking-[0.35em] text-aer-cream/30 md:left-12"
      >
        <span>Scroll to explore</span>
        <motion.span
          animate={{ scaleX: [0.2, 1, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-px w-12 origin-left bg-aer-cream/40"
        />
      </motion.div>
    </section>
  );
}
