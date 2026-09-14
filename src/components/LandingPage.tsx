import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, CircleArrowRight } from 'lucide-react';

const capabilities = [
  ['01', 'DIRECTION', 'Strategy, positioning and product vision.'],
  ['02', 'INTERFACE', 'UX, UI and systems that scale.'],
  ['03', 'MOTION', 'Interaction and animation with purpose.'],
  ['04', 'ENGINEERING', 'Frontend, backend and performance architecture.'],
];

const process = [
  ['01', 'DISCOVER', 'Uncover the signal.', 'What matters?', 'Research · Context · Opportunity'],
  ['02', 'DEFINE', 'Give it structure.', 'What are we solving?', 'Strategy · Scope · Direction'],
  ['03', 'DESIGN', 'Make the system visible.', 'How should it feel?', 'UX · UI · Prototyping'],
  ['04', 'BUILD', 'Turn intent into product.', 'How should it work?', 'Engineering · Integration · Performance'],
  ['05', 'REFINE', 'Make every detail count.', 'What can be better?', 'Testing · Motion · Optimisation'],
];

function SectionLabel({ children }: { children: string }) {
  return <div className="mb-6 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.32em] text-aer-cream/55"><span className="h-px w-7 bg-aer-blue/70" />{children}</div>;
}

function Signal({ className = '' }: { className?: string }) {
  return <span className={`inline-flex h-2 w-2 rounded-full bg-aer-blue shadow-[0_0_18px_rgba(64,224,208,.9)] ${className}`} />;
}

function ProjectVisual({ variant }: { variant: number }) {
  return (
    <div className="relative h-full min-h-[280px] overflow-hidden rounded-[22px] border border-white/10 bg-[#0d1112]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(235,250,255,.34),transparent_18%),radial-gradient(circle_at_25%_80%,rgba(64,224,208,.16),transparent_30%),linear-gradient(135deg,#050708,#101b20_55%,#070909)]" />
      <div className="absolute inset-8 rounded-[14px] border border-white/10 bg-black/35 shadow-[0_30px_80px_rgba(0,0,0,.55)] backdrop-blur-sm">
        {variant === 0 ? (
          <>
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-[7px] uppercase tracking-[.28em] text-white/45"><span>VELORA / SYSTEM</span><Signal /></div>
            <div className="flex h-[calc(100%-38px)] flex-col justify-end p-6"><div className="mb-3 text-[9px] uppercase tracking-[.25em] text-aer-blue">commerce / concept</div><div className="font-editorial text-5xl leading-[.88] text-white/90 md:text-7xl">Built for<br />movement.</div><div className="mt-8 h-px w-2/3 bg-white/15" /><div className="mt-3 flex gap-2"><span className="h-1 w-12 rounded bg-white/60" /><span className="h-1 w-5 rounded bg-aer-blue" /></div></div>
          </>
        ) : (
          <div className="absolute inset-0 p-5"><div className="flex justify-between text-[7px] uppercase tracking-[.25em] text-white/40"><span>{variant === 1 ? 'NIMBLE / BRAND' : 'FLUX / PRODUCT'}</span><span>CONCEPT</span></div><div className="absolute left-8 right-8 top-1/2 -translate-y-1/2"><div className="font-editorial text-4xl text-white/90">{variant === 1 ? 'Make room.' : 'See clearly.'}</div><div className="mt-5 grid grid-cols-3 gap-2"><span className="h-14 rounded border border-white/10 bg-white/[.03]" /><span className="h-14 rounded border border-aer-blue/30 bg-aer-blue/[.04]" /><span className="h-14 rounded border border-white/10 bg-white/[.03]" /></div></div></div>
        )}
      </div>
      <div className="absolute bottom-5 right-5 text-[8px] uppercase tracking-[.3em] text-white/35">AER / {String(variant + 1).padStart(2, '0')}</div>
    </div>
  );
}

function CapabilityRow({ num, title, text, delay, reduceMotion }: { num: string; title: string; text: string; delay: number; reduceMotion: boolean | null }) {
  return (
    <motion.a href="#contact" initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduceMotion ? 0.01 : 0.6, delay }} className="group grid gap-5 border-t border-white/10 py-7 md:grid-cols-[64px_1fr_auto] md:items-center md:py-9">
      <span className="text-[8px] tracking-[.28em] text-white/30">{num}</span>
      <div><div className="flex items-center gap-3"><h3 className="font-editorial text-4xl tracking-[-.02em] md:text-6xl">{title}</h3><Signal className="opacity-25 transition duration-300 group-hover:opacity-100" /></div><p className="mt-2 max-w-xl text-xs leading-6 text-white/40">{text}</p></div>
      <span className="flex items-center gap-3 text-[8px] uppercase tracking-[.25em] text-white/25 transition group-hover:text-aer-blue">Explore <ArrowUpRight size={14} /></span>
    </motion.a>
  );
}

function ProcessStage({ item, index, reduceMotion }: { item: string[]; index: number; reduceMotion: boolean | null }) {
  const [num, title, statement, question, disciplines] = item;
  return (
    <motion.article initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduceMotion ? 0.01 : 0.7, delay: index * 0.05 }} tabIndex={0} className="group relative border-t border-white/10 py-8 outline-none md:py-10">
      <div className="grid gap-6 md:grid-cols-[72px_1fr_190px] md:items-start">
        <div className="relative hidden h-full md:block"><span className="absolute left-[3px] top-2 h-2 w-2 rounded-full border border-aer-blue bg-[#0a0b0b] transition group-hover:bg-aer-blue group-focus-visible:bg-aer-blue" /><span className="absolute left-[6px] top-5 h-[calc(100%+44px)] w-px bg-white/10 last:hidden" /></div>
        <div className="md:-ml-12 md:pl-12">
          <div className="mb-3 flex items-center gap-3"><span className="text-[8px] tracking-[.28em] text-aer-blue">{num}</span><span className="text-[8px] uppercase tracking-[.3em] text-white/25">{disciplines}</span></div>
          <h3 className="font-editorial text-4xl leading-none tracking-[-.02em] transition group-hover:text-white md:text-6xl">{title}</h3>
          <p className="mt-4 max-w-xl font-editorial text-2xl leading-tight text-white/60 transition group-hover:text-white/80 md:text-3xl">{statement}</p>
        </div>
        <div className="border-l border-white/10 pl-5 md:pt-2"><div className="text-[8px] uppercase tracking-[.25em] text-white/25">The decision</div><p className="mt-3 text-xs leading-5 text-white/50 transition group-hover:text-aer-blue group-focus-visible:text-aer-blue">{question}</p></div>
      </div>
    </motion.article>
  );
}

export default function LandingPage() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({ initial: { opacity: 0, y: reduceMotion ? 0 : 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: reduceMotion ? 0.01 : 0.8, delay } });

  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0b0b] text-aer-cream selection:bg-aer-blue selection:text-black">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_75%_10%,rgba(64,224,208,.08),transparent_22%),radial-gradient(circle_at_10%_45%,rgba(255,255,255,.025),transparent_25%)]" />
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/[.06] bg-[#0a0b0b]/75 backdrop-blur-xl"><div className="mx-auto flex h-[74px] max-w-[1500px] items-center justify-between px-5 md:px-10"><a href="#top" className="text-[11px] font-medium tracking-[.3em] text-white">AER <span className="text-aer-blue">×</span> VÆLOR</a><nav className="hidden items-center gap-8 md:flex">{['WORK', 'CAPABILITIES', 'PROCESS', 'STUDIO', 'LAB'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-[8px] tracking-[.25em] text-white/55 transition-colors hover:text-white">{item}</a>)}</nav><a href="#contact" className="group flex items-center gap-3 rounded-full border border-white/20 px-4 py-2 text-[8px] uppercase tracking-[.22em] transition hover:border-aer-blue/70 hover:bg-aer-blue/10">Start a project <Signal /></a></div></header>

      <main id="top" className="relative z-10">
        <section className="relative flex min-h-screen items-end overflow-hidden border-b border-white/[.07] px-5 pb-16 pt-32 md:px-10 md:pb-24"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(120,210,225,.16),transparent_22%),radial-gradient(ellipse_at_82%_30%,rgba(255,255,255,.13),transparent_13%),linear-gradient(110deg,#0a0b0b_30%,#081215_62%,#0a0b0b)]" /><div className="absolute right-[13%] top-[13%] h-[48vw] w-[20vw] max-h-[640px] rounded-[50%_50%_6%_6%] border border-white/20 bg-black/20 shadow-[0_0_100px_rgba(64,224,208,.09)]" /><div className="absolute right-[14%] top-[16%] h-[42vw] w-[17vw] max-h-[560px] rounded-[50%_50%_3%_3%] bg-[radial-gradient(ellipse_at_70%_25%,rgba(255,255,255,.5),transparent_18%),linear-gradient(90deg,transparent,rgba(64,224,208,.08),transparent)] blur-[1px]" /><div className="absolute left-[7%] right-[7%] top-[24%] h-px bg-white/[.06]" /><div className="absolute bottom-[19%] left-[7%] right-[7%] h-px bg-white/[.06]" /><div className="relative mx-auto w-full max-w-[1500px]"><div className="grid items-end gap-12 md:grid-cols-[1.1fr_.55fr]"><div><SectionLabel>Digital studio / 001</SectionLabel><motion.h1 {...reveal()} className="max-w-5xl font-editorial text-[clamp(4.2rem,9.2vw,10rem)] leading-[.82] tracking-[-.045em]">Ideas, engineered<br /><span className="text-white/35">for what’s next.</span></motion.h1><motion.p {...reveal(.12)} className="mt-9 max-w-xl text-sm leading-7 text-white/55 md:text-base">AER × VÆLOR is a digital studio building intelligent experiences for ambitious brands. Strategy, design and technology — shaped into products that move.</motion.p><motion.a {...reveal(.2)} href="#work" className="mt-8 inline-flex items-center gap-4 rounded-full border border-white/20 px-5 py-3 text-[9px] uppercase tracking-[.28em] transition hover:border-aer-blue hover:bg-aer-blue hover:text-black">Explore our work <ArrowDownRight size={14} /></motion.a></div><div className="hidden pb-3 md:block"><div className="ml-auto max-w-[180px] border-l border-white/10 pl-5 text-[8px] uppercase leading-5 tracking-[.25em] text-white/35">Strategy<br />Design<br />Motion<br />Engineering<br /><span className="text-aer-blue">—</span><br />Systems that feel inevitable.</div></div></div><div className="mt-16 flex items-center justify-between text-[8px] uppercase tracking-[.25em] text-white/30"><span>Scroll to explore</span><span>01 / 07 <span className="ml-3 text-aer-blue">●</span></span></div></div></section>

        <section id="work" className="mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-36"><motion.div {...reveal()} className="mb-12 flex items-end justify-between gap-8"><div><SectionLabel>Selected directions / 002</SectionLabel><h2 className="max-w-3xl font-editorial text-5xl leading-[.9] tracking-[-.03em] md:text-7xl">Work with<br /><span className="text-white/35">a point of view.</span></h2></div><span className="hidden text-[8px] uppercase tracking-[.25em] text-white/35 md:block">Concepts / explorations</span></motion.div><div className="grid gap-3 md:grid-cols-[1.35fr_.65fr]"><motion.article {...reveal()} className="group min-h-[560px] overflow-hidden rounded-[26px] border border-white/10 bg-[#0e1111] p-3 transition duration-500 hover:-translate-y-1 hover:border-aer-blue/40"><div className="relative h-full min-h-[540px]"><ProjectVisual variant={0} /><div className="absolute inset-x-7 bottom-7 flex items-end justify-between gap-6"><div><div className="mb-3 text-[8px] uppercase tracking-[.25em] text-aer-blue">01 / Concept direction</div><h3 className="font-editorial text-4xl md:text-5xl">Velora</h3><p className="mt-2 max-w-md text-xs leading-5 text-white/45">A commerce system exploring speed, hierarchy and confident decision-making.</p></div><CircleArrowRight className="shrink-0 text-white/50 transition group-hover:text-aer-blue" /></div></div></motion.article><div className="grid gap-3"><motion.article {...reveal(.08)} className="group relative min-h-[278px] overflow-hidden rounded-[26px] border border-white/10 bg-[#0e1111] p-3 transition duration-500 hover:-translate-y-1 hover:border-aer-blue/40"><ProjectVisual variant={1} /><div className="absolute inset-x-8 bottom-7 flex items-end justify-between"><div><div className="mb-2 text-[8px] uppercase tracking-[.25em] text-aer-blue">02 / Brand / Experience</div><h3 className="font-editorial text-3xl">Nimble</h3></div><ArrowUpRight size={18} className="text-white/45 group-hover:text-aer-blue" /></div></motion.article><motion.article {...reveal(.16)} className="group relative min-h-[278px] overflow-hidden rounded-[26px] border border-white/10 bg-[#0e1111] p-3 transition duration-500 hover:-translate-y-1 hover:border-aer-blue/40"><ProjectVisual variant={2} /><div className="absolute inset-x-8 bottom-7 flex items-end justify-between"><div><div className="mb-2 text-[8px] uppercase tracking-[.25em] text-aer-blue">03 / Product / Interface</div><h3 className="font-editorial text-3xl">Flux</h3></div><ArrowUpRight size={18} className="text-white/45 group-hover:text-aer-blue" /></div></motion.article></div></div><div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-[8px] uppercase tracking-[.2em] text-white/20"><span>03 directions / 01 system</span><span>AER × VÆLOR</span></div></section>

        <section id="capabilities" className="border-y border-white/[.07] bg-[#0d1010] px-5 py-28 md:px-10 md:py-36"><div className="mx-auto max-w-[1500px]"><motion.div {...reveal()} className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><SectionLabel>Capabilities / 003</SectionLabel><h2 className="max-w-xl font-editorial text-6xl leading-[.86] tracking-[-.04em] md:text-8xl">What we<br /><span className="text-white/30">build.</span></h2></div><div className="flex max-w-xl items-end text-sm leading-7 text-white/40 lg:pb-3">Strategy, interface, motion and engineering — connected from the first idea to the final interaction.</div></motion.div><div className="mt-16 border-b border-white/10">{capabilities.map(([num, title, text], i) => <CapabilityRow key={num} num={num} title={title} text={text} delay={i * .06} reduceMotion={reduceMotion} />)}</div><motion.div {...reveal(.15)} className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[1fr_auto]"><div><p className="text-[9px] uppercase tracking-[.3em] text-aer-blue">The AER principle</p><h3 className="mt-5 max-w-3xl font-editorial text-5xl leading-[.9] md:text-7xl">One idea.<br />One system.<br /><span className="text-white/25">Every detail connected.</span></h3></div><div className="flex items-end"><div className="flex flex-wrap items-center gap-2 text-[8px] uppercase tracking-[.22em] text-white/30"><span>DIRECTION</span><span className="h-px w-8 bg-aer-blue/60" /><span>INTERFACE</span><span className="h-px w-8 bg-aer-blue/60" /><span>MOTION</span><span className="h-px w-8 bg-aer-blue/60" /><span>ENGINEERING</span></div></div></motion.div></div></section>

        <section id="process" className="mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-40">
          <div className="grid gap-16 lg:grid-cols-[.55fr_1.45fr]">
            <motion.div {...reveal()} className="lg:sticky lg:top-32 lg:self-start">
              <SectionLabel>Process / 004</SectionLabel>
              <h2 className="max-w-xl font-editorial text-6xl leading-[.84] tracking-[-.04em] md:text-8xl">From insight<br /><span className="text-white/25">to impact.</span></h2>
              <p className="mt-8 max-w-sm text-sm leading-7 text-white/40">We do not move from brief to pixels on autopilot. Each stage exists to make the next decision clearer.</p>
              <div className="mt-12 hidden border-l border-white/10 pl-5 lg:block"><div className="text-[8px] uppercase tracking-[.28em] text-aer-blue">AER / METHOD</div><div className="mt-3 text-xs leading-5 text-white/35">Five stages.<br />One connected system.</div></div>
            </motion.div>
            <div className="relative border-b border-white/10">
              {process.map((item, index) => <ProcessStage key={item[0]} item={item} index={index} reduceMotion={reduceMotion} />)}
              <motion.div {...reveal(.18)} className="grid gap-4 border-t border-aer-blue/20 py-12 md:grid-cols-[72px_1fr] md:py-16"><div className="hidden md:block"><Signal /></div><div><div className="text-[8px] uppercase tracking-[.3em] text-aer-blue">The outcome</div><p className="mt-5 max-w-2xl font-editorial text-4xl leading-[.92] text-white/80 md:text-6xl">Good work isn't a straight line.<br /><span className="text-white/30">It’s a series of better decisions.</span></p></div></motion.div>
            </div>
          </div>
        </section>

        <section id="studio" className="border-y border-white/[.07] bg-[#0d1010] px-5 py-28 md:px-10 md:py-36"><div className="mx-auto max-w-[1500px]"><motion.div {...reveal()} className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><SectionLabel>Studio / 005</SectionLabel><h2 className="font-editorial text-6xl leading-[.84] md:text-8xl">Design.<br />Build.<br /><span className="text-white/25">Evolve.</span></h2></div><div className="grid gap-8 md:grid-cols-2"><div className="border-t border-white/10 pt-5"><div className="text-[8px] tracking-[.25em] text-aer-blue">01 / CLARITY</div><p className="mt-5 text-sm leading-7 text-white/45">Remove the noise. Find the idea worth building.</p></div><div className="border-t border-white/10 pt-5"><div className="text-[8px] tracking-[.25em] text-aer-blue">02 / SYSTEMS</div><p className="mt-5 text-sm leading-7 text-white/45">Make every screen, state and interaction belong together.</p></div><div className="border-t border-white/10 pt-5 md:col-span-2"><div className="text-[8px] tracking-[.25em] text-aer-blue">03 / CRAFT</div><p className="mt-5 max-w-2xl font-editorial text-3xl leading-tight text-white/70 md:text-4xl">Details are not decoration. They are where the experience becomes believable.</p></div></div></motion.div></div></section>

        <section id="lab" className="mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-36"><motion.div {...reveal()} className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><SectionLabel>AER Lab / 006</SectionLabel><h2 className="font-editorial text-6xl leading-[.84] md:text-8xl">Human direction<br /><span className="text-white/25">× machine exploration.</span></h2></div><div className="grid gap-3 md:grid-cols-3"><div className="rounded-[22px] border border-white/10 p-6"><div className="text-[8px] text-aer-blue">01</div><h3 className="mt-14 font-editorial text-3xl">Explore</h3><p className="mt-3 text-xs leading-5 text-white/35">Generate possibilities quickly.</p></div><div className="rounded-[22px] border border-white/10 bg-white/[.02] p-6"><div className="text-[8px] text-aer-blue">02</div><h3 className="mt-14 font-editorial text-3xl">Direct</h3><p className="mt-3 text-xs leading-5 text-white/35">Choose what deserves attention.</p></div><div className="rounded-[22px] border border-white/10 p-6"><div className="text-[8px] text-aer-blue">03</div><h3 className="mt-14 font-editorial text-3xl">Refine</h3><p className="mt-3 text-xs leading-5 text-white/35">Turn the strongest idea into a system.</p></div></div></motion.div></section>

        <section id="contact" className="border-t border-white/[.07] px-5 py-32 md:px-10 md:py-44"><div className="mx-auto max-w-[1500px]"><motion.div {...reveal()} className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end"><div><SectionLabel>Start a project / 007</SectionLabel><h2 className="max-w-5xl font-editorial text-[clamp(4rem,9vw,9rem)] leading-[.8] tracking-[-.05em]">Let’s build<br /><span className="text-white/25">what comes next.</span></h2><p className="mt-9 max-w-xl text-sm leading-7 text-white/40">Have a product, brand or experience in mind? Tell us what you are trying to make. We will take it from there.</p></div><a href="mailto:yunusfawzan9@gmail.com?subject=AER%20×%20VÆLOR%20Project%20Inquiry" className="group inline-flex items-center gap-5 rounded-full border border-white/20 px-6 py-4 text-[9px] uppercase tracking-[.28em] transition hover:border-aer-blue hover:bg-aer-blue hover:text-black">Start the conversation <ArrowUpRight size={15} /></a></motion.div></div></section>
      </main>

      <footer className="border-t border-white/[.07] px-5 py-8 md:px-10"><div className="mx-auto flex max-w-[1500px] flex-col gap-5 text-[8px] uppercase tracking-[.25em] text-white/25 md:flex-row md:items-center md:justify-between"><span>AER × VÆLOR / DIGITAL STUDIO</span><span>Strategy · Design · Motion · Engineering</span><span>© 2026</span></div></footer>
    </div>
  );
}
