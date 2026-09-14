import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const stages = [
  ['01', 'EXPLORE', 'Expand possibilities quickly.'],
  ['02', 'DIRECT', 'Choose the direction with intent.'],
  ['03', 'REFINE', 'Edit, test, and sharpen the result.']
];

export default function AiApproach() {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  const x = useTransform(scrollYProgress, [0, 1], reducedMotion ? ['0%', '0%'] : ['3%', '-3%']);

  return (
    <section ref={containerRef} className="relative overflow-hidden border-t border-aer-cream/10 bg-aer-black px-6 py-24 md:px-12 md:py-32">
      <motion.div style={{ x }} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-editorial text-[18vw] uppercase leading-none text-aer-cream/[0.025]">
        HUMAN × MACHINE
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-aer-blue">STUDIO / AI APPROACH</p>
            <p className="mt-6 max-w-xs text-[10px] uppercase leading-relaxed tracking-[0.16em] text-aer-cream/40">
              Technology accelerates the work. Direction decides what survives.
            </p>
          </div>

          <div>
            <h2 className="max-w-4xl font-editorial text-4xl uppercase leading-[1.05] text-aer-cream md:text-6xl lg:text-7xl">
              Use the machine<br />
              <span className="italic text-aer-blue">without losing the taste.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-[11px] uppercase leading-[1.9] tracking-[0.12em] text-aer-cream/50">
              AI helps us research, explore, prototype, and iterate at speed. Human judgment sets the brief, makes the decisions, and pushes every output through a final layer of intent and craft.
            </p>

            <div className="mt-14 grid border-t border-aer-cream/10 md:grid-cols-3">
              {stages.map(([index, title, body], stageIndex) => (
                <motion.div
                  key={index}
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: stageIndex * 0.08 }}
                  className="border-b border-aer-cream/10 py-7 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                >
                  <span className="text-[9px] tracking-[0.2em] text-aer-cream/35">{index}</span>
                  <h3 className="mt-6 font-editorial text-xl uppercase text-aer-cream">{title}</h3>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-aer-cream/40">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
