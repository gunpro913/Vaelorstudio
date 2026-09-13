import { useState } from 'react';
import { motion } from 'framer-motion';

const inquiries = [
  'DIGITAL PLATFORM',
  'E-COMMERCE',
  'BRAND IDENTITY',
  'CREATIVE DEVELOPMENT'
];

export default function Contact() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedType = selectedIndex !== null ? inquiries[selectedIndex] : null;
  const subject = selectedType ? `Project Inquiry: ${selectedType}` : 'Project Inquiry';

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-aer-charcoal px-6 py-28 md:px-12 md:py-40"
    >
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
              Tell us what you are building. We&apos;ll figure out the right direction from there.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="self-end"
          >
            <div className="mb-5 flex items-center justify-between border-b border-aer-cream/10 pb-4">
              <span className="text-[9px] tracking-[0.22em] text-aer-cream/35">WHAT ARE WE MAKING?</span>
              <span className="text-[9px] tracking-[0.18em] text-aer-blue/60">
                {selectedIndex !== null ? `0${selectedIndex + 1} / 04` : 'SELECT ONE'}
              </span>
            </div>

            <div className="border-t border-aer-cream/10">
              {inquiries.map((item, index) => {
                const selected = selectedIndex === index;

                return (
                  <motion.button
                    key={item}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.25 }}
                    className="group relative flex w-full items-center justify-between border-b border-aer-cream/10 py-5 text-left md:py-6"
                  >
                    <span
                      className={`font-editorial text-xl uppercase leading-none tracking-[-0.01em] transition-colors duration-300 md:text-2xl ${
                        selected ? 'italic text-aer-blue' : 'text-aer-cream/65 group-hover:text-aer-cream'
                      }`}
                    >
                      {item}
                    </span>
                    <span
                      className={`ml-6 text-[8px] tracking-[0.18em] transition-colors duration-300 ${
                        selected ? 'text-aer-blue' : 'text-aer-cream/20 group-hover:text-aer-blue/70'
                      }`}
                    >
                      {selected ? 'SELECTED' : `0${index + 1}`}
                    </span>
                    {selected && (
                      <motion.span
                        layoutId="contact-line"
                        className="absolute bottom-[-1px] left-0 h-px w-full bg-aer-blue"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              initial={false}
              animate={{
                opacity: selectedIndex !== null ? 1 : 0,
                y: selectedIndex !== null ? 0 : 8
              }}
              transition={{ duration: 0.35 }}
              className="mt-8 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-[8px] tracking-[0.2em] text-aer-cream/25">READY WHEN YOU ARE</p>
                <p className="mt-2 text-[10px] tracking-[0.06em] text-aer-cream/45">
                  {selectedType ? `Starting with ${selectedType.toLowerCase()}.` : ''}
                </p>
              </div>

              <a
                href={`mailto:yunusfawzan9@gmail.com?subject=${encodeURIComponent(subject)}`}
                className="inline-flex items-center border border-aer-cream/20 px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-aer-cream transition-all duration-300 hover:border-aer-blue hover:bg-aer-blue hover:text-aer-charcoal"
              >
                Start the conversation ↗
              </a>
            </motion.div>
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
