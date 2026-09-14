import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, CircleArrowUpRight } from 'lucide-react';

const projects = [
  { index: '01', type: 'COMMERCE / SYSTEMS', title: 'Velora', text: 'A commerce experience engineered around clarity, confidence and conversion.', tag: 'CONCEPT / EXPLORATION' },
  { index: '02', type: 'BRAND / EXPERIENCE', title: 'Nimble', text: 'A sharper digital identity for a new generation of creators.', tag: 'CONCEPT / EXPLORATION' },
  { index: '03', type: 'PRODUCT / INTERFACE', title: 'Flux', text: 'A product system for real-time insight and decisive action.', tag: 'CONCEPT / EXPLORATION' },
];

const capabilities = [
  ['01', 'DIRECTION', 'Strategy, positioning and product vision.'],
  ['02', 'INTERFACE', 'UX, UI and systems that scale.'],
  ['03', 'MOTION', 'Interaction and animation with purpose.'],
  ['04', 'ENGINEERING', 'Frontend, backend and performance architecture.'],
];

const process = [
  ['01', 'DISCOVER', 'Understand the problem, audience and opportunity.'],
  ['02', 'DEFINE', 'Shape the strategy, scope and system.'],
  ['03', 'DESIGN', 'Turn ideas into a usable visual language.'],
  ['04', 'BUILD', 'Bring it to life with precision.'],
  ['05', 'REFINE', 'Polish, test and optimise for scale.'],
];

function SectionLabel({ children }: { children: string }) {
  return <div className="mb-6 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.32em] text-aer-cream/55"><span className="h-px w-7 bg-aer-blue/70" />{children}</div>;
}

function Signal({ className = '' }: { className?: string }) {
  return <span className={`inline-flex h-2 w-2 rounded-full bg-aer-blue shadow-[0_0_18px_rgba(64,224,208,.9)] ${className}`} />;
}

function ProjectVisual({ variant }: { variant: number }) {
  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-[22px] border border-white/10 bg-[#0b0f10]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(235,250,255,.28),transparent_18%),radial-gradient(circle_at_25%_80%,rgba(64,224,208,.14),transparent_30%),linear-gradient(135deg,#050708,#10191d_55%,#070909)]" />
      <div className="absolute left-[8%] right-[8%] top-[12%] h-px bg-white/[.08]" />
      <div className="absolute bottom-[12%] left-[8%] right-[8%] h-px bg-white/[.08]" />
      <div className="absolute bottom-[8%] left-[8%] top-[12%] w-px bg-white/[.05]" />
      <div className="absolute bottom-[8%] right-[8%] top-[12%] w-px bg-white/[.05]" />
      <div className="absolute inset-7 rounded-[16px] border border-white/10 bg-black/30 shadow-[0_30px_80px_rgba(0,0,0,.55)] backdrop-blur-sm md:inset-10">
        {variant === 0 ? (
          <>
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-[7px] uppercase tracking-[.28em] text-white/45"><span>VELORA / SYSTEM</span><span><Signal /></span></div>
            <div className="flex h-[calc(100%-38px)] flex-col justify-end p-6"><div className="mb-3 text-[9px] uppercase tracking-[.25em] text-aer-blue">commerce / 001</div><div className="font-editorial text-5xl leading-[.88] text-white/90 md:text-7xl">Built for<br />movement.</div><div className="mt-8 h-px w-2/3 bg-white/15" /><div className="mt-3 flex gap-2"><span className="h-1 w-12 rounded bg-white/60" /><span className="h-1 w-5 rounded bg-aer-blue" /></div></div>
          </>
        ) : variant === 1 ? (
          <div className="absolute inset-0 p-6 md:p-8"><div className="flex justify-between text-[7px] uppercase tracking-[.25em] text-white/40"><span>NIMBLE / BRAND</span><span>02</span></div><div className="absolute left-8 right-8 top-1/2 -translate-y-1/2"><div className="font-editorial text-5xl text-white/90 md:text-6xl">Make room.</div><div className="mt-6 flex items-end gap-2"><span className="h-20 w-1/2 border border-white/10 bg-white/[.025]" /><span className="h-12 w-1/4 border border-aer-blue/30 bg-aer-blue/[.04]" /><span className="h-8 flex-1 border border-white/10 bg-white/[.03]" /></div></div></div>
        ) : (
          <div className="absolute inset-0 p-6 md:p-8"><div className="flex justify-between text-[7px] uppercase tracking-[.25em] text-white/40"><span>FLUX / PRODUCT</span><span>03</span></div><div className="absolute inset-x-8 top-1/2 -translate-y-1/2"><div className="font-editorial text-5xl text-white/90 md:text-6xl">See clearly.</div><div className="mt-6 grid grid-cols-3 gap-2"><span className="h-16 rounded border border-white/10 bg-white/[.03]" /><span className="h-24 rounded border border-aer-blue/30 bg-aer-blue/[.04]" /><span className="h-12 rounded border border-white/10 bg-white/[.03]" /></div></div></div>
        )}
      </div>
      <div className="absolute bottom-5 right-5 text-[8px] uppercase tracking-[.3em] text-white/35">AER / {String(variant + 1).padStart(2, '0')}</div>
    </div>
  );
}

function ProjectSpecimen({ project, index, reduceMotion }: { project: typeof projects[number]; index: number; reduceMotion: boolean | null }) {
  const reverse = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.75, delay: reduceMotion ? 0 : index * 0.06 }}
      className="group border-t border-white/10 py-12 md:py-16"
    >
      <div className={`grid items-center gap-8 md:gap-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,.6fr)] ${reverse ? 'lg:[&>div:first-child]:order-2' : ''}`}>
        <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0b0f10] p-2 md:p-3 transition-transform duration-700 ease-out group-hover:-translate-y-1">
          <ProjectVisual variant={index} />
          <div className="pointer-events-none absolute inset-2 rounded-[24px] border border-transparent transition-colors duration-500 group-hover:border-aer-blue/35 md:inset-3 md:rounded-[23px]" />
        </div>
        <div className={reverse ? 'lg:text-right' : ''}>
          <div className={`mb-7 flex items-center gap-3 text-[8px] uppercase tracking-[.28em] text-white/30 ${reverse ? 'lg:justify-end' : ''}`}><span className="text-aer-blue">{project.index}</span><span>{project.tag}</span></div>
          <h3 className="font-editorial text-5xl uppercase leading-[.84] tracking-[-.035em] text-aer-cream md:text-6xl">{project.title}</h3>
          <p className={`mt-6 max-w-sm text-xs leading-6 text-white/45 ${reverse ? 'lg:ml-auto' : ''}`}>{project.text}</p>
          <div className={`mt-8 flex items-center gap-3 text-[8px] uppercase tracking-[.25em] text-aer-blue ${reverse ? 'lg:justify-end' : ''}`}><span>Explore direction</span><ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
        </div>
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

        <section id="work" className="relative mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-36">
          <motion.div {...reveal()} className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-[1fr_.4fr] md:items-end md:pb-14">
            <div><SectionLabel>Selected directions / 002</SectionLabel><h2 className="max-w-4xl font-editorial text-6xl leading-[.84] tracking-[-.045em] md:text-8xl lg:text-9xl">Work with<br /><span className="text-white/30">a point of view.</span></h2></div>
            <div className="max-w-xs md:justify-self-end"><p className="text-xs leading-6 text-white/40">Concepts, systems and digital directions. Built as explorations of how AER thinks, shapes and ships.</p><div className="mt-5 flex items-center gap-3 text-[8px] uppercase tracking-[.24em] text-white/25"><span>03 specimens</span><span className="h-px w-8 bg-aer-blue/60" /><span>2026</span></div></div>
          </motion.div>
          <div>
            {projects.map((project, index) => <ProjectSpecimen key={project.title} project={project} index={index} reduceMotion={reduceMotion} />)}
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-5 text-[8px] uppercase tracking-[.22em] text-white/25"><span>Selected directions / 03</span><span className="text-aer-blue">AER × VÆLOR</span></div>
        </section>

        <section id="capabilities" className="border-y border-white/[.07] bg-[#0d1010] px-5 py-28 md:px-10 md:py-36"><div className="mx-auto max-w-[1500px]"><motion.div {...reveal()} className="mb-12 flex items-end justify-between"><div><SectionLabel>Capabilities / 003</SectionLabel><h2 className="font-editorial text-6xl tracking-[-.04em] md:text-8xl">What we make.</h2></div><span className="hidden text-[8px] uppercase tracking-[.25em] text-white/30 md:block">The AER system</span></motion.div><div className="grid border border-white/10 md:grid-cols-4">{capabilities.map(([num, title, text], i) => <motion.a {...reveal(i * .06)} href="#contact" key={num} className="group min-h-[300px] border-b border-white/10 p-7 transition hover:bg-white/[.025] md:border-b-0 md:border-r md:last:border-r-0"><div className="flex justify-between text-[8px] tracking-[.25em] text-white/35"><span>{num}</span><Signal className="opacity-30 transition group-hover:opacity-100" /></div><h3 className="mt-20 text-sm tracking-[.22em]">{title}</h3><p className="mt-4 max-w-[220px] text-xs leading-5 text-white/40">{text}</p><div className="mt-14 text-[8px] uppercase tracking-[.25em] text-aer-blue opacity-0 transition group-hover:opacity-100">Explore ↗</div></motion.a>)}</div></div></section>

        <section id="process" className="mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-36"><div className="grid gap-16 lg:grid-cols-[.55fr_1fr]"><motion.div {...reveal()} className="lg:sticky lg:top-32 lg:self-start"><SectionLabel>Our process / 004</SectionLabel><h2 className="max-w-md font-editorial text-6xl leading-[.9] tracking-[-.04em] md:text-8xl">From insight<br /><span className="text-white/35">to impact.</span></h2><p className="mt-8 max-w-sm text-sm leading-6 text-white/40">A structured process built for better outcomes. Every stage earns the next.</p></motion.div><div className="space-y-3">{process.map(([num, title, text], i) => <motion.article {...reveal(i * .05)} key={num} className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0d1010] p-7 md:min-h-[220px] md:p-9"><div className="absolute right-8 top-8 text-[8px] tracking-[.25em] text-white/30">{num}</div><div className="max-w-lg"><div className="text-[9px] uppercase tracking-[.3em] text-aer-blue">{title}</div><h3 className="mt-7 font-editorial text-4xl md:text-5xl">{title === 'DISCOVER' ? 'Uncover the signal.' : title === 'DEFINE' ? 'Give it structure.' : title === 'DESIGN' ? 'Make the system visible.' : title === 'BUILD' ? 'Turn intent into product.' : 'Make every detail count.'}</h3><p className="mt-4 text-xs leading-6 text-white/40">{text}</p></div><div className="absolute bottom-0 left-0 h-px w-0 bg-aer-blue transition-all duration-500 group-hover:w-full" /></motion.article>)}</div></div></section>

        <section id="studio" className="border-y border-white/[.07] bg-[#0d1010] px-5 py-28 md:px-10 md:py-36"><div className="mx-auto max-w-[1500px]"><SectionLabel>Our studio / 005</SectionLabel><div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]"><motion.h2 {...reveal()} className="font-editorial text-7xl leading-[.82] tracking-[-.045em] md:text-[9rem]">Design.<br />Build.<br /><span className="text-white/30">Evolve.</span></motion.h2><motion.div {...reveal(.1)} className="grid content-end gap-10"><p className="max-w-xl text-lg leading-8 text-white/55">We’re a small, focused team of designers and engineers. We believe in clarity, craftsmanship and systems that last.</p><div className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-7 text-[9px] uppercase tracking-[.25em] text-white/35"><span>Typography / Editorial</span><span>Motion / Restrained</span><span>Color / Signal</span><span>Structure / Systemic</span><span>Detail / Intentional</span><span>Code / Precise</span></div></motion.div></div></div></section>

        <section id="lab" className="mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-36"><div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_85%_50%,rgba(64,224,208,.1),transparent_25%),#0d1010] p-7 md:p-12"><div className="grid items-center gap-12 lg:grid-cols-[.9fr_.8fr_.7fr]"><motion.div {...reveal()}><SectionLabel>AER LAB / 006</SectionLabel><h2 className="font-editorial text-6xl leading-[.86] md:text-8xl">Human direction<br /><span className="text-white/30">× machine exploration.</span></h2></motion.div><motion.p {...reveal(.1)} className="max-w-sm text-sm leading-7 text-white/45">We use AI as a creative and engineering accelerator — not a replacement. It helps us explore faster, reason smarter and push beyond the obvious.</motion.p><motion.div {...reveal(.2)} className="flex items-center justify-center gap-2"><div className="grid h-24 w-24 place-items-center rounded-full border border-white/15 text-[8px] uppercase tracking-[.2em]">Explore</div><ArrowUpRight size={14} className="text-aer-blue" /><div className="grid h-24 w-24 place-items-center rounded-full border border-aer-blue/50 bg-aer-blue/10 text-[8px] uppercase tracking-[.2em] shadow-[0_0_40px_rgba(64,224,208,.1)]">Direct</div><ArrowUpRight size={14} className="text-aer-blue" /><div className="grid h-24 w-24 place-items-center rounded-full border border-white/15 text-[8px] uppercase tracking-[.2em]">Refine</div></motion.div></div></div></section>

        <section id="contact" className="relative overflow-hidden border-t border-white/[.07] px-5 py-32 md:px-10 md:py-44"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_105%,rgba(64,224,208,.18),transparent_30%),linear-gradient(#0a0b0b,#081011)]" /><div className="relative mx-auto flex max-w-[1500px] items-end justify-between gap-10"><div><SectionLabel>Let’s build / 007</SectionLabel><h2 className="max-w-4xl font-editorial text-7xl leading-[.82] tracking-[-.04em] md:text-[9rem]">Have a project<br /><span className="text-white/30">in mind?</span></h2><p className="mt-8 max-w-lg text-sm text-white/45">Tell us what you’re building. We’ll bring the right questions, systems and craft.</p></div><a href="mailto:yunusfawzan9@gmail.com" className="group hidden shrink-0 items-center gap-4 rounded-full border border-white/20 px-6 py-4 text-[9px] uppercase tracking-[.25em] transition hover:border-aer-blue hover:bg-aer-blue hover:text-black md:flex">Start a project <CircleArrowUpRight size={16} /></a></div><a href="mailto:yunusfawzan9@gmail.com" className="relative mt-10 flex w-fit items-center gap-3 rounded-full border border-white/20 px-5 py-3 text-[9px] uppercase tracking-[.25em] md:hidden">Start a project <CircleArrowUpRight size={15} /></a></section>
      </main>
      <footer className="relative z-10 border-t border-white/[.07] px-5 py-7 md:px-10"><div className="mx-auto flex max-w-[1500px] flex-col gap-5 text-[8px] uppercase tracking-[.25em] text-white/30 md:flex-row md:items-center md:justify-between"><span>AER × VÆLOR — 2026</span><span>Digital studio / Colombo</span><span>LinkedIn <span aria-hidden="true">×</span> Email</span></div></footer>
    </div>
  );
}
