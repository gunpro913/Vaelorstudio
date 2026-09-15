import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

const footerLinks = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#studio' },
  { label: 'PLAYGROUND', href: '#lab' },
  { label: 'CAPABILITIES', href: '#capabilities' },
];

export default function Footer() {
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const year = new Date().getFullYear();

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPointer({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <footer className="relative overflow-hidden px-3 pb-3 pt-10 text-aer-cream md:px-5 md:pb-5 lg:px-7">
      <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#030909] shadow-[0_35px_100px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] md:rounded-[2.75rem]">
        {/* A living light field: the footer subtly follows the visitor instead of behaving like a static block. */}
        <div
          className="pointer-events-none absolute inset-0 opacity-80 transition-[background] duration-700 ease-out"
          style={{
            background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(64,224,208,0.16) 0%, rgba(64,224,208,0.045) 15%, transparent 38%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(64,224,208,0.10),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.025)_48%,transparent_52%)]" />

        <div className="relative min-h-[720px] px-6 py-7 md:min-h-[820px] md:px-10 md:py-10 lg:px-14">
          <div className="flex items-start justify-between text-[9px] font-medium tracking-[0.28em] text-aer-cream/38">
            <span>05 / CONTACT</span>
            <span className="hidden md:block">AER × VÆLOR — DIGITAL STUDIO</span>
            <a href="#top" className="transition-colors hover:text-aer-blue">RETURN ↑</a>
          </div>

          {/* The main idea: typography becomes the architecture of the footer. */}
          <div className="relative flex min-h-[610px] flex-col justify-between py-20 md:min-h-[690px] md:py-24">
            <div className="relative z-10 max-w-4xl">
              <p className="mb-7 text-[9px] font-medium uppercase tracking-[0.35em] text-aer-blue/80">
                THE NEXT THING STARTS HERE
              </p>
              <h2 className="font-editorial text-[clamp(3.5rem,10vw,9.5rem)] uppercase leading-[0.78] tracking-[-0.045em]">
                Let&apos;s make
                <br />
                <span className="relative inline-block text-aer-cream">
                  <span className="italic text-aer-blue">noise</span>
                  <span className="ml-[0.12em]">worth</span>
                </span>
                <br />
                <span className="text-aer-cream/20">remembering.</span>
              </h2>
            </div>

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-sm">
                <p className="text-[11px] leading-5 text-aer-cream/40">
                  If the idea is ambitious, strange, or simply impossible to ignore — send it over.
                </p>
                <a
                  href="mailto:AlsanaAlgo@gmail.com?subject=Project%20Inquiry"
                  className="group mt-6 inline-flex items-center gap-3 border-b border-aer-cream/25 pb-2 text-[11px] font-medium tracking-[0.12em] transition-colors duration-300 hover:border-aer-blue hover:text-aer-blue"
                >
                  <Mail size={14} strokeWidth={1.5} />
                  ALSANAALGO@GMAIL.COM
                  <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>

              <a
                href="mailto:AlsanaAlgo@gmail.com?subject=Project%20Inquiry"
                className="group relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-aer-blue/45 bg-aer-blue/[0.06] text-center text-[9px] font-semibold leading-4 tracking-[0.14em] text-aer-cream backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-aer-blue hover:text-[#061011] hover:shadow-[0_0_80px_rgba(64,224,208,0.22)] md:h-40 md:w-40"
              >
                <span>START<br />A PROJECT</span>
                <ArrowDownRight size={15} strokeWidth={1.5} className="absolute bottom-7 right-7 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
            </div>
          </div>

          {/* Oversized ghost mark turns the very bottom into a visual signature. */}
          <div className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-editorial text-[clamp(8rem,27vw,27rem)] font-semibold leading-[0.7] tracking-[-0.08em] text-white/[0.018]">
            VÆLOR
          </div>

          <div className="relative z-10 border-t border-white/[0.08] pt-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a href="#top" className="text-[10px] font-semibold tracking-[0.22em] text-aer-cream/75 transition-colors hover:text-aer-blue">
                  AER × VÆLOR
                </a>
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[8px] tracking-[0.16em] text-aer-cream/30 transition-colors hover:text-aer-cream/75"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-5 text-[8px] tracking-[0.16em] text-aer-cream/25">
                <span>© {year}</span>
                <span>BUILT WITH INTENT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
