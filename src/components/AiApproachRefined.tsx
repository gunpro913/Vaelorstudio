import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AiApproachRefined() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section ref={containerRef} className="relative flex min-h-[80vh] items-center justify-center overflow-hidden border-t border-white/[.05] bg-[#0a0a0a] px-6 py-32 md:px-12 md:py-48">
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center overflow-hidden opacity-[0.03]" aria-hidden="true">
        <motion.h2 style={{ x: x1 }} className="whitespace-nowrap font-editorial text-[15vw] leading-none">
          ARTIFICIAL INTELLIGENCE
        </motion.h2>
        <motion.h2 style={{ x: x2 }} className="whitespace-nowrap font-editorial text-[15vw] leading-none">
          HUMAN CURATION
        </motion.h2>
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-12 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-aer-blue">THE PARADIGM</p>
        <h3 className="font-editorial text-4xl uppercase leading-[1.1] md:text-6xl lg:text-7xl">
          AI generates the <span className="italic text-white/40 line-through decoration-aer-blue">slop</span>.<br />
          We curate the <span className="italic text-aer-blue">masterpiece</span>.
        </h3>
        <div className="my-4 h-px w-12 bg-white/20" />
        <p className="max-w-lg text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/60 md:text-xs">
          We do not reject AI; we subjugate it to taste. It is a precision instrument for executing complex visions, rectified entirely by profound human intent.
        </p>
      </div>
    </section>
  );
}
