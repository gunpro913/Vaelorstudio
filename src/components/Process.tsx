import { motion } from 'framer-motion';

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

function Step({ step, index }: { step: (typeof steps)[number]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative grid grid-cols-[48px_1fr] gap-5 border-t border-aer-cream/10 py-8 md:grid-cols-[72px_1fr_1fr] md:gap-8 md:py-10"
    >
      <div className="flex items-start pt-1">
        <span className="font-sans text-[10px] tracking-[0.2em] text-aer-blue/70">{step.id}</span>
      </div>

      <h3 className="font-editorial text-3xl uppercase leading-none tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-1 md:text-5xl">
        {step.title}
      </h3>

      <p className="col-start-2 max-w-md text-[11px] leading-6 tracking-[0.08em] text-aer-cream/45 transition-colors duration-500 group-hover:text-aer-cream/70 md:col-start-3 md:pt-1">
        {step.desc}
      </p>
    </motion.article>
  );
}

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-aer-black py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-16 grid gap-6 md:mb-24 md:grid-cols-[1fr_1fr] md:items-end"
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

        <div className="border-b border-aer-cream/10">
          {steps.map((step, index) => (
            <Step key={step.id} step={step} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex items-center justify-between pt-6"
        >
          <span className="text-[9px] tracking-[0.2em] text-aer-cream/25">05 / 05</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-aer-cream/25">Ready to ship</span>
        </motion.div>
      </div>
    </section>
  );
}
