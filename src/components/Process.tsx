import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { id: '01', title: 'DISCOVER', desc: 'We learn what you are building, who it is for, and what the experience needs to achieve.' },
  { id: '02', title: 'DEFINE', desc: 'We shape the structure, content priorities, and visual direction before anything is polished.' },
  { id: '03', title: 'DESIGN', desc: 'We turn the direction into a considered interface with clear hierarchy, interaction, and motion.' },
  { id: '04', title: 'BUILD', desc: 'We develop the experience with performance, responsiveness, and detail carried through to the final screen.' },
  { id: '05', title: 'REFINE', desc: 'We test, adjust, and polish until every part feels intentional and ready to ship.' }
];

function Step({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const stepRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ['start 82%', 'start 18%']
  });

  // The stage is brightest when it passes the visual center of the viewport,
  // rather than when the whole section happens to be at a particular progress value.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.38, 1, 0.58]);
  const nodeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.48, 1, 0.7]);
  const nodeScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.06, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.28, 0.5, 0.72], [0, 0.32, 0]);

  return (
    <motion.article
      ref={stepRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.55, delay: index * 0.025, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative grid grid-cols-[40px_1fr] gap-5 py-9 md:grid-cols-[1fr_48px_1fr] md:gap-8 md:py-11"
    >
      <div className="hidden md:block" />

      <div className="relative z-10 flex items-start justify-center pt-0.5">
        <motion.span
          style={{ opacity: nodeOpacity, scale: nodeScale }}
          className="relative flex h-6 w-6 items-center justify-center rounded-full border border-aer-cream/20 bg-aer-black font-sans text-[7px] tracking-[0.1em] text-aer-cream/55 md:h-7 md:w-7"
        >
          {step.id}
          <motion.span
            style={{ opacity: glowOpacity }}
            className="pointer-events-none absolute -inset-1.5 rounded-full bg-aer-blue/20 blur-sm"
          />
        </motion.span>
      </div>

      <motion.div style={{ opacity: contentOpacity }} className="col-start-2 md:col-start-3">
        <h3 className="font-editorial text-3xl uppercase leading-none tracking-[-0.02em] md:text-5xl">
          {step.title}
        </h3>
        <p className="mt-3 max-w-md text-[10px] leading-6 tracking-[0.06em] text-aer-cream/45 md:text-[11px]">
          {step.desc}
        </p>
      </motion.div>
    </motion.article>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const destinationOpacity = useTransform(scrollYProgress, [0.84, 0.95, 1], [0.35, 0.8, 1]);

  return (
    <section ref={containerRef} id="process" className="relative overflow-hidden bg-aer-black py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[1fr_1fr] md:items-end"
        >
          <div>
            <p className="mb-5 text-[10px] tracking-[0.25em] text-aer-blue">PROCESS</p>
            <h2 className="font-editorial text-5xl uppercase leading-[0.9] tracking-[-0.025em] md:text-7xl">
              From idea<br />to interface.
            </h2>
          </div>
          <p className="max-w-sm text-[11px] leading-6 tracking-[0.08em] text-aer-cream/40 md:justify-self-end">
            A focused process built around clarity, craft, and meaningful decisions — not unnecessary steps.
          </p>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute bottom-0 left-[39px] top-0 w-px bg-aer-cream/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="pointer-events-none absolute left-[39px] top-0 w-px origin-top bg-aer-blue/80 md:left-1/2 md:-translate-x-1/2"
          />

          {steps.map((step, index) => (
            <Step key={step.id} step={step} index={index} />
          ))}

          <motion.div
            style={{ opacity: destinationOpacity }}
            className="relative z-10 grid grid-cols-[40px_1fr] gap-5 border-t border-aer-cream/10 py-12 md:grid-cols-[1fr_48px_1fr] md:gap-8 md:py-14"
          >
            <div className="hidden md:block" />
            <div className="flex items-start justify-center pt-0.5">
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-aer-cream/25 bg-aer-black md:h-7 md:w-7">
                <span className="h-1.5 w-1.5 rounded-full bg-aer-blue" />
              </span>
            </div>
            <div className="col-start-2 md:col-start-3">
              <h3 className="font-editorial text-4xl uppercase leading-none tracking-[-0.02em] md:text-6xl">
                Your Website.
              </h3>
              <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-aer-cream/30">
                Built from the ground up.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
