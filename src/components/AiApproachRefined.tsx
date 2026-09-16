import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function AiApproachRefined() {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section id="ai-approach" ref={containerRef} aria-labelledby="ai-approach-title" className="relative flex min-h-[80vh] items-center justify-center overflow-hidden border-t border-white/[.05] bg-[#0a0a0a] px-6 py-32 md:px-12 md:py-48">
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center overflow-hidden opacity-[0.03]" aria-hidden="true">
        <motion.h2 style={reduceMotion ? undefined : { x: x1 }} className="whitespace-nowrap font-editorial text-[15vw] leading-none">ARTIFICIAL INTELLIGENCE</motion.h2>
        <motion.h2 style={reduceMotion ? undefined : { x: x2 }} className="whitespace-nowrap font-editorial text-[15vw] leading-none">HUMAN DIRECTION</motion.h2>
      </div>
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-12 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-aer-blue">THE APPROACH / 006A</p>
        <h2 id="ai-approach-title" className="font-editorial text-4xl uppercase leading-[1.05] md:text-6xl lg:text-7xl">AI expands the field.<br /><span className="italic text-aer-blue">Human judgment sets the direction.</span></h2>
        <div className="my-4 h-px w-12 bg-white/20" />
        <p className="max-w-xl text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/55 md:text-xs">We use generative systems to explore, test and accelerate ideas — then apply taste, context and intent to decide what belongs in the final experience.</p>
      </div>
    </section>
  );
}
