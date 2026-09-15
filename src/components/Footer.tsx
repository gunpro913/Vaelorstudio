import { ArrowUpRight, Mail } from 'lucide-react';

const footerLinks = [
  {
    title: 'EXPLORE',
    links: [
      { label: 'Work', href: '#work' },
      { label: 'About', href: '#studio' },
      { label: 'Playground', href: '#lab' },
      { label: 'Capabilities', href: '#capabilities' },
    ],
  },
  {
    title: 'CONNECT',
    links: [
      { label: 'Email', href: 'mailto:AlsanaAlgo@gmail.com' },
      { label: 'Start a project', href: 'mailto:AlsanaAlgo@gmail.com?subject=Project%20Inquiry' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden px-4 pb-5 pt-8 text-aer-cream md:px-8 md:pb-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#050b0c] px-6 py-20 text-center shadow-[0_30px_80px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.05)] md:rounded-[2.5rem] md:px-10 md:py-28">
          <div className="pointer-events-none absolute inset-x-0 -top-1/2 h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(64,224,208,0.17),rgba(64,224,208,0.04)_28%,transparent_58%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.48)_80%)]" />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
            <p className="mb-6 text-[9px] font-medium tracking-[0.32em] text-aer-blue/75">05 — CONTACT</p>
            <h2 className="font-editorial text-4xl uppercase leading-[0.92] tracking-[-0.025em] text-aer-cream sm:text-5xl md:text-7xl lg:text-[5.75rem]">
              MAKE SOMETHING
              <br />
              WORTH <span className="italic text-aer-blue">EXPERIENCING.</span>
            </h2>
            <p className="mt-7 max-w-md text-xs leading-6 text-aer-cream/45 md:text-sm">
              Digital experiences built with intention, clarity, and a little bit of obsession.
            </p>
            <a
              href="mailto:AlsanaAlgo@gmail.com?subject=Project%20Inquiry"
              className="group mt-9 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white px-5 py-3 text-[10px] font-semibold tracking-[0.16em] text-[#071011] transition-all duration-300 hover:-translate-y-0.5 hover:bg-aer-blue hover:shadow-[0_12px_36px_rgba(64,224,208,0.2)]"
            >
              START A PROJECT
              <ArrowUpRight size={14} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </section>

        <section className="mt-3 rounded-[1.75rem] border border-white/[0.1] bg-[#0b1516]/78 px-6 py-9 shadow-[0_18px_55px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl md:mt-4 md:rounded-[2rem] md:px-10 md:py-10 lg:px-12">
          <div className="grid gap-12 md:grid-cols-[1.25fr_1fr] lg:grid-cols-[1.6fr_1fr]">
            <div>
              <a href="#top" className="group inline-flex items-center gap-3" aria-label="Back to top">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-aer-cream text-[#071011] transition-transform duration-300 group-hover:scale-105">
                  <span className="font-editorial text-[24px] font-semibold leading-none">A</span>
                </span>
                <span className="text-[11px] font-semibold tracking-[0.22em] text-aer-cream/85">AER × VÆLOR</span>
              </a>

              <p className="mt-6 max-w-sm text-[11px] leading-5 text-aer-cream/38">
                Independent digital design and creative development for brands that care how things feel.
              </p>

              <a
                href="mailto:AlsanaAlgo@gmail.com"
                className="mt-5 inline-flex items-center gap-2 text-[10px] tracking-[0.12em] text-aer-cream/62 transition-colors duration-300 hover:text-aer-blue"
              >
                <Mail size={13} strokeWidth={1.7} />
                AlsanaAlgo@gmail.com
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
              {footerLinks.map((group) => (
                <div key={group.title}>
                  <p className="mb-5 text-[9px] font-medium tracking-[0.24em] text-aer-cream/32">{group.title}</p>
                  <div className="flex flex-col items-start gap-3">
                    {group.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="text-[10px] tracking-[0.05em] text-aer-cream/62 transition-colors duration-300 hover:text-aer-blue"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-white/[0.08] pt-5">
            <div className="flex flex-col gap-3 text-[9px] tracking-[0.14em] text-aer-cream/25 sm:flex-row sm:items-center sm:justify-between">
              <p>© {year} AER × VÆLOR</p>
              <div className="flex gap-5">
                <span>ALL RIGHTS RESERVED</span>
                <a href="#top" className="transition-colors hover:text-aer-cream/60">BACK TO TOP ↑</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
