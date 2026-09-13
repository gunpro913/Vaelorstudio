import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectTypes = [
  'DIGITAL PLATFORM',
  'E-COMMERCE',
  'BRAND IDENTITY',
  'CREATIVE DEVELOPMENT'
];

const timelines = ['ASAP', '2–4 WEEKS', '1–2 MONTHS', 'FLEXIBLE'];

export default function Contact() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('');
  const [timeline, setTimeline] = useState('');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const canContinue = step === 1 ? !!projectType : step === 2 ? !!timeline : !!details.trim();

  const next = () => {
    if (canContinue) setStep((current) => Math.min(current + 1, 4));
  };

  const back = () => setStep((current) => Math.max(current - 1, 1));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = `Project Inquiry: ${projectType}`;
    const body = [
      `Project type: ${projectType}`,
      `Timeline: ${timeline}`,
      `Project details: ${details}`,
      `Name: ${name || 'Not provided'}`,
      `Email: ${email || 'Not provided'}`
    ].join('\n\n');

    window.location.href = `mailto:yunusfawzan9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-aer-charcoal px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="mb-6 text-[10px] tracking-[0.3em] text-aer-blue">START A PROJECT</p>
            <h2 className="max-w-xl font-editorial text-6xl uppercase leading-[0.86] tracking-[-0.03em] md:text-8xl">
              Let&apos;s make
              <br />
              <span className="italic text-aer-cream/65">something</span>
              <br />
              matter.
            </h2>
            <p className="mt-8 max-w-sm text-[11px] leading-6 tracking-[0.07em] text-aer-cream/40">
              No long brief. Just tell us enough to start a useful conversation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="self-end"
          >
            <div className="mb-8 flex items-center justify-between border-b border-aer-cream/10 pb-4">
              <div className="flex items-center gap-4">
                <span className="text-[9px] tracking-[0.22em] text-aer-blue">INITIATE</span>
                <span className="text-[8px] tracking-[0.16em] text-aer-cream/25">PROJECT INQUIRY</span>
              </div>
              <span className="text-[9px] tracking-[0.18em] text-aer-cream/30">0{step} / 04</span>
            </div>

            <form onSubmit={submit}>
              <div className="min-h-[310px]">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step-1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                      <p className="mb-5 text-[9px] tracking-[0.2em] text-aer-cream/35">01 — WHAT ARE WE MAKING?</p>
                      <div className="border-t border-aer-cream/10">
                        {projectTypes.map((item, index) => {
                          const selected = projectType === item;
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => setProjectType(item)}
                              className="group relative flex w-full items-center justify-between border-b border-aer-cream/10 py-5 text-left md:py-6"
                            >
                              <span className={`font-editorial text-xl uppercase leading-none tracking-[-0.01em] transition-all duration-300 md:text-2xl ${selected ? 'italic text-aer-blue' : 'text-aer-cream/60 group-hover:text-aer-cream'}`}>
                                {item}
                              </span>
                              <span className={`text-[8px] tracking-[0.18em] transition-colors ${selected ? 'text-aer-blue' : 'text-aer-cream/20 group-hover:text-aer-blue/70'}`}>
                                0{index + 1}
                              </span>
                              {selected && <motion.span layoutId="project-selection" className="absolute bottom-[-1px] left-0 h-px w-full bg-aer-blue" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step-2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                      <p className="mb-5 text-[9px] tracking-[0.2em] text-aer-cream/35">02 — WHEN ARE YOU LOOKING TO MOVE?</p>
                      <div className="border-t border-aer-cream/10">
                        {timelines.map((item, index) => {
                          const selected = timeline === item;
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => setTimeline(item)}
                              className="group relative flex w-full items-center justify-between border-b border-aer-cream/10 py-6 text-left"
                            >
                              <span className={`font-editorial text-2xl uppercase transition-all duration-300 ${selected ? 'italic text-aer-blue' : 'text-aer-cream/60 group-hover:text-aer-cream'}`}>{item}</span>
                              <span className={`text-[8px] tracking-[0.18em] ${selected ? 'text-aer-blue' : 'text-aer-cream/20'}`}>0{index + 1}</span>
                              {selected && <motion.span layoutId="timeline-selection" className="absolute bottom-[-1px] left-0 h-px w-full bg-aer-blue" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step-3" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                      <p className="mb-5 text-[9px] tracking-[0.2em] text-aer-cream/35">03 — TELL US ABOUT IT</p>
                      <textarea
                        value={details}
                        onChange={(event) => setDetails(event.target.value)}
                        placeholder="What are you building? What should the website achieve? Anything useful to know."
                        rows={7}
                        className="w-full resize-none border-b border-aer-cream/15 bg-transparent py-4 text-[12px] leading-6 tracking-[0.04em] text-aer-cream outline-none placeholder:text-aer-cream/20 focus:border-aer-blue"
                      />
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div key="step-4" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                      <p className="mb-5 text-[9px] tracking-[0.2em] text-aer-cream/35">04 — WHERE SHOULD WE REACH YOU?</p>
                      <div className="border-t border-aer-cream/10">
                        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="YOUR NAME" className="w-full border-b border-aer-cream/10 bg-transparent py-5 text-[11px] tracking-[0.14em] text-aer-cream outline-none placeholder:text-aer-cream/20 focus:border-aer-blue" />
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="YOUR EMAIL" className="w-full border-b border-aer-cream/10 bg-transparent py-5 text-[11px] tracking-[0.14em] text-aer-cream outline-none placeholder:text-aer-cream/20 focus:border-aer-blue" />
                      </div>
                      <p className="mt-5 text-[9px] leading-5 tracking-[0.08em] text-aer-cream/25">We&apos;ll open your email client with everything you entered. Nothing is stored on the site.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-aer-cream/10 pt-5">
                <button type="button" onClick={back} disabled={step === 1} className="text-[9px] uppercase tracking-[0.2em] text-aer-cream/25 transition-colors hover:text-aer-cream disabled:pointer-events-none disabled:opacity-0">
                  ← Back
                </button>

                {step < 4 ? (
                  <button type="button" onClick={next} disabled={!canContinue} className="border border-aer-cream/15 px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-aer-cream transition-all duration-300 hover:border-aer-blue hover:bg-aer-blue hover:text-aer-charcoal disabled:pointer-events-none disabled:opacity-20">
                    Continue →
                  </button>
                ) : (
                  <button type="submit" className="border border-aer-cream/15 px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-aer-cream transition-all duration-300 hover:border-aer-blue hover:bg-aer-blue hover:text-aer-charcoal">
                    Send inquiry ↗
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        <div className="mt-24 flex items-end justify-between border-t border-aer-cream/10 pt-5 text-[8px] uppercase tracking-[0.2em] text-aer-cream/20 md:mt-32">
          <span>AER × VÆLOR</span>
          <span>BUILD SOMETHING WORTH VISITING.</span>
        </div>
      </div>
    </section>
  );
}
