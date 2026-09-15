import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const faqs = [
  ['What does working with Vaelorstudio look like?', 'We start with context and direction, then move through design, build and refinement as one connected process. The goal is a clear system, not a collection of disconnected deliverables.'],
  ['How does the design process work?', 'We understand the problem, establish direction, explore the strongest ideas, prototype the experience and refine the system before it ships.'],
  ['What are the typical timelines for a project?', 'Timelines depend on scope and complexity. We plan the work in clear stages with milestones agreed up front.'],
  ['Which services can you help with?', 'Strategy, positioning, UX/UI, design systems, motion, frontend engineering, backend integration and product refinement can be combined around what the project actually needs.'],
  ['Do you work with existing brand guidelines?', 'Yes. We can extend an existing visual language or evolve it when the current system no longer supports the product or experience.'],
  ['Who will be my main point of contact?', 'You work directly with the studio throughout the project, keeping decisions, feedback and direction close to the work.'],
  ['How do you handle revisions?', 'Each stage has a defined review point. Feedback is gathered against the agreed direction so revisions improve the system rather than creating unnecessary loops.'],
  ['Do you offer ongoing support after launch?', 'Yes, when it makes sense for the project. We can continue with optimisation, new experiences, motion, feature work or product refinement.'],
  ['Do you also build websites, or just design them?', 'We can take a project from strategy and interface design through production frontend and integration, keeping the final experience faithful to the original direction.'],
  ['What tools do you use for design and development?', 'The stack follows the project. We choose tools for the right balance of speed, maintainability, performance and quality.'],
  ['What is your pricing structure?', 'Projects are scoped around the work involved rather than a fixed menu. Once we understand the brief, we define the scope, stages and investment clearly before work begins.'],
  ['Can I see more examples of your work?', 'Yes. The selected work above is a starting point, and we can share relevant examples based on the type of product, brand or experience you are looking to build.'],
];

export default function Footer() {
  const [open, setOpen] = useState<number | null>(null);
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="relative overflow-hidden border-t border-white/[.07] bg-[#080d0e] text-aer-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_35%,rgba(64,224,208,.05),transparent_26%),radial-gradient(circle_at_88%_75%,rgba(16,91,94,.14),transparent_32%)]" />
      <section id="faq" className="relative mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[.55fr_1.45fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-6 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[.32em] text-white/45"><span className="h-px w-7 bg-aer-blue/70" />Frequently asked questions</div>
            <h2 className="max-w-xl font-editorial text-6xl leading-[.84] tracking-[-.04em] md:text-8xl">Got<br /><span className="text-white/25">questions?</span></h2>
            <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">A few answers about how Vaelorstudio works, what we build and what to expect when we work together.</p>
          </div>
          <div className="border-t border-white/10">
            {faqs.map(([question, answer], index) => {
              const isOpen = open === index;
              return (
                <div key={question} className="border-b border-white/10">
                  <button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(isOpen ? null : index)} className="group flex w-full items-center justify-between gap-8 py-5 text-left md:py-6">
                    <span className="flex items-start gap-5"><span className="pt-1 text-[8px] tracking-[.25em] text-aer-blue/70">{String(index + 1).padStart(2, '0')}</span><span className="text-sm leading-6 text-white/75 transition-colors group-hover:text-white md:text-[15px]">{question}</span></span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/35 transition-all duration-300 group-hover:border-aer-blue/40 group-hover:text-aer-blue"><ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-aer-blue' : ''}`} /></span>
                  </button>
                  <div id={`faq-answer-${index}`} className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden"><p className="max-w-2xl pb-6 pl-10 text-xs leading-6 text-white/40 md:pl-[3.75rem]">{answer}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="relative mx-auto max-w-[1500px] border-t border-white/10 px-5 py-7 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a href="#top" className="font-editorial text-3xl tracking-[-.03em] transition-colors hover:text-aer-blue">AER × VÆLOR</a>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[8px] uppercase tracking-[.24em] text-white/30" aria-label="Footer navigation">
            <a href="#work" className="transition hover:text-aer-blue">Work</a><a href="#studio" className="transition hover:text-aer-blue">About</a><a href="#lab" className="transition hover:text-aer-blue">Playground</a><a href="#capabilities" className="transition hover:text-aer-blue">Capabilities</a><a href="#faq" className="transition hover:text-aer-blue">FAQ</a>
          </nav>
          <div className="flex items-center gap-4 text-[8px] uppercase tracking-[.24em] text-white/20 md:text-right"><a href="mailto:AlsanaAlgo@gmail.com?subject=AER%20×%20VÆLOR%20Project%20Inquiry" className="flex items-center gap-2 transition hover:text-aer-blue">Contact <ArrowUpRight size={12} /></a><span>© {year}</span></div>
        </div>
      </div>
    </footer>
  );
}
