import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    id: '01',
    title: 'DISCOVER',
    desc: 'We learn what you are building, who it is for, and what the experience needs to achieve.'
  },
  {
    id: '02',
    title: 'DEFINE',
    desc: 'We shape the structure, content priorities, and visual direction before anything is polished.'
  },
  {
    id: '03',
    title: 'DESIGN',
    desc: 'We turn the direction into a considered interface with clear hierarchy, interaction, and motion.'
  },
  {
    id: '04',
    title: 'BUILD',
    desc: 'We develop the experience with performance, responsiveness, and detail carried through to the final screen.'
  },
  {
    id: '05',
    title: 'REFINE',
    desc: 'We test, adjust, and polish until every part feels intentional and ready to ship.'
  }
];

function Step({
  step,
  index,
  progress
}: {
  step: (typeof steps)[number];
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const start = 0.08 + index * 0.16;
  const end = start + 0.12;
  const contentOpacity = useTransform(progress, [Math.max(0, start - 0.07), start, end], [0.32, 1, 0.72]);
  const nodeOpacity = useTransform(progress, [Math.max(0, start - 0.05), start, end], [0.45, 1, 0.82]);
  const nodeScale = useTransform(progress, [Math.max(0, start - 0.04), start, end], [1, 1.12, 1]);
  const glowOpacity = useTransform(progress, [Math.max(0, start - 0.035), start, Math.min(1, start + 0.045)], [0, 0.7, 0]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.65, delay: index * 0.035, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative grid grid-cols-[40px_1fr] gap-5 py-9 md:grid-cols-[1fr_48px_1fr] md:gap-8 md:py-11"
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
            className="pointer-events-none absolute -inset-2 rounded-full bg-aer-blue/15 blur-md"
          />
        </motion.span>
      </div>

      <motion.div style={{ opacity: contentOpacity }} className="col-start-2 md:col-start-3">
        <div className="flex items-baseline gap-3">
          <h3 className="font-editorial text-3xl uppercase leading-none tracking-[-0.02em] md:text-5xl">
            {step.title}
          </h3>
          <span className="text-[8px] tracking-[0.16em] text-aer-blue/55">{step.id}</span>
        </div>
        <p className="mt-3 max-w-md text-[10px] leading-6 tracking-[0.06em] text-aer-cream/40 md:text-[11px]">
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
  const destinationOpacity = useTransform(scrollYProgress, [0.86, 0.96, 1], [0.18, 0.7, 1]);
  const destinationGlow = useTransform(scrollYProgress, [0.93, 1], [0, 0.7]);

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
            className="pointer-events-none absolute left-[39px] top-0 w-px origin-top bg-aer-blue md:left-1/2 md:-translate-x-1/2"
          />

          <div>
            {steps.map((step, index) => (
              <Step key={step.id} step={step} index={index} progress={scrollYProgress} />
            ))}
          </div>

          <motion.div
            style={{ opacity: destinationOpacity }}
            className="relative z-10 flex flex-col items-center border-t border-aer-cream/10 py-14 text-center md:py-16"
          >
            <motion.span
              style={{ opacity: destinationGlow }}
              className="pointer-events-none absolute top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-aer-blue/15 blur-2xl"
            />
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-aer-cream/25 bg-aer-black">
              <span className="h-1.5 w-1.5 rounded-full bg-aer-blue" />
            </span>
            <h3 className="relative mt-6 font-editorial text-4xl uppercase leading-none tracking-[-0.02em] md:text-6xl">
              Your Website.
            </h3>
            <p className="relative mt-4 text-[9px] uppercase tracking-[0.2em] text-aer-cream/30">
              Built from the ground up.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
