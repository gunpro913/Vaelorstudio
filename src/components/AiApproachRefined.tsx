import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AiApproachRefined() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section ref={containerRef} className="relative flex min-h-[78vh] items-center justify-center overflow-hidden border-y border-white/[.05] bg-[#080d0e] px-5 py-24 md:px-10 md:py-32">
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center overflow-hidden opacity-[0.025]">
        <motion.h2 style={{ x: x1 }} className="whitespace-nowrap font-editorial text-[16vw] leading-[.78] tracking-[-.04em] text-white">
          ARTIFICIAL INTELLIGENCE
        </motion.h2>
        <motion.h2 style={{ x: x2 }} className="whitespace-nowrap font-editorial text-[16vw] leading-[.78] tracking-[-.04em] text-white">
          HUMAN CURATION
        </motion.h2>
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <div className="mb-8 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[.32em] text-white/30">
          <span className="h-px w-7 bg-aer-blue/55" />
          The paradigm / 006
          <span className="h-px w-7 bg-aer-blue/55" />
        </div>
        <h2 className="font-editorial text-5xl leading-[.9] tracking-[-.04em] text-white md:text-7xl lg:text-8xl">
          AI generates the <span className="italic text-white/25 line-through decoration-aer-blue">slop</span>.<br />
          We curate the <span className="italic text-aer-blue">masterpiece.</span>
        </h2>
        <span className="my-10 h-px w-12 bg-white/15" />
        <p className="max-w-xl text-xs leading-7 tracking-[.14em] text-white/40 md:text-sm">
          We use AI as a precision instrument, not a substitute for taste. Technology accelerates execution; human intent decides what deserves to exist.
        </p>
      </div>
    </section>
  );
}
