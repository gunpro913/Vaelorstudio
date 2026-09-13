import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import type { SiteContent } from '../lib/types';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------------- Helpers ---------------- */
function sVal(settings: Record<string, string>, key: string, fallback: string): string {
  const v = settings[key];
  return v !== undefined && v !== null && v !== '' ? v : fallback;
}

export function splitLines(raw: string | undefined, fallback: string[]): string[] {
  const src = (raw ?? '').split('\n').map((l) => l.trim()).filter(Boolean);
  return src.length ? src : fallback;
}

/* ---------------- Navbar ---------------- */
export function Navbar({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false);
  const brand = content.settings.brand_short || content.settings.site_name || 'AER VAELOR';
  const adminLabel = sVal(content.settings, 'admin_link_label', 'ADMIN');
  const links = (content.navLinks || []).filter((l: any) => l.visible !== false);
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-5 flex justify-between items-center backdrop-blur-md border-b"
        style={{ background: 'color-mix(in oklab, var(--color-aer-charcoal) 80%, transparent)', borderColor: 'color-mix(in oklab, var(--color-aer-cream) 10%, transparent)', color: 'var(--color-aer-cream)' }}>
        <a href="#top" className="text-xs tracking-[0.2em] font-medium z-50" onClick={() => setOpen(false)}>{brand}</a>
        <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] font-medium">
          {links.map((l: any) => (
            <a key={l.id} href={l.href} className="transition-colors duration-300 hover:opacity-70" onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-aer-blue)')} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>{l.label}</a>
          ))}
        </div>
        <div className="hidden md:block text-[10px] tracking-[0.2em] opacity-60">
          <a href="#/admin" className="hover:opacity-100 border border-current px-4 py-2 rounded-sm">{adminLabel}</a>
        </div>
        <button type="button" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} className="md:hidden text-[10px] tracking-[0.2em] z-50 uppercase min-h-[44px] min-w-[64px]" onClick={() => setOpen(!open)}>{open ? 'CLOSE' : 'MENU'}</button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden px-6 pt-20 pb-10 overflow-y-auto" style={{ background: 'var(--color-aer-black)' }}>
            {links.map((l: any, i: number) => (
              <motion.a key={l.id} href={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                onClick={() => setOpen(false)} className="font-editorial text-3xl uppercase tracking-widest hover:opacity-70 text-center min-h-[44px] flex items-center" style={{ color: 'var(--color-aer-cream)' }}>{l.label}</motion.a>
            ))}
            <a href="#/admin" onClick={() => setOpen(false)} className="text-[10px] tracking-[0.3em] border px-6 py-3 mt-4 min-h-[44px] flex items-center" style={{ borderColor: 'var(--color-aer-blue)', color: 'var(--color-aer-blue)' }}>{adminLabel} PANEL</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Hero ---------------- */
export function Hero({ content }: { content: SiteContent }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const hintFade = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const lines = (content.heroLines || []).filter((l: any) => l.visible !== false);
  const ys = [y1, y2, y3, y1];
  const hint = sVal(content.settings, 'hero_scroll_hint', 'Scroll to explore');
  const cornerLeft = splitLines(content.settings.hero_corner_left, ['IDX: 001', 'SYS: ONLINE', 'LAT: 40.7128 N']);
  const cornerRight = splitLines(content.settings.hero_corner_right, ['AER VAELOR', 'EST. 2026']);
  const split = (t: string) => (t || '').split('').map((ch, i) => (
    <span key={i} className="inline-block transition-transform duration-500 hover:-translate-y-2 cursor-default" onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-aer-blue)')} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>{ch === ' ' ? '\u00A0' : ch}</span>
  ));
  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center" style={{ background: 'var(--color-aer-black)' }}>
      <div className="absolute top-24 md:top-32 left-6 md:left-12 text-[9px] tracking-[0.3em] flex-col gap-1 hidden md:flex" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 30%, transparent)' }}>
        {cornerLeft.map((l, i) => <span key={i}>{l}</span>)}
      </div>
      <div className="absolute bottom-12 right-6 md:right-12 text-[9px] tracking-[0.3em] flex-col gap-1 text-right hidden md:flex" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 30%, transparent)' }}>
        {cornerRight.map((l, i) => <span key={i}>{l}</span>)}
      </div>
      <motion.div style={{ opacity: fade }} className="relative z-10 w-full px-6 md:px-12 text-center flex flex-col items-center">
        <div className="font-editorial text-[12vw] md:text-[8vw] leading-[0.9] uppercase max-w-[90vw] mx-auto flex flex-col items-center">
          {lines.map((l: any, i: number) => (
            <motion.div key={l.id} style={{ y: ys[i % ys.length] }} className={l.style === 'italic' ? 'italic transition-all duration-700 hover:scale-105' : 'flex gap-4'} >
              <div>{split(l.text_line)}</div>
            </motion.div>
          ))}
          {lines.length === 0 && <div className="text-4xl opacity-40">Add hero lines in admin</div>}
        </div>
      </motion.div>
      <motion.div style={{ opacity: hintFade }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 40%, transparent)' }}>{hint}</span>
        <motion.div animate={{ height: ['0px', '40px', '0px'], opacity: [0, 1, 0], y: [0, 20, 40] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="w-[1px]" style={{ background: 'color-mix(in oklab, var(--color-aer-cream) 40%, transparent)' }} />
      </motion.div>
    </section>
  );
}

/* ---------------- Anatomy ---------------- */
export function Anatomy({ content }: { content: SiteContent }) {
  const [active, setActive] = useState<string | null>(null);
  const items = (content.anatomy || []).filter((a: any) => a.visible !== false);
  const block = content.blocks?.anatomy;
  if (block && block.visible === false) return null;
  const found = items.find((a: any) => a.slug === active) ?? null;
  const tapHint = sVal(content.settings, 'anatomy_hint_mobile', 'TAP TO DECODE');
  const sysTag = sVal(content.settings, 'sys_anatomy_tag', 'SYS_LOG: NOMENCLATURE');
  return (
    <section className="py-24 md:py-40 px-6 md:px-12 relative border-t min-h-[70vh] flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--color-aer-charcoal)', borderColor: 'color-mix(in oklab, var(--color-aer-cream) 5%, transparent)' }}>
      <div className="max-w-7xl w-full mx-auto flex flex-col relative">
        <div className="absolute top-0 left-0 w-full flex justify-between items-start gap-4">
          <p className="text-xs tracking-[0.2em]" style={{ color: 'var(--color-aer-blue)' }}>{block?.eyebrow || 'ANATOMY'}</p>
          <p className="text-[9px] tracking-[0.3em] uppercase hidden md:block" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 30%, transparent)' }}>{sysTag}</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center relative mt-20 md:mt-24">
          <div className="flex flex-col md:flex-row items-center justify-center font-editorial text-[13vw] md:text-[10vw] leading-[1.05] md:leading-none uppercase z-10 w-full text-center" onMouseLeave={() => setActive(null)}>
            {items.map((a: any, i: number) => (
              <div key={a.id} className="flex flex-col md:flex-row items-center">
                <button
                  type="button"
                  onMouseEnter={() => setActive(a.slug)}
                  onFocus={() => setActive(a.slug)}
                  onClick={() => setActive((prev) => (prev === a.slug ? null : a.slug))}
                  aria-pressed={active === a.slug}
                  className="flex justify-center cursor-pointer py-2 md:py-8 px-2 md:px-4 min-h-[48px] items-center bg-transparent border-0"
                >
                  <span className="transition-all duration-500 break-words" style={{ color: active === a.slug ? 'var(--color-aer-blue)' : active ? 'color-mix(in oklab, var(--color-aer-cream) 20%, transparent)' : i === 1 ? 'color-mix(in oklab, var(--color-aer-cream) 50%, transparent)' : 'var(--color-aer-cream)', fontStyle: active === a.slug ? 'italic' : 'normal' }}>{a.title}</span>
                </button>
                {i < items.length - 1 && <span aria-hidden className="hidden md:inline opacity-20 font-light px-2">·</span>}
              </div>
            ))}
          </div>
          <div className="min-h-[12rem] md:h-40 w-full max-w-2xl mt-8 md:mt-16 relative flex items-start justify-center">
            <AnimatePresence mode="wait">
              {found ? (
                <motion.div key={found.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: EASE }}
                  className="flex flex-col items-center text-center gap-4 md:gap-6 absolute w-full px-4">
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-b pb-4" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 20%, transparent)' }}>
                    <span className="font-editorial text-xl md:text-3xl tracking-[0.2em] break-words" style={{ color: 'var(--color-aer-cream)' }}>{found.title}</span>
                    <span className="text-[9px] md:text-[10px] tracking-[0.2em] font-mono uppercase break-words" style={{ color: 'var(--color-aer-blue)' }}>{found.phonetic}</span>
                  </div>
                  <p className="text-[10px] md:text-xs tracking-[0.2em] leading-relaxed max-w-md uppercase" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 60%, transparent)' }}>{found.description}</p>
                </motion.div>
              ) : (
                <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute flex flex-col items-center text-center px-4">
                  <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase animate-pulse" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 30%, transparent)' }}>[ {block?.body || 'HOVER TO DECODE'} ]</p>
                  <p className="md:hidden mt-3 text-[9px] tracking-[0.3em] uppercase opacity-60">[ {tapHint} ]</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Statement + Philosophy ---------------- */
export function Statement({ content }: { content: SiteContent }) {
  const b = content.blocks?.statement;
  if (b && b.visible === false) return null;
  const title = b?.title || 'We design digital';
  const accent = b?.title_accent || 'experiences';
  const rest = b?.body || '';
  return (
    <section id="studio" className="relative py-32 md:py-48 px-6 md:px-12 flex items-center justify-center min-h-[70vh]" style={{ background: 'var(--color-aer-charcoal)' }}>
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20%' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="max-w-5xl text-center">
        <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-wide uppercase">
          {title} <span className="italic" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 70%, transparent)' }}>{accent}</span>{rest && !rest.startsWith(title) ? '' : ''}
        </h2>
        {rest && rest !== title && rest !== (title + ' ' + accent) && <p className="mt-6 text-xs tracking-[0.2em] uppercase opacity-60">{rest}</p>}
      </motion.div>
    </section>
  );
}

export function Philosophy({ content }: { content: SiteContent }) {
  const b = content.blocks?.philosophy;
  if (b && b.visible === false) return null;
  const title: string = b?.title || 'Friction by design.';
  const accent: string = b?.title_accent || 'Friction';
  const parts = accent && title.includes(accent) ? title.split(accent) : [title];
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden flex items-center justify-center min-h-[40vh]" style={{ background: 'var(--color-aer-charcoal)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }} className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6 md:gap-8">
        <p className="text-[10px] tracking-[0.3em]" style={{ color: 'var(--color-aer-blue)' }}>{b?.eyebrow || 'PHILOSOPHY'}</p>
        <h3 className="font-editorial text-3xl md:text-5xl lg:text-6xl leading-tight uppercase" style={{ color: 'var(--color-aer-cream)' }}>
          {parts.length > 1 ? (<>{parts[0]}<span className="italic" style={{ color: 'var(--color-aer-blue)' }}>{accent}</span>{parts[1]}</>) : title}
        </h3>
        {b?.body ? <p className="text-xs tracking-[0.2em] uppercase opacity-50 max-w-xl">{b.body}</p> : null}
      </motion.div>
    </section>
  );
}

/* ---------------- Capabilities ---------------- */
export function Capabilities({ content }: { content: SiteContent }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const items = (content.capabilities || []).filter((c: any) => c.visible !== false);
  const block = content.blocks?.capabilities;
  const sysTag = sVal(content.settings, 'sys_caps_tag', 'SYS_LOG: CORE_COMPETENCIES');
  if (block && block.visible === false) return null;
  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden" style={{ background: 'var(--color-aer-black)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start">
        <div className="w-full md:w-1/3 relative h-full">
          <div className="sticky top-32 flex flex-col gap-4">
            <p className="text-xs tracking-[0.2em]" style={{ color: 'var(--color-aer-blue)' }}>{block?.eyebrow || 'CAPABILITIES'}</p>
            <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 30%, transparent)' }}>{sysTag}</p>
            {block?.title ? <h3 className="font-editorial text-3xl uppercase">{block.title}</h3> : null}
            {block?.body ? <p className="text-xs tracking-widest opacity-50">{block.body}</p> : null}
          </div>
        </div>
        <motion.div style={{ y }} className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {items.map((c: any, i: number) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }} className="flex flex-col gap-4 group">
              <div className="flex items-center gap-4 border-b pb-4" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 10%, transparent)' }}>
                <span className="text-[10px] tracking-[0.2em]" style={{ color: 'var(--color-aer-blue)' }}>{c.code}</span>
                <h4 className="font-editorial text-2xl md:text-3xl uppercase group-hover:italic transition-all duration-500">{c.title}</h4>
              </div>
              <p className="text-xs tracking-[0.2em] leading-relaxed transition-colors duration-500" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 50%, transparent)' }}>{c.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Work: remade image-first showcase ---------------- */
const VARIANT_IMAGE: Record<string, string> = {
  glass: '/images/work-glass.jpg',
  brutal: '/images/work-brutal.jpg',
  kinetic: '/images/work-kinetic.jpg',
  editorial: '/images/work-editorial.jpg',
  glitch: '/images/work-glitch.jpg',
  spatial: '/images/work-spatial.jpg',
  minimal: '/images/work-minimal.jpg',
};

function VariantArt({ variant, image }: { variant: string; image?: string }) {
  const src = image || VARIANT_IMAGE[variant] || VARIANT_IMAGE.glass;
  if (variant === 'editorial' || variant === 'minimal') {
    return (
      <figure className="work-art w-full h-full relative overflow-hidden group bg-[#FAF8F5]">
        <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <figcaption className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between gap-3 px-5 md:px-6 py-4 bg-gradient-to-t from-black/70 via-black/25 to-transparent">
          <span className="font-editorial text-2xl md:text-3xl uppercase leading-none text-white">{variant === 'editorial' ? 'Restraint' : 'Void'}</span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/80">{variant === 'editorial' ? 'Curated' : 'Less, but better'}</span>
        </figcaption>
      </figure>
    );
  }
  if (variant === 'brutal') {
    return (
      <figure className="work-art w-full h-full relative overflow-hidden border-[6px] md:border-[8px] border-black bg-[#e0e0e0]">
        <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute top-5 left-6 z-10 font-mono text-xl md:text-2xl font-black tracking-tighter text-white mix-blend-difference">SYS.01</span>
        <span className="absolute top-5 right-6 z-10 block w-10 h-10 md:w-12 md:h-12 border-[4px] border-white" style={{ background: 'var(--color-aer-blue)' }} />
        <figcaption className="absolute bottom-5 left-6 z-10 font-mono text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-white mix-blend-difference">RAW<br />DATA</figcaption>
      </figure>
    );
  }
  if (variant === 'kinetic') {
    return (
      <figure className="work-art w-full h-full relative overflow-hidden" style={{ background: 'var(--color-aer-black)' }}>
        <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-x-[-20%] top-1/2 -translate-y-1/2 -rotate-6 z-10 overflow-hidden pointer-events-none" aria-hidden>
          <motion.div animate={{ x: ['-50%', '0%'] }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} className="flex whitespace-nowrap w-max">
            <span className="font-editorial text-5xl md:text-7xl uppercase leading-none pr-6 mix-blend-difference" style={{ color: 'var(--color-aer-cream)' }}>MOTION MOTION MOTION MOTION&nbsp;</span>
            <span className="font-editorial text-5xl md:text-7xl uppercase leading-none pr-6 mix-blend-difference" style={{ color: 'var(--color-aer-cream)' }}>MOTION MOTION MOTION MOTION&nbsp;</span>
          </motion.div>
        </div>
      </figure>
    );
  }
  if (variant === 'glitch') {
    return (
      <figure className="work-art w-full h-full relative overflow-hidden bg-[#050505]">
        <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none" aria-hidden>
          <motion.span animate={{ x: [-2, 2, -1, 3, 0], y: [1, -2, 2, -1, 0] }} transition={{ duration: 0.35, repeat: Infinity, repeatType: 'mirror' }} className="relative font-mono text-4xl md:text-6xl font-bold uppercase tracking-widest">
            <span className="absolute inset-0 -translate-x-[3px] translate-y-[2px] text-red-500 mix-blend-screen opacity-80">ERROR</span>
            <span className="absolute inset-0 translate-x-[3px] -translate-y-[2px] text-cyan-400 mix-blend-screen opacity-80">ERROR</span>
            <span className="relative text-white">ERROR</span>
          </motion.span>
        </div>
        <span className="absolute left-0 w-full h-[2px] bg-white/25 mix-blend-overlay z-10 pointer-events-none" style={{ top: '30%' }} aria-hidden />
      </figure>
    );
  }
  if (variant === 'spatial') {
    return (
      <figure className="work-art w-full h-full relative overflow-hidden bg-[#0a0a0a]">
        <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] tracking-[0.35em] uppercase px-4 py-2 border backdrop-blur-md" style={{ color: 'var(--color-aer-cream)', borderColor: 'color-mix(in oklab, var(--color-aer-cream) 40%, transparent)', background: 'rgba(0,0,0,0.45)' }}>Depth · Z-Index</span>
      </figure>
    );
  }
  return (
    <figure className="work-art w-full h-full relative overflow-hidden bg-[#0a0a0a]">
      <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 z-10 flex items-center justify-center p-6 md:p-10 pointer-events-none" aria-hidden>
        <div className="w-full max-w-[210px] md:max-w-[240px] aspect-[3/4] backdrop-blur-xl bg-white/10 border border-white/25 rounded-2xl md:rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col justify-between p-4 md:p-6 overflow-hidden">
          <div className="flex justify-between items-center">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/30 shadow-inner" />
            <div className="w-8 md:w-12 h-1 md:h-1.5 bg-white/30 rounded-full" />
          </div>
          <div className="space-y-2 md:space-y-3">
            <div className="w-full h-1.5 md:h-2 bg-white/30 rounded-full" />
            <div className="w-4/5 h-1.5 md:h-2 bg-white/20 rounded-full" />
            <div className="w-1/2 h-1.5 md:h-2 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    </figure>
  );
}

function WorkCard({ item, index }: { item: any; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const even = index % 2 === 0;
  return (
    <div ref={ref} className="relative w-full flex flex-col justify-center py-6 md:py-10 group">
      <div className={'absolute top-0 text-[9px] tracking-[0.3em] hidden lg:block ' + (even ? 'right-0' : 'left-0')} style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 30%, transparent)' }}>{item.coord} // IDX: {String(index + 1).padStart(2, '0')}</div>
      <div className={'flex flex-col gap-6 md:gap-12 items-center ' + (even ? 'md:flex-row' : 'md:flex-row-reverse')}>
        <motion.div style={{ y, borderColor: 'color-mix(in oklab, var(--color-aer-cream) 5%, transparent)' }} className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-square overflow-hidden border transition-colors duration-500"
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--color-aer-blue) 30%, transparent)')} onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--color-aer-cream) 5%, transparent)')}
        >
          <motion.div initial={{ scaleY: 1 }} whileInView={{ scaleY: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0 z-20 origin-top" style={{ background: 'var(--color-aer-charcoal)' }} />
          <VariantArt variant={item.variant} image={item.image_url} />
        </motion.div>
        <div className={'w-full md:w-1/2 flex flex-col justify-end h-full ' + (even ? 'items-start text-left pl-0 md:pl-12' : 'items-start md:items-end text-left md:text-right pr-0 md:pr-12')}>
          <div className="flex flex-col gap-3 w-full">
            <p className="text-[10px] tracking-[0.2em] overflow-hidden" style={{ color: 'var(--color-aer-blue)' }}>
              <motion.span initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }} className="block">{String(index + 1).padStart(2, '0')}</motion.span>
            </p>
            <div className="overflow-hidden">
              <motion.h3 initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }} className="font-editorial text-4xl md:text-5xl uppercase transition-colors duration-500">{item.title}</motion.h3>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} className={'flex flex-col gap-2 mt-2 ' + (even ? '' : 'md:items-end')}>
              <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 80%, transparent)' }}>{item.subtitle}</p>
              <p className="text-[10px] tracking-[0.15em] leading-relaxed max-w-sm mt-2" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 40%, transparent)' }}>{item.story}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Work({ content }: { content: SiteContent }) {
  const items = (content.work || []).filter((w: any) => w.visible !== false);
  const block = content.blocks?.work;
  const sysTag = sVal(content.settings, 'sys_work_tag', 'SYS_LOG: AESTHETIC_EXPLORATION');
  if (block && block.visible === false) return null;
  return (
    <section id="work" className="relative w-full px-6 md:px-12 py-24 md:py-32 flex flex-col gap-8 md:gap-12" style={{ background: 'var(--color-aer-charcoal)' }}>
      <div className="w-full max-w-6xl mx-auto flex justify-between items-end mb-4 md:mb-8">
        <p className="text-xs tracking-[0.2em]" style={{ color: 'var(--color-aer-blue)' }}>{block?.eyebrow || 'DESIGN LANGUAGES'}</p>
        <p className="hidden md:block text-[9px] tracking-[0.3em] uppercase" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 30%, transparent)' }}>{sysTag}</p>
      </div>
      {block?.title ? <h2 className="w-full max-w-6xl mx-auto font-editorial text-4xl uppercase">{block.title}</h2> : null}
      <div className="flex flex-col gap-16 md:gap-24 w-full max-w-6xl mx-auto">
        {items.map((w: any, i: number) => <WorkCard key={w.id} item={w} index={i} />)}
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */
const RAIL_X = 'left-6 md:left-1/2';
const DOT_X = 'left-6 md:left-1/2';

export function Process({ content }: { content: SiteContent }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const steps = (content.processSteps || []).filter((s: any) => s.visible !== false);
  const block = content.blocks?.process;
  const cta = content.blocks?.process_cta;
  const email = content.settings.contact_email || '';
  if (block && block.visible === false) return null;
  return (
    <section id="process" ref={ref} className="py-24 md:py-40 relative overflow-hidden" style={{ background: 'var(--color-aer-black)' }}>
      <div className="px-6 md:px-12 mb-20 md:mb-32 text-center relative z-20">
        <p className="text-[10px] tracking-[0.2em] mb-4" style={{ color: 'var(--color-aer-blue)' }}>{block?.eyebrow || 'PROCESS'}</p>
        <h2 className="font-editorial text-3xl md:text-6xl uppercase text-balance">{block?.title || 'The Journey'}</h2>
        {block?.body ? <p className="mt-4 text-xs tracking-[0.2em] uppercase opacity-50">{block.body}</p> : null}
      </div>
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="relative">
          <div className={`absolute ${RAIL_X} top-0 bottom-0 w-[1px] -translate-x-1/2 z-0`} style={{ background: 'color-mix(in oklab, var(--color-aer-cream) 10%, transparent)' }} />
          <div className={`absolute ${RAIL_X} top-0 w-[2px] -translate-x-1/2 origin-top z-10 overflow-hidden`} style={{ height: '100%' }}>
            <motion.div style={{ height: h, background: 'var(--color-aer-blue)' }} className="w-full" />
          </div>
          <div className="flex flex-col gap-14 md:gap-32 py-8 md:py-12 relative z-20">
            {steps.map((s: any, i: number) => {
              const left = i % 2 === 0;
              return (
                <motion.div key={s.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20%' }} transition={{ duration: 0.8, ease: EASE }}
                  className={'relative flex flex-col md:flex-row items-start md:items-center w-full group ' + (left ? 'md:justify-start' : 'md:justify-end')}>
                  <div className={`absolute ${DOT_X} top-1 md:top-1/2 md:-translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full border -translate-x-1/2 z-10 transition-all duration-500`} style={{ background: 'var(--color-aer-black)', borderColor: 'color-mix(in oklab, var(--color-aer-cream) 30%, transparent)' }} />
                  <div className={'w-full md:w-5/12 pl-14 md:pl-0 ' + (left ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left')}>
                    <p className="text-[9px] md:text-[10px] tracking-[0.2em] mb-2 opacity-60" style={{ color: 'var(--color-aer-blue)' }}>{s.code}</p>
                    <h3 className="font-editorial text-2xl md:text-4xl uppercase mb-3 group-hover:italic transition-all duration-500 text-balance">{s.title}</h3>
                    <p className="text-[10px] md:text-xs tracking-[0.2em] leading-relaxed transition-colors duration-500" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 40%, transparent)' }}>{s.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {cta && cta.visible !== false && (
            <div className="relative z-30 mt-16 md:mt-24">
              <div className={`absolute ${DOT_X} top-0 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 z-30`} style={{ background: 'var(--color-aer-blue)', boxShadow: '0 0 15px rgba(64,224,208,0.6)' }} />
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 1, ease: EASE }} className="w-full flex flex-col items-start md:items-center justify-center pl-14 md:pl-0 pt-10 md:pt-12" style={{ background: 'var(--color-aer-black)' }}>
                <h3 className="font-editorial text-3xl md:text-5xl lg:text-6xl uppercase italic text-left md:text-center mb-8 text-balance" style={{ color: 'var(--color-aer-cream)' }}>{cta.title && cta.title !== 'Start your journey' ? cta.title : (cta.body || 'YOUR PERFECT WEBSITE.')}</h3>
                <a href={'mailto:' + email + '?subject=Start My Journey'} className="inline-flex px-8 py-4 border font-bold tracking-[0.2em] text-[9px] md:text-[10px] transition-colors duration-500 uppercase rounded-sm min-h-[48px] items-center"
                  style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 20%, transparent)', color: 'var(--color-aer-cream)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-aer-blue)'; e.currentTarget.style.color = 'var(--color-aer-charcoal)'; e.currentTarget.style.borderColor = 'var(--color-aer-blue)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--color-aer-cream)'; }}>START YOUR JOURNEY</a>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
export function Services({ content }: { content: SiteContent }) {
  const [active, setActive] = useState<number | null>(null);
  const items = (content.services || []).filter((s: any) => s.visible !== false);
  const block = content.blocks?.services;
  const sysTag = sVal(content.settings, 'sys_services_tag', 'SYS_CAPABILITY_MATRIX');
  if (block && block.visible === false) return null;
  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12" style={{ background: 'var(--color-aer-charcoal)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 flex justify-between items-end gap-4">
          <div>
            <p className="text-xs tracking-[0.2em]" style={{ color: 'var(--color-aer-blue)' }}>{block?.eyebrow || 'SERVICES'}</p>
            {block?.title ? <h2 className="font-editorial text-4xl uppercase mt-3 text-balance">{block.title}</h2> : null}
            {block?.body ? <p className="mt-3 text-xs tracking-[0.2em] uppercase opacity-50 max-w-xl">{block.body}</p> : null}
          </div>
          <p className="hidden md:block text-[9px] tracking-[0.3em] shrink-0" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 30%, transparent)' }}>{sysTag}</p>
        </div>
        <div className="flex flex-col">
          {items.map((s: any, i: number) => {
            const isA = active === i;
            return (
              <div key={s.id} className="border-b last:border-b-0" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-cream) 10%, transparent)' }}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive((prev) => (prev === i ? null : i))}
                  onBlur={(e) => { if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setActive(null); }}
                  aria-expanded={isA}
                  className="w-full cursor-pointer py-4 md:py-6 relative flex flex-col items-start text-left bg-transparent border-0 min-h-[56px]"
                  onMouseLeave={() => setActive(null)}
                >
                  <span className="flex w-full items-baseline justify-between gap-4">
                    <span className="font-editorial text-2xl md:text-3xl lg:text-4xl uppercase inline-block z-10 transition-all duration-500 text-balance"
                      style={{ color: isA ? 'var(--color-aer-blue)' : 'color-mix(in oklab, var(--color-aer-cream) 60%, transparent)', transform: isA ? 'translateX(1rem)' : 'none', fontStyle: isA ? 'italic' : 'normal' }}>{s.name}</span>
                    <span aria-hidden className="shrink-0 font-mono text-xs opacity-50 transition-transform duration-500" style={{ transform: isA ? 'rotate(45deg)' : 'none' }}>+</span>
                  </span>
                  <AnimatePresence initial={false}>
                    {isA && (
                      <motion.span
                        key="desc"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="block overflow-hidden max-w-2xl z-10 w-full"
                      >
                        <span className="block text-[10px] md:text-xs tracking-[0.2em] uppercase pt-3 pb-4 md:pl-4 font-medium leading-relaxed" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 70%, transparent)' }}>{s.description}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <motion.span aria-hidden initial={false} animate={{ scaleX: isA ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE }} className="absolute bottom-0 left-0 w-full h-[1px] origin-left" style={{ background: 'var(--color-aer-blue)' }} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- AI + Manifesto ---------------- */
function renderAccented(title: string, accent: string, accentStyle: React.CSSProperties) {
  if (!accent || !title.includes(accent)) return <>{title}</>;
  const parts = title.split(accent);
  return (
    <>
      {parts[0]}
      <span className="italic" style={accentStyle}>{accent}</span>
      {parts.slice(1).join(accent)}
    </>
  );
}

export function AiApproach({ content }: { content: SiteContent }) {
  const b = content.blocks?.ai;
  const strike = content.blocks?.ai_strike;
  if (b && b.visible === false) return null;
  const strikeText = (strike && strike.visible !== false ? strike.title || strike.body : null) || 'AI GENERATES SLOP.';
  const strikeVisible = !strike || strike.visible !== false;
  const title = b?.title || 'WE CURATE MASTERPIECES.';
  const accent = b?.title_accent || 'MASTERPIECES';
  const body = b?.body || '';
  return (
    <section className="py-24 md:py-48 px-6 relative flex flex-col items-center justify-center border-t text-center overflow-hidden min-h-[70vh] md:min-h-[60vh]"
      style={{ background: 'var(--color-aer-black)', borderColor: 'color-mix(in oklab, var(--color-aer-cream) 5%, transparent)' }}>
      <div className="max-w-5xl mx-auto flex flex-col items-center z-10 w-full">
        <p className="text-[10px] tracking-[0.4em] uppercase mb-10 md:mb-12" style={{ color: 'var(--color-aer-blue)' }}>{b?.eyebrow || 'INTELLIGENCE'}</p>
        <div className="flex flex-col items-center gap-2 md:gap-4 w-full">
          {strikeVisible && (
            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1, ease: EASE }}
              className="font-editorial text-[9vw] sm:text-4xl md:text-6xl lg:text-8xl uppercase leading-[1.15] line-through decoration-2 px-2 text-balance" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 30%, transparent)' }}>{strikeText}</motion.h3>
          )}
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="font-editorial text-[9vw] sm:text-4xl md:text-6xl lg:text-8xl uppercase leading-[1.15] mt-2 md:mt-4 px-2 text-balance" style={{ color: 'var(--color-aer-cream)' }}>
            {renderAccented(title, accent, { color: 'var(--color-aer-blue)' })}
          </motion.h3>
        </div>
        {body ? (
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1, delay: 0.4, ease: EASE }}
            className="text-[10px] md:text-xs tracking-[0.2em] max-w-lg leading-relaxed uppercase mt-10 md:mt-12 px-2" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 60%, transparent)' }}>{body}</motion.p>
        ) : null}
      </div>
    </section>
  );
}

export function Manifesto({ content }: { content: SiteContent }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const o1 = useTransform(scrollYProgress, [0, 0.15, 0.3, 1], [0, 1, 0, 0]);
  const yA = useTransform(scrollYProgress, [0, 0.15, 0.3, 1], ['50%', '0%', '-50%', '-50%']);
  const o2 = useTransform(scrollYProgress, [0.25, 0.45, 0.6, 1], [0, 1, 0, 0]);
  const yB = useTransform(scrollYProgress, [0.25, 0.45, 0.6, 1], ['50%', '0%', '-50%', '-50%']);
  const o3 = useTransform(scrollYProgress, [0.55, 0.75, 0.95, 1], [0, 1, 1, 1]);
  const yC = useTransform(scrollYProgress, [0.55, 0.75, 0.95, 1], ['50%', '0%', '0%', '0%']);
  const a = content.blocks?.manifesto_a, b2 = content.blocks?.manifesto_b, c = content.blocks?.manifesto_c;
  if (a?.visible === false && b2?.visible === false && c?.visible === false) return null;
  const line1 = a?.title || a?.body || "THE WEBSITE ISN'T THE PRODUCT.";
  const line2 = b2?.title || b2?.body || 'THE EXPERIENCE IS.';
  const line3 = c?.body || c?.title || '';
  return (
    <section ref={ref} className="h-[220vh] md:h-[200vh] relative" style={{ background: 'var(--color-aer-charcoal)' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 md:px-12 text-center overflow-hidden">
        <div className="max-w-4xl flex flex-col relative z-10 w-full min-h-[300px] items-center justify-center py-16">
          <motion.h2 style={{ opacity: o1, y: yA }} className="absolute inset-x-0 font-editorial text-[8vw] sm:text-4xl md:text-6xl lg:text-7xl uppercase leading-[1.15] px-2 text-balance pointer-events-none">{line1}</motion.h2>
          <motion.h2 style={{ opacity: o2, y: yB }} className="absolute inset-x-0 font-editorial text-[8vw] sm:text-4xl md:text-6xl lg:text-7xl uppercase leading-[1.15] italic px-2 text-balance pointer-events-none" >{line2}</motion.h2>
          <motion.p style={{ opacity: o3, y: yC }} className="absolute inset-x-0 text-xs md:text-sm tracking-[0.2em] max-w-lg mx-auto leading-relaxed px-4 pointer-events-none" >{line3}</motion.p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
export function Contact({ content }: { content: SiteContent }) {
  const ref = useRef(null);
  const targetRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '0%']);
  const o = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [sel, setSel] = useState<number | null>(null);
  const [hov, setHov] = useState<number | null>(null);
  const opts = (content.contactOptions || []).filter((c: any) => c.visible !== false);
  const block = content.blocks?.contact;
  const email = content.settings.contact_email || '';
  const selectWord = sVal(content.settings, 'contact_select_word', 'SELECT');
  const selectedWord = sVal(content.settings, 'contact_selected_word', 'SELECTED');
  const proceedPrefix = sVal(content.settings, 'contact_proceed_prefix', 'PROCEED WITH:');
  const ctaLabel = sVal(content.settings, 'contact_cta_label', 'CONTINUE TO INQUIRY');
  if (block && block.visible === false) return null;
  const pick = (i: number) => { setSel(i); setTimeout(() => { targetRef.current && targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 150); };
  const title: string = block?.title || 'Start A Project';
  const accent: string = block?.title_accent || 'Project';
  return (
    <section id="contact" ref={ref} className="pt-24 pb-32 md:pt-32 md:pb-48 px-6 md:px-12 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: 'var(--color-aer-charcoal)' }}>
      <motion.div style={{ y, opacity: o }} className="w-full max-w-4xl mx-auto flex flex-col items-center text-center z-10">
        <p className="text-[10px] tracking-[0.3em] mb-6" style={{ color: 'var(--color-aer-blue)' }}>{block?.eyebrow || 'INITIATE'}</p>
        <h2 className="font-editorial text-3xl md:text-5xl uppercase leading-[1] mb-12">
          {accent && title.includes(accent) ? (<>{title.split(accent)[0]}<span className="italic" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 70%, transparent)' }}>{accent}</span>{title.split(accent)[1]}</>) : title}
        </h2>
        {block?.body ? <p className="text-xs tracking-[0.2em] uppercase opacity-50 mb-8">{block.body}</p> : null}
        <div className="w-full flex flex-col gap-2">
          {opts.map((op: any, i: number) => (
            <motion.button key={op.id} onClick={() => pick(i)} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              className="group relative w-full py-4 px-6 border rounded-sm flex justify-between items-center overflow-hidden cursor-pointer text-left transition-all duration-500"
              style={{ borderColor: sel === i ? 'var(--color-aer-blue)' : 'color-mix(in oklab, var(--color-aer-cream) 10%, transparent)', background: sel === i ? 'color-mix(in oklab, var(--color-aer-blue) 5%, transparent)' : 'transparent' }}>
              <span className="relative z-10 font-editorial text-base md:text-lg uppercase transition-all duration-500" style={{ color: sel === i || hov === i ? 'var(--color-aer-blue)' : 'var(--color-aer-cream)', fontStyle: sel === i || hov === i ? 'italic' : 'normal' }}>{op.label}</span>
              <span className="relative z-10 text-[9px] tracking-[0.2em] transition-all duration-500" style={{ color: sel === i || hov === i ? 'var(--color-aer-blue)' : 'color-mix(in oklab, var(--color-aer-cream) 20%, transparent)' }}>{sel === i ? selectedWord : selectWord}</span>
            </motion.button>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: sel !== null ? 1 : 0, height: sel !== null ? 'auto' : 0, marginTop: sel !== null ? 32 : 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden flex flex-col items-center w-full">
          <div className="w-full p-8 border rounded-sm mt-4 flex flex-col items-center gap-6" style={{ borderColor: 'color-mix(in oklab, var(--color-aer-blue) 20%, transparent)', background: 'color-mix(in oklab, var(--color-aer-blue) 5%, transparent)' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 50%, transparent)' }}>{proceedPrefix} {sel !== null && opts[sel] ? opts[sel].label : ''}</p>
            <a ref={targetRef} href={'mailto:' + email + '?subject=Project Inquiry: ' + (sel !== null && opts[sel] ? opts[sel].label : '')}
              className="px-10 py-4 font-bold tracking-[0.2em] text-[10px] transition-colors duration-500 uppercase rounded-sm"
              style={{ background: 'var(--color-aer-cream)', color: 'var(--color-aer-charcoal)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-aer-blue)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-aer-cream)'; }}>{ctaLabel}</a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer({ content }: { content: SiteContent }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '0%']);
  const o = useTransform(scrollYProgress, [0, 0.8, 1], [0, 1, 0.2]);
  const b = content.blocks?.footer;
  const email = content.settings.contact_email || '';
  const brand = content.settings.brand_short || '';
  const rights = sVal(content.settings, 'footer_rights', 'ALL RIGHTS RESERVED');
  const ctaLabel = sVal(content.settings, 'footer_cta_label', 'START A PROJECT');
  if (b && b.visible === false) return null;
  const title: string = b?.title || b?.body || 'MAKE SOMETHING WORTH EXPERIENCING';
  const accent: string = b?.title_accent || 'EXPERIENCING';
  return (
    <footer ref={ref} className="relative h-screen overflow-hidden flex flex-col items-center justify-center px-6 text-center" style={{ background: 'var(--color-aer-black)' }}>
      <motion.div style={{ y, opacity: o }} className="relative z-10 flex flex-col items-center gap-12">
        <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl uppercase leading-tight max-w-4xl">
          {accent && title.includes(accent) ? (<>{title.split(accent)[0]}<span className="italic" style={{ color: 'var(--color-aer-blue)' }}>{accent}</span></>) : title}
        </h2>
        <a href={'mailto:' + email} className="text-xs md:text-sm tracking-[0.3em] transition-colors duration-300 pb-2 border-b border-current opacity-100 hover:opacity-70 min-h-[44px] inline-flex items-center">{ctaLabel}</a>
      </motion.div>
      <div className="absolute bottom-8 md:bottom-12 w-full flex flex-wrap justify-between items-center gap-2 px-6 md:px-12 text-[10px] tracking-[0.2em]" style={{ color: 'color-mix(in oklab, var(--color-aer-cream) 40%, transparent)' }}>
        <p>© {new Date().getFullYear()}</p>
        <p>{brand}</p>
        <p>{rights}</p>
      </div>
    </footer>
  );
}

/* ---------------- Preloader ---------------- */
export function Preloader({ content }: { content: SiteContent }) {
  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, y: '-100%' }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'var(--color-aer-black)', color: 'var(--color-aer-cream)' }}>
      <div className="overflow-hidden">
        <motion.h1 initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '-100%' }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }} className="font-editorial text-4xl md:text-6xl tracking-widest uppercase">
          {content.settings.preloader_text || content.settings.brand_short || 'AER VAELOR'}
        </motion.h1>
      </div>
    </motion.div>
  );
}
